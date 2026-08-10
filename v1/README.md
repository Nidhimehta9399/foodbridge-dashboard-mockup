# Discovery snapshot — v1 (accepted)

> Accepted discovery iteration, snapshotted per SPEC §3.1. **Frozen** — do not edit; the
> live prototype continues under `discovery/`. Ratified by [addendum-004](../../instructions/addendum-004-ratify-discovery-v1.md).

| Field | Value |
| ----- | ----- |
| **Version** | v1 |
| **Accepted** | 2026-08-10 |
| **Canonical direction** | Pixel-parity recreation of the live admin dashboard — `b2bgreens.com/platform/dashboard`, tenant **Murli**, user **Mahesh · Admin** |
| **Method** | Built from the real source of `exagon-ai/storefront-frontend` (its literal Tailwind class strings, real lucide/react-icons glyphs, the font stack the deployed app renders), not from screenshots — [addendum-003](../../instructions/addendum-003-pixel-parity-from-app-source.md) |
| **Canonical files** | `screens/dashboard/dashboard.html` (+ `shell.js` · `dashboard.js` · `icons.js` · `invoice.js` · `reminders.js` · `seed.inline.js`) |
| **Secondary screens** | `screens/dashboard/order.html`, `screens/dashboard/order-timeline.html` — chrome parity only, bodies not yet matched (S9) |
| **Worked example / seed** | Murli tenant — 9 products, 9 orders, 8 discount rows, 10 order-cycle customers, 2 route settlements — `seed-data/seed.json` |
| **Locked decisions** | D1–D3, D5 (addendum-002, as corrected by addendum-003 C11) |

## Contents

- `index.html` — wiring hub + transition map (the proto-FSM feeding SSOT-1 / SSOT-5)
- `screens/dashboard/index.html` — module hub: what each report tab answers
- `screens/dashboard/dashboard.html` — the screen: 5 KPI tiles over 5 report tabs
- `screens/dashboard/order.html` · `order-timeline.html` — destinations of the row actions
- `seed-data/seed.json` — fake-but-representative seed, mirrored inline in
  `screens/dashboard/seed.inline.js` because `file://` blocks fetching local JSON

The live tree's `screens/dashboard/_smoke/` (jsdom boot check) is **not** part of this
snapshot — it is a dev tool, not prototype content.

## What this snapshot authorizes

Acceptance promotes these from "candidate" to binding SSOT inputs:

| # | Decision | Feeds |
| - | -------- | ----- |
| D1 | Order-cycle status is **derived** from each customer's own cadence (`daysSince` vs `cadenceDays`), never a stored flag or a global SLA. A fifth tag, `not_ordering`, has no config entry and renders as "New". | SSOT-2 domain model |
| D2 | Route `difference` is **derived** as actual-minus-expected handover; the sign carries the meaning (negative = short). | SSOT-2 domain model |
| D3 | Order status is a linear progression with a terminal cancel: `Inprogress → Dispatched → Delivered` \| `Cancelled`. | SSOT-1 state machine |
| D5 | Money rendering is **not uniform**: KPI tiles use `₹ ` + `toFixed(2)` (no grouping); report tables use `₹` + `en-IN` grouping at 2dp; the route report rounds to whole rupees and puts the sign *inside* (`₹-1`). | SSOT-3 component library |

**D4 from addendum-002 is withdrawn** — the dashboard is read-only. The app passes
`isOrderEditable={false}`, so order status cannot be changed from this screen; that
transition belongs to the Orders page (addendum-003 C11).

## Known gaps at acceptance

Accepted with these open — none block SSOT derivation, all are recorded in addendum-003:

| Gap | Item |
| --- | ---- |
| Backend config not visible | sidebar icon names (I1), `invoiceAllowedStatuses` (I10), route templates + staff lists |
| Third-party look | the date-range calendar is a structural equivalent of `react-datepicker`, not its markup (I11) |
| Not parity-checked | `order.html` / `order-timeline.html` bodies (S9); Comments + Fulfillment sub-tabs (I7) |
| Seed vs live volume | live shows 22 products / 27 discount rows / 28 follow-up customers; this seed is smaller and its totals reconcile with **its own** figures |
| Reproduced app defect | Recent Orders' header is one column short of its body (A1) — kept for parity, worth fixing in the app |
