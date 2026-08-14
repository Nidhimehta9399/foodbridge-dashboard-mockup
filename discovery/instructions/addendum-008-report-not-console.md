# Addendum 008 — A report, not a console

**Status:** built, awaiting review.
**Screen:** `../screens/dashboard/dashboard.html` → Outstanding Recovery tab.
**Inputs:** verbal — *"remove all the actions from report like re-issue invoice,
remind, log another contact, schedule delivery… remove this section"*.

## What was removed

| Removed | Where it lived |
| ------- | -------------- |
| Re-issue invoice · Raise credit note · Cancel invoice · Schedule redelivery · Collect payment · Put on cash-only · Book a QC visit · Remind | expanded-row action block, and the primary one repeated in the table's last column |
| Log another contact | expanded-row action block |
| The whole **Actions** column | table header and every row |
| `RC_ACTIONS`, `RC_DEAD`, `rcRowActions`, `rcLogContact` and their two click handlers | ~60 lines |

## Why this is the right call

Nine of the ten were `window.alert("…that flow belongs to the Finance module")`.
They looked like a console and behaved like a footnote. Addendum 006 counted that
as the tab's weakest point and added one working action to compensate; removing
them all is the cleaner answer to the same problem.

The tab's job is to tell the owner **where the money is stuck and why**. Executing
the fix belongs to the module that owns the record — Finance raises the credit
note, Distribution schedules the redelivery. A report that pretends to do both
either lies about what it can do, or duplicates a flow that already exists
somewhere better.

The row detail is now pure evidence: the invoices, their ages, and why it is stuck.

## The one control kept, and why

**"Set the cause"** stays, on `unclassified` rows only. It is not an action handed
to another module — an unexplained row is a question addressed to the office, and
recording the answer is this report's own state. Removing it would leave the
`unclassified` bucket from addendum 007 permanently unresolvable, which would undo
that addendum rather than tidy it.

**Say so if you want it gone too** — it is one function and one call site, and the
bucket would simply become read-only.

## Verified

- 0 action buttons anywhere in the table; none of the removed labels appear in the
  rendered text.
- An expanded **classified** row renders no buttons at all.
- An expanded **unclassified** row offers only "Set the cause", and using it still
  moved ₹2,050 out of the bucket (₹4,140 → ₹2,090, 3 shops → 2) and recomputed the
  header and every chip.
- Table is 4 columns: Shop · Owes · Oldest · Route / Salesman.
- All 13 seed checks pass.
