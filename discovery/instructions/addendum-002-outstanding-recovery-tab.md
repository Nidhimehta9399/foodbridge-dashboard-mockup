# Addendum 002 — Outstanding Recovery tab

> Linked from [instructions.md](./instructions.md)
> Status: Built — awaiting acceptance
> Created: 2026-08-14
> Inputs: the sibling Finance module `kdansari02/invoice-payment-overview` (`discovery/screens/assets/ledger.js`, `discovery/seed-data/seed.json`), read as the source of receivables vocabulary.

## The ask

Add a sixth report tab to the Dashboard: **outstanding, and who to recover it from** — but framed
so it shows *where the business's cash is bleeding and why*, grouped by cause category, rather
than listing debtors. Ageing, concentration and cause were named as mattering more than the raw
list.

## Research — what the data actually supports

Read before designing: the Finance module's two screens, its shared `ledger.js` engine and both
seeds; then the Dashboard's five existing tabs and its seed.

### Finance module — vocabulary that exists and is reused verbatim

| Concept | Where | Reused here as |
| ------- | ----- | -------------- |
| `invoiced` · `collected` · `outstanding` · `advance` | `seed.json` rows, `ledger.js` tiles | Same words. This tab reports on `outstanding` only. |
| `Net Receivable` | `CUSTOMER.mNet` | The hero total's noun |
| Status trichotomy `Has Outstanding` / `Advance Received` / `Settled` | `statusOf()` — derived, never stored | The tab shows only the first class |
| Payment methods Cash / UPI / Bank / Cheque | `METHODS` | Row drill-down |
| WhatsApp reminder to selected debtors | `openReminder()` | The `Remind` row action |

### What the source data does **not** have — everything below is invented

| Missing concept | Consequence |
| --------------- | ----------- |
| Due date / credit terms (`dueDate`, `creditDays`) | **Ageing is not computable from the Finance seed.** Every day-count in this tab is invented. |
| Dispute, credit-note or return linkage | The whole cause taxonomy is invented. |
| Route or salesman on a receivable | Routes exist in the Dashboard seed only; the attribution here is invented. |
| Follow-up history on *money* | `followUpCustomers` tracks who stopped *ordering*, not who stopped *paying*. `lastContact` is invented. |

### The finding that shaped the design

