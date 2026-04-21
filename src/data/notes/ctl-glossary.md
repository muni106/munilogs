---
title: CTL glossary
author: Mounir Samite
pubDatetime: 2026-04-21T12:00:00Z
featured: false
draft: false
tags: [meta]
description: This glossary defines the terms used in the CTL specification. It is not intended to be exhaustive, but rather to provide a common understanding of the key concepts and terminology used in the specification.
---

# What is CTL?

**Computation Tree Logic (CTL)** is a branching-time temporal logic used in formal verification and model checking. Formulas are evaluated over a _Kripke structure_, a graph of states connected by transitions, and describe properties that hold along possible future computation paths.

---

## Path quantifiers

Range over paths (computation branches) from the current state. In CTL, every temporal operator must be paired with one of these.

| Symbol | Name          | Meaning                                                           |
| ------ | ------------- | ----------------------------------------------------------------- |
| **A**  | For All paths | The property holds on every possible future path from this state. |
| **E**  | Exists a path | There is at least one future path where the property holds.       |

---

## Temporal operators

Describe _when_ along a path the property must hold.

| Symbol    | Name             | Meaning                                                                                                |
| --------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| **X φ**   | neXt             | φ holds in the next state.                                                                             |
| **F φ**   | Finally / Future | φ holds at some state in the future (eventually). Sometimes written ◇φ.                                |
| **G φ**   | Globally         | φ holds in every state along the path (always). Sometimes written □φ.                                  |
| **φ U ψ** | Until            | φ holds at every state until some state where ψ holds (and ψ must eventually hold).                    |
| **φ R ψ** | Release          | ψ holds until and including the state where φ holds; if φ never holds, ψ holds forever. Dual of Until. |
| **φ W ψ** | Weak Until       | Like Until, but ψ does not have to eventually hold.                                                    |

---

## Combined CTL operators

In CTL, every temporal operator is prefixed by **A** or **E**. These are the eight standard pairings.

| Symbol       | Meaning                                                       |
| ------------ | ------------------------------------------------------------- |
| **AX φ**     | φ holds in the next state on _all_ paths.                     |
| **EX φ**     | There exists a next state where φ holds.                      |
| **AF φ**     | On every path, φ eventually holds (_inevitability_).          |
| **EF φ**     | There is some path where φ eventually holds (_reachability_). |
| **AG φ**     | On every path, φ always holds (_invariant / safety_).         |
| **EG φ**     | There is some path on which φ always holds.                   |
| **A[φ U ψ]** | On all paths, φ holds until ψ does.                           |
| **E[φ U ψ]** | On some path, φ holds until ψ does.                           |

---

## Logical connectives

| Symbol     | Name         | Meaning                            |
| ---------- | ------------ | ---------------------------------- |
| **¬ φ**    | Not          | Negation of φ.                     |
| **φ ∧ ψ**  | And          | Both φ and ψ hold.                 |
| **φ ∨ ψ**  | Or           | At least one of φ or ψ holds.      |
| **φ → ψ**  | Implies      | If φ holds, then ψ holds.          |
| **φ ↔ ψ** | Equivalent   | φ and ψ have the same truth value. |
| **⊤ / ⊥**  | True / False | The constant truth values.         |

---

## Semantics & models

| Symbol            | Name                | Meaning                                                                                                   |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| **M, s ⊨ φ**      | Satisfaction        | In model M, state s satisfies formula φ.                                                                  |
| **M ⊨ φ**         | Model satisfaction  | Formula φ holds in every initial state of model M.                                                        |
| **K = (S, R, L)** | Kripke structure    | States S, transition relation R, and labeling L mapping each state to the atomic propositions true there. |
| **π**             | Path                | An infinite sequence of states s₀, s₁, s₂, … where each (sᵢ, sᵢ₊₁) ∈ R.                                   |
| **AP**            | Atomic propositions | The base set of boolean facts used to build formulas.                                                     |
| **φ, ψ**          | Metavariables       | Stand for arbitrary CTL formulas.                                                                         |

---

## Useful equivalences

```
AF φ  ≡  ¬EG ¬φ
EF φ  ≡  ¬AG ¬φ
AG φ  ≡  ¬EF ¬φ
EG φ  ≡  ¬AF ¬φ
EF φ  ≡  E[⊤ U φ]
AF φ  ≡  A[⊤ U φ]
```

---

## Common specification patterns

| Pattern          | Formula              | Reads as                                                |
| ---------------- | -------------------- | ------------------------------------------------------- |
| Safety           | `AG ¬bad`            | Nothing bad ever happens on any path.                   |
| Liveness         | `AG (req → AF resp)` | Every request is eventually answered.                   |
| Reachability     | `EF goal`            | The goal state is reachable.                            |
| Fairness-like    | `AG EF reset`        | From any state, it is always possible to reach a reset. |
| Deadlock-freedom | `AG EX ⊤`            | Every reachable state has a successor.                  |

---

## Notes

- **CTL vs LTL.** In CTL, temporal operators (X, F, G, U) _must_ be paired with a path quantifier (A or E). Bare `F` or `G` without a quantifier belong to Linear Temporal Logic (LTL), which reasons about single linear traces rather than branching trees.
- **Box and diamond notation.** `□φ` (box) corresponds to "always" and `◇φ` (diamond) to "eventually" — these are modal-logic symbols commonly used in LTL.
- **CTL\***. A more expressive superset that allows temporal operators without immediately preceding path quantifiers; both CTL and LTL are fragments of CTL\*.
