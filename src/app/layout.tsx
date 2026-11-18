import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { profile } from '@/content/profile';
import './globals.css';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kandratsenka.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} · Product engineer`,
    template: `%s · ${profile.name}`,
  },
  description:
    'Product engineer: frontend, fullstack, AI. Ex-Microsoft Principal developer who designs agent systems that build and ship production software.',
  openGraph: {
    type: 'website',
    title: `${profile.name} · Product engineer`,
    description: 'Frontend, fullstack, AI. Case studies, experience and CV.',
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0b0c0f' },
    { media: '(prefers-color-scheme: light)', color: '#fafafb' },
  ],
};

/* Runs before paint: stored choice, else system, else dark. No flash. */
const themeScript = `(function(){try{var d=document.documentElement;d.classList.remove('no-js');var s=localStorage.getItem('theme');var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');d.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`no-js ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        {/* Vercel Analytics only exists on Vercel; elsewhere its script 404s. */}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  );
}
