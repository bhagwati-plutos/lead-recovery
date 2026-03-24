# 11. Avoid Global CSS Leakage

Date: 2026-03-22

## Status

Accepted

## Context

Global styles can unintentionally affect unrelated components, causing bugs and inconsistencies.

## Decision

We will scope styles using component-based class names and avoid generic selectors (e.g., `div`, `span`).

## Consequences

* **Positive:** Reduced side effects.
* **Positive:** Better modularity.
* **Positive:** Easier refactoring.
* **Negative:** Requires disciplined naming.