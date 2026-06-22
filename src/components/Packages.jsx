import SectionIntro from "./SectionIntro.jsx";
import { siteContent } from "../data/siteContent.js";

export default function Packages() {
  return (
    <section className="section packages-section" id="packages">
      <div className="container">
        <SectionIntro
          eyebrow="Packages"
          title="Luxury planning support shaped around the way you want to celebrate."
          text="Each package offers a clear level of design, coordination, and vendor support for a premium event experience."
        />

        <div className="package-grid">
          {siteContent.packages.map((item, index) => (
            <article className="package-card" key={item.name}>
              <span>0{index + 1}</span>
              <h3>{item.name}</h3>
              <p>{item.text}</p>
              <a href="#contact">Inquire now</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
