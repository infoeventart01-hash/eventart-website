import { useState } from "react";

const eventTypes = ["Wedding", "Private Celebration", "Corporate Event", "Baby Shower", "Birthday", "Other"];
const budgetRanges = ["$2,500 - $5,000", "$5,000 - $10,000", "$10,000 - $20,000", "$20,000+"];

export default function Contact() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("Thank you. Your consultation request is ready for follow-up.");
    event.currentTarget.reset();
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Book your consultation.</h2>
          <p className="muted">
            Share the first details of your event and EventArt will follow up to
            discuss your vision, priorities, timeline, and design direction.
          </p>
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
            <select name="eventType" defaultValue="">
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
            Budget Range
            <select name="budgetRange" defaultValue="">
              <option value="" disabled>
                Select range
              </option>
              {budgetRanges.map((range) => (
                <option key={range}>{range}</option>
              ))}
            </select>
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
