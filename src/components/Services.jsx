import SectionIntro from "./SectionIntro.jsx";
import { siteContent } from "../data/siteContent.js";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionIntro
          eyebrow="Services"
          title="Thoughtful design, graceful coordination, and an unforgettable guest experience."
          text="Choose the services that match your event vision, from signature wedding styling to corporate event support."
        />

        <div className="service-grid">
          {siteContent.services.map((service, index) => (
            <article className="service-card" key={service}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
