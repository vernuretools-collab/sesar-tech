import Reveal from "./Reveal";

export default function HowItWorks({ intro, steps }) {
  return (
    <Reveal>
      <section className="section">
        <div className="section-heading">
          <h2>How it works</h2>
          {intro ? <p>{intro}</p> : null}
        </div>
        <ol className="how-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </Reveal>
  );
}
