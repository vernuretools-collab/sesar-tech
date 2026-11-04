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
        title="Repair and support that keeps work moving"
        lead="Sesar Technologies services laptops, desktop PCs, and Apple devices. The aim is simple: find the fault, explain it clearly, and get the machine working again."
        image="/images/repair-bench.jpg"
        imageAlt="Hands soldering a circuit board on a workbench"
      />
      <div className="split-stack">
        {site.devices.map((device, index) => (
          <Reveal key={device.title}>
            <section className={index % 2 ? "photo-split reverse" : "photo-split"}>
              <img src={device.image} alt={device.imageAlt} />
              <div>
                <h2>{device.title}</h2>
                <p>{device.service}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <section className="panel">
          <h2>What to send with an enquiry</h2>
          <ul className="plain-list">
            <li>The device type: laptop, desktop PC, or Apple device.</li>
            <li>What it is doing, or no longer doing.</li>
            <li>How urgently the person needs it back.</li>
          </ul>
        </section>
      </Reveal>
      <HowItWorks
        intro="Repair starts with a clear description of the fault."
        steps={site.howService}
      />
      <ContactBand />
    </article>
  );
}
