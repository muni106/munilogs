---
title: Core build automation stuff 
author: Mounir Samite
pubDatetime: 2026-04-02T12:00:00Z
featured: false
draft: false
tags: [meta]
description: A quick reference note about build automation.
---
# Some questions
## what is a build?
When programmers write software, they type out text files containing code. But a computer can't run those raw text files directly. A **build** is the process of taking those raw code files and turning them into a finished, usable program (like an app you can download or a website you can visit).

## what is an automator?
Doing the build process manually is slow and prone to human error. An **automator** (or build automation tool) is a program that does all this work automatically. When a programmer finishes their code, they press a button, and the automator handles the compiling, packing, and testing of the app all by itself.

# Dependencies

## Transitive dependencies
Indirect dependencies (dependencies of dependencies)

## conflicts
dependency A requires B at version 1, dependency C requires B at version 2

## conflict management

Introduce dependency ranges -> testing all possible combination impossible -> lock files give you a good set (that should work)

# Build tools

## Imperative bt 
- example: CMake (C/C++)
- search for what to build / define target / manage dependencies / test,  in a manual/imperative way (basically you have to specify everything, full control)
- extreme flexibility

## Declarative bt
- example: Python Poetry, Apache Maven, 
- favor markup files over scripts (xml, toml, json, yaml)
- **lock** file for dependency resolution
- super standard (rule follower)

# hybrid automators
- example: Gradle
- a hybrid get something from both, hopefully in a way that help the engineer :)



# Checklist of things to do when working with gradle
*generated with claude opus 4.6 from some of my lecture notes*
## 🏗️ Project Setup & Wrapper

- [ ] **Create a `build.gradle.kts` in the project root** — Gradle treats the folder it's invoked in as a project; the file instructs it on the organization.
- [ ] **Generate the Gradle Wrapper at the desired version** — `gradle wrapper --gradle-version=<VERSION>` produces `gradlew` / `gradlew.bat` scripts.
- [ ] **Always use `./gradlew` instead of bare `gradle`** — The wrapper is the correct way to use Gradle; it pins the version and avoids global dependency issues.
- [ ] **Create `settings.gradle.kts` for multi-project setups** — Initialization phase: Gradle reads this to understand what is part of the build.
- [ ] **Understand the 3-phase lifecycle: Initialization → Configuration → Execution** — Code outside `doLast`/`doFirst` runs at configuration time, even if the task is never invoked!

---

## ⚙️ Tasks & Task Dependencies

- [ ] **Register tasks with `tasks.register` (configuration avoidance)** — Prefer `register` over `create`; configuration only happens when the task is actually needed.
- [ ] **Place actual work inside `doLast { }` or `doFirst { }`** — Code directly in the task block runs at configuration time — a classic Gradle pitfall.
- [ ] **Declare task dependencies with `dependsOn`** — E.g., `runJava` must `dependsOn(compileJava)`, otherwise sources won't be compiled first.
- [ ] **Declare `inputs` and `outputs` for incremental builds** — Enables Gradle's up-to-date checking; tasks are skipped when nothing changed.
- [ ] **Use typed tasks (e.g. `Exec`, custom types) to encapsulate imperative logic** — Specify the type at registration: `tasks.register<Exec>("myTask")`.
- [ ] **Ensure the task DAG is acyclic and correctly ordered** — Tasks form a Directed Acyclic Graph; circular dependencies will cause build failures.

---

## 📦 Configurations & Dependencies

- [ ] **Define configurations (e.g. `compileClasspath`, `runtimeClasspath`)** — A configuration groups dependencies and has three roles: declare, resolve, and present.
- [ ] **Use `extendsFrom` to model configuration relationships** — E.g., `runtimeClasspath.extendsFrom(compileClasspath)` — runtime inherits compile deps.
- [ ] **Declare dependencies with the correct scope (`api` / `implementation` / `testImplementation`)** — `api` leaks to consumers, `implementation` is internal, `testImplementation` is test-only.
- [ ] **Be aware of transitive dependencies and potential conflicts** — Dep A needs B@v1, dep C needs B@v2 — use `./gradlew dependencies` to inspect.
- [ ] **Use a version catalog (`gradle/libs.versions.toml`) for DRY declarations** — Centralizes versions, libraries, bundles, and plugins; Gradle generates type-safe accessors.
- [ ] **Use `dependencyInsight` to debug specific dependency resolution** — `./gradlew dependencyInsight --dependency <name> --configuration <conf>`

