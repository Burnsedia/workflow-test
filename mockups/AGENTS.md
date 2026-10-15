# AGENTS.md — mockups/

**Inheritance:** inherits the global `AGENTS.md`; the nearest `AGENTS.md` wins
on conflict.

## Purpose

Reference design images that vision-capable agents read **before** building any
UI. The canonical file is `dashboard-wireframe.svg`, an SVG wireframe so it
renders in browsers and remains readable as text.

## Rules

- Agents building pages for a mockup read the matching file here first.
- Mockups are reference, not specification: the PRD's behavior contract wins
  where visuals conflict with requirements.
- Prefer SVG for new mockups (text-authorable, diffable). Raster images are
  human-authored.

## Definition of done

- [ ] A mockup that a page is built from exists here and is read first.
- [ ] New mockups are SVG unless a human authors a raster.