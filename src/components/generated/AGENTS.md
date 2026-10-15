# AGENTS.md — src/components/generated/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Output destination for agent-built components. Anything a task phase produces
that is not a page or a `ui` atom lands here.

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules

- Agents **may** create and edit files in this directory as prescribed by the
  task.
- Compose `ui/` atoms; never reach into atom internals or restyle them.
- Follow the global naming conventions (`PascalCase.vue`) and the `@/` alias.
- Keep components composable: predictable props/emits, no store imports for
  side effects.

## Documentation policy

- Every new component ships a **file header** (purpose, ownership, prop/emit
  contract) and TSDoc on props/emits — per global §6.

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] New components carry file header + TSDoc.
- [ ] `ui/` atoms composed, never modified.