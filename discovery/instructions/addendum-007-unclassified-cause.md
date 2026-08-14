# Addendum 007 — A cause for what the system cannot explain

**Status:** built, awaiting review.
**Screen:** `../screens/dashboard/dashboard.html` → Outstanding Recovery tab.
**Inputs:** verbal — *"there should be a cause category something like unrecognized
cause where we will list candidates which behaviour cannot be categorised by
system instead of force fitting it in some category"*.

## Why this is a correctness fix, not a feature

Addendum 002 already recorded that `cause` is **invented**: the source systems carry
no dispute linkage, no credit-note linkage and no due dates, so cause cannot be
derived at all. Every one of the 14 rows was nevertheless assigned a confident
cause. That is false precision, and it is the expensive kind — **a wrong cause sends
the owner to do the wrong thing**. "Raise a credit note" against a shop that simply
has not paid wastes the visit and the goodwill.

An unexplained receivable is also a finding in its own right. Money stuck for a
reason nobody recorded means the process is not capturing why — and that is a
business area to improve, which is what this tab exists to surface.

## Decisions

| # | Decision | Why |
| - | -------- | --- |
| D26 | Sixth cause: **`unclassified` — "Cause not established"** | Says the system does not know, rather than guessing. Its blurb names what is missing: no dispute, no claim, no contact note. |
| D27 | Its owner is **`unknown`**, so the split is three-way | "We are the blocker" / "Customer has not paid" / **"Nobody knows why"**. If the cause is unknown the fault is unknown; folding it into either side would be the same guess in a different place. |
| D28 | Rows drawn from **both** sides | Vaibhav (was habitual-late, *theirs*), Laxmi (was terms-exceeded, *theirs*), Raman (was disputed, *ours*). Carving it out of one side would have made it look like a relabelling of that side. |
| D29 | It sorts **between** the other two | Finding out is an internal action that can start today, so it outranks "chase the customer" — but a known billing error is still faster money, so it stays behind "we are the blocker". |
| D30 | **No `effortRank`** | Effort is how hard a cause is to fix; you cannot rank the effort of fixing something nobody has diagnosed. Assigning one would be exactly the false precision this cause exists to avoid. `C10` exempts it and now *asserts* it stays unranked. |
| D31 | "Set the cause" **resolves in place** | The second action this report can finish by itself (after logging a contact). An unexplained row is a question addressed to the office; answering it is the whole job, so the answer is recorded here rather than handed to another module. Writing a cause re-sorts the row, moves the money between buckets and recomputes every chip. |

## Effect on the seed

Nothing was added or removed — three rows changed cause, and `prevOutstanding` was
re-spread across six causes instead of five.

| Bucket | Amount | Shops |
| ------ | -----: | ----: |
| We are the blocker | ₹13,340 | 7 |
| Customer has not paid | ₹14,920 | 4 |
| Nobody knows why | **₹4,140** | **3** |
| | **₹32,400** | **14** |

## A check that could not fail

`C3` asserted `ours + theirs = total` while deriving `theirs = total − ours`. It was
true by construction and would have stayed green no matter what the data said — it
also hid the possibility of a third state. Each side is summed independently now,
and `C3b` asserts every row resolves to one of the three known owners.

## Verified

- All 13 seed checks pass, including the rewritten `C3`/`C3b` and the exempted `C10`.
- The `seed.inline.js` mirror was regenerated; `M2` confirms it matches `seed.json`.
  (It caught the drift when only the JSON had been edited — the guard did its job.)
- In the browser: the split reads ₹13,340 / ₹14,920 / ₹4,140; filtering to "nobody
  knows why" gives 3 of 14 shops and narrows the cause chips to that one cause.
- Setting a cause on Vaibhav moved ₹2,050 out of the unknown bucket (₹4,140 → ₹2,090,
  3 shops → 2), re-chipped the row, re-sorted it into the blocker group, and
  recomputed the header and every cause and route amount.
