# Addendum 006 — Recovery: cut the fat, be precise

**Status:** built, awaiting review.
**Screen:** `../screens/dashboard/dashboard.html` → Outstanding Recovery tab.
**Inputs:** review of the shipped tab — *"seems fancy looking but less productive
and compact"*.

## What the review found

The idea was right and the presentation was not. Measured on the shipped build:

| Symptom | Measured |
| ------- | -------- |
| The list you actually work from sat below the fold | header at **y=1399**, fold at 956 — **443px under** |
| Only part of the debt was reachable | **8 of 14** shops, rest behind pagination |
| Height for 14 rows of data | **2.5 screens** desktop, **4.0** mobile |
| Same 14 rows restated before you could act | 3 action cards + route panel + cause panel |
| The route panel looked interactive | `data-rc-route` was **never rendered** — a handler with no emitter |
| Dead markup | `data-rc-scope` on 23 elements, **read by nothing** |
| Nothing completed | all 9 actions were `window.alert` |

## Decisions

| # | Decision | Why |
| - | -------- | --- |
| D16 | The hero is the **ours/theirs split**, not the total | ₹32,400 is already a KPI tile and the Finance module's headline. What only this report knows is that **₹14,100 (44%) is our own billing and delivery errors** — that is the reframing worth the top of the screen. |
| D17 | The breakdown **is** the filter | Cause and route were read-only panels restating the list and costing ~500px. As chips they carry the same numbers in two rows, and every one of them acts. Route filtering now actually works. |
| D18 | Order by what can be acted on today | Amount-sort put ₹7,450 on agreed terms above ₹2,860 at 88 days never rung. Three keys, each statable: **ours first** (fixable without the customer), **then never-contacted** (untried), **then oldest**; amount is only a tie-break. Stated in the list subtitle so the order is legible. |
| D19 | No pagination | 14 rows is a worklist, not a dataset. The shared `pagination()` chrome is untouched for the five tabs that genuinely page. |
| D20 | One action completes here | Every other action hands off to Finance / Distribution / Customer Management and can honestly only say so. **Logging a contact is this report's own state** — it writes `lastContact`, drops the row out of the never-contacted band and re-orders the list. One visible closed loop. |
| D22 | Name the **blockage**, not the owner | "Ours to fix / Theirs to chase" did not read. Every rupee on this screen is ours, so "theirs" says the money belongs to them. The split is about *what is holding the money*, so the halves are now **"We are the blocker"** and **"Customer has not paid"**, each with the actual causes underneath ("wrong paperwork, failed deliveries, open disputes") and the action ("fix these without calling anyone"). |
| D23 | Colour was backwards | Our own errors were emerald — green reads "healthy, nothing to do" for the one bucket that is entirely self-inflicted. Self-inflicted money is amber now; money a customer simply has not paid is neutral slate. |
| D24 | The split filters, and that is how it teaches | Clicking a half filters the list *and* narrows the cause chips to that side. Choosing "we are the blocker" leaves exactly disputed / delivery-failed / not-acknowledged on screen, so the category explains itself from its contents instead of from a label. It is also the most useful single click on the tab. |
| D25 | Drop the narrative sentence | "Pravin's round is the smallest but the oldest — that is a discipline problem" was the last piece of prose asking to be read before anything could be done. The same fact is already in the list: his shops sort near the top and carry their own day counts. Removed, along with `rcVerdictLine`. |
| D21 | Chips scroll sideways on a phone | Wrapped they were nine stacked lines (~380px), taller than the panels they replaced. One scrolling row each ≈ 90px. |

## Result

| | Before | After |
| --- | ---: | ---: |
| Debtor list header | y=1399 (443px below fold) | **y=629 — above the fold** |
| First debtor row | below fold | **y=730 — three rows above the fold** |
| Shops reachable without paging | 8 of 14 | **14 of 14** |
| Desktop height | 2.5 screens | **2.24** — while showing 14 rows instead of 8 |
| Mobile height | 4.0 screens | **3.4** |
| Dead attributes | 23 | **0** |
| Actions that complete | 0 | **1** |

Removed: `rcVerdict`, `rcActions`, `rcActionsFor`, `rcWhy`, `rcCauseRow`, `rcRouteRow`,
`rcAgeBar`, `rcAgeLegend`, `rcWhyIsOpen`, `rcVerdictLine`, `rcDelta` (already unreferenced before this change).

## Verified

- `_check-recovery.js` — all 11 seed invariants still pass; no figure changed.
- Sort re-derived independently from `seed.json` in the browser and compared to the
  rendered DOM: **all 14 rows match**, not just the visible ones.
- Route filter 14 → 6 shops; route + cause together → 2; both reset cleanly.
- Split filter: "we are the blocker" → 8 of 14 · ₹14,100, cause chips narrow to the
  three `us` causes and every chip amount recomputes; "customer has not paid" → 6 of 14;
  clicking either again clears it.
- Log contact: the one never-contacted shop no longer reports "never" after the click.

## Not addressed

The tab is still unreachable from the mock platform, which points Dashboard at
`v1/screens/dashboard/dashboard.html` — the pre-recovery copy. That is a wiring
decision for the platform, not this screen.
