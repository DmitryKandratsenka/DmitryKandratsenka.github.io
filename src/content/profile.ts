/**
 * One home for every fact on the site and in the CV.
 *
 * The home page, the case-study headers, /cv and the generated PDF all read
 * from here, so a date or a number changes in one place. Anything that could
 * not be sourced from the CV or the repositories is wrapped in `[VERIFY]` and
 * shows up highlighted in development (see <Verify />).
 */

export const profile = {
  name: 'Dzmitry Kandratsenka',
  shortName: 'Dzmitry',
  headline: 'Product engineer',
  headlineFocus: ['Frontend', 'Fullstack', 'AI'],
  cvTitle: 'Product Engineer · Frontend, Fullstack, AI',
  location: 'Porto, Portugal',
  availability: 'Remote · Lisbon time (UTC+0)',
  email: 'kandratsenka.dmitry@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/dzmitry-kandratsenka-696059129',
    linkedinLabel: 'linkedin.com/in/dzmitry-kandratsenka-696059129',
    github: 'https://github.com/DmitryKandratsenka',
    githubLabel: 'github.com/DmitryKandratsenka',
  },
  cvFile: '/Dzmitry-Kandratsenka-CV.pdf',
  intro:
    'I have shipped web products since 2014 and led a team of 16 at Microsoft. Today I build my own products end to end, with an agent fleet I designed: 30 scheduled routines that write, review, test and ship code every day.',
  cvSummary:
    'Full-stack product engineer with 11+ years of experience, 9+ of them in TypeScript, React and Node.js (Next.js, NestJS, TypeORM). My focus is the frontend; my range is the whole product, from database schema to CI/CD on Azure DevOps, GitHub Actions and CircleCI. For seven years I have also held Product Owner and Technical Lead roles. Since 2026 I design and run AI agent workflows that build and operate production software: a fleet of 30 scheduled routines that has merged over 3,000 pull requests on my own products.',
} as const;

/** Numbers shown in the hero strip. Keep `asOf` honest when you update them. */
export const heroStats = [
  { value: '2014', label: 'Shipping web products since' },
  { value: '16', label: 'People led at Microsoft, 10 devs + 6 QA' },
  { value: '3,009', label: 'Pull requests merged on Spoonbill in 15 weeks' },
  { value: '6/day', label: 'Production deploys, on a timetable' },
] as const;
export const statsAsOf = '18 Nov 2026';

/** The "Worked at" strip under the hero: names only, no logos, most recognisable first. */
export const workedAt = ['Microsoft', 'Reddit', 'IVC Evidensia', 'Teya', 'Nuance'];

export type Role = {
  title: string;
  company: string;
  companyNote?: string;
  start: string; // MM/YYYY
  end: string | 'Present';
  location: string;
  /** One line for the home-page timeline. */
  summary: string;
  /** Italic paragraph under the dates on the CV (optional). */
  cvContext?: string;
  bullets: string[];
  stack?: string;
  caseStudy?: string;
};

