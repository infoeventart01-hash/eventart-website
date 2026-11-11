import { siteContent } from "../data/siteContent.js";

export default function Header({ onNavigate, onViewGallery, onViewServices }) {
  function handleNavClick(event, item) {
    event.preventDefault();
    if (item.href === "#gallery") {
      onViewGallery();
      return;
    }
    if (item.href === "#services") {
      onViewServices();
      return;
    }
    if (item.href === "#packages") {
      onViewServices("#packages");
      return;
    }
    onNavigate(item.href);
  }

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <a
          className="brand"
          href="#home"
          aria-label="EventArt home"
          onClick={(event) => {
            event.preventDefault();
            onNavigate();
          }}
        >
          {siteContent.brand}
        </a>

        <div className="nav-links">
          {siteContent.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
