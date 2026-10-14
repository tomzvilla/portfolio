---
title: "AI agent evaluation"
client: "AI startup · Europe"
period: "2026 → now"
order: 1
role: "Full stack"
stack: ["TypeScript", "React", "Node"]
problem: "Companies putting AI agents in front of their customers without knowing how they can fail."
summary: "Full stack development of a platform that tests AI agents automatically and reports every failure."
confidential: true
---

## Context

A European startup builds tools so companies can trust their AI agents: evaluate them before they go to production and keep them in check once they face users.

## What I built

I work on the full stack development of its evaluation platform: the interface, the API and the data model. The platform runs thousands of automated tests against an agent, grouped by risk category:

- **Made-up answers:** the agent states something that isn't in its sources.
- **Prompt injection:** someone tries to make it ignore its rules.
- **Personal data leaks:** the agent reveals information it shouldn't.
- **Policy compliance:** the agent steps outside what the company allows.

Every result is scored, classified and traceable, so both engineering and compliance can review it.

## Built with

TypeScript, React and Node.

## Outcome

A product in private beta, in development since 2026, that finds an agent's failures before its users do.
