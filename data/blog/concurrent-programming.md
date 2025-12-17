---
title: Concurrent Programming myOverview
author: Mounir Samite
pubDatetime: 2025-09-10T05:17:19Z
slug: concurrent-programming
featured: false
draft: true
tags:
  - concurrency
  - guide
  - parallelism
# ogImage: "https://example.org/remote-image.png" # remote URL
description: I talk about lists, numbers and graphs in prolog.
---

# Understanding Concurrency

Welcome! For decades, programmers could rely on a simple truth: as computer hardware got better, their software would automatically run faster. That era is over. Modern computers have fundamentally changed, and with them, the rules of programming.

Understanding concurrency and how to make a computer do multiple things at once, is no longer an advanced topic reserved for specialists. It is a core concept that every aspiring programmer must grasp. This guide is designed to explain these fundamental ideas. We will build a solid conceptual foundation without getting lost in complex code.

# Why Concurrency

For a long time, the primary way to make computers faster was to increase the speed of a single processor, or "core." Each new generation of hardware was faster than the last, meaning that existing software would get a performance boost "for free," without any changes.

However, engineers eventually hit the physical limits of this approach. Instead of making single cores faster, they began adding more cores to a single chip. Today, even your smartphone has a multi-core processor. This isn't just about adding more identical cores; modern chips often use a mix of high-performance and high-efficiency cores, making the programmer's job even more complex. This fundamental shift prompted computer scientist Herb Sutter to declare that "The Free Lunch is Over."

What did he mean? He meant that the free performance gains from new hardware had ended. Software will no longer get faster automatically. To take advantage of modern multi-core processors, programs must be explicitly designed to use multiple cores simultaneously. This is the fundamental motivation behind concurrent programming: to unlock the true performance potential of the hardware we use every day.

# Concurrency vs. Parallelism

In everyday conversation, **concurrent** and **parallel** are often used interchangeably. In computer science, however, they describe two distinct but related ideas. Understanding the difference is crucial. As technologist Rob Pyke noted, *concurrency is a way of structuring software, while parallelism is about execution*.

<br>
Concept	Dealing with many things at once, doing many things at once.
The core Idea of Concurrency is about structuring a program as a set of independently executing computations. It's a tool for software construction and design.	Parallelism is about the simultaneous execution of those computations, typically on separate physical processors, with a focus on performance.


A single cook in a kitchen juggling multiple tasks: chopping vegetables, watching a pot simmer, and marinating meat. 
The tasks overlap in time but aren't all happening at the exact same instant.	
A team of several cooks in a kitchen. 
One is only chopping vegetables, another is only making sauce, and a third is only grilling. 
The tasks are being performed simultaneously.

The most important relationship to remember is this: **concurrency enables parallelism**. 
By structuring your program into concurrent tasks, you create the opportunity for it to be executed in parallel on a multi-core processor.

# What is a Process?

To talk about concurrency, we need a word for the *"things"* that are happening at the same time. In concurrent programming, the fundamental unit of work is **the process**.

- A process is simply a sequential program in execution, a series of instructions being followed one after another.
- A concurrent program is composed of two or more processes whose executions overlap in time.

Think of each process as an independent person with their own to-do list. They work at their own pace, following the instructions on their list.

This brings us to the core challenge of concurrency. We must assume speed independence, meaning we can make no assumptions about the relative speed of different processes. One process might run quickly, another slowly, and this can change unpredictably due to factors like operating system scheduling. This leads directly to non determinism: the same concurrent program can produce different results on different runs, depending on the specific, arbitrary order in which the actions of its processes are interleaved. This is why concurrency is so difficult to get right.

# The Root of All Trouble: Shared Resources and Race Conditions

The true challenge of concurrent programming doesn't come from processes running in isolation. It appears when they need to interact, specifically when they access and modify a shared resource, such as a variable in memory.

When two or more processes try to modify a shared resource, the final outcome can depend on the precise order in which their actions are interleaved. This hazardous situation is called a race condition.

Consider a simple operation:`n = n + 1`. It appears to be a single, indivisible step, but it is in fact non atomic. 
<br>
At a lower level, it is a sequence of three distinct actions:

1. Read the current value of n from memory into a temporary location.
2. Add 1 to that temporary value.
3. Write the new value from the temporary location back to memory.

This is not a problem for a single process. But what happens when two processes, P1 and P2, try to do this at the same time, starting with n = 0?