The Finance seed carries **₹7 of total outstanding** across 12 customers (one row: Mahesh Kumar);
everything else is Settled, with ₹48,667 sitting as advances. The module as seeded has no
receivables problem to report on, so this tab cannot be a view over Finance's numbers — it needs
its own seed. It therefore borrows Finance's *vocabulary* and none of its *figures*, which is
consistent with the two modules already being independent tenants (Finance's Kunal Sweet Shop is
invoiced ₹702; the Dashboard's Kunal has a ₹1,776 order).

One pre-existing inconsistency in the Finance seed is deliberately **not** replicated: Kunal Sweet
Shop shows `outstanding: 0` while all five of his invoices still carry a non-zero `netPayable`.

## The product decision this tab enables

Customer Receivables answers *who owes what*. That is a list, and it supports one action: chase
everybody. Money gets stuck for reasons that need different people to fix them:

| Cause | Whose fault | The fix | Who acts |
| ----- | ----------- | ------- | -------- |
| Disputed / quality claim | **Ours** | Resolve or issue a credit note | Sales + QC |
| Delivery failed, invoice raised anyway | **Ours** | Cancel the invoice or redeliver | Logistics |
| Invoice not acknowledged (GST / PO mismatch) | **Ours** | Re-issue the paperwork | Back office |
| Credit terms exceeded | Theirs | Enforce — cash-only, stop supply | Owner |
| Habitual late payer | Theirs | Route collection / reminder | Salesman |

**The hero insight is the split: how much of the stuck cash is our own process, not our
customers'.** Three of the five causes are self-inflicted and need no negotiation at all — that
is the fastest money in the building, and today nothing surfaces it.

Two further decisions the tab enables:

| Question | Answered by | Why it matters |
| -------- | ----------- | -------------- |
| Is this three phone calls or a policy change? | Concentration shown by customer **and** by route/salesman | Concentration in three customers → call them. Spread across one route → change that route's terms. Opposite responses. |
| Which cause is going stale? | Ageing shown **inside** each cause, never globally | 45-day-old disputed stock and a 45-day-old late payer need opposite responses. A 90-day-old dispute is a write-off nobody has admitted. |

## Design — decisions

| # | Decision | Rationale |
| - | -------- | --------- |
| D6 | Cause is a **stored** classification, not derived | Unlike order-cycle status (D1), no rule in the data can infer why an invoice is unpaid. It is a human judgement recorded at the invoice, and the tab is honest that it is stored. |
| D7 | `owner` (`us` / `them`) is **derived from cause**, never stored per row | One lookup, so the hero split cannot drift from the cause cards. |
| D8 | Every total is **computed from `recoveryOutstanding` rows** | Cause amounts, the ours/theirs split, ageing segments, concentration and action counts are all reductions over the same row array. Nothing to reconcile by hand. |
| D9 | Ageing buckets (0–15 / 16–30 / 31–60 / 60+) are **derived** from each row's `oldestDays` | Same reason as D8. |
| D10 | Only `prevOutstanding` is stored per cause | The month-on-month delta needs a prior state the row array cannot supply. It is the single stored aggregate; the addendum states its check. |
| D11 | No new KPI tile row | The screen already carries five KPI tiles and Finance carries four. A third set would be the "data points on a screen" failure this tab exists to avoid. |

### Rejected alternatives

| Rejected | Why |
| -------- | --- |
| A sortable debtor table as the top-level object | That is the Finance screen with extra columns. It supports one action. |
| An ageing pie / bucket chart | Ageing without cause is undecidable — the same age implies opposite actions per cause. |
| A "collection efficiency %" headline | A ratio nobody can act on before lunch. |
| A generic `View` row action | Each cause has a different real next step; the button says what it is. |

### Information hierarchy

| Band | Content | Role |
| ---- | ------- | ---- |
| ① Hero | One total, a two-segment **Ours to fix / Theirs to pay** bar, one plain-English sentence naming the biggest mover | The insight. Not tiles. |
| ② Cause cards | Five cards ranked by amount: share, owner badge, 4-segment ageing micro-bar, weighted average age, month-on-month delta, and a named action | The diagnosis. Click filters everything below. |
| ③ Concentration | Top-5 customers, and by route/salesman | Chooses between "three calls" and "a policy change". Bridges to the Salesman Route Report. |
| ④ Table | Customer · outstanding · oldest age · cause · route/salesman · last contact, expandable to the invoices behind it | The drill-down. Deliberately last. |

Row actions are cause-dependent: `Remind` / `Collect` for customer-owned causes; `Raise credit
note`, `Cancel invoice`, `Re-issue invoice` for ours; `Put on cash-only` and `Assign to route
collection` as escalations.

## Seed shape

Added under the existing per-tab convention (`_xxxNote` + data keys):

| Key | Contents |
| --- | -------- |
| `_recoveryNote` | Declares that cause, ageing, route attribution and last-contact are invented, and states the reconciliation checks |
| `recoveryCauses` | 5 rows: `id`, `label`, `owner`, `blurb`, `actionLabel`, `prevOutstanding` |
| `recoveryOutstanding` | 14 customer rows: `outstanding`, `oldestDays`, `cause`, `route`, `salesman`, `lastContact`, `invoices[]` |
| `recoveryAgeBuckets` | The four bucket definitions, so the boundaries are data not code |

### Reconciliation checks

Asserted by `discovery/screens/dashboard/_check-recovery.js` before publishing, not by eye:

| # | Check | Value |
| - | ----- | ----- |
| C1 | Σ `recoveryOutstanding[].outstanding` | ₹32,400 across 14 customers |
| C2 | Σ per-cause = C1, and every cause id in the rows exists in `recoveryCauses` | 6,800 + 4,200 + 3,100 + 11,900 + 6,400 |
| C3 | Ours + Theirs = C1 | 14,100 + 18,300 |
| C4 | Σ per-route = C1 | 17,310 + 9,290 + 5,800 |
| C5 | Σ ageing buckets = C1, per cause and overall | Bucketed from `oldestDays` |
| C6 | Every row's Σ `invoices[].amount` = its `outstanding` | 14 rows |
| C7 | Σ `prevOutstanding` is a plausible prior total | ₹28,700 → +₹3,700 month-on-month |
| C8 | Total outstanding is a plausible share of all-time sales | ₹32,400 / ₹1,87,070.70 = 17.3% |

C8 exists because the first draft used figures that exceeded the tenant's entire all-time sales.

## Outcome

Built and role-played in a browser (Chrome, served with `Cache-Control: no-store`) at 1440px and
at 375px. Not yet accepted, so **nothing is snapshotted to `versions/`** — that happens on
acceptance under R6.

### What was built

| File | Change |
| ---- | ------ |
| `discovery/` | New tree, copied from the frozen `v1/`. `v1/` untouched. |
| `screens/dashboard/dashboard.js` | `outstandingRecovery()` panel + hero / cause cards / concentration / table renderers; tab registered sixth; click, keyboard, search and select handlers |
| `seed-data/seed.json` · `screens/dashboard/seed.inline.js` | `_recoveryNote`, `recoveryCauses`, `recoveryAgeBuckets`, `recoveryOutstanding` — added to both together (M2) |
| `screens/dashboard/_check-recovery.js` | New. `node _check-recovery.js` — the reconciliation gate. Dev tool, not prototype content. |
| `screens/dashboard/index.html` · `discovery/index.html` · repo `index.html` | Sixth tab described; transition map extended; site landing page points at the live tree |

### Verified by clicking, not by reading code

| Check | Result |
| ----- | ------ |
| All six tabs render, no console errors | Pass — each panel distinct; the five existing tabs unchanged |
| Cause card selects / deselects; concentration bars and table follow | Pass — `disputed` → 3 customers, ₹6,800 |
| Filters stack and clear independently | Pass — Kondhwa + habitual late payer → 1 customer, ₹2,860; each chip clears its own |
| Row expands to its invoices; they sum to the row | Pass — Krishna Kirana ₹1,340 + ₹980 + ₹540 = ₹2,860 |
| Row / card actions do not also toggle the row underneath | Pass — actions are matched before the row and card handlers |
| Every action is a declared dead end naming its owning module | Pass — 9 messages |
| Pagination past 8 rows | Pass — showing 1–8 of 14 |
| Rendered figures equal the seed reductions | Pass — hero total, both split sides and all five cause amounts |
| Mobile at 375px | Pass — no horizontal body overflow; the table scrolls in its own container |
| `_check-recovery.js` | Pass — 13 assertions (M2 mirror ×4, C1–C9) |

### Corrections made during the build

| Was | Now | Why |
| --- | --- | --- |
| Concentration bars scaled to the grand total | Scaled to the largest item in each list | Against the total the top bar filled a quarter of its track and the shape of the concentration — the whole point of the panel — was invisible. Absolute figures sit at the end of each row; the share of the total moved to the panel footer. |
| Ageing computed with a timestamp difference | Whole days, midnight to midnight | The half-day offset in `tenant.asOf` rounded one row into the wrong bucket, desyncing the cause bars from the table. |
| "Past 60 days" block right-aligned at all widths | `text-left sm:text-right` | It wrapped under the hero total on a phone and read as orphaned. |

### Open questions for acceptance

| # | Question |
| - | -------- |
| Q1 | Cause is stored (D6), which means someone has to classify each unpaid invoice. Is that a realistic ask of the person raising it, or does the classification need defaults the system can guess? |
| Q2 | The cause-card percentages sum to 101% at these figures — honest rounding of 21 / 13 / 10 / 37 / 20. Left as-is; flag if the report is expected to foot exactly. |
| Q3 | Row actions all dead-end into Finance, Logistics or Customer Management. If any should open the real flow, the Dashboard needs deep links those modules do not publish yet. |
| Q4 | `prevOutstanding` (D10) is the only stored aggregate. A real implementation needs a month-end snapshot of receivables that no module currently writes. |
| Q5 | This tab is a Dashboard report, but every action it implies belongs to Finance. Does it stay here, or become a third Finance screen with the Dashboard showing only the hero band? |
