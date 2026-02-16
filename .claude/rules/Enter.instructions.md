---
description: Strict coding standards for AI-generated TypeScript and UI code
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# AI Coding Standards (Strict Mode)

## Core Principle

All generated code must be:
- Deterministic
- Explicit
- Typed
- Scalable
- Readable by a senior engineer without refactoring
- Architecturally consistent with the existing codebase

No improvisation. No guesswork. No “vibe coding”.

---

# 1. Architectural Rules

## 1.1 Never Guess Structure

- Do not invent new patterns if one already exists.
- Follow existing folder structure strictly.
- Match naming conventions already used in the repo.
- If unsure, default to clean modular architecture.

## 1.2 Separation of Concerns

Always separate:

- UI (components)
- Business logic
- State management
- Data fetching
- Utility functions
- Types

Never mix UI rendering with heavy logic.

Bad:
- Data transformation inside JSX.

Correct:
- Compute values before return statement.

---

# 2. TypeScript Rules (Strict)

## 2.1 No `any`
Never use:
- `any`
- implicit `any`
- untyped function parameters
- untyped return values

Every function must declare:
- Parameter types
- Return type

## 2.2 Explicit Interfaces

Use:

- `interface` for object contracts
- `type` for unions and utility types

Example:

interface User {
id: string;
name: string;
email: string;
}


## 2.3 No Magic Strings

All:
- string literals
- event names
- statuses
- variants
- roles

Must use:
- enums or typed constants.

---

# 3. UI Consistency Rules (Anti-Vibe UI)

## 3.1 Design System Enforcement

UI must:

- Use consistent spacing scale (4, 8, 12, 16, 24, 32)
- Use a fixed typography scale
- Use consistent border radius values
- Use defined color tokens only

Never:
- Hardcode random hex colors
- Mix different spacing systems
- Invent random padding values

If no design system exists, create one before building UI.

---

## 3.2 Component Rules

Every component must:

- Have a single responsibility
- Accept typed props
- Avoid inline functions when avoidable
- Avoid inline styles unless dynamic

Never exceed:
- ~150 lines per component

If exceeded → split into subcomponents.

---

## 3.3 Layout Rules

- No random div nesting.
- Use semantic structure.
- Keep layout predictable.
- Avoid deeply nested JSX (>3 levels).

---

# 4. State Management Rules

## 4.1 Local State Only When Appropriate

Use local state only for:
- UI interaction
- Temporary component state

Do not:
- Duplicate global state
- Derive state unnecessarily

## 4.2 Derived State Must Be Computed

Never store:
- Values that can be computed

Compute them via:
- memoization if needed

---

# 5. Logic Rules

## 5.1 No Dead Code

Never:
- Leave commented-out code
- Leave console logs
- Leave unused imports

## 5.2 No Over-Engineering

Avoid:
- Premature abstraction
- Creating hooks/utilities for one-time usage
- Adding unnecessary generics

---

# 6. Performance Discipline

- Avoid unnecessary re-renders
- Memoize only when measurable benefit exists
- Do not micro-optimize blindly

---

# 7. Naming Rules

Names must be:

- Explicit
- Domain-specific
- Not vague

Bad:
- handleStuff
- dataManager
- thing

Good:
- handleUserLogin
- fetchInvoiceById
- calculateCartTotal

---

# 8. Error Handling

Always:

- Handle edge cases
- Validate inputs
- Avoid silent failures

If async:
- Use try/catch
- Return typed error states

---

# 9. Review Mode Behavior

When reviewing code:

- Identify architectural violations
- Identify type safety issues
- Identify UI inconsistency
- Identify hidden bugs
- Suggest refactor if complexity > necessary

Do not:
- Nitpick formatting unless harmful
- Suggest subjective preferences

---

# 10. Anti-Vibe Code Checklist

Before producing code, verify:

- Is every function typed?
- Are props strictly defined?
- Is UI using a consistent spacing system?
- Are there magic values?
- Is business logic separated from UI?
- Would a senior engineer approve this in review?
- Does it scale?

If any answer is "no" → refactor before returning.

---

# 11. Strict UI Consistency Checklist

UI must:

- Use consistent padding scale
- Use consistent color tokens
- Follow a predictable layout grid
- Avoid unnecessary animation
- Avoid decorative noise
- Be clean and minimal
- Look intentional, not experimental

No "Dribbble experiment" UI.
No inconsistent styling.
No design improvisation.

---

# 12. Output Expectations

Generated code must:

- Compile without modification
- Contain no placeholders
- Contain no TODOs
- Be production-ready
- Be readable without explanation
- Not look AI-generated

---

# Final Rule

When in doubt:
- Choose clarity over cleverness
- Choose simplicity over abstraction
- Choose consistency over novelty