---

## 🧩 Plugins & Conventions

- [ ] **Apply relevant built-in plugins (`java`, `java-library`, `kotlin`, etc.)** — Built-in plugins provide a full lifecycle: compile, test, jar, check, assemble, build.
- [ ] **Apply plugins via the `plugins { }` block with version if needed** — Plugins not found locally are fetched from the Gradle Plugin Portal.
- [ ] **Extract shared build logic into `buildSrc` convention plugins** — Place them in `buildSrc/src/main/kotlin/convention-name.gradle.kts`.
- [ ] **Follow convention over configuration: keep defaults where sensible** — Standard source layout (`src/main/java`, `src/test/java`) works out of the box.
- [ ] **Isolate imperativity: hide it in task types / plugins, expose declarative API** — Divide → Conquer → Encapsulate → Adorn: the general plugin design approach.

---

## ✅ Quality Control & Testing

- [ ] **Make quality tasks depend on `check`** — `check` is meant to run all QA tasks; by default it depends on `test`.
- [ ] **Configure test framework (e.g. JUnit 5 / Kotest)** — Ensure `tasks.test { useJUnitPlatform() }` is set for JUnit 5.
- [ ] **Set up code coverage (Jacoco / Kover)** — Coverage can only spot uncovered code — it can't tell you if covered code is correct.
- [ ] **Enable style checking (Ktlint / Checkstyle)** — Opinionated formatters enforce consistent code style across the team.
- [ ] **Enable static analysis (Detekt / Spotbugs / PMD)** — Catches suboptimal patterns, potential bugs, and code smells without execution.
- [ ] **Set Kotlin compiler to "warnings as errors" mode** — An aggressive but effective way to catch potential issues at compile time.
- [ ] **Use Gradle Test Kit for testing custom plugins** — `GradleRunner.create().withProjectDir(...).withPluginClasspath(...).build()` to run and inspect.
- [ ] **Inspect QA reports under `build/reports/`** — Test results, coverage reports, and analysis findings are published there.

---

## 🔧 Build Toolchains

- [ ] **Distinguish compilation target, runtime target, and build-time runtime** — You may use Java 17 to run Gradle, compile to Java 8 bytecode, and test on Java 11.
- [ ] **Configure JVM toolchains independently from the Gradle JVM** — Gradle defaults to using the same JVM for build, compile, and test — override when needed.
- [ ] **For multi-platform (Kotlin): configure targets (JVM, JS, Native) explicitly** — Each platform has its own source sets, dependencies, and compilation pipeline.

---

## 🚀 Publishing & Distribution

- [ ] **Generate API documentation automatically (Dokka / Javadoc)** — Automate doc generation as part of the build lifecycle.
- [ ] **Create artifacts in a Maven-repository-compatible layout** — Required for publishing to Maven Central or other repositories.
- [ ] **Sign all artifacts for publication** — Maven Central requires GPG signing of all published artifacts.
- [ ] **Configure plugin publishing credentials securely** — Use `~/.gradle/gradle.properties` or `-P` flags — never hardcode secrets in build files.
- [ ] **For Gradle plugins: publish via the Gradle Plugin Portal** — Register on the portal, use the `com.gradle.plugin-publish` plugin.

---

## 🔍 Debugging & Inspection

- [ ] **Run `./gradlew tasks` to see available tasks** — Includes built-in, plugin, and custom tasks grouped by category.
- [ ] **Run `./gradlew dependencies` to inspect dependency trees** — Shows the resolved dependency tree for each configuration.
- [ ] **Use the task-tree plugin to visualize task dependencies** — Plugin: `com.dorongold.task-tree` — generates a `taskTree` task.
- [ ] **Use `--scan` for a full Gradle Build Scan** — Rich web-based report for performance, dependencies, and plugin behavior.
- [ ] **Configure automated build scans in `settings.gradle.kts` (Develocity)** — Useful for CI — set `uploadInBackground` based on CI environment variable.

