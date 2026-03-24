# 5. Prefer CSS Over JavaScript for Styling

Date: 2026-03-22

## Status

Accepted

## Context

JavaScript-based styling (e.g., manually setting styles via `element.style`) leads to unnecessary complexity, performance overhead, and harder-to-maintain code.

## Decision

All visual styling and layout concerns should be handled in CSS. JavaScript should only toggle classes or variables when dynamic behavior is required.

## Consequences

* **Positive:** Cleaner separation between logic and presentation.
* **Positive:** Better performance (CSS is GPU-optimized).
* **Positive:** Easier debugging and maintainability.
* **Negative:** Requires disciplined class-based design.