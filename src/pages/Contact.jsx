import { useEffect, useRef, useState } from "react";
import PageHeader from "../components/PageHeader";
import { site } from "../data/site";

export default function Contact() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Contact | Sesar Technologies";
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const interest = String(data.get("interest") || "General");
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`${interest} enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`,
    );
    setSent(true);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <article className="page">
      <PageHeader
        eyebrow="Contact"
        title={site.stayConnected}
        lead="Call or email Sesar Technologies about IT hardware sales, doorstep service, or rental. The form opens your email app with the message ready to send."
      />
      <div className="contact-layout">
        <section className="info-card contact-aside">
          <img
            src="/images/open-office.jpg"
            alt="An open office with people working at desks"
          />
          <div className="contact-details">
            <a className="contact-line" href={`tel:${site.phoneTel}`}>
              <span>Phone</span>
              {site.phoneDisplay}
            </a>
            <a className="contact-line" href={`mailto:${site.email}`}>
              <span>Email</span>
              {site.email}
            </a>
            <p className="tagline">{site.tagline}</p>
          </div>
        </section>
        <form className="enquiry-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" required autoComplete="tel" placeholder="Phone number" />
          </label>
          <label className="span-2">
            Email
            <input name="email" type="email" required autoComplete="email" placeholder="name@company.com" />
          </label>
          <InterestField options={site.interests} />
          <label className="span-2">
            Message
            <textarea name="message" rows="5" required placeholder="What do you need help with?" />
          </label>
          <button className="button" type="submit">
            Email this enquiry
          </button>
          {sent ? (
            <p className="form-status" role="status">
              Opening your email app with this enquiry.
            </p>
          ) : null}
        </form>
      </div>
    </article>
  );
}

function InterestField({ options }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(options[0] || "General");
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onPointer(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="span-2 field">
      <span id="interest-label">Interest</span>
      <div className={open ? "select-field open" : "select-field"} ref={rootRef}>
        <input type="hidden" name="interest" value={value} />
        <button
          type="button"
          className="select-trigger"
          aria-labelledby="interest-label interest-value"
          aria-expanded={open}
          aria-haspopup="listbox"
          onClick={() => setOpen((current) => !current)}
        >
          <span id="interest-value">{value}</span>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
        {open ? (
          <div className="select-panel" role="listbox" aria-labelledby="interest-label">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
