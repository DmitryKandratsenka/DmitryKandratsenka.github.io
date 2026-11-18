'use client';

import { ArrowsLeftRight, CaretRight, ChatCircle } from '@phosphor-icons/react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { memo, useEffect, useRef, useState } from 'react';

/**
 * One post row, one stylesheet. Only the `dir` attribute changes; logical
 * properties (inline-start/end) do the mirroring, and Motion's layout
 * animation shows each element travelling to its mirrored place.
 *   compact: flips on its own every few seconds (paused off-screen).
 *   full:    a button flips it.
 */

const COPY = {
  ltr: { title: 'What’s your favourite chess opening?', lang: 'en' },
  rtl: { title: 'ما هي افتتاحيتك المفضلة في الشطرنج؟', lang: 'ar' },
} as const;

type Dir = keyof typeof COPY;

export const RtlDemo = memo(function RtlDemo({ compact = false }: { compact?: boolean }) {
  const [dir, setDir] = useState<Dir>('ltr');
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    if (!compact || reduced) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => {
      if (visible.current && !document.hidden) setDir((d) => (d === 'ltr' ? 'rtl' : 'ltr'));
    }, 3200);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, [compact, reduced]);

  const spring = reduced ? { duration: 0 } : { type: 'spring' as const, duration: 0.6, bounce: 0.1 };
  const copy = COPY[dir];

  return (
    <figure
      ref={ref}
      aria-label="Demo: the same post row rendered left-to-right in English and right-to-left in Arabic. Only the dir attribute changes; logical CSS properties mirror the layout."
      className={compact ? '' : 'rounded-xl border border-line bg-bg-raised p-5 md:p-6'}
    >
      <LayoutGroup>
        <div
          dir={dir}
          lang={copy.lang}
          className="flex items-center gap-3 rounded-lg border border-line bg-surface px-3 py-3"
        >
          {/* Avatar sits at inline-start in both directions */}
          <motion.span
            layout="position"
            transition={spring}
            className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[10px] font-semibold text-accent"
            aria-hidden
          >
            <bdi dir="ltr">r/</bdi>
          </motion.span>

          <motion.div layout="position" transition={spring} className="min-w-0 flex-1">
            <div className="relative h-[19px] overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.p
                  key={dir}
                  initial={{ opacity: 0, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(3px)' }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                  className="truncate text-[13px] font-medium text-fg"
                >
                  {copy.title}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-fg-muted">
              {/* The subreddit stays left-to-right inside Arabic text: bidi isolation */}
              <bdi className="font-mono">r/chess</bdi>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <ChatCircle size={11} /> <bdi>128</bdi>
              </span>
            </p>
          </motion.div>

          {/* Directional icon: it must flip with the text */}
          <motion.span layout="position" transition={spring} className="shrink-0 text-fg-faint" aria-hidden>
            <CaretRight size={14} className="rtl:-scale-x-100" />
          </motion.span>
        </div>
      </LayoutGroup>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <code className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[10.5px] text-fg-muted">
          <span className="text-fg-faint line-through decoration-fg-faint/60">margin-left</span>
          <span className="mx-1.5 text-fg-faint">→</span>
          <span className="text-fg">margin-inline-start</span>
        </code>
        {compact ? (
          <span className="font-mono text-[10.5px] text-fg-faint">
            dir=&quot;<span className="text-accent">{dir}</span>&quot;
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setDir((d) => (d === 'ltr' ? 'rtl' : 'ltr'))}
            className="press inline-flex items-center gap-1.5 rounded-md border border-line-strong px-2.5 py-1 font-mono text-[11px] text-fg transition-colors hover:bg-surface-2"
          >
            <ArrowsLeftRight size={12} />
            <span>
              dir=&quot;<span className="text-accent">{dir}</span>&quot;
            </span>
          </button>
        )}
      </div>

      {compact && (
        <ul className="mt-4 grid grid-cols-2 gap-2 border-t border-line pt-4">
          {GUARDRAILS.map((g) => (
            <li key={g.name} className="rounded-md border border-line bg-surface px-2.5 py-2">
              <p className="text-[12px] font-medium text-fg">{g.name}</p>
              <p className="mt-0.5 text-[11px] text-fg-muted">{g.note}</p>
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
});

const GUARDRAILS = [
  { name: 'One rule', note: 'Logical CSS, every team' },
  { name: 'Codemod', note: 'Migrated existing styles' },
  { name: 'Lint in CI', note: 'Blocks new left/right' },
  { name: 'Staged rollout', note: 'Flag, monitor, rollback' },
];
