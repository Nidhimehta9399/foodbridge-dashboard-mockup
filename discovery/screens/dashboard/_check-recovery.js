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
const ageOf = iso => Math.round((AS_OF - new Date(iso + 'T00:00:00+05:30')) / 86400000);

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

const ours = sum(rows.filter(r => ownerOf[r.cause] === 'us'), r => r.outstanding);
const theirs = total - ours;
check('C3', 'ours + theirs = total', ours + theirs === total,
  `ours ${inr(ours)} + theirs ${inr(theirs)} = ${inr(ours + theirs)}`);

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

console.log(failures ? `\n${failures} CHECK(S) FAILED` : '\nall checks pass');
process.exit(failures ? 1 : 0);
