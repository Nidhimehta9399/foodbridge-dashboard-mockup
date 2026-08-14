# Addendum 005 — "Who to recover it from" on mobile: the table, as cards

> Linked from [instructions.md](./instructions.md)
> Status: Built — awaiting acceptance
> Refines **D17** of [addendum-003](./addendum-003-recovery-glanceable-by-tier.md)

## The ask

Redesign the mobile **Who to recover it from** section so it keeps the table view — as cards.

## What was wrong

D17 replaced the sideways-scrolling table with cards, which fixed the overflow but threw away the
thing a table is actually good at: **every row puts the same field in the same place, so the eye
runs down a column instead of re-reading each row.** The cards let content flow freely and carried
two full-width action buttons each.

| | Before | Now |
| --- | --- | --- |
| Collapsed card height | ~370px | **93px** |
| Rows visible per screen at 320px | ~1.5 | **6** |
| Rows visible at 768px (two-up) | ~4 | **all 14** |
| Buttons in the collapsed list (14 rows) | 28 | **0** |

## Design — decisions

| # | Decision | Rationale |
| - | -------- | --------- |
| D22 | Every card holds **fixed field positions**: name top-left, amount top-right, route/salesman/invoice-count under the name, age under the amount, cause along the bottom | This is what makes it read as a table. Nothing reflows between rows, so the amounts form a column. |
| D23 | Amounts and ages are `tabular-nums` and right-aligned | Digits line up down the column; proportional figures would not. |
| D24 | A **column-header strip** (`Shop` · `Owes · oldest`) sits above the list, hidden once the grid goes two-up | It labels the two columns exactly as the desktop `<th>` row does. At two columns a single header pair would mislabel the right-hand card. |
| D25 | Collapsed, a card is **data only** — no action buttons | Fourteen rows each shouting a green button scans far worse, and competes with "Do these three", which is where the acting is meant to happen. |
| D26 | Actions and invoices arrive with the **expansion**, exactly as the desktop row expands | Same mental model at both sizes: the row is data, the expansion is the work. |
| D27 | The owner accent runs the **full height of the card**, not just the collapsed part | It is a property of the shop, not of the collapsed state. |

### The one deliberate difference from desktop

The desktop table keeps a primary action button in its last column; the mobile card does not. That
is not an oversight: on desktop the column is free horizontal space that costs nothing, while on a
phone the same button costs a third of the row's height and multiplies by fourteen. Density wins
where space is scarce; both sizes agree that the *full* action set lives in the expansion.

Reversible in one line if the one-tap collect matters more than the scan.

### Markup note

The collapsed row is a single `<button>` wrapping three `<span>` rows, with the expansion as its
sibling inside the `<li>`. Nesting the expansion's action buttons inside the row button would be
invalid HTML; asserted at zero in the checks below.

## Outcome

Built and role-played in a browser, served with `Cache-Control: no-store`.

| Check | Result |
| ----- | ------ |
| Collapsed card height | 93px at 320 / 390 / 768 |
| No nested buttons anywhere in the panel | Pass — 0 |
| No horizontal overflow, 320 · 390 · 768 · 1440 | Pass |
| No tap target under 44px, no type under 12px | Pass |
| Two-up grid from 640px; header strip hides with it | Pass — all 14 shops on one 768px screen |
| Desktop table unchanged at 1440 | Pass — cards hidden, table visible, no sideways scroll, expansion intact |
| Multiple cards expand independently | Pass — 2 open at once, 23 actions rendered |
| An action inside an expansion does not collapse it | Pass |
| Search narrows the card list | Pass — "pravin" → 3 shops · ₹5,800 |
| Other five tabs unchanged, no console errors | Pass |
| `_check-recovery.js` | Pass — 15 assertions unchanged (no seed change in this iteration) |

### Correction during the build

| Was | Now |
| --- | --- |
| The bare invoice count sat next to the chevron on the third line | Moved onto the meta line as "· 3 invoices". Next to a chevron a lone number reads as a step or a page, not a count. |
| The audit script reported `layout: cards` at 1440px | A false negative in the *measurement*, not the page: it took the first `<table>` in the panel, which is an invoice table inside a hidden card. Re-checked against the two layout containers directly — cards hidden, table visible, as intended. |

### Open question

| # | Question |
| - | -------- |
| Q13 | The list is fixed-sorted by amount descending. A table invites sorting, and now that it *reads* as a table the absence is more noticeable — oldest-first is the obvious second sort. Deliberately not added, because the desktop table has no sort either and the two should not diverge. Worth deciding for both at once. |

Q7, Q8, Q10 (addendum-003) and Q11, Q12 (addendum-004) are unaffected and still open.
