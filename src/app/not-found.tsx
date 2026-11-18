import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <>
    <Header />
    <section className="mx-auto flex min-h-[60dvh] max-w-6xl flex-col justify-center px-5 py-24 md:px-8">
      <p className="font-mono text-[12px] text-fg-faint">404</p>
      <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] text-fg md:text-[44px]">This page isn’t here.</h1>
      <p className="mt-3 max-w-[48ch] text-[15px] text-fg-muted">The link may be old. The work, the experience and the CV are one click away.</p>
      <Link href="/" className="press mt-8 inline-flex w-fit items-center gap-2 rounded-lg border border-line-strong px-4 py-2 text-[14px] text-fg hover:bg-surface-2 transition-colors">
        <ArrowLeft size={14} /> Back home
      </Link>
    </section>
    <Footer />
    </>
  );
}
