# 4. Avoid Inline CSS

Date: 2026-03-22

## Status

Accepted

## Context

Inline CSS (`style` attributes) tightly couples presentation with markup, making styles harder to reuse, override, and maintain. It also prevents leveraging CSS features like pseudo-classes, media queries, and theming.

## Decision

We will avoid inline CSS and instead define all styles in external stylesheets or scoped style blocks.

## Consequences

* **Positive:** Improved separation of concerns.
* **Positive:** Better reusability and maintainability.
* **Positive:** Enables full use of CSS capabilities (media queries, pseudo-selectors).
* **Negative:** Slight increase in initial setup effort for small components.