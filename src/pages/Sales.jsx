import { useEffect } from "react";
import ContactBand from "../components/ContactBand";
import HowItWorks from "../components/HowItWorks";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

export default function Sales() {
  useEffect(() => {
    document.title = "Sales | Sesar Technologies";
  }, []);

  return (
    <article className="page">
      <PageHeader
        eyebrow="Sales"
        title="IT hardware for the way your business works"
        lead="Sesar Technologies sells IT hardware: custom PC builds and business supply of desktops, laptops, workstations, and servers. Each machine can be new, demo, or refurbished."
        image="/images/laptop-meeting.jpg"
        imageAlt="Colleagues reviewing charts beside an open laptop"
      />

      <Reveal>
        <section className="section" id="sales-offers">
          <div className="section-heading">
            <h2>How we sell</h2>
            <p>
              Custom builds for a specific desk, and business supply when a
              team needs machines in quantity.
            </p>
          </div>
          <div className="card-grid">
            {site.salesOffers.map((item) => (
              <section key={item.title} className="info-card">
                <p className="eyebrow">Sales</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </section>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="sales-condition">
          <div className="section-heading">
            <h2>New, demo, and refurbished</h2>
            <p>
              The same hardware range is available in three conditions, so the
              budget can match the job.
            </p>
          </div>
          <div className="card-grid">
            {site.salesConditions.map((item) => (
              <section key={item.title} className="info-card">
                <p className="eyebrow">Condition</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </section>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="sales-hardware">
          <div className="section-heading">
            <h2>IT hardware</h2>
            <p>
              Desktops, laptops, workstations, and servers. Tell us the work
              and we match the machine.
            </p>
          </div>
          <div className="card-grid">
            {site.salesHardware.map((item) => (
              <section key={item.title} className="info-card">
                <p className="eyebrow">For sale</p>
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
            <li>Custom PC build, or business supply for a team.</li>
            <li>Desktop, laptop, workstation, or server.</li>
            <li>New, demo, or refurbished, and how many you need.</li>
          </ul>
        </section>
      </Reveal>
      <HowItWorks
        intro="A purchase starts with the work, not a generic list."
        steps={site.howSales}
      />
      <ContactBand />
    </article>
  );
}
