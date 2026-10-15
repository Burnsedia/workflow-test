# AGENTS.md — src/components/ui/

**Inheritance:** inherits the global `AGENTS.md`; this file is the strictest
boundary in the repo — read the rules twice.

## Purpose

The hand-authored design system atoms: buttons, inputs, cards, badges, etc.
These are the only components with a fixed visual contract, and they are
**immutable**.

## Commands

```bash
npm run typecheck   # vue-tsc -b --noEmit — MUST pass
npm run build       # typecheck + production build — MUST pass
```

## Rules (read twice)

- **Never modify, re-style, copy, or refactor files in this directory.**
- Agents compose these atoms from `pages/` or `components/generated/`.
- Adding a new atom is a human-gatekeeper decision, not an agent action. If a
  page needs an atom that does not exist, compose existing atoms and flag the
  gap to a human in the report instead.
- Atoms are presentational: accept `props`, emit `events`, no store I/O.

## Documentation policy

- Humans own this directory and its documentation. Agents do not document,
  edit, or style atoms — they only consume them.

## Definition of done

- [ ] `npm run typecheck` passes; `npm run build` passes.
- [ ] **No files in this directory were created, modified, or deleted by an
      agent** during the task.