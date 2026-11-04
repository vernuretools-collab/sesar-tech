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
        title="Laptops, PCs, and Apple devices"
        lead="Sesar Technologies sells the computers a business needs to stay productive: laptops, desktop PCs, and Apple devices. We help you match the hardware to the work, instead of handing over a generic list."
        image="/images/laptop-meeting.jpg"
        imageAlt="Colleagues reviewing charts beside an open laptop"
      />
      <div className="split-stack">
        {site.devices.map((device, index) => (
          <Reveal key={device.title}>
            <section className={index % 2 ? "photo-split reverse" : "photo-split"}>
              <img src={device.image} alt={device.imageAlt} />
              <div>
                <h2>{device.title}</h2>
                <p>{device.sales}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
      <HowItWorks
        intro="A purchase starts with the work, not a catalogue."
        steps={site.howSales}
      />
      <ContactBand />
    </article>
  );
}
