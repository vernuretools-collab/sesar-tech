import { Link } from "react-router-dom";
import { site } from "../data/site";

export default function ContactBand() {
  return (
    <section className="contact-band">
      <div>
        <h2>{site.stayConnected}</h2>
        <p>{site.tagline}</p>
      </div>
      <div className="contact-actions">
        <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <Link className="button" to="/contact">
          Send an enquiry
        </Link>
      </div>
    </section>
  );
}
