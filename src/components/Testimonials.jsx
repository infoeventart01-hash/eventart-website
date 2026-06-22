import SectionIntro from "./SectionIntro.jsx";
import { siteContent } from "../data/siteContent.js";

export default function Testimonials() {
  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <SectionIntro
          eyebrow="Client Words"
          title="Celebrations remembered for how they felt."
          text="Thoughtful design, calm coordination, and the kind of details guests remember long after the final toast."
        />

        <div className="testimonial-grid">
          {siteContent.testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote>{testimonial.quote}</blockquote>
              <footer>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.event}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
