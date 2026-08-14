/* ============================================================
   _check-recovery.js — reconciliation gate for the Outstanding
   Recovery seed.  Dev tool, not prototype content (same status
   as v1's _smoke/ boot check).

     node _check-recovery.js

   Every figure the tab renders is a reduction over
   recoveryOutstanding[]. This asserts that the reductions agree
   with each other and that the seed is physically possible —
   discovery working rule M5, checks C1-C8 of addendum-002.
   Also proves seed.json and its seed.inline.js mirror have not
   drifted apart (rule M2).
   ============================================================ */
'use strict';

const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../../seed-data/seed.json');
const canonical = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

global.window = {};
require('./seed.inline.js');
const S = global.window.SEED;

const AS_OF = new Date(canonical.tenant.asOf);
const ALL_TIME = canonical.kpis.find(k => k.id === 'allTimeSales').value;

let failures = 0;
function check(id, label, ok, detail) {
  if (!ok) failures++;
  console.log((ok ? '  ok  ' : ' FAIL ') + id.padEnd(4) + label.padEnd(26) + detail);
}
const sum = (rows, f) => rows.reduce((a, r) => a + f(r), 0);
const groupSum = (rows, key) => rows.reduce((m, r) => (m[r[key]] = (m[r[key]] || 0) + r.outstanding, m), {});
const inr = n => '₹' + n.toLocaleString('en-IN');
// Whole days, midnight to midnight — must match rcAge() in dashboard.js exactly.
// A timestamp difference against tenant.asOf (which carries a time) rounds half a
// day up, so the gate would report 74d where the screen renders 73d.
const ageOf = iso => {
  const a = iso.split('-').map(Number);
  return Math.round((Date.UTC(AS_OF.getFullYear(), AS_OF.getMonth(), AS_OF.getDate()) -
    Date.UTC(a[0], a[1] - 1, a[2])) / 86400000);
};

/* ---- M2: the mirror is a mirror ---- */
for (const key of ['_recoveryNote', 'recoveryCauses', 'recoveryAgeBuckets', 'recoveryOutstanding']) {
  check('M2', key, JSON.stringify(S[key]) === JSON.stringify(canonical[key]),
    S[key] === undefined ? 'missing from seed.inline.js' : 'seed.json === seed.inline.js');
}

const rows = S.recoveryOutstanding;
const causes = S.recoveryCauses;
const ownerOf = Object.fromEntries(causes.map(c => [c.id, c.owner]));
const total = sum(rows, r => r.outstanding);

/* ---- C1-C8 ---- */
check('C1', 'rows carry a total', total > 0, `${rows.length} customers, ${inr(total)}`);

const byCause = groupSum(rows, 'cause');
const unknown = rows.filter(r => !ownerOf[r.cause]).map(r => r.id);
check('C2', 'cause totals = total', sum(Object.values(byCause), n => n) === total,
  Object.entries(byCause).map(([k, v]) => `${k} ${inr(v)}`).join(' · '));
check('C2', 'every cause defined', unknown.length === 0, unknown.length ? unknown.join(', ') : 'no orphan cause ids');

// C3 was `ours + theirs = total`, which was true by construction: theirs was
// derived as total - ours, so it could not fail and it hid the third state.
// Each side is summed independently now, and the header's three-way split must
// account for every rupee.
const ours = sum(rows.filter(r => ownerOf[r.cause] === 'us'), r => r.outstanding);
const theirs = sum(rows.filter(r => ownerOf[r.cause] === 'them'), r => r.outstanding);
const unclear = sum(rows.filter(r => ownerOf[r.cause] === 'unknown'), r => r.outstanding);
check('C3', 'ours + theirs + unclear = total', ours + theirs + unclear === total,
  `ours ${inr(ours)} + theirs ${inr(theirs)} + unclear ${inr(unclear)} = ${inr(ours + theirs + unclear)}`);
check('C3b', 'every owner is a known state',
  rows.every(r => ['us', 'them', 'unknown'].indexOf(ownerOf[r.cause]) !== -1),
  'us | them | unknown');

