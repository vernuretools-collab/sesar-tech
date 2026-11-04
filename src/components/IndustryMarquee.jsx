import { site } from "../data/site";

export default function IndustryMarquee() {
  const loop = [...site.industries, ...site.industries];

  return (
    <section className="marquee" aria-label="Industries we serve">
      <div className="marquee-track">
        {loop.map((industry, index) => (
          <span key={`${industry.id}-${index}`}>{industry.title}</span>
        ))}
      </div>
    </section>
  );
}
