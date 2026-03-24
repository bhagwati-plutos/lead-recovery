# 12. Prefer Event Delegation Over Multiple Listeners

Date: 2026-03-22

## Status

Accepted

## Context

Attaching event listeners to many individual elements increases memory usage and reduces performance.

## Decision

We will use event delegation by attaching listeners to parent elements when possible.

## Consequences

* **Positive:** Better performance.
* **Positive:** Handles dynamic elements naturally.
* **Positive:** Reduced memory footprint.
* **Negative:** Slightly more complex event handling logic.