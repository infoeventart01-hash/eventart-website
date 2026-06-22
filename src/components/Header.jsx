import { siteContent } from "../data/siteContent.js";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="EventArt home">
          {siteContent.brand}
        </a>

        <div className="nav-links">
          {siteContent.navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
