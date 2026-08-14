# Addendum 003 — Outstanding Recovery: glanceable, and cut to the tier

> Linked from [instructions.md](./instructions.md)
> Status: Built — awaiting acceptance
> Created: 2026-08-14
> Follows [addendum-002](./addendum-002-outstanding-recovery-tab.md)
> Inputs: the pricing-tier persona table supplied with the instruction (reproduced below).

## The ask

Two things:

1. **Simplify the report so it can be understood at a glance and acted on quickly** — the owner
   should not have to study it to know what to do.
2. **Make it responsive end to end on mobile, at production quality.**

Framed against three paying personas.

## The persona table, as given

| Attribute | ₹299 · Start | ₹999 · Control | ₹2499 · Grow |
| --------- | ------------ | -------------- | ------------ |
| Turnover | ₹2–5 Cr | ₹5–12 Cr | ₹12–25 Cr |
| Salespeople | 3–5 | 6–10 | 11–20 |
| Daily customer connects | 60–150 | 150–300 | 300–500+ |
| Delivery cycle | Weekly | Daily or weekly | Daily, multi-route |
| Routes running | 1–2 | 3–5 | 6+ |
| What keeps them awake | "I'm still on paper and WhatsApp" | "I don't know where my cash and stock went" | "I can't see which salesman or which shop is actually performing" |
| The job the tier does | Get off paper | Stop the leak | Run it on numbers |

## What was wrong with v002

Measured against the ask, not against taste:

| Problem | Evidence |
| ------- | -------- |
| Analysis-first, not decision-first | The screen said *"here is the situation, work out what to do."* The owner has to synthesise the action themselves. |
| The hero alone is nine numbers and a three-line paragraph | ₹32,400 · 14 · ▲₹3,700 · ₹9,190 · 28% · ₹14,100 · 44% · ₹18,300 · 56%, then a paragraph. That is not a glance. |
| ~40 data points before the first action | 5 cause cards × (amount, share, delta, ageing bar, average age, blurb, action) + 2 concentration panels. |
| Built for exactly one persona | The cause taxonomy is a **Control** artifact. Route concentration is meaningless at 1–2 routes (**Start**) and too shallow at 6+ (**Grow**). |
| Mobile was "does not overflow", not "designed" | 11px type, desktop table scrolled sideways, inline expansion, tap targets below 44px. |

**The persona table is the fix, not just the audience.** Each tier is kept awake by a different
question, so each tier should be shown a different *first* answer. Cutting the report to the tier
*is* the simplification — every tier then sees less than v002 showed, not more.

## Design — decisions

| # | Decision | Rationale |
| - | -------- | --------- |
| D12 | **Decision-first order**: verdict → three ranked actions → (optional) the reasoning → the list | The owner reads two things and can start work. Everything else is progressive disclosure. |
| D13 | **"Do these three"** — the interventions are ranked *for* the owner and capped at three | The ranking is the product. A list of five causes asks the owner to do the prioritising; that is the work being outsourced. |
| D14 | Actions rank by **effort, not by size** | The biggest number is rarely the fastest money. ₹3,100 of unissued paperwork beats ₹6,800 of dispute that needs a QC visit and a negotiation. |
| D15 | **One verdict sentence per tier**, replacing the paragraph | A glance is one sentence. The paragraph was three. |
| D16 | Depth is **gated by tier**; the demo carries a tier switcher | Start gets people, Control gets causes, Grow gets routes and salesmen. The switcher is a discovery affordance for role-playing all three, like the Finance module's `?state=` hooks — not a product control. |
| D17 | Mobile is a **different composition**, not the desktop reflowed | Cards instead of a table, 44px minimum targets, 16px minimum body type, the reasoning collapsed by default. |
| D18 | `effort` / `effortRank` are **stored on the cause**, not derived | Like `cause` itself (D6), how hard something is to fix is a human judgement, not a rule over the data. |

### Tier fit

| | Start · get off paper | Control · stop the leak | Grow · run it on numbers |
| --- | --- | --- | --- |
| **Verdict answers** | Who do I chase first? | Where is the leak? | Who on my team is leaking? |
| **The three actions are** | People to contact | Processes to fix | Routes and salesmen to review |
| **Reasoning band** | *none* — the list is the report | Ours/theirs split + compact cause rows | Route & salesman league + compact cause rows |
| **List columns** | Shop · owes · age | + cause | + route · salesman |
| **Deliberately absent** | Cause taxonomy, route panel, ageing science | Per-salesman accountability | — |

### Rejected

| Rejected | Why |
| -------- | --- |
| Keeping the five cause cards and shrinking them | The count was the problem, not the size. |
| A "recovery score" or health gauge | A number nobody can act on, dressed as insight. |
| Tier-gating by hiding controls on one shared layout | Start would still carry Control's information architecture. Each tier needs a different *first screen*, not the same screen with pieces greyed out. |
| Reflowing the desktop table into a horizontally scrolling one on mobile | What v002 did. A sideways-scrolling table is a desktop table that has been apologised for. |

