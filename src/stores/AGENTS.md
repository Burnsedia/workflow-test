# AGENTS.md — src/stores/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Strongly typed Pinia stores holding reactive application state (sessions,
profiles, agents). Stores are the only place state mutations live.

Scaffold contract: `useAuthStore` ships the full store pattern (state +
getters + action signatures) with `login`/`logout` unimplemented; the single
exception is `restore()`, which validates a persisted session with Zod so
corrupt `localStorage` entries cannot enter app state (#20).

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- May import from `@/lib`, `@/services`, and `@/types`.
- Must **not** import `@/components` or `@/pages`.
- Naming: `useXStore` with a `setup()` store (Composition API inside
  `defineStore`). No Options API.
- Expose `state`, `getters`, and `actions` explicitly typed. Actions perform
  I/O through services; components never fetch directly.
- Persistence (e.g. session in `localStorage`) is the store's responsibility,
  done via the generic client or a small typed helper — never raw `fetch`.

## Documentation policy

- TSDoc the store itself, every getter, and every action: the contract,
  side effects (e.g. localStorage persistence), and return semantics.
- Inline `//` only for non-obvious mechanics (hydration, expiry checks,
  concurrent-action guards).

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] Every exported symbol is TSDoc'd.
- [ ] State mutations live here, not in components or pages.