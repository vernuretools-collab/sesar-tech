import { useEffect } from "react";
import { Link } from "react-router-dom";
import Circuit from "../components/Circuit";
import ContactBand from "../components/ContactBand";
import HowItWorks from "../components/HowItWorks";
import IndustryMarquee from "../components/IndustryMarquee";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

export default function Home() {
  useEffect(() => {
    document.title = "Sesar Technologies | Building Stronger IT Foundations";
  }, []);

  return (
    <>
      <section className="hero">
        <Circuit />
        <div className="hero-copy">
          <p className="eyebrow">{site.name}</p>
          <h1>{site.headline}</h1>
          <p className="lead">{site.intro}</p>
          <div className="hero-actions">
            <Link className="button" to="/contact">
              Contact us
            </Link>
            <a className="button button-quiet" href={`tel:${site.phoneTel}`}>
              Call us
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <img
            className="float-photo"
            src="/images/laptop-desk.jpg"
            alt="Person typing on a silver laptop at a desk"
          />
          <div className="offer-stack">
            {site.offerings.map((item) => (
              <Link key={item.to} className="offer-card" to={item.to}>
                <img src={item.image} alt="" />
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <span>View {item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks
        intro="From the first call to machines on desks, the path is the same."
        steps={site.howHome}
      />

      <Reveal>
        <section className="section">
          <div className="section-heading">
            <h2>Laptops, PCs, and Apple devices</h2>
            <p>
              Hardware for everyday work, specialist desks, and teams that
              already use Apple.
            </p>
          </div>
          <div className="photo-band">
            {site.devices.map((device) => (
              <article key={device.title} className="photo-tile">
                <img src={device.image} alt={device.imageAlt} />
                <h3>{device.title}</h3>
                <p>{device.sales}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <IndustryMarquee />

      <Reveal>
        <section className="section">
          <div className="section-heading">
            <h2>Serving</h2>
            <p>
              The same hardware support for the organisations already named on
              our site.
            </p>
          </div>
          <div className="card-grid">
            {site.industries.map((industry) => (
              <Link
                key={industry.id}
                className="info-card industry-card"
                to={`/industries#${industry.id}`}
              >
                <img src={industry.image} alt="" />
                <h3>{industry.title}</h3>
                <p>{industry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <ContactBand />
    </>
  );
}
