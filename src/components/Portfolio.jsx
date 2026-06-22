import { useEffect, useMemo, useState } from "react";
import SectionIntro from "./SectionIntro.jsx";
import { siteContent } from "../data/siteContent.js";
import { fetchPortfolioItems } from "../lib/portfolioService.js";
import { isSupabaseConfigured } from "../lib/supabaseClient.js";

export default function Portfolio() {
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
  }, [activeCategory, galleryItems]);

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

  return (
    <section className="section" id="portfolio">
      <div className="container">
        <SectionIntro
          eyebrow="Portfolio / Gallery"
          title="A gallery of polished moments, dramatic details, and beautifully styled spaces."
          text="Your EventArt photos appear here as you add them to the image folders, with elegant placeholders until each photo is ready."
        />

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

        {status ? <p className="form-status">{status}</p> : null}

        <div className="portfolio-grid">
          {filteredItems.map((item) => (
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
      </div>
    </section>
  );
}
