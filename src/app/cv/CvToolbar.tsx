'use client';

import Link from 'next/link';
import { ArrowLeft, DownloadSimple, Printer } from '@phosphor-icons/react';

export function CvToolbar({ file }: { file: string }) {
  return (
    <nav className="cv-toolbar" aria-label="CV actions">
      <Link href="/">
        <ArrowLeft size={14} /> Site
      </Link>
      <button type="button" onClick={() => window.print()}>
        <Printer size={14} /> Print
      </button>
      <a href={file} download className="cv-primary">
        <DownloadSimple size={14} /> Download PDF
      </a>
    </nav>
  );
}
