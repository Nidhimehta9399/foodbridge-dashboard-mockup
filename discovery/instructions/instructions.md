# Instructions — Foodbridge Dashboard Module (discovery)

> **Single point of collaboration for the Discovery phase.** Any coding agent iterating on the
> HTML prototypes reads this first, logs every instruction it is given as an addendum, and
> continues from where the last iteration left off. This is the append-only record of the
> *build → measure → learn* loop.

## Scope

Discovery is **HTML only** — no frameworks, no build step, no real data layer (SPEC §3.1). Each
instruction here shapes a prototype iteration or the problem framing. When the human marks an
iteration as a version ("this is the one"), that acceptance is logged as an addendum and
snapshotted under `versions/`.

## Why this folder appears at addendum-002

`v1/` was published as a frozen discovery snapshot whose README already pointed at a live
prototype tree "under `discovery/`" — but that tree was never published alongside it. This folder
is that tree, created so the module can be iterated without editing a frozen snapshot. `v1/`
stays byte-for-byte as accepted; `discovery/` continues from a copy of it.

## Context / file definitions

| Ref | Path | What it is |
| --- | ---- | ---------- |
| Prototype | `../screens/dashboard/dashboard.html` | Current/latest discovery prototype |
| Versions | `../versions/` | Accepted snapshots, one folder per accepted iteration |
| Frozen v1 | `../../v1/` | The accepted v1 snapshot — never edited |
| Seed data | `../seed-data/seed.json` | Fake but representative data driving the prototype |
| Seed mirror | `../screens/dashboard/seed.inline.js` | The same seed as a script — `file://` blocks fetching JSON. **Edit both together.** |
| Inputs | `inputs/` | Human-provided discovery source material (§12.5) |

## Working rules

Standing rules are in **[Addendum 001 — Working Rules](./addendum-001-working-rules.md)**.

## Addenda

- [Addendum 001 — Working Rules](./addendum-001-working-rules.md) — standing rules for how we work in discovery (addendum-first, table summaries, iteration-as-version, gradual context build-up)
- [Addendum 002 — Outstanding Recovery tab](./addendum-002-outstanding-recovery-tab.md) — a sixth report tab that groups receivables by *cause* rather than by debtor, so the owner can act on the underlying business area; bootstraps this `discovery/` tree
- [Addendum 003 — Outstanding Recovery: glanceable, and cut to the tier](./addendum-003-recovery-glanceable-by-tier.md) — reorders the tab decision-first (verdict → three ranked actions → reasoning → list), gates its depth to the ₹299 / ₹999 / ₹2499 personas, and rebuilds it mobile-first
- [Addendum 004 — One report: keep the ₹2499 view, drop the plan context](./addendum-004-drop-plan-context.md) — withdraws the tier gating (D16); the tab now has a single route-led composition and no plan, price or persona anywhere
- [Addendum 005 — "Who to recover it from" on mobile: the table, as cards](./addendum-005-mobile-row-cards.md) — the phone list rebuilt as fixed-position row-cards so amounts and ages scan down a column; collapsed cards are data only, actions move to the expansion
- [Addendum 006 — Recovery: cut the fat, be precise](./addendum-006-recovery-cut-the-fat.md) — review found the worklist sat 443px below the fold behind three restatements of the same 14 rows; the split becomes the hero, the breakdown becomes the filter, the order becomes actionability, and one action completes
- [Addendum 007 — A cause for what the system cannot explain](./addendum-007-unclassified-cause.md) — every row carried a confident cause although the source systems cannot derive one; adds `unclassified` with an `unknown` owner, making the split three-way, and lets the office resolve it in place
- [Addendum 008 — A report, not a console](./addendum-008-report-not-console.md) — the ten row actions were nine dead alerts and one real one; all removed along with the Actions column, leaving the row detail as pure evidence. Only "Set the cause" stays, because it resolves this report's own state rather than handing off
