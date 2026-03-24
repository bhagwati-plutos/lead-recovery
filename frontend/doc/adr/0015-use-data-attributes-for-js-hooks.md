# 15. Use Data Attributes for JS Hooks

Date: 2026-03-22

## Status

Accepted

## Context

Using class names for both styling and JavaScript behavior creates tight coupling.

## Decision

We will use `data-*` attributes (e.g., `data-action`, `data-component`) for JavaScript hooks.

## Consequences

* **Positive:** Decouples styling from behavior.
* **Positive:** Cleaner architecture.
* **Positive:** Easier refactoring.
* **Negative:** Slight increase in markup verbosity.