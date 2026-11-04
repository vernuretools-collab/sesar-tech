import Circuit from "./Circuit";

export default function PageHeader({ eyebrow, title, lead, image, imageAlt }) {
  return (
    <header className={image ? "page-header page-header-split" : "page-header"}>
      <Circuit variant="header" />
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {lead ? <p className="lead">{lead}</p> : null}
      </div>
      {image ? (
        <img className="header-photo" src={image} alt={imageAlt || ""} />
      ) : null}
    </header>
  );
}
