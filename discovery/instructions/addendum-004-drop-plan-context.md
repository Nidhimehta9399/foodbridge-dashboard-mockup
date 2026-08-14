# Addendum 004 — One report: keep the ₹2499 view, drop the plan context

> Linked from [instructions.md](./instructions.md)
> Status: Built — awaiting acceptance
> Created: 2026-08-14
> Supersedes decision **D16** of [addendum-003](./addendum-003-recovery-glanceable-by-tier.md)

## The ask

Keep the **₹2499 Grow** composition as the default, and **remove the plan context completely**.

## What that means

Addendum-003 gated the tab's depth to three pricing personas and shipped a switcher so all three
could be role-played. This reverses that: there is now one report for everyone, and it is the one
Grow was getting.

| # | Decision | |
| - | -------- | - |
| D19 | **D16 is withdrawn.** The tab has a single composition. | supersedes D16 |
| D20 | That composition is the former Grow view: a route-led verdict, three route-and-salesman actions, a route league beside the causes, and Route / Salesman as a list column. | |
| D21 | No plan, price, persona or tier appears anywhere in the UI or the seed. | |

Nothing was kept behind a flag. Two unreachable branches per function is worse code than one
branch, and the removed variants are in git history and in addendum-003 if they are wanted back.

## What was removed

| Removed | Was |
| ------- | --- |
| The plan-context bar | Dashed panel: what keeps this owner awake, the plan's job, its turnover/salespeople/routes fit, and three price pills |
| `recoveryTiers` | Seed key holding the three personas — dropped from `seed.json` and `seed.inline.js` |
| Tier branches in `rcVerdictLine` · `rcActionsFor` · `rcWhy` · `rcCards` · `rcTableRows` · the list heading | The Start and Control compositions |
| `RC_MONEY_VERB` · `rcMoneyLine` | Only the Control actions used them (“Frees ₹3,100” / “Stops ₹11,900 growing”) |
| `rcOldRows` | Only the Start verdict and Start actions used it |
| `RC_DEAD.call` | Only the Start “Call <shop>” action reached it |
| `rcTier` · `rcTierOf` · `rcBP()` · the `data-rc-tier` handler | Tier state, lookup, per-tier breakpoint and switching |

`rcBP()` collapsed to a constant `RC_BP`, since one composition means one switch point (`xl`,
which the Route / Salesman column needs beside the module's 256px sidebar).

## Net effect

| | addendum-003 | now |
| --- | --- | --- |
| First thing on screen | Plan-context bar | **The verdict** |
| Sections above the first action | 2 | **1** |
| Panel markup at 390px | ~64,200 chars | **~49,000 chars** |
| Compositions to maintain | 3 | **1** |

## Outcome

Built and role-played in a browser, served with `Cache-Control: no-store`.

| Check | Result |
| ----- | ------ |
| No plan / price / persona string anywhere in the panel | Pass |
| No `[data-rc-tier]` control rendered | Pass |
| No dead tier symbols left in `dashboard.js` | Pass — `rcTier`, `recoveryTiers`, `rcMoneyLine`, `RC_MONEY_VERB`, `rcOldRows` all absent |
| Report opens on “Stuck right now” | Pass |
| Verdict, three actions, route league, causes, list all render | Pass — 3 actions, 3 routes, 5 causes |
| Route filter → cause filter stack, then clear | Pass — Kondhwa ₹5,800 → +terms-exceeded ₹0 (correct: Kondhwa carries none) → cleared ₹32,400 |
| Card expansion and row actions | Pass — action does not toggle the card |
| Responsive at 320 · 390 · 768 · 1024 · 1440 | Pass — no overflow, no sub-44px target, no sub-12px type, table never clipped or side-scrolled |
| “Why it is stuck” collapsed by default on a phone | Pass on a fresh load at 390px |
| Other five tabs unchanged, no console errors | Pass |
| `_check-recovery.js` | Pass — 15 assertions (M2 ×4, C1–C11) |

`_check-recovery.js` dropped its tier check and renumbered the route-age check to C11. C10 stays:
`effortRank` no longer orders the headline actions, but it still labels the cause rows and is the
hook if action ranking returns.

### Open question this raises

| # | Question |
| - | -------- |
| Q11 | **The ours/theirs split bar is gone**, because the Grow composition never carried it — its verdict is route-led. Ownership survives per cause (each row still carries a You / Customer dot and label), but the single strongest line of addendum-002 — *“₹14,100 of your ₹32,400 is your own paperwork, not customers refusing to pay”* — no longer appears anywhere. It is one bar and it would fit above the route league. Worth deciding deliberately rather than by inheritance. |
| Q12 | The verdict now always names a salesman, for every owner rather than only the largest tier. Q9 from addendum-003 applies with more force. |

Q7, Q8 and Q10 from addendum-003 are unaffected and still open; Q6 is closed by D19.
