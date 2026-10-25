# ApexForge RC storefront prototype

An isolated, responsive, read-only prototype. Existing React pages, routes, cart,
data, and production build configuration are preserved. This folder is outside
the Vite public directory and is not included in the existing production build.

## Review locally

From the repository root, run `node storefront-preview/server.cjs` and open
http://127.0.0.1:4178. No package installation or build is needed for the prototype.
All navigation uses shareable hash URLs, so detail-page refresh and browser back
work without server rewrites. You can also open index.html directly for review.

Pages: home, searchable/filterable/sortable catalog, 12 product details, Garage,
two build-journal previews, preview information, and a not-found state.

For optional T490s LAN review, explicitly launch with PREVIEW_HOST set to the
G700's LAN interface and open its address on port 4178 from the same network.
No firewall changes or public tunnels are configured. The default is loopback.
The server only serves five allowlisted browser assets.

## Content boundaries

- Data is an allowlisted selection from the existing public partsSource.js.
- Historical prices, stock labels, cost, markup, and inferred fitment are omitted.
- Names and reference platforms are unverified catalog references, not offers.
- All art is original inline SVG concept illustration, explicitly labeled.
- Garage names derive from the existing Home.jsx; journals are proposed formats,
  with no invented completion status, measurements, dates, or performance claims.
- No orders, payments, reservations, account access, localStorage, or backend calls.
- Optional Google Fonts requests have local font fallbacks; no analytics.
- No private operations repository or APEX OS service was accessed.

## Checks

Run `node storefront-preview/test.cjs`. Run `node --check storefront-preview/app.js`
and `node --check storefront-preview/server.cjs` for syntax checks.
Run `node storefront-preview/prepare-data.cjs` to regenerate the selected data.
The existing application still uses `npm ci` and `npm run build`.

The `Storefront preview checks` pull-request workflow runs the existing build,
the seven behavior checks, and Chromium journeys at 1440px desktop and 390px
mobile widths. It checks navigation, search, filtering, sorting, URL restoration,
detail-page refresh, empty states, horizontal overflow, and uncaught browser
errors. Review screenshots are available in its `storefront-preview-review`
artifact. The workflow has read-only repository permissions and does not deploy.

## Publication gate

Do not deploy or merge without owner approval. The branch-specific Vercel setting
`git.deploymentEnabled["codex/storefront-preview"] = false` prevents automatic
Vercel deployments for this branch. It does not change other branches' behavior.
This prototype has no automatic route to the existing site. Integrating it into
the production application is a separate, explicitly approved step.

Reference: https://rccrafter.com/products/rc3654 inspired category browsing and
the product presentation structure; no RCCrafter images or copy are included.
