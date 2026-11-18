/**
 * Renders copy from the content file. A trailing or inline "[VERIFY]" becomes
 * a visible badge, so an unsourced claim can never slip by unnoticed.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split('[VERIFY]');
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && (
            <span className="verify" title="Unverified claim: confirm or rewrite before publishing">
              VERIFY
            </span>
          )}
        </span>
      ))}
    </>
  );
}
