# 1. Use Semantic HTML

Date: 2026-03-21

## Status

Accepted

## Context

We need a standard way to structure our markup to ensure accessibility, SEO, and maintainability across the frontend project. Using `<div>` and `<span>` tags everywhere leads to "div soup" which is hard for screen readers to parse and for developers to navigate.

## Decision

We will use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`, `<article>`) to structure our web pages.

## Consequences

*   **Positive:** Improved accessibility for screen readers.
*   **Positive:** Better SEO as search engines can understand page structure.
*   **Positive:** Clearer code intent for developers.
*   **Negative:** Requires developers to think more carefully about which tag best represents the content, rather than defaulting to `<div>`.