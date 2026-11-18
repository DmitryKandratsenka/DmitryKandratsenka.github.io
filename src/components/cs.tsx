import { Rich } from './Rich';

/** Building blocks for case-study MDX. Server components, no JS shipped. */

export function Decision({
  n,
  title,
  children,
  tradeoff,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  tradeoff?: string;
}) {
  return (
    <section data-reveal className="my-6 rounded-xl border border-line bg-bg-raised p-5 md:p-6">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] text-accent">{n}</span>
        <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-fg">{title}</h3>
      </div>
      <div className="mt-2 [&_p]:my-2 [&_p]:text-[15px] [&_li]:text-[15px]">{children}</div>
      {tradeoff && (
        <p className="mt-4 border-t border-line pt-3 text-[13px] leading-relaxed text-fg-faint">
          <span className="font-mono text-[10.5px] uppercase tracking-wider text-fg-muted">Trade-off</span>
          <span className="mx-2 text-line-strong">/</span>
          <Rich text={tradeoff} />
        </p>
      )}
    </section>
  );
}

export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl
      data-reveal
      className="my-10 grid grid-cols-2 overflow-hidden rounded-xl border border-line md:grid-cols-4"
    >
      {items.map((s, i) => (
        <div
          key={s.label}
          className={`flex flex-col bg-bg-raised/60 p-4 md:p-5 ${i % 2 ? 'border-l border-line' : ''} ${
            i >= 2 ? 'border-t border-line md:border-t-0' : ''
          } ${i === 2 ? 'md:border-l' : ''}`}
        >
          <dt className="order-2 mt-1 text-[12px] leading-snug text-fg-muted">{s.label}</dt>
          <dd className="font-mono text-[22px] font-medium text-fg tabular-nums">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Figure({ children, caption }: { children: React.ReactNode; caption?: string }) {
  return (
    <div className="my-10 md:-mx-10 lg:-mx-24">
      {children}
      {caption && <p className="mt-3 px-1 text-[12px] leading-relaxed text-fg-faint">{caption}</p>}
    </div>
  );
}

export function Lesson({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="my-5 grid gap-1 border-l border-line-strong pl-5">
      <p className="text-[15px] font-medium text-fg">{title}</p>
      <div className="[&_p]:my-1 [&_p]:text-[15px]">{children}</div>
    </div>
  );
}