export const experience: Role[] = [
  {
    title: 'Senior Software Developer',
    company: 'IVC Evidensia',
    start: '06/2026',
    end: 'Present',
    location: 'Porto, Portugal',
    summary:
      'Veterinary practice software: the Clinic Portal front end and the booking services behind it.',
    bullets: [
      'Build the Clinic Portal, a React and TypeScript monorepo of feature packages (appointments, prescriptions, medical history, insurance claims) behind a backend-for-frontend.',
      'Work across the stack on the front-of-house calendar and patient services, written in .NET on AWS Lambda.',
      'Ship UI pixel-matched to Figma, with Vitest and Testing Library coverage on every change.',
    ],
    stack: 'React, TypeScript, Vitest, RTL, BFF, .NET, AWS Lambda, Figma',
  },
  {
    title: 'Senior Software Developer',
    company: 'Reddit Inc.',
    start: '07/2025',
    end: '06/2026',
    location: 'Porto, Portugal',
    summary:
      'i18n team. Led Arabic and full right-to-left support, rolled out to 2M+ potential users.',
    bullets: [
      'Designed and executed a feature rollout plan targeting 2M+ potential users, including risk assessment, gradual exposure, monitoring and rollback strategy.',
      'Led implementation of Arabic language support, including full RTL (right-to-left) layout adaptation, typographic adjustments, mirroring logic and accessibility compliance.',
      'Built an opportunity test and experimentation setup to measure the impact of launching Arabic/RTL for global audiences.',
      'Standardised i18n processes with backend, design and localisation teams, cutting time-to-market for new locales.',
      'Improved performance of i18n components by optimising the Lit rendering lifecycle and reducing re-renders and payload sizes.',
    ],
    stack: 'Lit, TypeScript, GraphQL, React Query, feature flags, Jest, Playwright, GitHub Actions',
    caseStudy: 'reddit-rtl',
  },
  {
    title: 'Senior Software Developer',
    company: 'Teya',
    start: '06/2023',
    end: '07/2025',
    location: 'Porto, Portugal',
    summary:
      'Product Owner and Tech Lead on several projects. Micro-frontends, a front-end monorepo, a Playwright testing policy.',
    bullets: [
      'Acted as Product Owner and Technical Lead for multiple projects, delivered from scratch to production.',
      'Developed the micro-frontend architecture to improve scalability across the company.',
      'Created a scalable monorepo for front-end applications and the component library.',
      'Introduced the Playwright automation-testing policy.',
      'Improved front-end performance with GraphQL and React Query; mentored junior to senior engineers.',
    ],
    stack: 'React, Redux, React Query, TypeScript, Next.js, Node.js, GraphQL, Nx, Playwright, CucumberJS, MUI, Docker',
  },
  {
    title: 'Principal Software Developer',
    company: 'Microsoft',
    companyNote: 'Nuance Communications Canada',
    start: '05/2021',
    end: '02/2023',
    location: 'Montreal, Canada',
    summary:
      'Led 10 devs and 6 QA. Module-federation micro-frontends with one sign-in; 3 projects to production.',
    cvContext:
      'The goal was a micro-frontend architecture that let users authenticate once across many independent applications. Code was shared through a component library built on Material UI and documented in Storybook. I led the project from scratch to production, acting as Technical Product Manager, Product Owner, Scrum Master and Technical Lead.',
    bullets: [
      'Led a team of 10 developers and 6 QA engineers.',
      'Delivered 3 projects from scratch to production.',
      'Created a micro-frontend architecture of 3 independent apps using webpack Module Federation.',
      'Created the shared component library for the entire department, documented with Storybook.',
      'Built CI/CD pipelines on Azure DevOps; ran 3-month PI planning for the product.',
      'Automated test coverage of all supported products with Playwright and CucumberJS at 90%.',
    ],
    stack: 'React, Redux, React Query, TypeScript, Node.js, Express, Module Federation, Nx, Playwright, CucumberJS, Azure, MUI, Storybook',
    caseStudy: 'microsoft-micro-frontends',
  },
  {
    title: 'Software Developer → Senior Software Developer',
    company: 'Nuance Communications',
    start: '08/2016',
    end: '05/2021',
    location: 'Minsk, Belarus',
    summary:
      'Grew from developer to tech lead. Migrated a legacy ActionScript app alone, then led the move of all UIs to React.',
    cvContext:
      'Joined as a full-stack developer (Java, Spring, JavaScript). Migrated a legacy ActionScript application to JavaScript and HTML5 on my own, then took over its team as Technical Lead and Product Owner. As a senior I led the initiative to move all of the company’s UI applications to React.',
    bullets: [
      'Led the initiative to migrate all front-end applications to React; Product Owner of the first project to make the move.',
      'Led a team of 5 developers and 5 QA engineers as Technical Lead, Product Owner and Scrum Master.',
      'Migrated a legacy ActionScript application to JavaScript and HTML5 single-handedly, and built its Java APIs.',
      'Led coding-style unification across all teams and wrote its documentation.',
      'Primary code reviewer; conducted technical interviews.',
    ],
    stack: 'React, Redux, TypeScript, JavaScript, Java, Spring Boot, Node.js, Playwright, Jest, Webpack',
  },
  {
    title: 'Junior Software Developer',
    company: 'IPPS',
    start: '12/2014',
    end: '08/2016',
    location: 'Minsk, Belarus',
    summary: 'Full-stack on financial products: Java, Spring MVC, JSP, MySQL.',
    bullets: [
      'Full-stack development of financial products with Java, Spring, Spring MVC, JSP and plain JavaScript.',
      'Worked with MySQL databases; mentored new team members.',
    ],
    stack: 'Java, Spring MVC, JSP, JavaScript, MySQL',
  },
];

export type Venture = {
  name: string;
  role: string;
  start: string;
  end: string | 'Present';
  url: string;
  urlLabel: string;
  summary: string;
  bullets: string[];
  stack: string;
  caseStudy?: string;
};

