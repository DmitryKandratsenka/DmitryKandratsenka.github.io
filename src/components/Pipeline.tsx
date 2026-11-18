'use client';

import { Check } from '@phosphor-icons/react';
import { memo, useEffect, useRef, useState } from 'react';

/**
 * Replay of one developer-lane run, looping: slot opens → claim → build →
 * gates → review → ship. Discrete steps on a timer, CSS does every
 * transition. Pauses off-screen and in a hidden tab; reduced motion shows
 * the finished run, still.
 */

const RUNS = [
  { ticket: 4821, pr: 5512, title: 'Swiss QR-bill on credit notes', mins: 47, slot: '12:00' },
  { ticket: 4907, pr: 5530, title: 'Reminder emails respect the client’s locale', mins: 39, slot: '15:00' },
  { ticket: 4932, pr: 5547, title: 'XRechnung export for recurring invoices', mins: 52, slot: '18:00' },
] as const;

const STAGES = [
  { key: 'trigger', label: 'Trigger', detail: (r: Run) => `Developer lane · slot opens` },
  { key: 'claim', label: 'Claim', detail: (r: Run) => `#${r.ticket} → refs/claims, no double work` },
  { key: 'build', label: 'Build', detail: (r: Run) => r.title },
  { key: 'gate', label: 'Gate', detail: () => '' },
  { key: 'review', label: 'Review', detail: (r: Run) => `Reviewer agent merges PR #${r.pr}` },
  { key: 'ship', label: 'Ship', detail: (r: Run) => `CircleCI deploy slot ${r.slot} UTC` },
] as const;

const CHECKS = ['typecheck', 'specs', 'render'] as const;

type Run = (typeof RUNS)[number];

// Timeline of one run, in ticks of 120ms. step = index of the active stage.
const STAGE_TICKS = [7, 7, 10, 12, 8, 7];
const GATE_CHECK_AT = [3, 6, 9]; // ticks into the gate stage
const HOLD_TICKS = 18; // finished state stays up before the next run
const TICK = 120;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export const Pipeline = memo(function Pipeline() {
  const reduced = usePrefersReducedMotion();
  const total = STAGE_TICKS.reduce((a, b) => a + b, 0);
  const [tick, setTick] = useState(0);
  const [runIndex, setRunIndex] = useState(0);
  const [merged, setMerged] = useState(11);
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    if (reduced) return;
    const el = rootRef.current;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (el) io.observe(el);
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      setTick((t) => {
        if (t + 1 >= total + HOLD_TICKS) {
          setRunIndex((i) => (i + 1) % RUNS.length);
          return 0;
        }
        if (t + 1 === total) setMerged((m) => m + 1);
        return t + 1;
      });
    }, TICK);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [reduced, total]);

  const t = reduced ? total + 1 : tick;
  const run = RUNS[reduced ? 0 : runIndex];

  // Which stage is active, and how far into it we are.
  let acc = 0;
  let active: number = STAGES.length; // = all done
  let into = 0;
  for (let i = 0; i < STAGE_TICKS.length; i++) {
    if (t < acc + STAGE_TICKS[i]) {
      active = i;
      into = t - acc;
      break;
    }
    acc += STAGE_TICKS[i];
  }
  const done = active >= STAGES.length;
  const gateIndex = STAGES.findIndex((s) => s.key === 'gate');
  const checksPassed =
    active > gateIndex ? CHECKS.length : active === gateIndex ? GATE_CHECK_AT.filter((x) => into >= x).length : 0;

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-2xl border border-line bg-surface/80 shadow-[var(--shadow)] backdrop-blur-sm"
      role="img"
      aria-label="Diagram of one agent run: a scheduled trigger claims a ticket, an agent builds it, typecheck, specs and render gates pass, a reviewer agent merges the pull request, and CircleCI deploys it in the next slot."
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] text-fg-muted">
          <span className="text-fg">fleet</span>
          <span className="text-fg-faint">/</span>
          <span>spoonbill</span>
          <span className="text-fg-faint">/</span>
          <span>developer</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-fg-muted">
          <span className="relative flex size-1.5">
            {!reduced && !done && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
            )}
            <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
          </span>
          {done ? 'run complete' : 'running'}
        </div>
      </div>

      {/* Stages */}
      <ol className="relative px-4 py-4">
        {STAGES.map((s, i) => {
          const state = i < active ? 'done' : i === active ? 'active' : 'queued';
          return (
            <li key={s.key} className="relative flex items-start gap-3 py-[7px]">
              {/* Connector to the next stage; fills when this stage is done (transform only). */}
              {i < STAGES.length - 1 && (
                <span aria-hidden className="absolute left-[11px] top-[31px] bottom-[-8px] w-px overflow-hidden bg-line">
                  <span
                    className="block h-full w-full origin-top bg-accent transition-transform duration-[420ms] ease-[var(--ease-out-strong)]"
                    style={{ transform: `scaleY(${i < active ? 1 : 0})` }}
                  />
                </span>
              )}
              <span
                className={`relative z-10 mt-[1px] grid size-[22px] shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300 ${
                  state === 'done'
                    ? 'border-accent-line bg-surface text-accent shadow-[inset_0_0_0_20px_var(--accent-soft)]'
                    : state === 'active'
                      ? 'border-accent bg-surface text-accent'
                      : 'border-line bg-surface text-fg-faint'
                }`}
              >
                {state === 'done' ? (
                  <Check size={11} weight="bold" />
                ) : (
                  <span
                    className={`size-1.5 rounded-full transition-colors duration-300 ${
                      state === 'active' ? 'bg-accent' : 'bg-fg-faint/60'
                    }`}
                  />
                )}
                {state === 'active' && !reduced && (
                  <span className="absolute inset-[-4px] rounded-full border border-accent-line animate-[ping_1.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    className={`text-[13px] font-medium transition-colors duration-300 ${
                      state === 'queued' ? 'text-fg-faint' : 'text-fg'
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="font-mono text-[10.5px] text-fg-faint tabular-nums">
                    {state === 'done' ? 'done' : state === 'active' ? 'running' : 'queued'}
                  </span>
                </div>
                {s.key === 'gate' ? (
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {CHECKS.map((c, ci) => {
                      const passed = ci < checksPassed;
                      return (
                        <span
                          key={c}
                          className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[10.5px] transition-[background-color,border-color,color] duration-300 ${
                            passed ? 'border-ok/40 bg-ok/10 text-ok' : 'border-line text-fg-faint'
                          }`}
                        >
                          <Check
                            size={9}
                            weight="bold"
                            className={`transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] ${
                              passed ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                            }`}
                          />
                          {c}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p
                    key={`${s.key}-${run.ticket}`}
                    className={`mt-0.5 truncate text-[12px] transition-colors duration-300 ${
                      state === 'queued' ? 'text-fg-faint/70' : 'text-fg-muted'
                    }`}
                  >
                    {s.detail(run)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Footer: the result */}
      <div className="flex items-center justify-between border-t border-line px-4 py-3 font-mono text-[11px]">
        <span className="relative h-4 overflow-hidden text-fg-muted">
          <span
            className={`block transition-[opacity,transform,filter] duration-500 ease-[var(--ease-out-strong)] ${
              done ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-2 opacity-0 blur-[2px]'
            }`}
          >
            <span className="text-ok">merged</span> PR #{run.pr} · {run.mins} min
          </span>
        </span>
        <span className="text-fg-faint tabular-nums">
          merged today <span className="text-fg">{merged}</span>
        </span>
      </div>
    </div>
  );
});
