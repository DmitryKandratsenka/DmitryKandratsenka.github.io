import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RevealObserver } from '@/components/RevealObserver';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="backdrop-dots pointer-events-none fixed inset-x-0 top-0 h-[80vh]" />
      <div id="top-sentinel" aria-hidden className="absolute top-0 h-px w-px" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="relative">
        {children}
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
