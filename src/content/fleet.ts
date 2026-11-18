/**
 * The Spoonbill routine schedule, as of 18 Nov 2026.
 * Source: spoonbill/docs/ops/ROUTINE-COMMON.md (slot table) and
 * tools/local/deploy/slots-utc. Times are Lisbon local; in November that is UTC.
 * `cap` is the routine's absolute time cap in minutes, i.e. the longest a run
 * may take, which is what the chart draws.
 */
export type Lane = {
  name: string;
  kind: 'build' | 'support';
  runs: string[];
  cap: number;
  owns: string;
};

export const lanes: Lane[] = [
  { name: 'Web developer', kind: 'build', runs: ['06:00', '10:00', '14:00', '18:00', '22:00'], cap: 115, owns: 'Tickets → review-ready PRs. Never merges.' },
  { name: 'Code reviewer', kind: 'build', runs: ['04:30', '10:30', '13:30', '16:30', '20:30'], cap: 75, owns: 'Sweep on the merge result, then merges. Asks me only for money-path or irreversible changes.' },
  { name: 'Designer', kind: 'build', runs: ['07:40', '11:40', '15:40', '19:40'], cap: 115, owns: 'Design and a11y fixes. Merges its own design PRs.' },
  { name: 'Mobile developer', kind: 'build', runs: ['04:15', '06:15', '12:15', '18:15'], cap: 115, owns: 'Expo app tickets → mobile PRs.' },
  { name: 'Mobile reviewer', kind: 'build', runs: ['08:15', '14:15', '20:15'], cap: 90, owns: 'Merges mobile PRs, starts the TestFlight build.' },
  { name: 'Triage', kind: 'support', runs: ['04:00', '12:00', '20:00'], cap: 90, owns: 'Slack signal → tickets. Triages before anything is claimable.' },
  { name: 'Design audits', kind: 'support', runs: ['05:15', '09:50', '17:15', '23:50'], cap: 95, owns: 'Holds every screen against the design canvas.' },
  { name: 'SEO + marketing', kind: 'support', runs: ['08:06', '09:30', '20:06'], cap: 90, owns: 'Search console, indexing, campaign proposals. I approve spend.' },
  { name: 'QA web + mobile', kind: 'support', runs: ['01:30'], cap: 133, owns: 'Nightly smoke and regression on production and the simulator.' },
];

/** CircleCI production deploy slots (UTC). */
export const deploySlots = ['06:00', '09:00', '12:00', '15:00', '18:00', '22:00'];

/** QA's window: nothing deploys, nobody else touches the simulator. */
export const quietWindow = { from: '01:30', to: '03:43' };

/** Developer and reviewer throughput by time cap, runs of 10–15 Sep 2026. */
export const throughputByCap = [
  { cap: '40 min', dev: 1.95 },
  { cap: '50 min', dev: 1.94 },
  { cap: '60 min', dev: 2.04 },
  { cap: '75 min', dev: 1.83 },
  { cap: '90 min', dev: 1.78 },
  { cap: 'No cap', dev: 1.33 },
];

export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}