export const ventures: Venture[] = [
  {
    name: 'Spoonbill',
    role: 'Founder',
    start: '08/2026',
    end: 'Present',
    url: 'https://spoonbill.app',
    urlLabel: 'spoonbill.app',
    summary:
      'Invoicing for freelancers in Germany, Austria and Switzerland, with legal e-invoices. Built and run by my agent fleet.',
    bullets: [
      'Designed an agent fleet of scheduled routines (developers, reviewers, designer, QA, SEO, triage) that merged 3,009 pull requests in 15 weeks.',
      'Built a shared tax engine for DE/AT/CH consumed by API, web and mobile; ZUGFeRD and XRechnung validated against EN 16931.',
      'Shipped web, landing and an iOS app (App Store, Nov 2026) from one Nx monorepo in 7 languages.',
    ],
    stack: 'NestJS, MySQL, React, Vite, Next.js, Expo, Nx, Stripe Connect, Firebase Auth, CircleCI, Docker',
    caseStudy: 'spoonbill',
  },
  {
    name: 'Sklad',
    role: 'Co-founder & CTO',
    start: '01/2022',
    end: 'Present',
    url: 'https://sklad.app',
    urlLabel: 'sklad.app',
    summary:
      'Inventory management for small businesses on iPhone, iPad, Mac and web, in 14 languages.',
    bullets: [
      'Own the architecture from MVP to production; built the web app from scratch (Next.js, React, MUI) with Firebase Auth, Stripe and StoreKit billing.',
      'Led the migration from serverless cloud functions to a NestJS backend; MySQL schema, migrations and performance.',
    ],
    stack: 'NestJS, TypeORM, MySQL, Next.js, React, MUI, Firebase, Stripe, SwiftUI',
  },
];

export const alsoBuilt = [
  {
    name: 'CatDog',
    kind: 'AI audio app',
    year: '2026',
    description:
      'Record your cat or dog and hear what it is "saying". An audio model listens to the clip, a second pass returns a structured interpretation with a confidence score, and a voice endpoint reads it back.',
    detail:
      'I built the backend and the site: usage allowances, per-request cost tracking, history. Shares the AI backend with Mealfy; iOS app built with a teammate.',
    stack: ['NestJS', 'Audio LLM', 'Structured outputs', 'Next.js'],
  },
  {
    name: 'Mealfy AI',
    kind: 'AI backend',
    year: '2025 —',
    description:
      'NestJS API that generates meals, menus and nutrition data with an LLM, with per-user usage limits and App Check so the model bill cannot be farmed.',
    detail: 'Serves the Mealfy iOS app and site.',
    stack: ['NestJS', 'LLM API', 'Firebase App Check', 'MySQL'],
    url: 'https://mealfy.app',
  },
  {
    name: 'lead-trail',
    kind: 'LLM pipeline',
    year: '2026',
    description:
      'Read-only lead finder: watches Reddit, Telegram, Discourse, YouTube and RSS, has an LLM classify each post and draft a reply, and reports to a Telegram bot.',
    detail: 'Finds people asking for the products I build. Drafts only, a human posts.',
    stack: ['Node 24', 'TypeScript', 'LLM API', 'Telegram Bot API'],
  },
] as const;

export const caseStudies = [
  {
    slug: 'agent-fleet',
    index: '01',
    eyebrow: 'AI workflows',
    title: 'An engineering team made of scheduled agents',
    summary:
      '30 routines with lanes, merge authority, claims and a clock. They build, review, test and ship two products while I make the calls only a human should.',
    period: 'Aug 2026 — present',
    role: 'Designer and operator',
    metrics: [
      { value: '3,009', label: 'PRs merged' },
      { value: '46', label: 'PRs merged in one day' },
      { value: '30', label: 'Routines' },
    ],
  },
  {
    slug: 'spoonbill',
    index: '02',
    eyebrow: 'Full-stack product',
    title: 'Invoicing that holds up under German e‑invoicing law',
    summary:
      'One Nx monorepo: NestJS API, React web app, Next.js landing, Expo iOS app, and a shared tax engine for Germany, Austria and Switzerland.',
    period: 'Aug 2026 — present',
    role: 'Founder, sole engineer',
    metrics: [
      { value: '4', label: 'Apps, one shared core' },
      { value: '7', label: 'Languages' },
      { value: '879', label: 'Test files' },
    ],
  },
  {
    slug: 'reddit-rtl',
    index: '03',
    eyebrow: 'Frontend at scale',
    title: 'Right‑to‑left at Reddit, made hard to break',
    summary:
      'I led Arabic support on Reddit’s web app, then made it stick across teams with one approach, a codemod, a lint rule in CI and a staged rollout to 2M+ users.',
    period: 'Jul 2025 — Jun 2026',
    role: 'Senior Software Developer, i18n',
    metrics: [
      { value: '2M+', label: 'Users in the rollout' },
      { value: 'Live', label: 'Arabic launched' },
      { value: 'CI', label: 'Lint guards every team' },
    ],
  },
  {
    slug: 'microsoft-micro-frontends',
    index: '04',
    eyebrow: 'Frontend leadership',
    title: 'Micro‑frontends with one sign‑in, and the team to ship them',
    summary:
      'At Microsoft (Nuance) I led 10 developers and 6 QA through a Module Federation architecture, a department-wide component library and 3 launches.',
    period: 'May 2021 — Feb 2023',
    role: 'Principal Software Developer',
    metrics: [
      { value: '16', label: 'People led' },
      { value: '3', label: 'Projects to production' },
      { value: '90%', label: 'E2E coverage' },
    ],
  },
] as const;

