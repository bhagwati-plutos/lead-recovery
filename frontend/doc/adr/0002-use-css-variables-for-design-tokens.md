# 2. Use CSS Variables for Design Tokens

Date: 2026-03-21

## Status

Accepted

## Context

The application needs to support multiple themes (e.g., light and dark mode) and maintain a consistent design system (spacing, typography, colors) without duplicating values across stylesheets.

## Decision

We will use CSS Custom Properties (CSS variables) defined in the `:root` scope and theme-specific classes (like `.theme-dark`, `.theme-light`) to manage our design tokens.

## Consequences

*   **Positive:** Easy implementation of dynamic theme switching.
*   **Positive:** Single source of truth for design tokens.
*   **Positive:** Reduces CSS file size and complexity.
*   **Positive:** Allows runtime updating of variables via JavaScript.
*   **Negative:** Older browsers (like IE11) do not support CSS variables, though this is not a concern for our modern target environments.