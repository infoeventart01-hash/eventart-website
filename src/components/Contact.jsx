import { useState } from "react";

const eventTypes = ["Wedding", "Private Celebration", "Corporate Event", "Baby Shower", "Birthday", "Other"];

export default function Contact() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("Thank you. EventArt will be in touch shortly to begin planning your celebration.");
    event.currentTarget.reset();
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
            <a className="contact-method" href="tel:+13434628665">
              <span>Phone</span>
              <strong>343-462-8665</strong>
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
          <label className="full-width">
            Message
            <textarea name="message" rows="5" />
          </label>
          <button className="button button-primary full-width" type="submit">
            Book a Consultation
          </button>
          <p className="form-status full-width" role="status" aria-live="polite">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
