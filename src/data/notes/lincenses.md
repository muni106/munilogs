---
title: Linceses 
author: Mounir Samite
pubDatetime: 2026-03-31T20:00:00Z
featured: false
draft: false
tags: [meta]
description: note about licenses
---
A legal instrument used to regulate access, use, and redistribution of software

**copyright**: exclusive rights of the creator

**copyleft**: practice in which the creators surrender some, but not all rights under copyright law
	- *strong* -> derived work must be released under a compatible license
	- *no copyleft* -> the work or a derivative can be redistributed under any other license


**ownership**: right to use a copy in possession of the software

**licensing**: conditions that permit the use of the software (software is not sold is licensed)

**free-software**: focus on freedom to use the program and share it

**open source software**: focus on availability of source code

**unlicensed software**: legally unusable -> full copyright protection -> if you use it you're fucked

# Some licenses

## GNU GPLv3
- free and open source
- strong copyleft
- do not allow linking from non GPL compatible licensed software

## GNU LGPLv3
- like GPLv3 but allows linking from code with different license under some conditions usually not acceptable by companies

## GNU GPL with linking exception
- like GPLv3 but allows linking from code with different license

## MIT License
- extremely permissive
- free / open source / GPL compatible / no copyleft
- You just totally give up your software responsibilities in exchange of giving up also in any constraint you wanna give to it
- Because the license doesn't mention them, standard trademark laws apply by default. You cannot assume you have the right to use the creator's branding or name just because you are using their open-source code. However, because it isn't explicitly written into the license text, a company using MIT-licensed code has to rely on separate, general trademark laws to sue someone for brand theft, rather than suing them for violating the software license itself.
- Most legal experts believe the phrase _"to deal in the Software without restriction... including the right to use... and sell"_ implies a "hidden" or "implicit" patent grant. If they give you permission to sell the software, a judge would likely rule they can't sue you for doing so. However, because it relies on interpretation rather than an explicit shield (like the one built into Apache 2.0), it carries a slightly higher legal risk for massive enterprise companies.

## Apache License 2.0
- more restrictive than MIT
- free / open source / GPL compatible / no copyleft
- Protects trademarks
- The license states that you are allowed to use the creator's code, but you are **not** allowed to use the creator's branding (their names, logos, or trademarks) to promote your own product. For example, if you build a new tool using Apache's software, you can't name your tool "The Official Apache Tool" or use their logo to make people think your product is endorsed by them.
- By default, software under the Apache 2.0 license is provided "as is," meaning the original creators offer no guarantees and cannot be sued if the software breaks or damages a user's computer. However, if you take that open-source code and sell it as part of your own product, the license **allows you** to offer your own warranty to your customers. You can legally say, "I guarantee this works, and I will fix it if it breaks," but you are taking on that legal responsibility yourself, not passing it back to the original authors.
- This is one of the most important features of the Apache 2.0 license. When developers contribute code to an Apache 2.0 project, they automatically grant users a license to use any patents involved in that code.
	- **For you:** This means you won't be suddenly sued by the creators for patent infringement just for using the software as intended.
	- **The "In Terrorem" Clause:** To protect the community, the license says that if _you_ try to sue anyone for patent infringement regarding this software, you instantly lose your right to use the software yourself. It acts as a shield to stop patent trolls.
- Some Apache 2.0 projects include a specific text file called `NOTICE` that lists the names of the people who worked on it and any specific acknowledgments they want. If you copy or distribute their code, you **must** include this exact `NOTICE` file in your project so the original authors get their proper credit.
- If you modify the original code, you are legally required to leave a **noticeable note** or comment in the file explaining that you changed it. This ensures that if your changes break the code or introduce a bug, other people won't wrongly blame the original authors.


## Creative Commons
set of licenses for data, documentation and resources
https://creativecommons.org/faq/#can-i-apply-a-creative-commons-license-to-software




