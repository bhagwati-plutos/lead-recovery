# Frontend AI Agent Instructions

Before making any changes to the codebase, please review the project's guidelines and Architectural Decision Records (ADRs) to understand our conventions and patterns.

- [Architectural Decision Records](./doc/adr/README.md)

By following these guidelines, you will help maintain the consistency, quality, and security of the codebase.

---

## 1. Testing Requirements
All new features or bug fixes must include corresponding tests. Use the existing testing framework and follow the patterns you see in existing test files. This is critical for maintaining stability.

## 2. Security Best Practices
- **Sanitize Inputs:** Always sanitize and validate any data received from a user or external system to prevent injection attacks (e.g., XSS).
- **No Sensitive Data in Logs:** Never log passwords, API keys, or personal user information.
- **Use Data Attributes for Hooks:** For JavaScript hooks in the DOM, use `data-*` attributes (as per ADR 0015) rather than relying on CSS classes or IDs.

## 3. Performance and Scalability
- **Efficient DOM Interaction:** Minimize direct DOM manipulation. As per ADR 0009 and 0012, prefer toggling classes and using event delegation.
- **Asynchronous Operations:** Use asynchronous patterns (like Promises or async/await) to prevent blocking the main thread, especially for I/O operations.
- **Choose Optimal Algorithms:** Be mindful of the efficiency of your code. Select appropriate data structures and algorithms to ensure the application remains performant as it scales.

## 4. Error Handling
- **Graceful Failures:** Implement robust error handling to prevent crashes. Catch potential errors and handle them gracefully, providing feedback to the user when necessary.
- **Avoid Silent Failures:** Do not suppress errors. Log them appropriately so they can be tracked and fixed.

## 5. Code Style and Maintainability
- **Follow Existing Patterns:** All contributions must strictly adhere to the project's existing coding style, naming conventions, and architectural patterns. The ADRs are the source of truth.
- **Modularity:** Write small, focused, and reusable functions or modules. As per ADR 0013, keep JavaScript pure and modular.