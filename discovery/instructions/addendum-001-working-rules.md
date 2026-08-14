# Addendum 001 — Working Rules

> Linked from [instructions.md](./instructions.md)
> Status: Active
> Created: 2026-08-14

Standing rules for the **Foodbridge Dashboard Module** Discovery phase. They apply to every
iteration unless a later addendum supersedes them. They mirror the rules already in force on the
sibling Finance module (`kdansari02/invoice-payment-overview`) so the two read the same way.

## Rules

| # | Rule | Detail |
| - | ---- | ------ |
| R1 | New instructions go in an addendum | Any new ask or decision is captured as a separate `addendum-NNN-*.md` file, never edited into `instructions.md`. |
| R2 | Link every addendum from the index | Each addendum is linked from `instructions.md` under "Addenda". |
| R3 | Summarise analysis as a table first | Any analysis is presented as a table summary first; narrative is supporting detail. |
| R4 | Capture each iteration in an addendum first | Intent is logged before the iteration; outcome is appended after. The folder is an append-only build-up. |
| R5 | HTML only, disposable | Prototypes stay HTML/CSS/JS with seed data (SPEC §3.1). Nothing here is a dependency of Development — only the *decisions* carry forward. |
| R6 | An accepted iteration becomes a version | When the human accepts an iteration, log it and snapshot it under `../versions/vN/`; record which decisions feed which SSOT so Development can inherit them. |
| R7 | The validate-gate is relaxed here | Discovery *produces* the SSOT content, so it is not gated on SSOTs that don't exist yet (SPEC §5.4, §3.1). |
| R8 | Human inputs live in `inputs/` | Briefs, research, personas, walkthroughs and screenshots go in `inputs/`; the consuming addendum cites them via an `Inputs:` header (SPEC §12.5). |

## Module-specific rules

| # | Rule | Detail |
| - | ---- | ------ |
| M1 | `v1/` is frozen | The accepted v1 snapshot at `../../v1/` is never edited. Iterations happen here and are snapshotted to `../versions/`. |
| M2 | Seed and mirror move together | `seed-data/seed.json` and `screens/dashboard/seed.inline.js` carry the same content. Editing one without the other is a defect. |
| M3 | Reuse the app's literal class strings | The prototype is a pixel-parity recreation of `storefront-frontend`. New UI composes from the class strings already in `dashboard.js` (`C_CONTAINER`, `C_TD`, `C_TAB`, the emerald/slate/amber palette) rather than inventing a parallel design language. |
| M4 | Invented data is declared | These prototypes are public. Customer names and phone numbers are invented, never copied from a tenant. Any figure the source system cannot actually produce is called out in the seed's `_note` key and in the addendum. |
| M5 | Arithmetic reconciles | Totals are derived from rows, not stored alongside them. Where a total must be stored, an addendum states the check that proves it. Clamps that hide impossible data (`Math.max(0, …)`) are not used to make numbers look right. |

## How this works in practice

| Step | What happens |
| ---- | ------------ |
| 1 | A new ask or scenario arrives. |
| 2 | It is written into a new addendum (R1) and linked from `instructions.md` (R2). |
| 3 | The prototype iteration is built and role-played against seed data; analysis is tabled (R3). |
| 4 | The addendum records the outcome; if accepted, the iteration is snapshotted as a version (R4, R6). |

## Addendum numbering

- Format: `addendum-NNN-short-slug.md` (zero-padded 3-digit sequence).
- This file is `001`. The next is `002`, and so on — numbers are never reused.
