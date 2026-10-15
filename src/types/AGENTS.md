# AGENTS.md — src/types/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

The single home for every public TypeScript type shared across the app: app,
user, agent, session, and API envelope contracts.

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- Domain types are **authored by Zod schemas** (single source of truth); the
  TypeScript type is derived via `z.infer`. The only external dependency this
  directory may import is `zod`.
- **Never import** from stores, services, lib, or components.
- All types are nominal and PascalCase. Use `interface` unless a union is the
  only correct shape.
- No `any`. Use `unknown` with narrowing where dynamic data is unavoidable.
- Export everything from `index.ts`; consumers import from `@/types`.

## Documentation policy

- TSDoc **every** exported type *and every field*: what it models, the
  contract invariants, and edge behaviors (e.g. `expiresAt` is an ISO-8601
  string, not a timestamp).
- Union types: document each member on its own line.

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] Every exported symbol and field is TSDoc'd.
- [ ] No `any`; the only import is `zod`.