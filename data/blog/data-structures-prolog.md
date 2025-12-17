---
title: Data Structures in Prolog
author: Mounir Samite
pubDatetime: 2025-07-28T05:17:19Z
slug: data-structure-prolog
featured: false
draft: false
tags:
  - prolog
  - logic
  - logic_programming
  - basics
  - data_structures
  - tutorial
# ogImage: "https://example.org/remote-image.png" # remote URL
description: I talk about lists, numbers and graphs in prolog.
---

## Table of contents

<br>

# Intro
Like any other programming language, also in Prolog we have data structures, here we will talk about 3 of them:
- lists
- numbers (primitive values)
- graphs

<br>
<br>


# Thinking in Prolog
Before starting with the data structure let's set the right mindset with a step-by-step list:

1. Describe **relations**, not algorithms.
2. Prototype *queries* to discover the needed *facts/rules*.
3. Ensure predicates are **fully relational** unless you really only need one mode.
4. Test every mode and watch for non-termination.
5. Use the library for numbers & lists; write your own only when learning.
6. Add *cuts* only after the logic is correct.

> The cut is a special, zero-argument goal written as !.

```prolog file=what_is_cut.pl
max(A, B, A) :- A >= B, !.   % once this succeeds, stop exploring
max(_, B, B).                % otherwise choose the second clause
```

<br>

# Lists

## Syntax
The concrete syntax:
- `[H1, H2|T]`
- `[a, b, c]`
- `[]`

## Built-ins for Lists
The number after the slash is not part of the predicate’s name, it states the predicate’s arity (the count of arguments that predicate takes).

| Predicate (Arity) | Purpose | Typical Use |
| :-- | :-- | :-- |
| `member/2` | true if Element is in List | `member(X,[a,b,c]).` |
| `append/3` | concatenates or splits lists | `append([a,b],[c,d],L).` |
| `length/2` | List ⇄ Length (integer) | `length(L,3).` |
| `reverse/2` | List ⇄ ReversedList | `reverse([a,b],R).` |
| `select/3` | remove/insert single element | `select(X,L,R).` |
| `nth0/3` / `nth1/3` | 0- or 1-based indexing | `nth1(2,[a,b,c],E).` |
| `maplist/3..` | apply Goal to each pair of lists | `maplist(succ,In,Out).` |

All of these are *relational*: any argument may be a variable (though `length/2` requires its second arg ground when generating).

## Practice Lists

### Build a list which search for 2 consecutive occurencies of an element.
- The predicate uses **pattern matching** and recursion

```prolog
search2(Elem, [Elem, Elem | _]).
search2(Elem, [_ | Rest]) :- search2(Elem, Rest).
```

- 
