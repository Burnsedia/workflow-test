# Product Requirements — Hermes Template

## 1. Problem

Teams building local-first apps with agent-assisted development lack a
batteries-included template that enforces type safety end to end and partitions
human vs. agent responsibilities. Ad-hoc scaffolds drift into `any`, tangled
fetch calls, and agents rewriting hand-authored UI.

## 2. Product summary

**Hermes** is a local-first, platform-agnostic Vue 3 application template with a
scaffold-only shell: Zod-authored domain types, a typed API client surface and
example service/store stubs, an immutable UI atom set, and a recursive
`AGENTS.md` governance system that lets humans steer agents safely. Consumers
clone the template and implement the transport themselves — this repo ships no
behavior.

## 3. Personas

- **Template consumer** — a developer who needs a typed, local-first Vue app
  skeleton they can extend in minutes.
- **Agent** — an autonomous worker that writes code within strict boundary
  rules read from `AGENTS.md`.
- **Human gatekeeper** — a developer who owns `src/components/ui` and the repo
  root, reviews agent output, and runs the verification gate.

## 4. Goals

1. Full-stack type safety with zero ad-hoc `any`: Zod schemas → types → client
   surface → services → stores → pages.
2. Runtime safety by construction: schemas validate API responses and restored
   sessions, so corrupt or hostile payloads cannot silently enter app state.
3. Strict, recursive context boundaries so agents never mutate the design
   system or repo root.
4. A scaffold-only template with no behavior that can leak into a produced app:
   consumers implement the transport, services, and store actions.
5. `npm run typecheck` and `npm run build` always pass before any task ships.
6. A fully documented codebase: every file ships a header and every public
   symbol ships TSDoc (`AGENTS.md` §6).

## 5. Requirements

### R1 — Typed data layer (P0)
- `src/lib/api.ts` exposes the typed `ApiClient` surface (`get`/`post`/`put`/
  `patch`/`delete`/`request` returning `ApiEnvelope<T>`) with every method body
  throwing `NotImplemented` — scaffold only. Methods accept an optional Zod
  schema to validate `envelope.data`.
- `src/types` authors domain types (`User`/`AppUser`, `Session`, `ApiError`,
  `UserPatch`) via `z.infer` and provides `apiEnvelopeSchema()` for full
  envelope validation.

### R2 — Typed services & stores (P0)
- `src/services/userService.ts` ships the factory + singleton pattern with
  stubbed method bodies; base URL resolution honors `VITE_API_BASE_URL`.
- `src/stores/useAuthStore.ts` manages `Session` state with signature-only
  `login`/`logout` actions; `restore()` rehydrates from `localStorage` and
  validates the payload against `SessionSchema`.

### R3 — Auth subfunction (P0)
- Route metadata documents the `requiresAuth` / `requiresGuest` redirect
  matrix; the scaffold guard is permissive (returns `true`) and a clone
  implements the redirects.
- The login form is a layout-only shell a clone binds to the auth store.

### R4 — Pages & UI (P1)
- Five route pages: Landing, Login, Onboarding, Dashboard, Settings — all
  layout-only shells with no handlers or fake data.
- Pages render via daisyUI/Tailwind utilities and the immutable `ui` atom set
  (composition, never modification).

### R5 — Governance (P1)
- `AGENTS.md` files at every directory define recursive context boundaries.
- Governance is "just enough context": root `AGENTS.md`, `docs/` (PRD +
  glossary), and `llms.txt`. No phase plans or adversarial loop.

## 6. Non-goals

- No business logic beyond the scaffold shells.
- No real backend wiring required; endpoints like `/api/auth/login` are
  contracts the consumer implements.
- No changes to `src/components/ui` by agents.
- No ESLint/Prettier in scope for v0 (typecheck is the enforcement gate).

## 7. Success criteria

- A fresh clone passes `npm run typecheck` and `npm run build`.
- The five layout-only pages render and navigate via the scaffold router.
- A consumer can point the typed client at a backend and implement the stubs
  without modifying the contract.
- An agent can operate on the repo guided only by `AGENTS.md` + `docs/`.