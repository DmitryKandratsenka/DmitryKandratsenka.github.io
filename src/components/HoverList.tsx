'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

/**
 * A list whose hover highlight glides between rows (shared layout). It is a
 * pointer-only nicety: touch and keyboard users get the rows as plain links.
 */
export function HoverList({ items, className = '' }: { items: React.ReactNode[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <ul className={className} onPointerLeave={() => setHovered(null)}>
      {items.map((item, i) => (
        <li
          key={i}
          className="relative"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
        >
          {hovered === i && (
            <motion.span
              layoutId="hover-row"
              className="absolute inset-0 -mx-3 rounded-xl bg-surface-2/70 md:-mx-4"
              transition={{ type: 'spring', duration: 0.32, bounce: 0 }}
              aria-hidden
            />
          )}
          <div className="relative">{item}</div>
        </li>
      ))}
    </ul>
  );
}
