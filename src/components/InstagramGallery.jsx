import { useEffect, useState } from "react";
import SectionIntro from "./SectionIntro.jsx";
import { siteContent } from "../data/siteContent.js";

const instagramEndpoint = import.meta.env.VITE_INSTAGRAM_FEED_ENDPOINT;

export default function InstagramGallery() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPosts() {
      if (!instagramEndpoint) return;

      try {
        const response = await fetch(instagramEndpoint);
        if (!response.ok) throw new Error("Instagram feed is unavailable right now.");

        const data = await response.json();
        if (isMounted) setPosts(data.posts || []);
      } catch (error) {
        if (isMounted) setStatus(error.message);
      }
    }

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const galleryPosts = posts.length
    ? posts
    : siteContent.instagramFallback.map((post, index) => ({
        id: index,
        caption: post.caption,
        media_url: post.image,
        permalink: "https://www.instagram.com/",
      }));

  return (
    <section className="section instagram-section" id="instagram">
      <div className="container">
        <SectionIntro
          eyebrow="Instagram"
          title="Latest EventArt moments, details, and behind-the-scenes styling."
          text="Connect the Instagram feed endpoint to automatically display your newest posts."
        />

        {status ? <p className="form-status">{status}</p> : null}

        <div className="instagram-grid">
          {galleryPosts.map((post) => (
            <a
              className="instagram-card"
              href={post.permalink}
              key={post.id}
              rel="noreferrer"
              target="_blank"
            >
              <img src={post.thumbnail_url || post.media_url} alt={post.caption || "EventArt Instagram post"} />
              <span>View on Instagram</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
