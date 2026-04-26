---
author: Mounir Samite
pubDatetime: 2026-04-24T17:16:08Z
title: Agents, a bird's eye
featured: true
draft: false
tags:
  - agents
  - discovering
  - brain
  - intelligence
  - llm
  - ai
description: Agents are cool!
---

# From Chatbots to Agents: What Actually Changed

If you've been anywhere near the AI space this year, you've heard the word *agents* everywhere. I've been digging through some university lecture notes on the topic, and I want to share what I learned in plain terms, no PhD required.

## What is an AI agent, really?

Start with a plain Large Language Model. At its core, an LLM is a conditional sequence modeler: it produces text one token at a time. It doesn't hold long-term goals, it doesn't act on the outside world, and it doesn't run any kind of ongoing loop. You give it a prompt, it gives you text back, and that's the whole interaction.

An agent is a step up. The textbook definition is "a computational system situated in an environment, capable of autonomous action to meet its design objectives", which is a mouthful, but the idea is simple: an agent lives inside some environment (a browser, a codebase, an operating system, the internet) and can take actions on its own to get something done.

The key difference is the loop. Instead of one prompt in, one answer out, an agent runs continuously: it **observes** its environment, **decides** what to do next, **acts**, and then **observes** the result of that action before deciding again.


<img src="/assets/images/loop.png" alt="The agent loop: observe, decide, act, repeat">

A concrete example: say you ask an agent to find the cheapest flight to Tokyo next month. A plain LLM will describe *how* to search for flights. An agent will actually open a browser, query flight APIs, compare the results, and hand you back a booking link.

## Tools: the thing that makes agents useful

The capability that unlocks all of this is **tool use**. A plain model generates text. An agent generates text that is also a *control signal*, a structured output that the surrounding system interprets as "call this API," "run this Python snippet," or "query this database."

To make that work, a typical tool-augmented agent has four pieces wired together:

- An **LLM core** that does the reasoning and decides what to do
- A **memory system** so it can remember what happened earlier in the task
- A **planner** that breaks big goals into smaller steps
- A **tool interface** that lets it actually call external things


## How agents decide to act

There are a few different schools of thought on *how* the model should figure out when to use a tool.

**ReAct (Reason + Act)** is the most common pattern. The model is prompted to interleave reasoning ("I need to know the current weather in Tokyo") with acting ("call the weather API"), then observe the result and reason about the next step. It's essentially a visible train of thought punctuated by tool calls.

**Toolformer** takes a different route. Instead of relying on prompting, it trains the model itself to insert API calls directly into its output where they're useful. The tool use becomes part of how the model writes, not just how it's prompted.

**PAL (Program-Aided Language models)** uses code as the universal tool. Instead of reasoning through a math or logic problem in English, the model writes a small program, runs it, and uses the output. It turns out code is a surprisingly general way to offload anything that requires precision.

## Autonomy
Most of the hand-wringing about "autonomous AI" is aimed at the wrong layer. The LLM is not the thing that deletes your database or emails your customers, it's just a text generator. The agent is what has hands. And the size of those hands is decided entirely by us, when we wire up the tool interface. An agent with read-only access to a sandboxed calendar is not dangerous no matter how confidently wrong the model is; an agent with a shell, production credentials, and the ability to send outbound HTTP is dangerous even if the model is near-perfect. Autonomy is a permissions problem dressed up as an intelligence problem, and we solve permissions problems the same way we always have, with scoped credentials, approval steps for destructive actions, and audit logs, not by waiting for the model to become wise enough to be trusted with everything.

That's my take.

## Where this is going, and where I am

The shift worth paying attention to is this: the LLM is no longer the product. It's becoming the *orchestrator* of external computation and action. The interesting question is no longer "what can this model say?" but "what can this model do, and what tools should it have access to?"

I'm spending most of my free time building small agent systems across different stacks, trying out frameworks, wiring up tools, breaking things, rewiring them. Some of it works surprisingly well. Most of it doesn't, which is honestly where the learning happens. 

