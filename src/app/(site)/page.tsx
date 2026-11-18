import Link from 'next/link';
import { ArrowRight, ArrowUpRight, DownloadSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import {
  alsoBuilt,
  caseStudies,
  experience,
  heroStats,
  humanDate,
  profile,
  statsAsOf,
  ventures,
  yearOf,
} from '@/content/profile';
import { Pipeline } from '@/components/Pipeline';
import { Spotlight } from '@/components/Spotlight';
import { HoverList } from '@/components/HoverList';
import { CopyEmail } from '@/components/CopyEmail';
import { Rich } from '@/components/Rich';
import { LaneChart } from '@/components/diagrams/LaneChart';
import { SpoonbillArch } from '@/components/diagrams/SpoonbillArch';
import { FederationDiagram } from '@/components/diagrams/FederationDiagram';

function SectionHead({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div data-reveal className="mb-10 flex items-end justify-between gap-6 border-b border-line pb-4">
      <h2 className="flex items-baseline gap-3 text-[15px] font-medium tracking-tight text-fg">
        <span className="font-mono text-[11px] text-fg-faint">{index}</span>
        {title}
      </h2>
      {note && <p className="hidden text-[12px] text-fg-faint sm:block">{note}</p>}
    </div>
  );
}

const visuals = {
  'agent-fleet': <LaneChart compact />,
  spoonbill: <SpoonbillArch compact />,
  'microsoft-micro-frontends': <FederationDiagram compact />,
} as const;

export default function Home() {
  const [lead, ...rest] = caseStudies;

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:px-8 md:pb-12 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p
              className="rise mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-[12px] text-fg-muted"
              style={{ ['--i' as string]: 0 }}
            >
              <span className="size-1.5 rounded-full bg-ok" aria-hidden />
              {profile.location} · {profile.availability}
            </p>
            <h1
              className="rise text-[38px] font-semibold leading-[1.04] tracking-[-0.035em] text-fg [text-wrap:balance] sm:text-[44px] lg:text-[52px]"
              style={{ ['--i' as string]: 1 }}
            >
              {profile.headline}.
              <span className="block text-fg-muted [text-wrap:balance]">{profile.headlineFocus.join(', ')}.</span>
            </h1>
            <p
              className="rise mt-6 max-w-[52ch] text-[16px] leading-relaxed text-fg-muted md:text-[17px]"
              style={{ ['--i' as string]: 2 }}
            >
              {profile.intro}
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ ['--i' as string]: 3 }}>
              <a
                href={`mailto:${profile.email}`}
                className="press nudge-on-hover inline-flex h-10 items-center gap-2 rounded-lg bg-fg px-4 text-[14px] font-medium text-bg transition-opacity duration-200 hover:opacity-90"
              >
                Get in touch
                <ArrowRight size={15} className="nudge" />
              </a>
              <a
                href={profile.cvFile}
                download
                className="press inline-flex h-10 items-center gap-2 rounded-lg border border-line-strong bg-surface/60 px-4 text-[14px] font-medium text-fg transition-colors duration-200 hover:bg-surface-2"
              >
                <DownloadSimple size={15} />
                Download CV
              </a>
              <span className="mx-1 hidden h-5 w-px bg-line sm:block" aria-hidden />
              <a
                href={profile.links.linkedin}
                aria-label="LinkedIn"
                className="press hidden size-10 sm:grid place-items-center rounded-lg text-fg-muted transition-colors hover:text-fg"
              >
                <LinkedinLogo size={18} />
              </a>
              <a
                href={profile.links.github}
                aria-label="GitHub"
                className="press hidden size-10 sm:grid place-items-center rounded-lg text-fg-muted transition-colors hover:text-fg"
              >
                <GithubLogo size={18} />
              </a>
            </div>
          </div>

          <div className="rise" style={{ ['--i' as string]: 3 }}>
            <Pipeline />
            <p className="mt-3 px-1 text-[11.5px] text-fg-faint">
              A replay of one run of my developer lane. The stages are real; the ticket is an example.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <dl
          data-reveal
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-line md:mt-20 md:grid-cols-4"
        >
          {heroStats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col bg-bg-raised/50 px-5 py-5 md:px-6 md:py-6 ${i % 2 === 1 ? 'border-l border-line' : ''} ${
                i >= 2 ? 'border-t border-line md:border-t-0' : ''
              } ${i === 2 ? 'md:border-l' : ''}`}
            >
              <dt className="order-2 mt-1.5 text-[12.5px] leading-snug text-fg-muted">{s.label}</dt>
              <dd className="font-mono text-[26px] font-medium tracking-tight text-fg tabular-nums md:text-[30px]">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 px-1 text-[11px] text-fg-faint">Numbers as of {statsAsOf}.</p>
      </section>

      {/* ───────────── Selected work ───────────── */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 md:px-8 md:py-24">
        <SectionHead index="01" title="Selected work" note="Three case studies, read in about 5 minutes each" />

        <Spotlight as="article" className="group rounded-2xl border border-line bg-bg-raised">
          <Link
            href={`/work/${lead.slug}/`}
            className="nudge-on-hover grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12"
          >
            <div className="flex flex-col">
              <p className="font-mono text-[11px] text-fg-faint">
                {lead.index} · <span className="text-accent">{lead.eyebrow}</span>
              </p>
              <h3 className="mt-3 text-[24px] font-semibold leading-tight tracking-[-0.02em] text-fg md:text-[30px]">
                {lead.title}
              </h3>
              <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-fg-muted">{lead.summary}</p>
              <dl className="mt-6 flex gap-8">
                {lead.metrics.map((m) => (
                  <div key={m.label}>
                    <dd className="font-mono text-[20px] font-medium text-fg tabular-nums">{m.value}</dd>
                    <dt className="mt-0.5 text-[12px] text-fg-muted">{m.label}</dt>
                  </div>
                ))}
              </dl>
              <span className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-medium text-fg lg:mt-auto lg:pt-8">
                Read the case study <ArrowRight size={14} className="nudge" />
              </span>
            </div>
            <div className="self-center rounded-xl border border-line bg-surface/60 p-4 md:p-5">
              <p className="mb-3 font-mono text-[10.5px] text-fg-faint">One day of the fleet, 00:00 → 24:00</p>
              {visuals[lead.slug]}
            </div>
          </Link>
        </Spotlight>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((cs, i) => (
            <Spotlight
              key={cs.slug}
              as="article"
              className="group rounded-2xl border border-line bg-bg-raised"
            >
              <Link
                href={`/work/${cs.slug}/`}
                data-reveal
                style={{ ['--i' as string]: i }}
                className="nudge-on-hover flex h-full flex-col p-6 md:p-8"
              >
                <p className="font-mono text-[11px] text-fg-faint">
                  {cs.index} · <span className="text-accent">{cs.eyebrow}</span>
                </p>
                <h3 className="mt-3 text-[20px] font-semibold leading-snug tracking-[-0.015em] text-fg [text-wrap:balance] md:text-[22px]">
                  {cs.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-fg-muted">{cs.summary}</p>
                <div className="mt-6 rounded-xl border border-line bg-surface/60 p-4">{visuals[cs.slug]}</div>
                <div className="mt-6 flex items-end justify-between gap-4 pt-1">
                  <dl className="flex gap-6">
                    {cs.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <dd className="font-mono text-[17px] font-medium text-fg tabular-nums">{m.value}</dd>
                        <dt className="mt-0.5 text-[11.5px] text-fg-muted">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                  <ArrowRight size={16} className="nudge mb-1 shrink-0 text-fg-muted" aria-hidden />
                </div>
              </Link>
            </Spotlight>
          ))}
        </div>
      </section>

      {/* ───────────── Experience ───────────── */}
      <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 md:px-8 md:py-24">
        <SectionHead index="02" title="Experience" note={`Since 2014 · ${experience.length} companies`} />
        <div className="grid gap-12 lg:grid-cols-[1fr_2.2fr] lg:gap-16">
          <div data-reveal className="lg:sticky lg:top-24 lg:self-start">
            <p className="max-w-[34ch] text-[15px] leading-relaxed text-fg-muted">
              Twelve years across product companies, from a junior Java developer in Minsk to a Principal at
              Microsoft. Product Owner and Tech Lead for most of them.
            </p>
            <a
              href={profile.cvFile}
              download
              className="press mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-fg hover:text-accent transition-colors"
            >
              <DownloadSimple size={14} /> Full CV, PDF
            </a>
          </div>

          <div>
            <HoverList
              className="-my-1"
              items={experience.map((r) => {
                const row = (
                  <div className="grid grid-cols-[84px_1fr] gap-4 py-4 md:grid-cols-[110px_1fr] md:gap-6">
                    <p className="pt-0.5 font-mono text-[11.5px] text-fg-faint tabular-nums">
                      {yearOf(r.start)} — {yearOf(r.end)}
                    </p>
                    <div>
                      <p className="text-[15px] font-medium text-fg">
                        {r.company}
                        {r.companyNote && <span className="font-normal text-fg-faint"> · {r.companyNote}</span>}
                      </p>
                      <p className="mt-0.5 text-[13px] text-fg-muted">
                        {r.title} · {r.location}
                      </p>
                      <p className="mt-2 max-w-[60ch] text-[14px] leading-relaxed text-fg-muted">
                        <Rich text={r.summary} />
                      </p>
                      {r.caseStudy && (
                        <span className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-medium text-accent">
                          Case study <ArrowRight size={12} className="nudge" />
                        </span>
                      )}
                    </div>
                  </div>
                );
                return r.caseStudy ? (
                  <Link key={r.company} href={`/work/${r.caseStudy}/`} className="nudge-on-hover block">
                    {row}
                  </Link>
                ) : (
                  <div key={r.company}>{row}</div>
                );
              })}
            />

            <div data-reveal className="mt-12">
              <p className="mb-2 flex items-baseline gap-3 border-b border-line pb-3 text-[13px] font-medium text-fg">
                Ventures
                <span className="font-normal text-fg-faint">Alongside the day job</span>
              </p>
              <HoverList
                items={ventures.map((v) => (
                  <a
                    key={v.name}
                    href={v.url}
                    className="nudge-on-hover grid grid-cols-[84px_1fr] gap-4 py-4 md:grid-cols-[110px_1fr] md:gap-6"
                  >
                    <p className="pt-0.5 font-mono text-[11.5px] text-fg-faint tabular-nums">
                      {yearOf(v.start)} — {yearOf(v.end)}
                    </p>
                    <div>
                      <p className="flex items-center gap-1.5 text-[15px] font-medium text-fg">
                        {v.name}
                        <ArrowUpRight size={13} className="nudge text-fg-faint" />
                      </p>
                      <p className="mt-0.5 text-[13px] text-fg-muted">
                        {v.role} · {v.urlLabel}
                      </p>
                      <p className="mt-2 max-w-[60ch] text-[14px] leading-relaxed text-fg-muted">{v.summary}</p>
                    </div>
                  </a>
                ))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Also built ───────────── */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionHead index="03" title="Also built" note="Products and tools of my own" />
        <div className="-mt-4 divide-y divide-line border-b border-line">
          {alsoBuilt.map((p, i) => {
            const inner = (
              <div className="grid gap-3 py-6 md:grid-cols-[200px_1fr_auto] md:gap-8">
                <div>
                  <p className="flex items-center gap-1.5 text-[15px] font-medium text-fg">
                    {p.name}
                    {'url' in p && <ArrowUpRight size={13} className="nudge text-fg-faint" />}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-fg-faint">
                    {p.kind} · {p.year}
                  </p>
                </div>
                <div>
                  <p className="max-w-[62ch] text-[14px] leading-relaxed text-fg-muted">{p.description}</p>
                  <p className="mt-1.5 text-[13px] text-fg-faint">
                    <Rich text={p.detail} />
                  </p>
                </div>
                <ul className="flex flex-wrap content-start gap-1.5 md:max-w-[220px] md:justify-end">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[10.5px] text-fg-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            );
            return (
              <div key={p.name} data-reveal style={{ ['--i' as string]: i }}>
                {'url' in p ? (
                  <a href={p.url} className="nudge-on-hover block transition-colors hover:bg-surface/40">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ───────────── Contact ───────────── */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24 pt-8 md:px-8 md:pb-32">
        <div
          data-reveal
          className="relative overflow-hidden rounded-2xl border border-line bg-bg-raised px-6 py-12 md:px-12 md:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent-soft blur-3xl"
          />
          <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <h2 className="text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-fg md:text-[40px]">
                Building something hard?
                <span className="block text-fg-muted">Let’s talk.</span>
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-fg-muted">
                Frontend craft, product ownership and AI workflows: that’s where I do my best work. Email is
                the fastest way to reach me.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <CopyEmail email={profile.email} />
              <div className="flex gap-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="press nudge-on-hover inline-flex h-10 items-center gap-2 rounded-lg bg-fg px-4 text-[14px] font-medium text-bg hover:opacity-90 transition-opacity"
                >
                  Write an email <ArrowRight size={15} className="nudge" />
                </a>
                <a
                  href={profile.cvFile}
                  download
                  className="press inline-flex h-10 items-center gap-2 rounded-lg border border-line-strong px-4 text-[14px] font-medium text-fg hover:bg-surface-2 transition-colors"
                >
                  <DownloadSimple size={15} /> CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
