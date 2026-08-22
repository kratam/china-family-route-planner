# Family China Route Planner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a research-backed Hungarian family route-planning magazine for the 2026 October China trip.

**Architecture:** A statically exported Next.js application renders typed destination and itinerary datasets through reusable comparison, filter, card, ranking and itinerary components. GitHub Actions deploys the export to Pages.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library, Playwright CLI, GitHub Pages

**Spec:** `docs/superpowers/specs/2026-08-22-family-china-route-planner-design.md`

## Global Constraints

- All user-facing copy is Hungarian.
- No backend or runtime API dependency.
- Every volatile fact is sourced and every price is marked as an estimate/current level.
- Static export must work below `/china-family-route-planner/`.
- The public URL is the completion criterion.

---

### Task 1: Typed decision engine and dataset

**Files:**
- Create: `src/data/types.ts`, `src/data/sources.ts`, `src/data/destinations.ts`, `src/data/itineraries.ts`
- Create: `src/lib/filterDestinations.ts`, `src/lib/scoring.ts`
- Test: `src/lib/filterDestinations.test.ts`, `src/lib/scoring.test.ts`

**Interfaces:**
- Produces: `Destination`, `Itinerary`, `FilterId`, `filterDestinations(destinations, filters)`, `scoreItinerary(itinerary)`.

- [ ] Write tests proving AND-combined filters, empty-filter behavior and ten-axis itinerary scoring.
- [ ] Run `npm test -- --run` and confirm the missing modules fail.
- [ ] Add the typed models, twenty researched destination records, eight-plus itineraries and minimal filtering/scoring implementations.
- [ ] Run `npm test -- --run` and confirm the unit tests pass.

### Task 2: Magazine interface

**Files:**
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `src/components/FilterBar.tsx`, `Comparison.tsx`, `DestinationCard.tsx`, `Rankings.tsx`, `Itineraries.tsx`, `FlightBrief.tsx`, `SourceLink.tsx`
- Test: `src/components/Planner.test.tsx`

**Interfaces:**
- Consumes: the typed data and filter function from Task 1.
- Produces: accessible interactive planner UI with stable headings and filter buttons.

- [ ] Write a failing component test for rendering, multi-filter interaction and result counts.
- [ ] Run the focused component test and verify the expected failure.
- [ ] Implement the responsive editorial layout and interactive components.
- [ ] Run all tests and refactor only after green.

### Task 3: Static assets, deployment and verification

**Files:**
- Create: `public/photos/*`, `next.config.ts`, `.github/workflows/deploy.yml`, `scripts/check-links.mjs`, `README.md`
- Modify: `package.json`

**Interfaces:**
- Produces: `out/` static site and GitHub Pages deployment.

- [ ] Fetch and verify two destination-specific Wikimedia Commons images per principal destination with alt text and source credits.
- [ ] Run tests, lint, TypeScript and production build.
- [ ] Serve `out/` locally and verify desktop/mobile layouts, filters and absence of horizontal overflow with Playwright CLI.
- [ ] Run the external-link checker and review failures; preserve explicit warnings for network-blocked sources.
- [ ] Create the public GitHub repository, push `main`, enable Pages through GitHub Actions and verify the public URL returns HTTP 200.
