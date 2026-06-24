import { useState } from "react";

const web3FormsEndpoint = "https://api.web3forms.com/submit";
const web3FormsAccessKey = import.meta.env.VITE_CONTACT_ACCESS_KEY;
const eventTypes = ["Wedding", "Private Celebration", "Corporate Event", "Baby Shower", "Birthday", "Other"];

export default function Contact() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("");
    setIsError(false);

    if (!web3FormsAccessKey) {
      console.error("Web3Forms error: the local access key is missing.");
      setIsError(true);
      setMessage("Something went wrong. Please email us directly at infoeventart01@gmail.com.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData(form);
      data.set("access_key", web3FormsAccessKey);
      data.set("subject", "New EventArt Website Inquiry");

      const response = await fetch(web3FormsEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error("Web3Forms error:", result);
        throw new Error(result.message || "Web3Forms rejected the inquiry.");
      }

      form.reset();
      setMessage("Thank you. Your inquiry has been received. EventArt will contact you shortly.");
    } catch (error) {
      console.error("Web3Forms error:", error);
      setIsError(true);
      setMessage("Something went wrong. Please email us directly at infoeventart01@gmail.com.");
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
            <a className="contact-method" href="tel:+13434628665">
              <span>Phone</span>
              <strong>343-462-8665</strong>
            </a>
            <a className="contact-method" href="mailto:infoeventart01@gmail.com">
              <span>Email</span>
              <strong>infoeventart01@gmail.com</strong>
            </a>
          </div>
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
            <select name="event_type" defaultValue="" required>
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
            <input name="event_date" type="date" />
          </label>
          <label>
            Guest Count
            <input name="guest_count" type="number" min="1" />
          </label>
          <label className="full-width">
            Message
            <textarea name="message" rows="5" required />
          </label>
          <button className="button button-primary full-width" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending Inquiry" : "Book a Consultation"}
          </button>
          <p className={isError ? "form-status error" : "form-status"} role="status" aria-live="polite">
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
