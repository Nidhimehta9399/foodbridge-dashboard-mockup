# Addendum 009 — The list reads across, not down

**Status:** built, awaiting review.
**Screen:** `../screens/dashboard/dashboard.html` → Outstanding Recovery.
**Inputs:** verbal — *"design Who to recover it from table better like shop number or
cause can be one of the column to reduce the row height… right now table row has
horizontal spacing but is cluttered in height"*.

## The problem, measured

Two cells were doing the work of five columns. `Shop` stacked name, cause chip and
phone; `Route / Salesman` stacked route above last-contact. Every row paid **97px**
for three lines of text while roughly a third of the table's width sat empty.

## Decisions

| # | Decision | Why |
| - | -------- | --- |
| D32 | **Cause and phone become columns** | They are what an owner reads across a row — who, why, how much, how old, who to send, when we last tried. Fields read across should sit across. |
| D33 | Every cell is **one line** | The height was entirely stacking. Nothing was removed to achieve it; the same seven fields are all still on the row. |
| D34 | `Shop` is the only elastic column | It gets `w-full`; every other header is `w-px` + `whitespace-nowrap` — the shrink-to-content idiom — so the table fits whatever the sidebar leaves instead of overflowing. Addendum 002 had rejected a cause column for exactly this reason, but that was with the Actions column still present; removing it (addendum 008) freed the width. |
| D35 | Invoice count moves next to the amount, as `/3` | As a bare number beside the shop name it read as part of the name. Next to the money it explains, with a separator, it does not. Shown only when there is more than one. |

## Result

| | Before | After |
| --- | ---: | ---: |
| Row height | 97px | **43px** |
| Table height (14 rows) | 1392px | **639px** |
| Whole tab | 2.28 screens | **1.49** |
| Columns | 4 | 7 |
| Horizontal overflow | none | **none** — 1032px into 1032px |

Column widths settle at Shop 272 · Phone 119 · Cause 223 · Owes 74 · Oldest 74 ·
Route 149 · Last contact 121.

## Verified

- Expanded detail still spans the full row: `colspan` 7 matches the 7 headers, and it
  still carries the invoice lines and "why it is stuck".
- Filters unaffected — the split filter still narrows 14 → 3 shops.
- No horizontal scrollbar at the platform's content width.
- All 13 seed checks pass; no figure changed.
