---
title: Prolog Overview
author: Mounir Samite
pubDatetime: 2025-07-24T05:17:19Z
slug: prolog-overview
featured: false
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
Prolog is a really simple language that does somethings extremely well, but it's easy to get confused, because used to other languages (that's what happend to me in the beginning).
Prolog is a strange programming language, there are 2 main components:
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
