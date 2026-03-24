# 7. Avoid Deeply Nested DOM Structures

Date: 2026-03-22

## Status

Accepted

## Context

Deep nesting increases rendering complexity, makes styling harder, and impacts performance.

## Decision

We will keep DOM structures as flat as possible and avoid unnecessary wrapper elements.

## Consequences

* **Positive:** Better performance.
* **Positive:** Easier CSS targeting.
* **Positive:** Improved readability.
* **Negative:** May require more thoughtful component design.