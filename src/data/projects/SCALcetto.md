---
title: SCALcetto
author: Mounir Samite
pubDatetime: 2025-07-18T05:17:19Z
slug: SCALcetto
featured: false
draft: true
tags:
  - scala
  - functional-programming
  - ci-cd
  - collaboration
# ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: A football simulation.
---

## Table of contents

# Situation
For my *Programming and Development Paradigms* course I had to develop a project using functional programming in Scala 3.
I grouped with 2 classmates, and together we decided to go for a football simulation.

# Task
We called the project SCALcetto, because it reminded of scala also it reminded of calcetto, which is five-a-side football.
The goal of the project was to explore advanced scala and functional programming concepts, this is why we decided to keep a small domain (e.g. no goalkeeper) and focused more on making use of advanced fp concepts.
Furthermore we had to use tdd (test-driven-development), and SCRUM to keep a good organization inside the team.

# Action
The first thing we did was to setup the project, in this phase I **setuped the project** with sbt, **developed the docs** with jekyll and [hosted them with github pages](tommasobrini.github.io/PPS-24-SCALcetto/).
<br>
Then the main parts where I worked are described in the next sections.

## MVU architecture
The architecture we chose, is MVU, a standard in functional programming.
The MVU architecture stands for Model-View-Update, and basically you have an immutable model which is passed as it is to the view, meanwhile the update, which is the part where all the logic is encapsulated, will modify the model each step.
The model is practically an immutable state which change every step following some logic defined in the Update layer, every time this "upgrade" of the model is made, it will be visually rendered by the view. 
I must say this architecture is really powerfull and made the development process very pleasant.

## Decide-Validate-Act
To manage the intelligence of the player we came up with an architecture based in 3 layers inside *Update*.
To understand better the following this is the snippet of code that defines a player.

```scala
  case class Player(
      id: ID,
      position: Position,
      movement: Movement = Movement.still,
      ball: Option[Ball] = None,
      decision: Decision = Decision.Initial,
      nextAction: Action = Action.Initial
  ) extends Entity with Moving[Player]:
    override def withPosition(position: Position): Player = copy(position = position)

  enum Decision:
    case Initial
    case Confusion(remainingStep: Int)
    case Run(direction: Direction, steps: Int)
    case Pass(from: Player, to: Player)
    case Shoot(striker: Player, goal: Position)
    case MoveToGoal(goalDirection: Direction)
    case Mark(defender: Player, target: Player, teamSide: Side)
    case Tackle(ball: Ball)
    case Intercept(ball: Ball)
    case MoveToBall(directionToBall: Direction)
    case MoveRandom(direction: Direction, steps: Int)
    case ReceivePass(ball: Ball)


  enum Action:
    case Initial
    case Stopped(remainingStep: Int)
    case Move(direction: Direction, speed: Int)
    case Hit(direction: Direction, speed: Int)
    case Take(ball: Ball)

```

Those 3 layers worked like a chain of responsibility, in all the layers they get in input the state/model from the preovious layer, in order Decide -> Validate -> Act:
1. Decide => manage through an internal logic the decision of the player.
2. Validate => manage through randomness and other factors if an action will succed, and if it will not succed how it's going to change.
3. Act => once actions are processed by Validate, the Act layer make them in the simulation.

## Creational DSL
This is probably one of the best pieces of code I ever wrote.
<br>
We needed a way to create states fastly because:

