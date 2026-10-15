# AGENTS.md — src/lib/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Generic, platform-agnostic infrastructure. `api.ts` is the **scaffold-only**
typed client surface that services wrap — every method body throws
`NotImplemented`, and consumers implement the transport in their clone.

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- **Never import** Vue UI, Pinia stores, domain services, or domain types.
  This layer knows nothing about the app domain.
- Public types used by this layer must live in `src/types` or be declared here
  as generics and re-exported.
- Stay transport-agnostic: the fetch client must remain swappable (local
  backend, remote backend) without touching `services/` or `stores/`.
- Only add new files here when they are truly generic; otherwise they do not
  belong in the repo (ask first).

## Documentation policy

- TSDoc the full public surface: `ApiClient`, `ApiClientOptions`,
  `RequestConfig`, and `createApiClient` — including the **intended contract**
  a consumer's implementation must honor (cache TTL/`meta.cached` semantics,
  error normalization, GET-reads / write-invalidation strategy).
- Inline `//` comments must explain WHY — never narrate the code itself.

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] Every exported symbol is TSDoc'd; the intended cache/error contract is documented.
- [ ] No imports of UI, stores, services, or domain types.