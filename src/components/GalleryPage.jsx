import Portfolio from "./Portfolio.jsx";
import Cta from "./Cta.jsx";
import Contact from "./Contact.jsx";

export default function GalleryPage({ onBack }) {
  return (
    <>
      <section className="section" style={{ paddingTop: "140px", paddingBottom: "0" }}>
        <div className="container">
          <button className="button button-ghost" type="button" onClick={onBack}>
            ← Back to Home
          </button>
        </div>
      </section>
      <Portfolio />
      <Cta />
      <Contact />
    </>
  );
}
