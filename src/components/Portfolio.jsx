import { useEffect, useState } from "react";
import SectionIntro from "./SectionIntro.jsx";
import { siteContent } from "../data/siteContent.js";
import { fetchPortfolioItems } from "../lib/portfolioService.js";
import { isSupabaseConfigured } from "../lib/supabaseClient.js";

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPortfolio() {
      if (!isSupabaseConfigured) return;

      try {
        const uploadedItems = await fetchPortfolioItems();
        if (isMounted) setItems(uploadedItems);
      } catch (error) {
        if (isMounted) setStatus(error.message);
      }
    }

    loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  // Each category gets its own section on the portfolio page.
  const sections = siteContent.portfolio.map((collection) => ({
    category: collection.category,
    tagline: collection.tagline,
    photos: collection.files.map((file, index) => ({
      id: `local-${collection.category}-${file}`,
      image: `/images/${collection.folder}/${file}`,
      fallbackImage: collection.fallbackImage,
      quote: collection.quotes?.[index] || "",
    })),
  }));

  // Photos uploaded in the dashboard join their matching category section.
  items.forEach((item) => {
    const photo = {
      id: item.id,
      image: item.imageUrl,
      fallbackImage: undefined,
      quote: item.title || "",
    };
    const section = sections.find((s) => s.category === item.category);
    if (section) section.photos.push(photo);
    else sections.push({ category: item.category, tagline: "", photos: [photo] });
  });

  function showFallbackImage(event) {
    const fallbackImage = event.currentTarget.dataset.fallbackImage;
    if (!fallbackImage || event.currentTarget.src === fallbackImage) return;

    event.currentTarget.src = fallbackImage;
  }

  function getImageSource(image) {
    if (!image?.startsWith("/")) return image;

    return `${import.meta.env.BASE_URL}${image.slice(1)}`;
  }

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <SectionIntro
          eyebrow="Portfolio / Gallery"
          title="A gallery of polished moments, dramatic details, and beautifully styled spaces."
          text="A gallery of real EventArt celebrations — weddings, birthdays, baby showers, corporate events and custom signage, each with its own story."
        />

        {status ? <p className="form-status">{status}</p> : null}

        {sections.map((section) => (
          <div className="portfolio-category" key={section.category}>
            <h2 className="portfolio-category-title">{section.category}</h2>
            {section.tagline ? (
              <p className="portfolio-category-tagline">
                &ldquo;{section.tagline}&rdquo;
              </p>
            ) : null}
            <div className="portfolio-grid">
              {section.photos.map((photo) => (
                <article className="portfolio-card" key={photo.id}>
                  <img
                    alt={`${section.category} event gallery`}
                    data-fallback-image={photo.fallbackImage}
                    onError={showFallbackImage}
                    src={getImageSource(photo.image)}
                  />
                  {photo.quote ? (
                    <div>
                      <p className="portfolio-quote">
                        &ldquo;{photo.quote}&rdquo;
                      </p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
