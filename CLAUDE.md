# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
```

No test runner is configured.

## Architecture

This is a React + Vite SPA for Apex Forge RC — an internal operations hub for a 3D printing / RC car business.

**Routing** lives in `src/App.jsx`. To add a new page: create the component in `src/pages/`, import it in `App.jsx`, and add a `<Route>`. Also add an entry to the `navItems` array in `src/components/Sidebar.jsx`.

**Current routes:**
- `/` → `Home.jsx` — public-facing landing page with CTA buttons
- `/dashboard` → `Dashboard.jsx` — owner portal with stats and filament inventory
- `/jobs` → `JobCalculator.jsx` — print cost/quote calculator
- `/lab` → `Lab.jsx` — design resources and engineering guides

**Unregistered pages** exist in `src/pages/` (FilamentTracker, Customers, ContentCalendar, Expenses, PrinterLog, Inventory, Builds) but are not yet wired into routes or Sidebar — they are stubs for future features.

**Data persistence:** All data uses browser `localStorage`. No backend or database is connected yet (Supabase is planned).

## Styling

Tailwind CSS with custom brand tokens defined in `tailwind.config.js`:
- `apex-orange` (`#FF6B00`) — primary accent, CTAs, active nav state
- `apex-black` (`#080808`) — page backgrounds
- `apex-dark` (`#0f0f0f`) — sidebar and cards
- `apex-gray` (`#1a1a1a`) — secondary surfaces

Font families: `font-display` (Oswald), `font-body` (Inter), `font-mono` (JetBrains Mono).

The design language is dark/industrial: `italic`, `font-black`, `uppercase`, `tracking-widest` are used heavily throughout.

## Brand Rules

- Primary orange: `#FF6B00` (`apex-orange`)
- Black: `#080808` (`apex-black`)
- Never use generic blue links or default Tailwind colors on branded UI elements
- Typography: Cinzel/Cinzel Decorative for headings, Great Vibes for tagline script
- Design language: dark, industrial, uppercase, wide tracking

## Business Context

Apex Forge — Original Motorworks is a solo 1/10 scale RC car building and 3D printing business in metro Atlanta. Owner: Paul. This hub is the internal operations tool.

Stack: React + Vite + Tailwind, no backend, localStorage only.

## Current Priorities

- Move dashboard from `/` to `/dashboard` route
- Build new public homepage at `/`
- Wire unregistered pages into routes and Sidebar: FilamentTracker, Customers, ContentCalendar, Expenses, PrinterLog, Inventory, Builds

## Deployment

- Hosted on Vercel, connected to GitHub repo `apex-forge-hub`
- Push to `main` triggers auto-deploy
- Dev server runs on `localhost:3001`
- Always run `npm run build` to verify no errors before pushing

## Rules

- Always verify build passes before committing
- Do not modify `tailwind.config.js` color tokens without asking first
- When adding routes, update both `App.jsx` and `Sidebar.jsx`
