# 9. Use Class Toggles Instead of Direct DOM Style Manipulation

Date: 2026-03-22

## Status

Accepted

## Context

Direct manipulation of styles via JavaScript leads to scattered logic and overrides CSS architecture.

## Decision

We will toggle CSS classes instead of modifying inline styles via JavaScript.

## Consequences

* **Positive:** Centralized styling logic in CSS.
* **Positive:** Easier debugging.
* **Positive:** Consistent behavior.
* **Negative:** Requires predefined class states.