import { siteContent } from "../data/siteContent.js";

// Replace YOUR_INSTAGRAM_USERNAME with EventArt's final Instagram username.
const instagramUrl = "https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/";

const socialLinks = [
  {
    name: "Instagram",
    href: instagramUrl,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <rect height="18" rx="5" width="18" x="3" y="3" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/YOUR_FACEBOOK_PAGE",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M14.5 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.6 1.7-1.6H18V3.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4V10H9v3h2.8v8h2.7Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@YOUR_TIKTOK_USERNAME",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M14.2 3c.3 2.3 1.6 3.8 3.8 4v3.1c-1.4 0-2.7-.5-3.8-1.3v6.5a5.7 5.7 0 1 1-5-5.7v3.1a2.7 2.7 0 1 0 2.1 2.6V3h2.9Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>{siteContent.brand} | Luxury Event Design & Coordination</p>
        <div className="social-links" aria-label="EventArt social media">
          {socialLinks.map((link) => (
            <a
              aria-label={link.name}
              className="social-link"
              href={link.href}
              key={link.name}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p>Weddings | Private Celebrations | Corporate Events</p>
      </div>
    </footer>
  );
}
