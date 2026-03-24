# 14. Avoid Inline Event Handlers

Date: 2026-03-22

## Status

Accepted

## Context

Inline event handlers (`onclick`, etc.) mix markup and behavior, reducing maintainability and scalability.

## Decision

We will attach event listeners using JavaScript (`addEventListener`).

## Consequences

* **Positive:** Separation of concerns.
* **Positive:** Better control over event lifecycle.
* **Positive:** Cleaner HTML.
* **Negative:** Slight increase in JS setup.