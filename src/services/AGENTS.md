# AGENTS.md — src/services/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Domain service modules. Each service wraps the generic client from `src/lib`
and exposes typed, named operations for a domain aggregate (e.g. `userService`).
Scaffold contract: services ship the factory + singleton pattern with
unimplemented method bodies; consumers implement the real calls.

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- May import from `@/lib` and `@/types` only.
- Must **not** import `@/stores`, `@/components`, or `@/pages`.
- Expose a named export per service (`export const userService = ...`), typed
  inputs and outputs, and normalize errors to `ApiError`.
- Keep services thin: no business logic that belongs in a store or a domain
  method the client already provides.

## Documentation policy

- TSDoc the service interface, its options, and every public method (contract +
  return type).
- Document non-obvious choices, e.g. where the base URL is resolved
  (`VITE_API_BASE_URL` at the service layer, not `@/lib`) and why the factory
  (`createXService`) and singleton (`xService`) both exist.

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] Every exported symbol is TSDoc'd.
- [ ] No imports beyond `@/lib` and `@/types`; services stay thin.