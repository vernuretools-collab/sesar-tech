export default function PageHeader({ eyebrow, title, lead, image, imageAlt }) {
  return (
    <header className={image ? "page-header page-header-split page-hero" : "page-header page-hero"}>
      <div>
        {eyebrow ? <p className="eyebrow hero-kicker">{eyebrow}</p> : null}
        <h1>
          {title.split(" ").map((word, index) => (
            <span
              key={`${word}-${index}`}
              style={{ animationDelay: `${0.12 + index * 0.06}s` }}
            >
              {word}
            </span>
          ))}
        </h1>
        {lead ? <p className="lead hero-lead">{lead}</p> : null}
      </div>
      {image ? (
        <div className="page-hero-visual">
          <img className="header-photo" src={image} alt={imageAlt || ""} />
        </div>
      ) : null}
    </header>
  );
}
