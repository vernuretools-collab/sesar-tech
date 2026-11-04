import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContactBand from "../components/ContactBand";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

export default function Industries() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Industries | Sesar Technologies";
  }, []);

  useEffect(() => {
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView();
  }, [hash]);

  return (
    <article className="page">
      <PageHeader
        eyebrow="Serving"
        title="Who we work with"
        lead="Sesar Technologies supports the organisations listed on our current site: corporate offices, manufacturing, education, healthcare, and smaller businesses. Each can buy, service, or rent laptops, PCs, and Apple devices."
      />
      <div className="split-stack">
        {site.industries.map((industry, index) => (
          <Reveal key={industry.id}>
            <section
              id={industry.id}
              className={index % 2 ? "photo-split reverse" : "photo-split"}
            >
              <img src={industry.image} alt={industry.imageAlt} />
              <div>
                <h2>{industry.title}</h2>
                <p>{industry.summary}</p>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
      <ContactBand />
    </article>
  );
}
