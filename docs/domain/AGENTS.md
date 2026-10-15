# AGENTS.md — docs/domain/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

The domain glossary — the shared, unambiguous vocabulary behind the app. Every
term agents and services use must be traceable here.

## Rules

- One entry per concept: term, definition, aliases, and the canonical type in
  `src/types` if it maps to one.
- Keep it current whenever a spec or the code introduces terminology.
- Never document implementation internals here; those belong in code and
  specs, not the glossary.

## Documentation policy

- The glossary is a form of documentation; a term that drifts from its
  canonical type or the PRD is a bug.

## Definition of done

- [ ] New terminology from a task is added/updated here.
- [ ] Canonical type references point to real exports in `src/types`.