import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { caseStudies, type CaseStudySlug } from '@/content/profile';

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.summary,
    alternates: { canonical: `/work/${cs.slug}/` },
    openGraph: { title: cs.title, description: cs.summary },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  const cs = caseStudies[i];
  const next = caseStudies[(i + 1) % caseStudies.length];
  const { default: Body } = await import(`@/content/work/${slug as CaseStudySlug}.mdx`);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8 md:pt-16">
      <Link
        href="/#work"
        className="press nudge-on-hover inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft size={13} /> All work
      </Link>

      <header className="mt-10 grid gap-10 border-b border-line pb-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
        <div>
          <p className="rise font-mono text-[11px] text-fg-faint" style={{ ['--i' as string]: 0 }}>
            {cs.index} · <span className="text-accent">{cs.eyebrow}</span>
          </p>
          <h1
            className="rise mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-fg [text-wrap:balance] md:text-[48px]"
            style={{ ['--i' as string]: 1 }}
          >
            {cs.title}
          </h1>
          <p
            className="rise mt-5 max-w-[56ch] text-[17px] leading-relaxed text-fg-muted"
            style={{ ['--i' as string]: 2 }}
          >
            {cs.summary}
          </p>
        </div>
        <dl className="rise grid content-end gap-5 text-[13px]" style={{ ['--i' as string]: 3 }}>
          <div className="grid grid-cols-[88px_1fr] gap-3 border-t border-line pt-4">
            <dt className="text-fg-faint">Role</dt>
            <dd className="text-fg">{cs.role}</dd>
          </div>
          <div className="grid grid-cols-[88px_1fr] gap-3 border-t border-line pt-4">
            <dt className="text-fg-faint">Period</dt>
            <dd className="text-fg">{cs.period}</dd>
          </div>
          <div className="grid grid-cols-3 gap-3 border-t border-line pt-4">
            {cs.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <dt className="order-2 mt-0.5 text-[11.5px] text-fg-muted">{m.label}</dt>
                <dd className="font-mono text-[20px] font-medium text-fg tabular-nums">{m.value}</dd>
              </div>
            ))}
          </div>
        </dl>
      </header>

      <div className="mx-auto max-w-[680px] pt-4">
        <Body />
      </div>

      <footer className="mx-auto mt-24 max-w-[680px] border-t border-line pt-8">
        <p className="font-mono text-[11px] text-fg-faint">Next case study</p>
        <Link
          href={`/work/${next.slug}/`}
          className="nudge-on-hover group mt-3 flex items-center justify-between gap-6"
        >
          <span className="text-[20px] font-semibold tracking-[-0.015em] text-fg transition-colors group-hover:text-accent md:text-[24px]">
            {next.title}
          </span>
          <ArrowRight size={20} className="nudge shrink-0 text-fg-muted" />
        </Link>
      </footer>
    </article>
  );
}
