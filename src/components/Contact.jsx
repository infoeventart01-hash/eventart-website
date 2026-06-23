import { useState } from "react";

const eventTypes = ["Wedding", "Private Celebration", "Corporate Event", "Baby Shower", "Birthday", "Other"];
const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
const contactAccessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY;

// Edit these values when you are ready to change EventArt's phone number.
const phoneContact = {
  label: "343-462-8665",
  href: "tel:+13434628665",
};

export default function Contact() {
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("");
    setStatusType("");

    if (!contactEndpoint || !contactAccessKey) {
      setStatus("Something went wrong. Please email us directly at infoeventart01@gmail.com.");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      formData.append("access_key", contactAccessKey);
      formData.append("subject", "New EventArt website inquiry");
      formData.append("from_name", "EventArt Website");

      const response = await fetch(contactEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (!response.ok || !result.success) throw new Error("Form submission failed.");

      form.reset();
      setStatus("Thank you. Your inquiry has been received. EventArt will contact you shortly.");
      setStatusType("success");
    } catch {
      setStatus("Something went wrong. Please email us directly at infoeventart01@gmail.com.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h2>Book your consultation.</h2>
          <p className="muted">
            Share the first details of your event and EventArt will follow up to
            discuss your vision, priorities, timeline, and design direction.
          </p>

          <div className="contact-methods">
            <a className="contact-method" href={phoneContact.href}>
              <span>Phone</span>
              <strong>{phoneContact.label}</strong>
            </a>
            <a className="contact-method" href="mailto:infoeventart01@gmail.com">
              <span>Email</span>
              <strong>infoeventart01@gmail.com</strong>
            </a>
          </div>

          <a
            className="button button-ghost contact-instagram"
            href="https://www.instagram.com/official_eventart/"
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <rect height="18" rx="5" width="18" x="3" y="3" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" />
            </svg>
            Instagram
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" autoComplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Phone
            <input name="phone" type="tel" autoComplete="tel" />
          </label>
          <label>
            Event Type
            <select name="eventType" defaultValue="" required>
              <option value="" disabled>
                Select one
              </option>
              {eventTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </label>
          <label>
            Event Date
            <input name="eventDate" type="date" />
          </label>
          <label>
            Guest Count
            <input name="guestCount" type="number" min="1" />
          </label>
          <label className="full-width">
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="button button-primary full-width" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending Inquiry" : "Book a Consultation"}
          </button>
          <p className={`form-status ${statusType}`.trim()} role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
