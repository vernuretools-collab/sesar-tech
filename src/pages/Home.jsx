import { useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { site } from "../data/site";

export default function Home() {
  useEffect(() => {
    document.title = "Sesar Technologies | Building Stronger IT Foundations";
  }, []);

  const featured = site.rentals.slice(0, 4);

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow hero-kicker">{site.name}</p>
          <h1>
            {site.headline.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                style={{ animationDelay: `${0.12 + index * 0.06}s` }}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="lead hero-lead">{site.intro}</p>
          <div className="hero-actions">
            <Link className="button" to="/contact">
              Get Started
            </Link>
            <a className="button button-quiet" href={`tel:${site.phoneTel}`}>
              Call us
            </a>
          </div>
        </div>
        <div className="home-hero-visual">
          <img
            className="home-hero-photo"
            src="/images/team-table.jpg"
            alt="A team working together with laptops open on the table"
          />
        </div>
      </section>

      <Reveal>
        <section className="home-panel" id="rentals">
          <header className="home-panel-head">
            <div>
              <p className="eyebrow">Rentals</p>
              <h2>A few devices to start an enquiry</h2>
              <p>Sample monthly rates. The full list lives on the rent page.</p>
            </div>
            <Link to="/rent">All rentals</Link>
          </header>
          <div className="home-rent-row">
            {featured.map((item) => (
              <article key={item.name}>
                <img src={item.image} alt={item.imageAlt} />
                <h3>{item.name}</h3>
                <p>{item.summary}</p>
                <p className="home-spec">{item.spec}</p>
                <div>
                  <strong>{item.price}</strong>
                  <Link to="/contact">Rent now</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="home-process">
          <div className="home-process-intro">
            <p className="eyebrow">How it works</p>
            <h2>From the first call to machines on desks</h2>
            <p>The path is the same.</p>
          </div>
          <ol>
            {site.howHome.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </Reveal>

      <Reveal>
        <section className="home-services" aria-label="What we do">
          {site.offerings.map((item) => (
            <Link key={item.to} className="home-service" to={item.to}>
              <img src={item.image} alt={item.imageAlt} />
              <div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <span>Open {item.title}</span>
              </div>
            </Link>
          ))}
        </section>
      </Reveal>

      <Reveal>
        <section className="home-split">
          <img
            src="/images/desktop-setup.jpg"
            alt="A desktop setup with a keyboard, mouse, and monitors"
          />
          <div>
            <p className="eyebrow">Hardware</p>
            <h2>Laptops, PCs, and Apple devices</h2>
            <ul className="home-list">
              {site.devices.map((device) => (
                <li key={device.title}>
                  <h3>{device.title}</h3>
                  <p>{device.sales}</p>
                </li>
              ))}
            </ul>
            <Link className="button" to="/sales">
              View sales
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="home-split home-split-flip">
          <img
            src="/images/meeting-room.jpg"
            alt="An empty conference room with a long table"
          />
          <div>
            <p className="eyebrow">Industries</p>
            <h2>The organisations we already support</h2>
            <ul className="home-links">
              {site.industries.map((industry) => (
                <li key={industry.id}>
                  <Link to={`/industries#${industry.id}`}>
                    <strong>{industry.title}</strong>
                    <span>{industry.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <section className="home-close">
        <div className="home-close-inner">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>{site.stayConnected}</h2>
            <p>{site.tagline}</p>
          </div>
          <div className="home-close-actions">
            <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <Link className="button" to="/contact">
              Send an enquiry
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
