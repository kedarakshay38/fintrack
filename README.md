# FinTrack

A full-stack **personal finance & expense tracker** — track accounts, categorize
transactions, and manage monthly budgets.

Built as a showcase of modern **Angular 22** (standalone components, Signals,
zoneless change detection) with a **Spring Boot + MySQL** REST backend and
**JWT** authentication.

## Tech stack

| Layer     | Technology                                                        |
| --------- | ----------------------------------------------------------------- |
| Frontend  | Angular 22 · standalone · zoneless · Signals · TypeScript 6       |
| Testing   | Vitest · ESLint (@angular-eslint)                                 |
| Backend   | Spring Boot (REST API) *(planned)*                                |
| Database  | MySQL + JPA *(planned)*                                           |
| Auth      | JWT *(planned)*                                                   |

## Domain

`Account → Transaction → Category`, plus per-category monthly `Budget`s.

## Features

- **Dashboard** — balances, spending, and budget snapshots at a glance
- **Transactions** — list, filter, and manage income/expenses
- **Accounts** — bank, cash, and card accounts
- **Budgets** — set and track monthly limits per category

## Getting started

Requires **Node ≥ 24.15** (an `.nvmrc` is included):

```bash
nvm use            # picks up Node 24 from .nvmrc
npm install
npx ng serve       # dev server at http://localhost:4200
```

Other useful commands:

```bash
npx ng build       # production build to dist/
npx ng test        # run unit tests (Vitest)
npx ng lint        # lint with ESLint
```

## Architecture

```
src/app/
  core/       singletons: services, models, guards, interceptors
  features/   dashboard, transactions, accounts, budgets (lazy-loaded)
  shared/     reusable components, pipes, directives
  layout/     app shell (MainLayout: sidebar + nav)
```

Feature routes are **lazy-loaded** via `loadComponent`, so each ships in its
own bundle and downloads only on navigation.

## Roadmap

- [x] **Phase 0** — Foundation: scaffold, app shell, routing, lazy loading
- [ ] **Phase 1** — Mock API + data layer
- [ ] **Phase 2** — Core UI (list / detail / forms)
- [ ] **Phase 3** — Routing, guards, lazy loading
- [ ] **Phase 4** — Dashboard & data visualization
- [ ] **Phase 5** — Cross-cutting concerns (interceptors, directives, pipes)
- [ ] **Phase 6** — Spring Boot backend
- [ ] **Phase 7** — MySQL + JPA
- [ ] **Phase 8** — Auth (JWT), testing, deployment