const byRoute = groupSum(rows, 'route');
check('C4', 'route totals = total', sum(Object.values(byRoute), n => n) === total,
  Object.entries(byRoute).map(([k, v]) => `${k.replace(' Route', '')} ${inr(v)}`).join(' · '));

const buckets = S.recoveryAgeBuckets;
const bucketOf = age => buckets.find(b => b.max === null || age <= b.max);
const byBucket = rows.reduce((m, r) => {
  const b = bucketOf(Math.max(...r.invoices.map(i => ageOf(i.date)))).label;
  return (m[b] = (m[b] || 0) + r.outstanding, m);
}, {});
check('C5', 'ageing = total', sum(Object.values(byBucket), n => n) === total,
  buckets.map(b => `${b.label} ${inr(byBucket[b.label] || 0)}`).join(' · '));

const badRows = rows.filter(r => sum(r.invoices, i => i.amount) !== r.outstanding).map(r => r.id);
check('C6', 'invoices = outstanding', badRows.length === 0,
  badRows.length ? badRows.join(', ') : `all ${rows.length} rows tie out`);

const prev = sum(causes, c => c.prevOutstanding);
check('C7', 'prior state plausible', prev > 0,
  `${inr(prev)} → ${inr(total)} (${total - prev >= 0 ? '+' : ''}${inr(total - prev)})`);

const share = total / ALL_TIME * 100;
check('C8', 'share of all-time sales', share < 100,
  `${inr(total)} / ${inr(Math.round(ALL_TIME))} = ${share.toFixed(1)}%`);

/* ---- no future-dated or negative-age invoices ---- */
const futures = rows.flatMap(r => r.invoices.filter(i => ageOf(i.date) < 0).map(i => i.invoiceNo));
check('C9', 'no future invoices', futures.length === 0,
  futures.length ? futures.join(', ') : `oldest ${Math.max(...rows.flatMap(r => r.invoices.map(i => ageOf(i.date))))}d`);

/* ---- C10: effort metadata is well-formed (addendum-003) ----
   Every cause carries a friction label and a unique rank. The three headline
   actions are route-led since addendum-004, but the rank still orders how
   causes read and is the hook if action ranking returns. */
// `unclassified` is deliberately unranked: effort is how hard a cause is to
// fix, and you cannot rank the effort of fixing something nobody has diagnosed.
// Giving it a number would be the same false precision the cause exists to
// avoid — so it is excluded here rather than fitted with one.
const ranked = causes.filter(c => c.id !== 'unclassified');
const ranks = ranked.map(c => c.effortRank);
const uniqueRanks = new Set(ranks).size === ranks.length;
const allRanked = ranked.every(c => Number.isInteger(c.effortRank) && c.effort)
  && causes.every(c => c.id !== 'unclassified' || (c.effortRank === undefined && !c.effort));
check('C10', 'effort ranks unique (unclassified exempt)', uniqueRanks && allRanked,
  causes.slice().sort((a, b) => a.effortRank - b.effortRank)
    .map(c => `${c.effortRank} ${c.id}`).join(' · '));

/* ---- C11: the verdict names the route with the oldest book, so the routes
   have to be separable — if two rounds age alike the headline is noise ---- */
const routeAges = Object.fromEntries(S.routes.map(name => {
  const rs = rows.filter(r => r.route === name);
  const amt = sum(rs, r => r.outstanding);
  return [name, amt ? Math.round(sum(rs, r => Math.max(...r.invoices.map(i => ageOf(i.date))) * r.outstanding) / amt) : 0];
}));
const spread = Math.max(...Object.values(routeAges)) - Math.min(...Object.values(routeAges));
check('C11', 'route ages separable', spread >= 10,
  Object.entries(routeAges).map(([k, v]) => `${k.replace(' Route', '')} ${v}d`).join(' · ') + ` (spread ${spread}d)`);

console.log(failures ? `\n${failures} CHECK(S) FAILED` : '\nall checks pass');
process.exit(failures ? 1 : 0);
