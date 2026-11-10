import { useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { site } from "../data/site";

export default function Contact() {
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
          <h2>Phone</h2>
          <p>
            <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          </p>
          <h2>Email</h2>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p className="tagline">{site.tagline}</p>
        </section>
        <form className="enquiry-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" required autoComplete="name" />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" required autoComplete="tel" />
          </label>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Interest
            <select name="interest" defaultValue="Sales">
              {site.interests.map((interest) => (
                <option key={interest} value={interest}>
                  {interest}
                </option>
              ))}
            </select>
          </label>
          <label>
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="button" type="submit">
            Email this enquiry
          </button>
        </form>
      </div>
    </article>
  );
}
