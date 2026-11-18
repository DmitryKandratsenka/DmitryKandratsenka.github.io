import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-[12px] text-fg-faint md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <span>Next.js, Tailwind, Motion. Set in Geist.</span>
          <a className="hover:text-fg-muted transition-colors" href={profile.links.github}>
            GitHub
          </a>
          <a className="hover:text-fg-muted transition-colors" href={profile.links.linkedin}>
            LinkedIn
          </a>
        </p>
      </div>
    </footer>
  );
}
