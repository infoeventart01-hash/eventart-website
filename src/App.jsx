import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import GalleryPage from "./components/GalleryPage.jsx";
import ServicesPage from "./components/ServicesPage.jsx";
import Testimonials from "./components/Testimonials.jsx";
import InstagramGallery from "./components/InstagramGallery.jsx";
import Cta from "./components/Cta.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

function viewFromHash() {
  const hash = window.location.hash;
  if (hash === "#gallery") return "gallery";
  if (hash === "#services" || hash === "#packages") return "services";
  return "home";
}

export default function App() {
  const [view, setView] = useState(viewFromHash);

  useEffect(() => {
    function onHashChange() {
      const hash = window.location.hash;
      if (hash === "#gallery") setView("gallery");
      else if (hash === "#services" || hash === "#packages") setView("services");
      else if (hash === "#home" || hash === "") setView("home");
      // Any other anchor (for example #contact) leaves the current view
      // alone, so in-page links scroll instead of switching views.
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const scrollToAnchor = useCallback((anchor) => {
    if (!anchor) return;
    window.setTimeout(() => {
      document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }, []);

  const goToGallery = useCallback(() => {
    window.location.hash = "gallery";
    setView("gallery");
    window.scrollTo({ top: 0 });
  }, []);

  const goToServices = useCallback(
    (anchor) => {
      window.location.hash = "services";
      setView("services");
      if (anchor) scrollToAnchor(anchor);
      else window.scrollTo({ top: 0 });
    },
    [scrollToAnchor],
  );

  const goHome = useCallback(
    (anchor) => {
      setView("home");
      if (anchor) {
        window.location.hash = anchor.replace("#", "");
        scrollToAnchor(anchor);
      } else {
        window.location.hash = "home";
        window.scrollTo({ top: 0 });
      }
    },
    [scrollToAnchor],
  );

  return (
    <>
      <Header
        onNavigate={goHome}
        onViewGallery={goToGallery}
        onViewServices={goToServices}
      />
      <main>
        {view === "gallery" ? (
          <GalleryPage onBack={() => goHome()} />
        ) : view === "services" ? (
          <ServicesPage onBack={() => goHome()} />
        ) : (
          <>
            <Hero onViewGallery={goToGallery} />
            <About />
            <Testimonials />
            <InstagramGallery />
            <Cta />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
