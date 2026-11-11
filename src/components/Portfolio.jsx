import { useEffect, useMemo, useState } from "react";
import SectionIntro from "./SectionIntro.jsx";
import { siteContent } from "../data/siteContent.js";
import { fetchPortfolioItems } from "../lib/portfolioService.js";
import { isSupabaseConfigured } from "../lib/supabaseClient.js";

export default function Portfolio({ preview = false, onViewGallery }) {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
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

  // Show all local EventArt gallery photos, then add any photos uploaded in the dashboard.
  const galleryItems = [
    ...siteContent.portfolio.flatMap((collection) =>
      collection.files.map((file, index) => ({
        id: `local-${collection.category}-${file}`,
        category: collection.category,
        title: `${collection.category} ${String(index + 1).padStart(2, "0")}`,
        image: `/images/${collection.folder}/${file}`,
        fallbackImage: collection.fallbackImage,
      })),
    ),
    ...items.map((item) => ({
      id: item.id,
      category: item.category,
      title: item.title,
      image: item.imageUrl,
    })),
  ];

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [galleryItems, activeCategory]);

  // Homepage preview: two photos from each main category.
  const previewItems = ["Weddings", "Birthdays", "Baby Showers"].flatMap(
    (category) =>
      galleryItems.filter((item) => item.category === category).slice(0, 2),
  );

  const galleryCategories = [
    "All",
    ...new Set(galleryItems.map((item) => item.category)),
  ];

  function showFallbackImage(event) {
    const fallbackImage = event.currentTarget.dataset.fallbackImage;
    if (!fallbackImage || event.currentTarget.src === fallbackImage) return;

    event.currentTarget.src = fallbackImage;
  }

  function getImageSource(image) {
    if (!image?.startsWith("/")) return image;

    return `${import.meta.env.BASE_URL}${image.slice(1)}`;
  }

  const visibleItems = preview ? previewItems : filteredItems;

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <SectionIntro
          eyebrow="Portfolio / Gallery"
          title="A gallery of polished moments, dramatic details, and beautifully styled spaces."
          text="A gallery of real EventArt celebrations — weddings, birthdays, baby showers, corporate events and custom signage."
        />

        {preview ? null : (
          <div className="category-tabs" aria-label="Portfolio categories">
            {galleryCategories.map((category) => (
              <button
                className={activeCategory === category ? "tab-button active" : "tab-button"}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {status ? <p className="form-status">{status}</p> : null}

        <div className="portfolio-grid">
          {visibleItems.map((item) => (
            <article className="portfolio-card" key={item.id}>
              <img
                alt={`${item.category} event gallery`}
                data-fallback-image={item.fallbackImage}
                onError={showFallbackImage}
                src={getImageSource(item.image)}
              />
              <div>
                <h3>{item.title || item.category}</h3>
                <span>{item.category}</span>
              </div>
            </article>
          ))}
        </div>

        {preview && onViewGallery ? (
          <div
            className="button-row"
            style={{ justifyContent: "center", marginTop: "32px" }}
          >
            <button
              className="button button-primary"
              type="button"
              onClick={onViewGallery}
            >
              View Full Gallery
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
