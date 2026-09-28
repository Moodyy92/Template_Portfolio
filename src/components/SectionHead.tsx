export function SectionHead({
  kicker,
  heading,
  intro,
}: {
  kicker?: string | null;
  heading?: string | null;
  intro?: string | null;
}) {
  return (
    <div className="section-head reveal">
      {kicker && <span className="kicker">{kicker}</span>}
      {heading && (
        <h2 className="mask-heading">
          <span className="mask-heading-inner">{heading}</span>
        </h2>
      )}
      {intro && <p>{intro}</p>}
    </div>
  );
}
