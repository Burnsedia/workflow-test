# AGENTS.md — src/ (Source Root)

Recursive context boundary inherited by every subdirectory under `src/`.

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` to the
file you touch wins on any conflict.

## Purpose

All application source code lives here. Nothing outside `src/` may be imported
except via the `@/` alias (which resolves to `src/`).

## Layout contract

```text
src/
├── App.vue                 # App shell: navbar + <RouterView>
├── main.ts                 # bootstrap: pinia, router, mount
├── style.css               # Tailwind v4 + daisyUI theme (palette, fonts)
├── vite-env.d.ts           # Vite/client + typed import.meta.env
├── types/                  # all public types (Zod-schema authored)
├── lib/                    # generic, platform-agnostic infrastructure
├── services/               # domain services (wrap lib/api)
├── stores/                 # typed Pinia stores
├── router/                 # vue-router setup + guards
├── components/generated/   # agent-built components
├── components/ui/          # immutable design atoms (human-authored)
└── pages/                  # route-level views (compose ui/ + generated/)
```

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- A file may only import from directories matching its purpose. `pages/` may
  consume `components/`, `stores/`, `services/`, `types/`. `lib/` may never
  import UI, stores, or domain types. `ui` atoms import nothing internal.
- `App.vue` stays thin — layout and navigation only.
- Never create loose files at the `src/` root other than the five listed.
- Every public type must be declared in `src/types` and re-exported from its
  index. No ad-hoc inline `any`.

## Documentation policy

- Per global §6: every file opens with a **file header** (purpose, ownership,
  non-obvious behavior), every exported symbol gets **TSDoc**, and inline `//`
  comments are reserved for non-obvious logic.
- New files are not done until their header + TSDoc exist.

## Definition of done

- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] Every touched file ships its file header and TSDoc (global §6).
- [ ] No boundary violated (rules above); `ui/` untouched.

## Verification

`npm run typecheck` and `npm run build` must pass before any task is done.