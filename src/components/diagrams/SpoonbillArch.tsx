/**
 * Spoonbill's shape: four apps, one shared core, one API. Static diagram in
 * HTML so it stays crisp and themeable; the shared core is the point, so it
 * is the only thing in accent.
 */
const apps = [
  { name: 'Web app', tech: 'React · Vite' },
  { name: 'Landing', tech: 'Next.js · 7 languages' },
  { name: 'iOS app', tech: 'Expo · React Native' },
];
const core = ['Tax engine DE · AT · CH', 'Money + rounding', 'E-invoice (EN 16931)', 'Entitlements'];
const services = ['MySQL', 'Stripe Connect', 'Firebase Auth', 'Cloudflare R2'];

function Box({ title, sub, accent = false }: { title: string; sub?: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 ${
        accent ? 'border-accent-line bg-accent-soft' : 'border-line bg-surface'
      }`}
    >
      <p className="text-[12.5px] font-medium text-fg">{title}</p>
      {sub && <p className="mt-0.5 font-mono text-[10.5px] text-fg-muted">{sub}</p>}
    </div>
  );
}

function Down() {
  return (
    <div className="flex justify-center py-1.5" aria-hidden>
      <span className="h-5 w-px bg-line-strong" />
    </div>
  );
}

export function SpoonbillArch({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      data-reveal
      className={compact ? '' : 'rounded-xl border border-line bg-bg-raised p-5 md:p-6'}
      aria-label="Architecture: web app, landing and iOS app all import a shared TypeScript core (tax engine, money, e-invoice, entitlements) and talk to one NestJS API backed by MySQL, Stripe Connect, Firebase Auth and Cloudflare R2."
    >
      <div className="grid grid-cols-3 gap-2">
        {apps.map((a) => (
          <Box key={a.name} title={a.name} sub={compact ? undefined : a.tech} />
        ))}
      </div>
      <Down />
      <div className="rounded-lg border border-accent-line bg-accent-soft p-2.5">
        <p className="mb-2 px-0.5 font-mono text-[10.5px] uppercase tracking-wider text-accent">packages/shared</p>
        <div className="grid grid-cols-2 gap-1.5">
          {(compact ? core.slice(0, 2) : core).map((c) => (
            <span key={c} className="rounded-md border border-line bg-surface px-2 py-1.5 text-[11.5px] text-fg">
              {c}
            </span>
          ))}
        </div>
      </div>
      <Down />
      <Box title="API" sub={compact ? undefined : 'NestJS · TypeORM · Docker + Caddy'} />
      {!compact && (
        <>
          <Down />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {services.map((s) => (
              <span key={s} className="rounded-md border border-dashed border-line-strong px-2 py-1.5 text-center font-mono text-[10.5px] text-fg-muted">
                {s}
              </span>
            ))}
          </div>
        </>
      )}
    </figure>
  );
}
