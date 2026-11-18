import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import {
  cvAchievements,
  cvHighlights,
  cvInterests,
  cvLanguages,
  cvOnline,
  cvProjects,
  cvSkills,
  education,
  experience,
  profile,
  ventures,
} from '@/content/profile';
import { CvToolbar } from './CvToolbar';
import { Rich } from '@/components/Rich';
import './cv.css';

/**
 * The CV, rebuilt in the design of the original PDF: slate sidebar with the
 * two-tone teal stripe, Roboto, grey skill chips, round icon badges and a
 * dotted timeline. One source of truth with the site; the PDF is printed from
 * this page by scripts/cv-pdf.mjs. The phone number is left out on purpose.
 */

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], style: ['normal', 'italic'], variable: '--font-roboto' });

export const metadata: Metadata = {
  title: 'CV',
  description: `${profile.name}: CV`,
  alternates: { canonical: '/cv/' },
};

/* Icons, drawn to match the original's simple line glyphs. */
const I = {
  mail: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M3 5h18v14H3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 6l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M12 21s-6-6.2-6-11a6 6 0 1112 0c0 4.8-6 11-6 11z" fill="currentColor" />
      <circle cx="12" cy="10" r="2.2" fill="#313c4e" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7.5 10v6.5M7.5 7.3v.2M11 16.5V10m0 3c0-2 1.2-3 2.6-3 1.5 0 2.4 1 2.4 3v3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3a9 9 0 00-2.8 17.5c.4.1.6-.2.6-.4v-1.6c-2.5.5-3-1.1-3-1.1-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .3-1.8 1-2.4-.1-.2-.4-1.2.1-2.4 0 0 .8-.3 2.5 1a8.6 8.6 0 014.5 0c1.7-1.3 2.5-1 2.5-1 .5 1.2.2 2.2.1 2.4.6.6 1 1.4 1 2.4 0 3.5-2.1 4.2-4.1 4.4.3.3.6.8.6 1.6v2.4c0 .2.2.5.6.4A9 9 0 0012 3z"
        fill="currentColor"
      />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M8 4v6M6 4v3a2 2 0 004 0V4M8 10v10M15 4c2 0 3 2 3 4.5S17 12 16 12v8M16 4v16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  lang: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="4" width="12" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 15v4l3-4h7a2 2 0 002-2V8h-2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 8h6M9 7v1c0 2-1.5 3.5-3 4M8 10c1 1 2 1.6 3.4 2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  interests: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M9 20h8M10 17h6l-1-5 2-2-2-4-3-1-4 4 2 3-1 5z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  edu: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 6h14v8H4zM7 14v4M15 14v4M4 6l-1 0M18 10h3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3.5" y="7" width="17" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 7V5h6v2M3.5 12h17M10.5 12v2h3v-2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 20h16M7 16v-5M12 16V6M17 16v-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M8 4h8v5a4 4 0 01-8 0V4zM8 6H5v1a3 3 0 003 3M16 6h3v1a3 3 0 01-3 3M12 13v4M9 20h6M10 17h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M14 4c3 0 6 3 6 6l-6 6-6-6 6-6zM8 10l-3 1-2 3 4 0M14 16l-1 3-3 2 0-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="15" cy="9" r="1.4" fill="currentColor" />
    </svg>
  ),
};

function MainHeading({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="cv-mhead">
      <span className="cv-badge-dark">{icon}</span>
      <h2>{children}</h2>
    </div>
  );
}

function SideHeading({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="cv-shead">
      <span className="cv-badge-light">{icon}</span>
      <h2>{children}</h2>
    </div>
  );
}

function Entry({
  title,
  org,
  dates,
  location,
  context,
  bullets,
  stack,
}: {
  title: string;
  org: string;
  dates: string;
  location: string;
  context?: string;
  bullets: string[];
  stack?: string;
}) {
  return (
    <div className="cv-entry">
      <span className="cv-dot" aria-hidden />
      <div className="cv-entry-head">
        <h3>{title}</h3>
        <p className="cv-org">{org}</p>
        <p className="cv-meta">
          <span>{dates}</span>
          <span>{location}</span>
        </p>
      </div>
      {context && <p className="cv-context">{context}</p>}
      <p className="cv-label">Achievements/Tasks</p>
      <ul>
        {bullets.map((b) => (
          <li key={b}>
            <Rich text={b} />
          </li>
        ))}
        {stack && <li>Stack: {stack}</li>}
      </ul>
    </div>
  );
}

