# AGENTS.md — docs/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Human- and agent-readable documentation: product/documentary requirements and a
domain glossary. Split strictly into `domain/` (the vocabulary) and
`requirements/` (the why/what of the product).

## Layout

```text
docs/
├── domain/        # term glossary (shared vocabulary, canonical types)
└── requirements/  # PRD — the single source of product truth
```

## Rules

- Every concept referenced in code must be defined in `docs/domain/glossary.md`.
- The PRD (`requirements/prd.md`) is the single source of product truth; docs
  must not contradict it.
- Docs are prose, not code — never insert implementation snippets that drift
  from the code they describe.
- Keep the strict `domain/` + `requirements/` split; adding a new docs
  category requires approval.

## Documentation policy

- Prose rules and policies (like the global documentation policy §6) are
  owned here and must stay in sync with the code they describe.

## Definition of done

- [ ] Terminology used in a task is present in the glossary.
- [ ] PRD updated before scope changes; no doc contradicts the PRD.
- [ ] No implementation snippets that drift from the code they describe.