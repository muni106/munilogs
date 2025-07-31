---
title: Social4Musicians
author: Mounir Samite
pubDatetime: 2023-04-25T05:17:19Z
slug: social-4-musicians
featured: false
draft: false
tags:
  - React
  - Database
  - Prisma
  - Typescript
  - Relational_database
  - RestAPI
  - Docker
# ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: Social network designed for musicians.
---
## Table of contents

# Situation
During the *Database* course, I decided to build Social4Musicians, a social network inspired by Reddit where musicians could, at least in theory, meet, chat and co-create music. The entire scenario was fictitious; no real interviews, surveys or stakeholders were involved. My sole purpose was to practise the full database life-cycle, experiment with a modern TypeScript stack and learn how the pieces fit together.

# Task
I set out to translate an imagined set of features: user accounts, bands, discussions, chats and music releases, into a coherent relational schema and to prove that schema with running code. That meant writing an Entity–Relationship model, refining it into SQL tables, enforcing constraints, populating sample data and wiring a minimal web layer on top so that inserts, updates and queries could be exercised from a real client.

# Action

## Conceptual Design and Logical Design
I began by sketching an ER diagram that captured the main concepts: Musicians, Bands, Albums, Songs, Discussions and Chats. Next I estimated hypothetical data volumes, five hundred musicians, one million messages, and collapsed a few inheritance hierarchies to keep joins predictable. The end result was a schema of roughly twenty-five tables, each with primary keys, foreign keys and cascading rules to preserve referential integrity.

<figure>

  ![something](@/assets/images/projects/conc_S4M.png)
  <figcaption class="text-center">
    Band and Albums Concept
  </figcaption>
</figure>

<figure>

  ![logical_Database_scheme](@/assets/images/projects/logical_S4M.png)
  <figcaption class="text-center">
    Logical scheme of the project
  </figcaption>
</figure>


## Technology Stack
PostgreSQL ran inside a Docker container so the whole project could be reset with a single command. The backend was written in Node.js with Prisma, giving me type-safe queries and migration scripts. A bare bones React frontend, also in TypeScript, provided signup, login and an infinite scroll discussion feed. GitHub Actions spun up the database, executed tests and pushed a preview build on every commit, ensuring that the codebase stayed reproducible.
```yaml file=docker-compose.yml
version: '3.8'
services:

  db:
    container_name: postgres_container
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: test_db
    volumes:
      - ./schema.sql:/docker-entrypoint-initdb.d/schema.sql
    
    ports:
      - '5432:5432'

  pgadmin:
    container_name: pgadmin4_container 
    image: dpage/pgadmin4:latest
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.org
      PGADMIN_DEFAULT_PASSWORD: password 
      PGADMIN_LISTEN_PORT: 5050
      PGADMIN_CONFIG_SERVER_MODE: 'False'
      PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED: 'False' 
    ports:
      - 5050:5050
    depends_on:
      - db 
    links:
      - "db:ser"
    
volumes:
  postgres:
```


## Implementation Highlights
About thirteen hundred lines of SQL defined tables, constraints and seed data. Seed scripts loaded dummy users, bands and noisy group chats in seconds, making demos painless. A small REST API exposed routes such as /signup, /discussions and /bands/:id/messages, each guarded by Joi validation to keep malformed payloads from ever reaching the database.
I could then use prisma migration tool to migrate the sql seeds in typescript seeds to use with prisma.

```typescript file=api/seed/seedMusician.ts
import { PrismaClient } from "@prisma/client";
import { userCreation } from "../queries/dbCreate";
import { getAllArtists } from "../queries/dbRead";

export async function seedMusicians(prisma: PrismaClient) {
  try {
    await userCreation(
      prisma,
      "guitarist1",
      "John",
      "Smith",
      "john.smith@email.com",
      "password1",
      "New York",
      "Guitar",
      "555-555-5551",
      true,
      false
    );

    ...

    await userCreation(
    prisma,
    "flutist2",
    "Henry",
    "Lewis",
    "henry.lewis@email.com",
    "password23",
    "Boston",
    "Flute",
    "555-555-5573",
    true,
    false
  );
  } catch (error) {
    console.log("error on seedMusicians: ", error);
  }
}
```

# Results
The prototype now features a solid relational core, working authentication and a live discussion timeline. The interface remains spartan, yet the underlying data model is robust enough for further coursework: classmates can clone the repository, tweak schemas or benchmark complex joins without wrestling with local setup. Although no real musicians have touched the platform, and none were consulted, the exercise has already delivered its intended value as a hands-on exploration of database modelling, SQL craftsmanship and fullstack integration.

![front_page](@/assets/images/projects/look_S4M.png)


# More 
- [repo](https://github.com/muni106/social4musicians)