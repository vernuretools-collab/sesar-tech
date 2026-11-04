import { useEffect } from "react";
import ContactBand from "../components/ContactBand";
import HowItWorks from "../components/HowItWorks";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

const windows = [
  {
    title: "Short-term rental",
    text: "Extra laptops, PCs, or Apple devices for a project, an event, training, or a temporary team.",
  },
  {
    title: "Long-term rental",
    text: "A working set of machines for a longer engagement, without purchasing the whole fleet up front.",
  },
];

export default function Rent() {
  useEffect(() => {
    document.title = "Rent | Sesar Technologies";
  }, []);

  return (
    <article className="page">
      <PageHeader
        eyebrow="Rent"
        title="Computers for as long as you need them"
        lead="Sesar Technologies rents laptops, desktop PCs, and Apple devices for short-term needs and longer engagements. Rental is the right path when buying every machine is not."
        image="/images/team-laptops.jpg"
        imageAlt="A meeting room where a team is using laptops"
      />
      <Reveal>
        <div className="card-grid">
          {windows.map((item) => (
            <section key={item.title} className="info-card">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </section>
          ))}
        </div>
      </Reveal>
      <div className="split-stack">
        {site.devices.map((device, index) => (
          <Reveal key={device.title}>
            <section className={index % 2 ? "photo-split reverse" : "photo-split"}>
              <img src={device.image} alt={device.imageAlt} />
              <div>
                <h2>{device.title}</h2>
                <p>{device.rent}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
      <HowItWorks
        intro="Tell us the rental window before we recommend machines."
        steps={site.howRent}
      />
      <ContactBand />
    </article>
  );
}
