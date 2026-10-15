# AGENTS.md — Hermes Template (Global Context Boundary)

Central governance file for AI agents and human developers working in this
repository. Every subdirectory ships its own localized `AGENTS.md`; this file
defines the rules they inherit.

**Read this file first, then the `AGENTS.md` of the directory you are working
in.** Precedence: the **nearest** `AGENTS.md` to the file you touch wins on any
conflict; explicit instructions in the task prompt override everything; never
break a global rule silently — flag the conflict instead.

## 1. Commands

```bash
npm install        # install deps (package-lock.json is authoritative: prefer npm ci)
npm run dev        # start the Vite dev server
npm run typecheck  # vue-tsc -b --noEmit — the correctness source of truth
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
```

There is **no** test suite and **no** linter in this repo by design
(`docs/requirements/prd.md` non-goals). `typecheck` is the only automated gate.

## 2. Project overview

Local-first, platform-agnostic **Vue 3** application template. The app is a
**scaffold-only** shell: domain types authored by Zod schemas, a typed API
client surface and example service/store stubs (no behavior — consumers
implement the transport in their clone), and five layout-only pages composed
from daisyUI/Tailwind utilities and `components/ui/` atoms. Agents are
intentionally kept away from hand-authored UI atoms via the boundary rules
below.

## 3. Non-negotiable stack

- **Framework:** Vue 3, Composition API, `<script setup lang="ts">`
- **Build tool:** Vite (config in `vite.config.ts`)
- **Language:** TypeScript (strict), path alias `@/*` → `src/*`
- **State:** Pinia (`src/stores/`)
- **Routing:** vue-router 4 (`src/router/`)
- **Styling:** Tailwind CSS v4 + daisyUI 5 — CSS-first, **no** `tailwind.config.js`
- **Generic data layer:** `src/lib/api.ts` (typed client surface, scaffold-only)
- **Runtime types:** Zod schemas author the domain types in `src/types`

## 4. Canonical structure (enforced)

```text
vue-hermes-template/
├── AGENTS.md                 # This file — global rules
├── llms.txt                  # Machine-readable repo index (keep in sync)
├── Dockerfile
├── docs/                     # Documentation
│   ├── domain/               #   Domain glossary
│   └── requirements/         #   PRD
├── mockups/                  # Reference design images (agents: read before building UI)
└── src/
    ├── types/                # Shared app/user/agent types (Zod-schema authored)
    ├── lib/                  # Generic, platform-agnostic infrastructure
    ├── services/             # Domain service modules (wrap lib/api)
    ├── stores/               # Strictly typed Pinia stores
    ├── router/               # vue-router setup + guards
    ├── components/
    │   ├── generated/        # AGENT-BUILT components (safe for agents to edit)
    │   └── ui/               # HUMAN-AUTHORED design system atoms (IMMUTABLE)
    └── pages/                # Route-level views (compose ui/ atoms)
```

**Boundary rule:** a file may only be placed in, and may only import from, the
directory its purpose matches. Agents never write into `components/ui/` or the
repo root. Things that do not fit anywhere must be approved first.
`src/lib` stays platform-agnostic and never imports UI, stores, or domain
types. Every nested `AGENTS.md` restates its specific import boundary; that
restatement is binding.

## 5. Code conventions

- Composition API + `<script setup lang="ts">` only. No Options API.
- Every public type lives in `src/types`. No ad-hoc inline `any` — use
  `unknown` and narrow.
- Naming: `camelCase` for functions/vars, `PascalCase` for types & components,
  `useXStore` for stores, `XService` for services, `XView.vue` for pages.
- Imports: use the `@/` alias for anything outside the current directory.
- `src/components/ui/*` are **immutable atoms**. Do not modify, re-style, or
  copy their internals. Compose them instead. New atoms are authored by a human
  gatekeeper, never by agents.

## 6. Documentation policy — ALL code is documented

**Every file and every public symbol ships documented. There is no "no
comments" rule.** The policy:

- **File header** — every `.ts`, `.tsx`, `.vue`, and config file opens with a
  short comment block: purpose of the file, its boundary/ownership, and any
  non-obvious behavior (e.g. cache semantics, guard order).
- **TSDoc (`/** ... */`) on every exported symbol** — types, interfaces,
  functions, options, constants. Document the contract: what it accepts, what
  it returns, edge cases, defaults. Never restate the signature mechanically.
- **Inline `//` comments** — reserved for genuinely non-obvious logic: WHY
  decisions, cache TTLs and invalidation, error normalization, control flow
  that is easy to misread. Do not narrate trivial statements.
- **Vue templates** — `<!-- -->` comments only where a section is non-obvious
  (e.g. auth-conditional nav); never comment plain markup.
- Documentation written during a task must stay truthful and current; a comment
  that drifts from the code is a bug.

## 7. Verification gate (required before finishing any task)

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

Type checking is the source of truth for correctness. If you cannot make
`typecheck` green, leave explicit `TODO` markers and report why.

## 8. Definition of done

A task is done only when **all** of the following hold:

- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] Every new or touched file ships its file header and TSDoc (per §6).
- [ ] No boundary violated: imports and new files match their directory's
      `AGENTS.md`; `ui/` and repo-root untouched by agents.
- [ ] `llms.txt` updated if the file tree changed.
- [ ] `docs/` kept in sync if terminology or scope changed.

## 9. Repository conventions

- Version control is git. Do not commit unless explicitly instructed.
- Commit style: lowercase imperative subject, ≤ 72 chars, no trailing period.
- Never commit secrets. `.env*`-style secrets are gitignored.