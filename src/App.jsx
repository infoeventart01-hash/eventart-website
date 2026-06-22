import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Packages from "./components/Packages.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Testimonials from "./components/Testimonials.jsx";
import InstagramGallery from "./components/InstagramGallery.jsx";
import Cta from "./components/Cta.jsx";
import Contact from "./components/Contact.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Packages />
        <Portfolio />
        <Testimonials />
        <InstagramGallery />
        <Cta />
        <Contact />
        <AdminDashboard />
      </main>
      <Footer />
    </>
  );
}
