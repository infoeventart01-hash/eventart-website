import { siteContent } from "../data/siteContent.js";

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section
      className="hero"
      id="home"
      style={{ "--hero-image": `url(${hero.image})` }}
    >
      <div className="hero-inner container">
        <p className="eyebrow">Ottawa Luxury Event Studio</p>
        <h1>{hero.title}</h1>
        <h2>{hero.subtitle}</h2>
        <p>{hero.text}</p>
        <div className="button-row">
          <a className="button button-primary" href="#contact">
            {hero.primaryButton}
          </a>
          <a className="button button-ghost" href="#portfolio">
            {hero.secondaryButton}
          </a>
        </div>
      </div>
    </section>
  );
}
