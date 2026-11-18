import type { MDXComponents } from 'mdx/types';
import { Rich } from '@/components/Rich';

/**
 * Typography for the case studies. Headings get anchors and mono indices are
 * written in the MDX itself; everything here is spacing and colour.
 */
function textOf(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(textOf).join('');
  return '';
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Turns "[VERIFY]" inside plain-string children into the badge. */
function withVerify(children: React.ReactNode): React.ReactNode {
  if (typeof children === 'string') return children.includes('[VERIFY]') ? <Rich text={children} /> : children;
  if (Array.isArray(children)) return children.map((c, i) => <span key={i}>{withVerify(c)}</span>);
  return children;
}

const components: MDXComponents = {
  h2: ({ children }) => {
    const id = slugify(textOf(children));
    return (
      <h2
        id={id}
        data-reveal
        className="group mt-20 mb-5 scroll-mt-24 text-[22px] font-semibold tracking-[-0.02em] text-fg md:text-[26px]"
      >
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="mt-10 mb-3 text-[16px] font-semibold tracking-[-0.01em] text-fg">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 text-[16px] leading-[1.75] text-fg-muted">{withVerify(children)}</p>
  ),
  strong: ({ children }) => <strong className="font-medium text-fg">{children}</strong>,
  em: ({ children }) => <em className="text-fg">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-fg underline decoration-line-strong underline-offset-[3px] transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="my-5 space-y-2.5 pl-0">{children}</ul>,
  ol: ({ children }) => <ol className="my-5 list-none space-y-3 pl-0 [counter-reset:item]">{children}</ol>,
  li: ({ children }) => (
    <li className="relative pl-6 text-[16px] leading-[1.7] text-fg-muted before:absolute before:left-1 before:top-[0.8em] before:h-px before:w-2.5 before:bg-fg-faint">
      {withVerify(children)}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-accent pl-5 [&_p]:text-fg [&_p]:text-[17px]">{children}</blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded-[5px] border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.82em] text-fg">
      {children}
    </code>
  ),
  hr: () => <hr className="my-14 border-line" />,
};

export function useMDXComponents(inherited: MDXComponents = {}): MDXComponents {
  return { ...inherited, ...components };
}
