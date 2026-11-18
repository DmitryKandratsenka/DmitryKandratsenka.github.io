'use client';

import { Check, Copy } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';

/** Email address that copies on click. The icon swap is the only feedback. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="press group inline-flex items-center gap-2.5 rounded-lg border border-line bg-surface px-3.5 py-2.5 font-mono text-[13px] text-fg-muted transition-colors duration-200 hover:border-line-strong hover:text-fg"
      aria-label={copied ? 'Email copied' : `Copy email address ${email}`}
    >
      <span>{email}</span>
      <span className="relative grid size-4 place-items-center">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? 'ok' : 'copy'}
            initial={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            className={copied ? 'text-ok' : ''}
          >
            {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
