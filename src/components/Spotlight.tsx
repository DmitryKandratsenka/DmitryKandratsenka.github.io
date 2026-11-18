'use client';

import { useRef } from 'react';

/**
 * Card whose border lights up under the pointer. Writes CSS variables on the
 * element directly: no React state, no re-render per mouse move.
 */
export function Spotlight({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);
  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
  return (
    // @ts-expect-error polymorphic ref is fine for these three tags
    <Tag ref={ref} onPointerMove={onMove} className={`spotlight ${className}`}>
      {children}
    </Tag>
  );
}
