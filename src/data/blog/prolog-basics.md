---
title: Prolog Overview
author: Mounir Samite
pubDatetime: 2025-07-24T05:17:19Z
slug: prolog-overview
featured: true
draft: false
tags:
  - prolog
  - logic
  - logic_programming
  - basics
  - tutorial
# ogImage: "https://example.org/remote-image.png" # remote URL
description: Simple prolog overview to get a grasp of what it is and how to use it.
---
## Table of contents

# Intro
Prolog is a logic-programming language that does somethings extremely, like searching, well. It's easy to get confused if used to other-paradigm languages (that's what happend to me in the beginning).
<br>
In the logic paradigm a program is a theory, consisting on facts and rules written as Horn clauses, then once the theory is written up, we can do some queries based on the theory.
<br>
If you have experience with SQL and relational databases, it looks really similar.

> A Horn clause is a special kind of logical formula that has at most one positive (unnegated) literal.

In prolog:
- **theory** -> we write the theory/program in a .pl file
- **queries** -> the result of these queries is based on the .pl file, also called database 

## this is a really simple example
```prolog file=example.pl
male(tommy).
male(muni).
male(ett).

female(gia).
female(lula).

male(roby) :- 
	female(lula).

male(andrea) :- 
	female(tommy).
```

for example the queries:
- `male(ett).` => yes
- `female(muni).` => no
- `male(roby).` => yes
- `male(andrea).` => no 

# Theory

Theory in prolog is the entire set of rules and facts that define the logical structure and knowledge base of a Prolog program, forming the ground upon which inference is performed.

## Facts
**Facts** in Prolog are the simplest kind of statement, used to declare information that is unconditionally true in your program’s knowledge base. A fact asserts a relationship or property about specific objects or values, without any conditions attached.

```prolog file=facts.pl
parent(john, mary). %% John is parent of Mary
sunny. %% it is sunny
likes(alice, pizza). %% alice likes pizza
male(bob). %% bob is  a male
```

## Rules
**Rules** in prolog are logical statements that define relationships between facts and allow deduction of new information from existing data.
A rule, `Head :- Body.` is structured so `Head` is the the predicate (what i want to enstablish / find out if it's true), and `Body` is a sequence of conditions that must all be true for the `Head` to be true.
The `:-` can be read as an *"if"* so the rule can means *"Head is true if Body is true"*.

```prolog file=rules.pl
happy(X) :- likes(X, pizza).

aunt(Aunt, Child) :-
    sister(Aunt, Parent),
    parent(Parent, Child).

```

## Variables
**Variables** in Prolog are placeholders used to represent values that are not yet known.
In prolog, any sequence of letters, digits, or underscores that **starts with an uppercase letter or an underscore**, is a variable. The most common convention is to use names like `X`, `Y`, `Person`, but `_anonymous` forms are also valid.
Prolog **variables** are logical variables, then when *not instatiated* **can match with anything**.


# Queries
Queries, also called *goals*, are the **questions** we put to the Prolog interpreter.
<br>
A query tells Prolog to *try to prove something from the facts and rules currently loaded in it's theory*.

## Syntax and Semantics
A query is written exactly like a predicate and ends with a dot.
<br>
At an interactive prompt you usually prepend `?-`, but when we use a top-level prompt (for example in tuProlog) we don't have to prepend it.

```prolog
?- likes(sam, X).
```

Prolog attems to satisfy the query by matching it, via unification and backtracking, against clauses in the **theory**. If it finds a **match/proof**, the query succeds and **any variable bindings are reported**; otherwise it returns false

## Types of queries

| Kind | Example | Meaning |
| :-- | :-- | :-- |
| Ground (no variables) | `?- parent(bob, ann).` | Simply asks whether the exact fact is true; answers **true/false**. |
| Variable binding | `?- parent(bob, Child).` | Requests all `Child` values that make the goal true. Prolog enumerates answers on `;`. |
| Relational/multiple variables | `?- parent(Parent, Child).` | Generates all parent-child pairs stored or derivable in the database. |
| Compound (conjunction) | `?- location(X, kitchen), edible(X).` | Both subgoals must succeed for the same `X`; the comma means logical **and**. |
| Arithmetic/comparison | `?- 2 < 5.` | Evaluated via built-in comparison predicates; succeeds here. |
