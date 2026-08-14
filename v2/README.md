# Discovery snapshot — v2 (accepted)

> Accepted discovery iteration, snapshotted per SPEC §3.1. **Frozen** — do not edit; the
> live prototype continues under `discovery/`. Ratified by
> [addendum-006](../discovery/instructions/addendum-006-recovery-cut-the-fat.md),
> [addendum-007](../discovery/instructions/addendum-007-unclassified-cause.md) and
> [addendum-008](../discovery/instructions/addendum-008-report-not-console.md).

| Field | Value |
| ----- | ----- |
| **Version** | v2 |
| **Accepted** | 2026-08-14 |
| **What changed since v1** | A sixth report tab — **Outstanding Recovery** — plus the review rework of it |
| **Canonical files** | `screens/dashboard/dashboard.html` (+ `shell.js` · `dashboard.js` · `icons.js` · `invoice.js` · `reminders.js` · `seed.inline.js`) |
| **Worked example / seed** | Murli tenant, as v1, plus 14 outstanding receivables across 6 causes and 3 routes — `seed-data/seed.json` |

## What v2 adds

**Outstanding Recovery** — receivables grouped by *why* the money is stuck, so the owner
acts on a business area rather than working a debtor list.

- The header splits the outstanding three ways: **we are the blocker** (our own paperwork,
  failed deliveries, open disputes — fixable without contacting anyone), **customer has not
  paid**, and **nobody knows why**. Each half filters the list.
- The **sixth cause, "Cause not established"**, exists because the source systems cannot
  derive cause at all. Force-fitting every row into a confident bucket sends the owner to do
  the wrong thing; this says so instead, and can be resolved in place.
- The list is ordered by **what can be acted on today** — ours first, then never-contacted,
  then oldest — not by amount.
- Cause and route breakdowns *are* the filters, so the same numbers are not restated above
  the list.
- **No actions.** The tab reports; executing a fix belongs to the module that owns the
  record. The row detail is evidence: invoices, ages, and why it is stuck.

## Fixed at freeze

The tab strip and the per-tab filters shared one row. Five tabs fitted; six did not —
889px of tabs and 412px of filters cannot share a 1034px line. **Outstanding Recovery was
painted over by the Product Sales selects: invisible and unclickable on desktop.** Caught
by looking at the released page rather than trusting the DOM, which reported all six tabs
present the whole time. The row now wraps the filters onto their own line when they do not
fit, so every tab stays visible; below `lg` the strip scrolls as before.

## Data honesty

`cause`, all day counts, `route` / `salesman` on a receivable and `lastContact` are
**invented** — the source systems cannot produce them. The Finance module's vocabulary
(invoiced / collected / outstanding / advance / net receivable) is reused verbatim, but none
of its figures are. Rows sum to ₹32,400 across 14 customers, which equals the six cause
totals, the three route totals, the three-way owner split and the four ageing buckets;
each row's invoices sum to its own outstanding. Full note in `seed-data/seed.json`
(`_recoveryNote`).

`screens/dashboard/_check-recovery.js` in the live tree asserts all of the above from the
seed side. It is **not** part of this snapshot — a dev tool, not prototype content.

## Contents

- `index.html` — wiring hub + transition map
- `screens/dashboard/index.html` — module hub: what each report tab answers
- `screens/dashboard/dashboard.html` — the screen: 5 KPI tiles over 6 report tabs
- `screens/dashboard/order.html` · `order-timeline.html` — destinations of the row actions
- `seed-data/seed.json` — mirrored inline in `screens/dashboard/seed.inline.js` because
  `file://` blocks fetching local JSON
