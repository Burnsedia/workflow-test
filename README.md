# Hermes Template

Local-first, platform-agnostic **Vue 3** application template built for an
agent-driven software factory. It ships a **scaffold-only** shell: domain types
authored by Zod schemas, a typed API client surface plus example
service/store stubs (no behavior — you implement the transport), and five
layout-only pages composed from daisyUI/Tailwind.

## Start a new app in 5 minutes

```bash
git clone <this-template> my-app && cd my-app
npm install
npm run dev        # start the Vite dev server, see the five pages
npm run typecheck  # vue-tsc — the correctness source of truth
npm run build      # typecheck + production build
```

Then replace the scaffold with your domain:

1. **Types** — edit the Zod schemas in `src/types/index.ts`; `z.infer` keeps
   your TypeScript types in sync, and `apiEnvelopeSchema()` validates a full
   response envelope.
2. **Transport** — implement the methods of `createApiClient` in
   `src/lib/api.ts` (they throw `NotImplemented` by design). Point the service
   at your backend via `VITE_API_BASE_URL` or the commented dev proxy in
   `vite.config.ts`.
3. **Services / stores** — clone the `createUserService` factory and
   `useAuthStore` patterns, then implement the bodies.
4. **Pages** — replace the layout-only shells under `src/pages/` with real
   content; keep composing the immutable `src/components/ui/` atoms.

## Context model

The repo ships a recursive `AGENTS.md` set following the
[agents.md](https://agents.md) standard — one file at the root and one per
directory, read by humans and agents alike. It enforces the boundary rules
(agents never touch `ui/` or the repo root) and the documentation policy
(**all code is documented**: file header + TSDoc on every public symbol).
Full governance detail lives in `docs/`; `llms.txt` is the machine-readable
index of the whole tree.

## Repository map

- `AGENTS.md` — global context boundary & rules (read first)
- `docs/` — PRD (`docs/requirements/prd.md`) and domain glossary
- `src/types` — all public types, authored by Zod schemas
- `src/lib` — platform-agnostic generic infrastructure (`api.ts`, scaffold)
- `src/services` — domain services wrapping `lib/api` (stubs)
- `src/stores` — typed Pinia stores (`useAuthStore` example)
- `src/router` — vue-router setup + permissive guard scaffold
- `src/components/ui` — **immutable** human-authored design atoms
- `src/components/generated` — agent-built components
- `src/pages` — five layout-only route views
- `mockups/` — reference design images (read before building UI)

## Stack

Vue 3 (Composition API) · Vite + TypeScript (strict) · Pinia · vue-router 4 ·
Tailwind CSS v4 + daisyUI 5 · Zod

## Docker

```bash
docker build -t vue-hermes-template .
docker run -p 8080:80 vue-hermes-template
```