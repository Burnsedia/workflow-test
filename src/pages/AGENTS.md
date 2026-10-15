# AGENTS.md — src/pages/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Route-level views. One file per route, named `XView.vue`, composed from
`ui/` atoms and `generated/` components.

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- Files here are wired by `src/router/index.ts`; keep names and routes in sync.
- May import from `@/components`, `@/stores`, `@/services`, `@/types`, `@/lib`.
- Pages own their layout and route-level orchestration but stay lean: logic
  lives in stores/services, atoms in `components/ui`.
- Pages are **layout-only scaffolds**: no handlers, no mock/fake data arrays,
  no working logic. A clone wires each shell to real domain content.

## Documentation policy

- Per `.vue` files, TSDoc the `<script setup>` logic (computeds, handlers) and
  add `<!-- -->` comments only where a template section is non-obvious
  (auth-conditional blocks).
- Label placeholder panels explicitly so consumers know they are layout
  shells, not real content.

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] Script logic TSDoc'd; non-obvious template sections commented.
- [ ] Page imports respect the boundary above; logic stays in stores/services.