The final result is n = 1. The correct result should have been 2. Because P2 read the value of n before P1 had a chance to write its updated value back, P1's work was completely lost. This is a "race" because the outcome depends entirely on which process "wins" each step of the sequence.

5. Common Nightmares: When Things Go Wrong

Race conditions are just one of several critical problems that can arise in concurrent systems. Here are some of the most common nightmares programmers face.

5.1. Deadlock: The Deadly Embrace

A deadlock is a situation where two or more processes are stuck in a circular waiting pattern. Each process is waiting for a resource held by another process in the chain, so none can ever proceed.

The classic story to illustrate this is the Dining Philosophers problem:

* The Setup: Five philosophers are seated at a circular table. In front of each is a plate of spaghetti, and between each plate is a single fork.
* The Problem: To eat, a philosopher needs two forks—the one on their left and the one on their right. They can only pick up one fork at a time.
* The Deadlock: Imagine each philosopher follows the same strategy: "1. Pick up the left fork. 2. Pick up the right fork." If all five philosophers pick up their left fork at the same time, the table falls silent. Each philosopher is now holding one fork and waiting for the right fork... which is being held by their neighbor. No one can eat, and no one will put their fork down. They are deadlocked, destined to starve.

5.2. Livelock and Starvation

While deadlock is the most famous problem, two other related conditions can also prevent progress.

* Livelock: This is a situation where processes are constantly changing their state in response to each other, but make no useful progress.
  * Analogy: Imagine two people meeting in a narrow hallway. They both try to be polite and step aside, but they move in the same direction. They step the other way, again in unison. They are perpetually moving but are getting nowhere.
* Starvation: This is a situation wherein a process is perpetually denied access to a necessary resource and can never finish its task. While the system as a whole may be making progress, one process is "starved" and can never run.

6. The Path to Order: Core Solution Concepts

To prevent these nightmares, we must introduce rules that govern how processes interact. The solutions revolve around two fundamental concepts: mutual exclusion and synchronization.

6.1. Mutual Exclusion: One at a Time, Please

A critical section is a piece of code that accesses a shared resource. To prevent race conditions, we must ensure that this code is executed with mutual exclusion—that is, by no more than one process at a time.

Consider the "Alice and Bob buying milk" scenario. They need a protocol to ensure only one person buys milk if the fridge is empty. A seemingly obvious solution is to leave a note. The protocol might be: "If there's no milk and no note, leave a note and go buy milk."

But this simple protocol can fail spectacularly due to non-determinism. Consider this sequence of events:

1. Alice arrives home, looks at the fridge, and sees no note. She looks inside and sees no milk.
2. Before she can leave a note, she gets distracted (the phone rings, or as the source material colorfully puts it, she "ops! need a toilet").
3. While Alice is away, Bob arrives home. He looks at the fridge and sees no note. He looks inside and sees no milk.
4. Bob leaves a note on the fridge and heads out to the store.
5. Alice returns. Forgetting to re-check, she also leaves a note and heads to the store.
6. The result: they both buy milk, and their protocol has failed.

This failure demonstrates that casual agreements are not enough. We need formal, guaranteed mechanisms—like locks, which are built upon hardware-level atomic operations—to correctly implement a critical section and ensure true mutual exclusion.

6.2. Synchronization: Coordinating Actions

Synchronization is the explicit coordination of temporal relationships between processes. Put simply, it's about making sure things happen in the right order. Sometimes, one process must wait for another to complete an action before it can proceed.

A simple analogy is a bakery with a baker (a "producer" process) and a customer (a "consumer" process):

* The baker bakes loaves of bread and puts them on a shelf.
* The customer arrives to buy a loaf.

If the customer arrives and the shelf is empty, they must wait. Their action (buying) is synchronized with the baker's action (baking). The customer's process is paused until the baker's process signals that bread is available.

7. Conclusion: A New Way of Thinking

Mastering concurrency is about shifting your perspective. The rise of multi-core processors has made it an essential skill for building software that is both fast and responsive. As we've seen, this new world introduces complex challenges like race conditions, deadlocks, and starvation. However, these problems are manageable through the disciplined application of core principles like mutual exclusion and synchronization.

While these concepts can be tricky at first, they are the foundation upon which nearly all modern software is built. By understanding them, you are taking a crucial step toward becoming a more effective and insightful programmer, ready to build the powerful applications of the future.
