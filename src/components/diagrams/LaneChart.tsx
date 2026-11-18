import { deploySlots, lanes, quietWindow, toMinutes } from '@/content/fleet';

const DAY = 1440;
const pct = (m: number) => `${(m / DAY) * 100}%`;

type Seg = { start: number; len: number; label: string };

function segments(start: string, cap: number): Seg[] {
  const s = toMinutes(start);
  const label = start;
  if (s + cap <= DAY) return [{ start: s, len: cap, label }];
  // Wraps past midnight: draw the tail at the start of the day.
  return [
    { start: s, len: DAY - s, label },
    { start: 0, len: s + cap - DAY, label },
  ];
}

/**
 * A day of the Spoonbill fleet: one row per lane, a bar per run (drawn to its
 * absolute time cap), deploy slots as hairlines, QA's quiet window hatched.
 * Bars grow in from the left on reveal, ordered by time of day, so the day
 * "plays" once. Hover or focus a bar for its run.
 */
export function LaneChart({ compact = false }: { compact?: boolean }) {
  const shown = compact ? lanes.slice(0, 5) : lanes;
  const qStart = toMinutes(quietWindow.from);
  const qLen = toMinutes(quietWindow.to) - qStart;
  const rowH = compact ? 'h-5' : 'h-7';

  return (
    <figure className="w-full" data-reveal>
      <div className={compact ? '' : '-mx-1 overflow-x-auto px-1 pb-1'}>
        <div className={compact ? '' : 'min-w-[620px]'}>
          {/* Axis */}
          <div className={`grid ${compact ? 'grid-cols-[88px_1fr]' : 'grid-cols-[132px_1fr]'} items-end`}>
            <span />
            <div className="relative h-5 font-mono text-[10px] text-fg-faint">
              {[0, 6, 12, 18, 24].map((h) => (
                <span
                  key={h}
                  className="absolute -translate-x-1/2 tabular-nums first:translate-x-0 last:-translate-x-full"
                  style={{ left: pct(h * 60) }}
                >
                  {String(h).padStart(2, '0')}:00
                </span>
              ))}
            </div>
          </div>

          <div className={`relative grid ${compact ? 'grid-cols-[88px_1fr]' : 'grid-cols-[132px_1fr]'}`}>
            {/* Lane labels */}
            <div>
              {shown.map((l) => (
                <div
                  key={l.name}
                  className={`${rowH} flex items-center truncate pr-3 text-fg-muted ${compact ? 'text-[10.5px]' : 'text-[12px]'}`}
                >
                  {l.name}
                </div>
              ))}
            </div>

            {/* Plot */}
            <div className="relative border-l border-line">
              {/* Quiet window, hatched */}
              <div
                className="absolute inset-y-0 border-x border-line"
                style={{
                  left: pct(qStart),
                  width: pct(qLen),
                  backgroundImage:
                    'repeating-linear-gradient(135deg, var(--line-strong) 0 1px, transparent 1px 5px)',
                }}
                aria-hidden
              />
              {/* Deploy slots */}
              {deploySlots.map((d) => (
                <div
                  key={d}
                  className="absolute inset-y-0 w-px bg-accent-line"
                  style={{ left: pct(toMinutes(d)) }}
                  aria-hidden
                />
              ))}
              {/* Rows */}
              {shown.map((l) => (
                <div key={l.name} className={`relative ${rowH} border-b border-line/60 last:border-b-0`}>
                  {l.runs.flatMap((r) =>
                    segments(r, l.cap).map((s, si) => (
                      <span
                        key={`${r}-${si}`}
                        tabIndex={compact ? -1 : 0}
                        className="group absolute inset-y-0 flex items-center outline-none"
                        style={{ left: pct(s.start), width: pct(s.len) }}
                      >
                        <span
                          className={`lane-bar block w-full rounded-[4px] ${compact ? 'h-2' : 'h-2.5'} ${
                            l.kind === 'build' ? 'bg-accent' : 'bg-fg-faint/70'
                          } transition-opacity duration-200 group-hover:opacity-80 group-focus-visible:ring-2 group-focus-visible:ring-accent`}
                          style={{ ['--d' as string]: `${(s.start / DAY) * 900}ms` }}
                        />
                        {!compact && (
                          <span className="pointer-events-none absolute bottom-full left-0 z-20 mb-1 hidden whitespace-nowrap rounded-md border border-line-strong bg-surface-2 px-2 py-1 font-mono text-[10.5px] text-fg shadow-[var(--shadow)] group-hover:block group-focus-visible:block">
                            {l.name} · {s.label} · up to {l.cap} min
                          </span>
                        )}
                      </span>
                    )),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {!compact && (
        <>
          <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-fg-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-4 rounded-[3px] bg-accent" /> Building lanes (write, review, merge)
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-4 rounded-[3px] bg-fg-faint/70" /> Supporting lanes
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-px bg-accent-line" /> Production deploy (6 a day)
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-3 w-4 border border-line"
                style={{ backgroundImage: 'repeating-linear-gradient(135deg, var(--line-strong) 0 1px, transparent 1px 5px)' }}
              />
              QA quiet window
            </span>
          </figcaption>
          <details className="mt-3 text-[12px] text-fg-muted">
            <summary className="cursor-pointer select-none text-fg-faint hover:text-fg-muted">View as table</summary>
            <table className="mt-2 w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-line text-fg-faint">
                  <th className="py-1.5 pr-4 font-normal">Lane</th>
                  <th className="py-1.5 pr-4 font-normal">Runs</th>
                  <th className="py-1.5 pr-4 font-normal">Cap</th>
                  <th className="py-1.5 font-normal">Owns</th>
                </tr>
              </thead>
              <tbody>
                {lanes.map((l) => (
                  <tr key={l.name} className="border-b border-line/60 align-top">
                    <td className="py-1.5 pr-4 text-fg">{l.name}</td>
                    <td className="py-1.5 pr-4 font-mono">{l.runs.join(' ')}</td>
                    <td className="py-1.5 pr-4 font-mono">{l.cap}m</td>
                    <td className="py-1.5">{l.owns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </>
      )}
    </figure>
  );
}