export default function CvPage() {
  return (
    <div className={`cv-root ${roboto.variable}`}>
      <CvToolbar file={profile.cvFile} />
      <div className="cv-sheet">
        {/* Repeats on every printed page (position: fixed in print). */}
        <div className="cv-rail" aria-hidden>
          <span className="cv-stripe-a" />
          <span className="cv-stripe-b" />
        </div>

        <aside className="cv-side">
          <ul className="cv-contact">
            <li>
              <span className="cv-ico">{I.mail}</span>
              <a href={`mailto:${profile.email}`}>
                {profile.email.split('@')[0]}@
                <wbr />
                {profile.email.split('@')[1]}
              </a>
            </li>
            <li>
              <span className="cv-ico">{I.pin}</span>
              <span>{profile.location}</span>
            </li>
            <li>
              <span className="cv-ico">{I.linkedin}</span>
              <a href={profile.links.linkedin}>{profile.links.linkedinLabel}</a>
            </li>
            <li>
              <span className="cv-ico">{I.github}</span>
              <a href={profile.links.github}>
                github.com/
                <wbr />
                {profile.links.githubLabel.replace('github.com/', '')}
              </a>
            </li>
          </ul>

          <SideHeading icon={I.skills}>Skills</SideHeading>
          <ul className="cv-chips">
            {cvSkills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <SideHeading icon={I.lang}>Languages</SideHeading>
          <ul className="cv-langs">
            {cvLanguages.map((l) => (
              <li key={l.name}>
                <span>{l.name}</span>
                <em>{l.level}</em>
              </li>
            ))}
          </ul>

          <SideHeading icon={I.interests}>Interests</SideHeading>
          <ul className="cv-chips cv-chips-outline">
            {cvInterests.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          {/* Page 2 onwards in print; straight after Interests on screen. */}
          <div className="cv-side-more">
            <section className="cv-side-sec">
              <SideHeading icon={I.chart}>Numbers</SideHeading>
              <dl className="cv-stats">
                {cvHighlights.map((h) => (
                  <div key={h.label}>
                    <dt>{h.label}</dt>
                    <dd>{h.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="cv-side-sec">
              <SideHeading icon={I.trophy}>Achievements</SideHeading>
              <ul className="cv-side-list">
                {cvAchievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>

            <section className="cv-side-sec">
              <SideHeading icon={I.rocket}>Projects</SideHeading>
              <ul className="cv-side-projects">
                {cvProjects.map((p) => (
                  <li key={p.name}>
                    <span>{p.name}</span>
                    <em>{p.note}</em>
                  </li>
                ))}
              </ul>
            </section>

            <section className="cv-side-sec">
              <SideHeading icon={I.globe}>Online</SideHeading>
              <ul className="cv-side-projects">
                {cvOnline.map((o) => (
                  <li key={o.label}>
                    <span>{o.label}</span>
                    <a href={o.href}>{o.value}</a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </aside>

        <main className="cv-main">
          <table className="cv-pagetable" role="presentation">
            <thead>
              <tr>
                <td />
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td />
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td>
          <header className="cv-head">
            <h1>{profile.name}</h1>
            <p className="cv-title">{profile.cvTitle}</p>
            <p className="cv-summary">{profile.cvSummary}</p>
          </header>

          <section>
            <MainHeading icon={I.edu}>Education</MainHeading>
            <div className="cv-entry cv-entry-edu">
              <span className="cv-dot" aria-hidden />
              <h3>{education.degree}</h3>
              <p className="cv-org">{education.school}</p>
              <p className="cv-meta">
                <span>
                  {education.start} - {education.end}
                </span>
                <span>{education.location}</span>
              </p>
            </div>
          </section>

          <section>
            <MainHeading icon={I.work}>Work Experience</MainHeading>
            {experience.map((r) => (
              <Entry
                key={r.company}
                title={r.title}
                org={r.companyNote ? `${r.company} (${r.companyNote})` : r.company}
                dates={`${r.start} - ${r.end}`}
                location={r.location}
                context={r.cvContext}
                bullets={r.bullets}
                stack={r.stack}
              />
            ))}
          </section>

          <section>
            <MainHeading icon={I.rocket}>Ventures</MainHeading>
            {ventures.map((v) => (
              <Entry
                key={v.name}
                title={v.role}
                org={`${v.name} · ${v.urlLabel}`}
                dates={`${v.start} - ${v.end}`}
                location="Porto, Portugal"
                bullets={v.bullets}
                stack={v.stack}
              />
            ))}
          </section>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
