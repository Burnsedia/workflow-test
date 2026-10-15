# AGENTS.md — src/components/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Container for two strictly separated component tiers: **ui/** (immutable
design atoms) and **generated/** (agent-built components).

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- `ui/` atoms are **immutable** — modifying, re-styling, or copying them is
  forbidden. Compose them. New atoms require a human gatekeeper.
- `generated/` is the only place agents may build components. Generated
  components compose `ui/` atoms; they never restyle atom internals.
- Components never import stores directly for side effects; they read
  state/actions via `<script setup>` only when needed and prefer `stores/`.
- Keep components presentational; business logic lives in stores/services.

## Documentation policy

- Every component ships a **file header** (purpose, prop/emit contract,
  boundary) and TSDoc on its `defineProps`/`defineEmits` when present.
- `ui/` atoms remain human-authored; agents never edit them, only compose.

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] Touched components carry file header + prop/emit docs.
- [ ] `ui/` untouched by agents; no store side effects in components.