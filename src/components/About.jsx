import SectionIntro from "./SectionIntro.jsx";
import { siteContent } from "../data/siteContent.js";

export default function About() {
  const { about } = siteContent;

  return (
    <section className="section about-section" id="about">
      <div className="container about-grid">
        <div className="image-panel">
          <img src={about.image} alt="Luxury event table setting" />
        </div>
        <div>
          <SectionIntro eyebrow={about.eyebrow} title={about.title} />
          {about.text.map((paragraph) => (
            <p className="muted" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
