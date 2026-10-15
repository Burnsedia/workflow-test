# AGENTS.md — docs/requirements/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Product requirements record. `prd.md` defines the product's scope, personas,
goals, and non-goals. It is the highest-level source of truth for what ships.

## Rules

- The PRD wins over interpretation; specs derive from it and must not
  contradict it.
- Changes to scope require a PRD update first, then spec/plan updates.
- Keep the format focused: problem, personas, goals, requirements (with
  clear-priority labels), non-goals.

## Documentation policy

- The PRD counts as documented prose; keep it truthful and current. When code
  conventions change (naming, documentation policy, stack), the PRD's goals
  and non-goals must reflect them.

## Definition of done

- [ ] PRD reflects approved scope; no spec contradicts it.
- [ ] `prd.md` in sync with current conventions (e.g. documentation policy).