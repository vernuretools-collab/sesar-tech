import { useEffect } from "react";
import ContactBand from "../components/ContactBand";
import HowItWorks from "../components/HowItWorks";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

export default function Service() {
  useEffect(() => {
    document.title = "Service | Sesar Technologies";
  }, []);

  return (
    <article className="page">
      <PageHeader
        eyebrow="Service"
        title="Doorstep repair for Apple, boards, and peripherals"
        lead="Sesar Technologies comes to you. Apple product service, chip-level repair for desktops, laptops, and workstations, and general peripheral support are all doorstep visits."
        image="/images/repair-bench.jpg"
        imageAlt="Hands soldering a circuit board on a workbench"
      />

      <Reveal>
        <section className="section" id="apple-products">
          <div className="section-heading">
            <h2>Apple products</h2>
            <p>
              Doorstep hardware service for the Apple notebooks and desktops
              already in use. We identify the fault before recommending parts
              or repair.
            </p>
          </div>
          <div className="card-grid">
            {site.appleProducts.map((product) => (
              <section key={product.title} className="info-card">
                <p className="eyebrow">Doorstep</p>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
              </section>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="chip-level">
          <div className="section-heading">
            <h2>Chip-level service</h2>
            <p>
              Board-level repair when the fault is on the motherboard, not a
              loose cable or a worn part. Available for desktops, laptops, and
              workstations, and arranged as a doorstep visit.
            </p>
          </div>
          <div className="card-grid">
            {site.chipLevel.map((item) => (
              <section key={item.title} className="info-card">
                <p className="eyebrow">Doorstep</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </section>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" id="general-service">
          <div className="section-heading">
            <h2>General service</h2>
            <p>
              Peripheral support around the computer. Monitors, printers,
              input devices, and power equipment are all handled at your
              doorstep.
            </p>
          </div>
          <div className="card-grid">
            {site.generalService.map((item) => (
              <section key={item.title} className="info-card">
                <p className="eyebrow">Doorstep</p>
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
            <li>
              Apple product (MacBook, iMac, Mac mini, or Mac Studio), chip-level
              desktop, laptop, or workstation, or a peripheral such as a
              monitor, printer, keyboard, dock, or UPS.
            </li>
            <li>What it is doing, or no longer doing.</li>
            <li>The site address for the doorstep visit, and how urgently it is needed.</li>
          </ul>
        </section>
      </Reveal>
      <HowItWorks
        intro="Every repair starts with a doorstep visit and a clear description of the fault."
        steps={site.howService}
      />
      <ContactBand />
    </article>
  );
}
