# AGENTS.md — src/router/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

vue-router setup and navigation guards. Defines the route table and the
`requiresAuth` / `requiresGuest` meta contract. The guard is a **documented
scaffold** (permissive, returns `true`); a clone implements the redirect matrix.

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- May import from `@/stores` and `@/types` only. Never import components
  eagerly; route components load via dynamic `import()`.
- Keep route names stable — pages and nav links reference them by name.
- One file per route page in `src/pages`; keep names and routes in sync.
- Guard logic is thin: delegate state decisions to stores, never mutate app
  state here.

## Documentation policy

- TSDoc the `RouteMeta` augmentation and the `beforeEach` guard: the exact
  redirect matrix a clone implements and the order guards run.
- Inline `//` only for non-obvious flow (meta-contract).

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] Every exported symbol and the meta contract are TSDoc'd.
- [ ] Route components remain lazy (dynamic imports).