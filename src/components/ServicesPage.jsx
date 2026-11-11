import Services from "./Services.jsx";
import Packages from "./Packages.jsx";
import Cta from "./Cta.jsx";
import Contact from "./Contact.jsx";

export default function ServicesPage({ onBack }) {
  return (
    <>
      <section className="section" style={{ paddingTop: "140px", paddingBottom: "0" }}>
        <div className="container">
          <button className="button button-ghost" type="button" onClick={onBack}>
            ← Back to Home
          </button>
        </div>
      </section>
      <Services />
      <Packages />
      <Cta />
      <Contact />
    </>
  );
}
