import { useEffect } from "react";
import ContactBand from "../components/ContactBand";
import HowItWorks from "../components/HowItWorks";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

export default function Rent() {
  useEffect(() => {
    document.title = "Rent | Sesar Technologies";
  }, []);

  return (
    <article className="page">
      <PageHeader
        eyebrow="Rent"
        title="Rent any of our IT products"
        lead="Sesar Technologies rents the full IT hardware range: desktops, laptops, workstations, and servers. Choose a short-term or long-term window when buying every machine is not the right step."
        image="/images/team-laptops.jpg"
        imageAlt="A meeting room where a team is using laptops"
      />

      <Reveal>
        <section className="section" id="rental-terms">
          <div className="section-heading">
            <h2>Short-term and long-term</h2>
            <p>Every product below is available for either rental window.</p>
          </div>
          <div className="card-grid">
            {site.rentalTerms.map((item) => (
              <section key={item.title} className="info-card">
                <p className="eyebrow">Rental</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </section>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="rental-products">
          <div className="section-heading">
            <h2>All IT products</h2>
            <p>
              The same hardware we sell is available to rent: desktops,
              laptops, workstations, and servers.
            </p>
          </div>
          <div className="card-grid">
            {site.rentalProducts.map((item) => (
              <section key={item.title} className="info-card">
                <p className="eyebrow">For rent</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </section>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="panel">
          <h2>What to send with an enquiry</h2>
          <ul className="plain-list">
            <li>Desktop, laptop, workstation, or server.</li>
            <li>How many you need.</li>
            <li>Short-term or long-term, and the dates if you already know them.</li>
          </ul>
        </section>
      </Reveal>
      <HowItWorks
        intro="Tell us the product and the rental window before we recommend machines."
        steps={site.howRent}
      />
      <ContactBand />
    </article>
  );
}
