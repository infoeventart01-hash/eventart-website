import { siteContent } from "../data/siteContent.js";

export default function Cta() {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <h2>{siteContent.cta.text}</h2>
        <a className="button button-primary" href="#contact">
          {siteContent.cta.button}
        </a>
      </div>
    </section>
  );
}
