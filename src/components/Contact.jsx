const instagramUrl = "https://www.instagram.com/official_eventart/";

export default function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h2>Book your consultation.</h2>
          <p className="muted">
            Ready to begin planning your event? Contact EventArt today for a
            consultation.
          </p>
        </div>

        <div className="contact-actions" aria-label="Contact EventArt">
          <a className="button button-primary" href="mailto:infoeventart01@gmail.com">
            Email EventArt
          </a>
          <a className="button button-ghost" href="tel:+13434628665">
            Call EventArt
          </a>
          <a
            className="button button-ghost"
            href={instagramUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
