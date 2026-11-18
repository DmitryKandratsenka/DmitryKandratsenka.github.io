/**
 * Module Federation at Microsoft (Nuance): a host shell owns sign-in and
 * routing; three independently deployed apps load into it at runtime and
 * share one component library. The shell is the accent: one session for all.
 */
const remotes = ['App A', 'App B', 'App C'];

export function FederationDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      data-reveal
      className={compact ? '' : 'rounded-xl border border-line bg-bg-raised p-5 md:p-6'}
      aria-label="A host shell handles authentication and routing; three independently deployed remote apps are loaded at runtime with webpack Module Federation and share one Material UI component library documented in Storybook."
    >
      <div className="rounded-lg border border-accent-line bg-accent-soft p-3">
        <div className="flex items-center justify-between">
          <p className="text-[12.5px] font-medium text-fg">Host shell</p>
          <p className="font-mono text-[10.5px] text-accent">one sign-in · routing</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {remotes.map((r, i) => (
            <div key={r} className="rounded-md border border-line bg-surface px-2.5 py-2">
              <p className="text-[12px] font-medium text-fg">{r}</p>
              {!compact && <p className="mt-0.5 font-mono text-[10px] text-fg-muted">own repo · own deploy</p>}
              <span
                className="fed-pulse mt-2 block h-1 rounded-full bg-accent/70"
                style={{ ['--i' as string]: i }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center py-1.5" aria-hidden>
        <span className="h-5 w-px bg-line-strong" />
      </div>
      <div className="rounded-lg border border-line bg-surface px-3 py-2.5">
        <p className="text-[12.5px] font-medium text-fg">Shared library</p>
        {!compact && (
          <p className="mt-0.5 font-mono text-[10.5px] text-fg-muted">Material UI components + utils · Storybook · whole department</p>
        )}
      </div>
    </figure>
  );
}
