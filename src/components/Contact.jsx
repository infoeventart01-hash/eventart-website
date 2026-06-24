const instagramUrl = "https://www.instagram.com/official_eventart/";
const gmailComposeUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=infoeventart01@gmail.com&su=EventArt%20Consultation%20Inquiry";

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
          <a
            className="button button-primary"
            href={gmailComposeUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            infoeventart01@gmail.com
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
