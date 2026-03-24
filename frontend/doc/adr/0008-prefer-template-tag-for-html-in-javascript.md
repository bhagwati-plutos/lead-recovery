# 8. Prefer `<template>` Tag for HTML in JavaScript

Date: 2026-03-22

## Status

Accepted

## Context

Embedding raw HTML strings inside JavaScript leads to poor readability, maintainability issues, and potential security risks (e.g., XSS).

## Decision

We will use the `<template>` tag for defining reusable HTML fragments and clone them via JavaScript.

## Consequences

* **Positive:** Cleaner separation of structure and logic.
* **Positive:** Safer DOM manipulation.
* **Positive:** Improved readability.
* **Negative:** Slight learning curve for developers unfamiliar with templates.