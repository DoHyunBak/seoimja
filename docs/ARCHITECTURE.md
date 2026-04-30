# React Architecture Guide

## Layer Rules
- `app`: app bootstrap, global styles, providers.
- `pages`: route-level composition only.
- `widgets`: section-level UI composition.
- `features`: user actions with business behavior.
- `entities`: domain model, DTO, entity UI.
- `shared`: reusable UI, hooks, utils, constants.

## Current Structure
```text
src
├─ app
│  ├─ App.jsx
│  └─ styles
├─ pages
│  └─ cat-portfolio
│     └─ ui
├─ widgets
│  └─ cat-portfolio
│     └─ ui
├─ entities
│  └─ cat
│     └─ model
└─ shared
   ├─ api
   ├─ config
   ├─ constants
   ├─ hooks
   ├─ lib
   ├─ model
   ├─ types
   └─ ui
```

## Conventions
- Data/DTO goes to `entities/*/model`.
- `pages` should not contain low-level markup; compose `widgets`.
- Reusable pieces (header/title/badge/hooks) go to `shared`.
- Keep one component per file.
- Use alias import: `@/...`.

## Next Refactor Rules For Incoming Code
- Split cat portfolio sections into `widgets/cat-portfolio/ui/*Section.jsx`.
- Move cat profile, gallery, routine, and timeline data to `entities/cat/model`.
- Move repeated UI blocks into `shared/ui`.
- Keep side effects in hooks (`shared/hooks`).