export type CaseStudySlug = (typeof caseStudies)[number]['slug'];

export const cvSkills = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'NestJS', 'TypeORM',
  'MySQL', 'Redux', 'React Query', 'GraphQL', 'React Native',
  'Micro Frontend', 'Nx', 'AI agents', 'LLM APIs', 'Playwright',
  'CucumberJS', 'Jest', 'Storybook', 'Docker', 'GitHub Actions',
  'Azure DevOps', 'Team Lead', 'Product Owner',
];

export const cvLanguages = [
  { name: 'English', level: 'Full Professional Proficiency' },
  { name: 'Russian', level: 'Native or Bilingual Proficiency' },
  { name: 'German', level: 'Elementary Proficiency' },
];

export const cvInterests = ['Chess', 'Soccer', 'Kitesurfing'];

/* Sidebar, page 2 onwards: the strongest numbers, scannable in seconds. */
export const cvHighlights = [
  { value: '16', label: 'People led at Microsoft, 10 devs + 6 QA' },
  { value: '3,009', label: 'PRs merged by my agent fleet in 15 weeks' },
  { value: '2M+', label: 'Users in the Reddit Arabic/RTL rollout plan' },
  { value: '90%', label: 'E2E coverage, Playwright + CucumberJS' },
  { value: '6/day', label: 'Production deploys on Spoonbill' },
];

/* From the original CV's Achievements section. */
export const cvAchievements = [
  'Led a team of 10 developers and 6 QA engineers (Microsoft, 2021–2023)',
  'Built a financial web app alone, from scratch to production (2016–2020)',
  'Delivered multiple web applications from scratch to production as Technical Lead and Product Owner',
  'Designed a 30-routine AI agent fleet that builds and ships two products',
];

export const cvProjects = [
  { name: 'Mealfy AI', note: 'NestJS API generating meals and nutrition with an LLM, with usage limits and App Check' },
  { name: 'lead-trail', note: 'LLM pipeline that finds and classifies leads across Reddit, Telegram and forums' },
  { name: 'Vendor Interface', note: 'Financial SPA built solo: Java, Spring Boot, React, MySQL (2016–2020)' },
];

export const cvOnline = [
  { label: 'Portfolio and case studies', value: 'dmitrykandratsenka.github.io', href: 'https://dmitrykandratsenka.github.io' },
  { label: 'Spoonbill', value: 'spoonbill.app', href: 'https://spoonbill.app' },
  { label: 'Sklad', value: 'sklad.app', href: 'https://sklad.app' },
];

export const education = {
  degree: 'Information technology software, Bachelor’s degree',
  school: 'Belarusian State University of Informatics and Radioelectronics',
  start: '09/2011',
  end: '05/2016',
  location: 'Minsk, Belarus',
};

export function formatPeriod(start: string, end: string) {
  return `${start} - ${end}`;
}

/** "06/2026" -> "Jun 2026" for the site; the CV keeps MM/YYYY. */
export function humanDate(mmYYYY: string) {
  if (mmYYYY === 'Present') return 'Now';
  const [m, y] = mmYYYY.split('/');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[Number(m) - 1]} ${y}`;
}

export function yearOf(mmYYYY: string) {
  return mmYYYY === 'Present' ? 'Now' : mmYYYY.split('/')[1];
}
