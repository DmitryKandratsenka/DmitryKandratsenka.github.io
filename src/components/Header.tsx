'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { profile } from '@/content/profile';
import { ThemeToggle } from './ThemeToggle';

const NAV = [
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/cv/', label: 'CV' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // A sentinel at the top of the page; no scroll listener.
    const sentinel = document.getElementById('top-sentinel');
    if (!sentinel) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
        scrolled
          ? 'border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="group flex items-center gap-2.5 text-sm font-medium tracking-tight text-fg">
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-[6px] border border-line-strong bg-surface font-mono text-[10px] font-semibold text-fg"
          >
            DK
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-2.5 py-1.5 text-[13px] text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              {n.label}
            </Link>
          ))}
          <span className="mx-1.5 h-4 w-px bg-line" aria-hidden />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
