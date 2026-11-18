import { throughputByCap } from '@/content/fleet';

/**
 * Web-developer throughput by run time-cap. One series, so no legend; the
 * winning cap is the accent, the rest recede. Value at each bar tip.
 */
export function ThroughputChart() {
  const max = 2.2;
  const best = Math.max(...throughputByCap.map((d) => d.dev));
  return (
    <figure data-reveal className="rounded-xl border border-line bg-surface p-5 md:p-6">
      <figcaption className="mb-5">
        <p className="text-[13px] font-medium text-fg">Pull requests per hour, by how long a run may take</p>
        <p className="mt-1 text-[12px] text-fg-muted">Web developer lane, runs of 10–15 Sep 2026</p>
      </figcaption>
      <div className="space-y-2.5">
        {throughputByCap.map((d, i) => {
          const isBest = d.dev === best;
          return (
            <div key={d.cap} className="group grid grid-cols-[64px_1fr] items-center gap-3" title={`${d.cap}: ${d.dev} PRs per hour`}>
              <span className={`font-mono text-[11px] tabular-nums ${isBest ? 'text-fg' : 'text-fg-muted'}`}>{d.cap}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`grow-x block h-3.5 rounded-r-[4px] ${isBest ? 'bg-accent' : 'bg-fg-faint/55'} transition-opacity duration-200 group-hover:opacity-80`}
                  style={{ width: `${(d.dev / max) * 100}%`, ['--i' as string]: i }}
                />
                <span className={`font-mono text-[11px] tabular-nums ${isBest ? 'text-fg' : 'text-fg-muted'}`}>{d.dev.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-5 border-t border-line pt-4 text-[12px] leading-relaxed text-fg-muted">
        A unit of work costs about 45 minutes in every lane. What a cap removes is the
        hours a single run spends going nowhere: uncapped, several runs took 400 minutes.
        No PR count catches that. Only a clock does.
      </p>
    </figure>
  );
}