## Seed changes

| Key | Change |
| --- | ------ |
| `recoveryCauses[].effort` · `.effortRank` | New. The friction line shown on an action card, and the rank that orders them (D14/D18). |
| `recoveryTiers` | New. The three personas as data — price, name, the job, what keeps them awake — so tier copy is seed, not code. |
| `_recoveryNote` | Extended to declare the effort model and the tier gating as invented. |

No figures change. Every check in `_check-recovery.js` still applies, plus one new one (C10) that
every cause carries an effort rank and the ranks are unique.

## Outcome

Built and role-played in a browser at **320 · 360 · 375 · 390 · 414 · 640 · 768 · 1024 · 1280 px**,
each width × all three tiers, served with `Cache-Control: no-store`. Not yet accepted, so nothing
is snapshotted to `versions/`.

### What the owner now reads before acting

| | v002 | v003 |
| --- | --- | --- |
| Numbers before the first action | ~40 | **3** (total · shops · month delta) |
| Sentences in the hero | 3 | **1** |
| Screens of scrolling to the first action | ~1.5 | **0** — the actions sit directly under the verdict |
| Actions named for the owner | 0 — five causes to prioritise themselves | **3, pre-ranked** |

### Verified by clicking, not by reading code

| Check | Result |
| ----- | ------ |
| No horizontal overflow, any width × any tier | Pass — document width equals viewport at all 9 widths |
| No tap target under 44px | Pass — after excluding the shared paginator, which the phone layout no longer renders |
| No body type under 12px | Pass |
| Table never clipped or scrolled sideways | Pass — cards below the switch point, table only where it fits |
| Cause filter, clear-all, card expansion, tier switch | Pass — `disputed` → 3 shops ₹6,800; clear → 14 shops ₹32,400 |
| Row actions do not also toggle the card | Pass |
| Start tier omits the reasoning band entirely | Pass |
| Expansion arithmetic | Pass — Raj Traders ₹4,200 + ₹2,100 + ₹1,150 = ₹7,450 |
| Other five tabs unchanged, no console errors | Pass at 390px and 1280px |
| `_check-recovery.js` | Pass — 16 assertions (M2 ×5, C1–C12) |

### Corrections made during the build

| Was | Now | Why |
| --- | --- | --- |
| Table took over at `sm` (640px) | Cards to `lg`; Grow holds cards to `xl` | At 640px the table needed 972px and scrolled sideways inside its box — the exact thing D17 rejects. Tablets now get a two-up card grid. |
| Grow table clipped at 1024px | Cause folded under the shop name; `overflow-x-auto` restored as a floor | Six columns needed 1068px, and `main`'s `overflow-x-hidden` was *clipping* rather than scrolling it, so cells became unreachable. |
| Phone list paginated | Shows every filtered row | The shared `pagination()` — copied class-for-class from the app's `CustomPagination.jsx` and used by five other tabs — has 28px targets. Scrolling 14 cards is the phone-native answer and leaves that shared chrome alone. |
| Three buttons per phone card | Primary + Remind; full set in the expansion | Three in a two-column grid orphaned the third onto its own row. |
| `rcWhyOpen` captured at load | Resolved at render time, `null` = follow the viewport | Rotating a phone or resizing left the band on its load-time default. A debounced breakpoint listener now re-renders the tab when a band is crossed. |
| `_check-recovery.js` ageing used a timestamp diff | Whole days, midnight to midnight — identical to `rcAge()` | The gate reported Kondhwa at 74d where the screen rendered 73d. A gate that disagrees with the screen is worse than no gate. |

### Open questions for acceptance

| # | Question |
| - | -------- |
| Q6 | Is tier-gating right as a **product** rule, or only as a discovery device? Showing a ₹299 owner a thinner report is a pricing decision, not a design one. |
| Q7 | The effort ranking (D14) decides the owner's morning. It is currently one judgement per cause; it probably wants to react to amount and age too — a ₹200 paperwork fix should not outrank ₹11,900 walking out of the door. |
| Q8 | **The five KPI tiles above the tab consume the entire first screen on a phone** — roughly 1,000px before the report starts. They are shared chrome at pixel parity with the live app, so they were left alone, but they are now the biggest obstacle to glanceability on a phone. Worth a separate decision: collapse them to a single summary strip below `sm`. |
| Q9 | Grow's verdict names a salesman. That is the point of the tier, and also the first time this prototype puts a named employee's performance on a dashboard. Worth confirming that is wanted before it reaches a real tenant. |
| Q10 | Q5 from addendum-002 still stands, and harder now: every one of the three actions dead-ends into Finance, Logistics or Customer Management. |
