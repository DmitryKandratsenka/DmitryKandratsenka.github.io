'use client';

import { Moon, Sun } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as Theme) ?? 'dark');
  }, []);

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    // Colours cross-fade for one frame-set only, then normal timing returns.
    root.classList.add('theming');
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {}
    setTheme(next);
    window.setTimeout(() => root.classList.remove('theming'), 260);
  }

  const label = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="press grid size-8 place-items-center rounded-md border border-line text-fg-muted hover:border-line-strong hover:text-fg transition-colors duration-200"
    >
      {/* Both icons stay mounted; the swap is opacity + a small rotate. */}
      <span className="relative block size-4">
        <Sun
          size={16}
          weight="regular"
          className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] ${
            theme === 'light' ? 'opacity-0 -rotate-45 scale-75' : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon
          size={16}
          weight="regular"
          className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out-strong)] ${
            theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-45 scale-75'
          }`}
        />
      </span>
    </button>
  );
}
