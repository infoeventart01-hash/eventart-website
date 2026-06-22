import { useEffect, useState } from "react";
import SectionIntro from "./SectionIntro.jsx";
import {
  deletePortfolioPhoto,
  fetchPortfolioItems,
  portfolioCategories,
  updatePortfolioItem,
  uploadPortfolioPhoto,
} from "../lib/portfolioService.js";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient.js";

const emptyUpload = {
  title: "",
  category: portfolioCategories[0],
  displayOrder: 0,
  file: null,
};

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [upload, setUpload] = useState(emptyUpload);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadItems();
  }, [session]);

  async function loadItems() {
    try {
      const nextItems = await fetchPortfolioItems();
      setItems(nextItems);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setIsBusy(true);
    setStatus("");

    try {
      const { error } = await supabase.auth.signInWithPassword(login);
      if (error) throw error;
      setLogin({ email: "", password: "" });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleUpload(event) {
    event.preventDefault();
    if (!upload.file) {
      setStatus("Choose a photo before uploading.");
      return;
    }

    setIsBusy(true);
    setStatus("");

    try {
      await uploadPortfolioPhoto(upload);
      setUpload(emptyUpload);
      event.currentTarget.reset();
      await loadItems();
      setStatus("Photo uploaded to the portfolio.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleUpdate(item, updates) {
    setStatus("");

    try {
      await updatePortfolioItem(item.id, updates);
      await loadItems();
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(`Delete "${item.title}" from the portfolio?`);
    if (!confirmed) return;

    setIsBusy(true);
    setStatus("");

    try {
      await deletePortfolioPhoto(item);
      await loadItems();
      setStatus("Photo deleted.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <section className="section admin-section" id="admin">
      <div className="container">
        <SectionIntro
          eyebrow="Admin Dashboard"
          title="Upload, organize, and remove portfolio photos from one elegant workspace."
          text="Sign in with your Supabase admin account to manage the gallery without changing code."
        />

        {!isSupabaseConfigured ? (
          <div className="admin-panel">
            <h3>Connect Supabase</h3>
            <p className="muted">
              Add your Supabase URL and anon key to a local .env file, then restart the dev server.
            </p>
          </div>
        ) : !session ? (
          <form className="admin-panel admin-login" onSubmit={handleLogin}>
            <label>
              Admin Email
              <input
                autoComplete="email"
                onChange={(event) => setLogin({ ...login, email: event.target.value })}
                required
                type="email"
                value={login.email}
              />
            </label>
            <label>
              Password
              <input
                autoComplete="current-password"
                onChange={(event) => setLogin({ ...login, password: event.target.value })}
                required
                type="password"
                value={login.password}
              />
            </label>
            <button className="button button-primary" disabled={isBusy} type="submit">
              Sign In
            </button>
          </form>
        ) : (
          <div className="admin-layout">
            <form className="admin-panel upload-form" onSubmit={handleUpload}>
              <h3>Upload Photo</h3>
              <label>
                Photo Title
                <input
                  onChange={(event) => setUpload({ ...upload, title: event.target.value })}
                  required
                  type="text"
                  value={upload.title}
                />
              </label>
              <label>
                Category
                <select
                  onChange={(event) => setUpload({ ...upload, category: event.target.value })}
                  value={upload.category}
                >
                  {portfolioCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Display Order
                <input
                  min="0"
                  onChange={(event) => setUpload({ ...upload, displayOrder: event.target.value })}
                  type="number"
                  value={upload.displayOrder}
                />
              </label>
              <label>
                Image File
                <input
                  accept="image/*"
                  onChange={(event) => setUpload({ ...upload, file: event.target.files[0] })}
                  required
                  type="file"
                />
              </label>
              <button className="button button-primary" disabled={isBusy} type="submit">
                Upload Photo
              </button>
              <button
                className="button button-ghost"
                onClick={() => supabase.auth.signOut()}
                type="button"
              >
                Sign Out
              </button>
            </form>

            <div className="admin-panel">
              <h3>Portfolio Library</h3>
              <div className="admin-photo-list">
                {items.map((item) => (
                  <article className="admin-photo" key={item.id}>
                    <img src={item.imageUrl} alt={item.title} />
                    <div className="admin-photo-fields">
                      <label>
                        Title
                        <input
                          defaultValue={item.title}
                          onBlur={(event) => handleUpdate(item, { title: event.target.value })}
                          type="text"
                        />
                      </label>
                      <label>
                        Category
                        <select
                          defaultValue={item.category}
                          onChange={(event) => handleUpdate(item, { category: event.target.value })}
                        >
                          {portfolioCategories.map((category) => (
                            <option key={category}>{category}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        Order
                        <input
                          defaultValue={item.display_order}
                          min="0"
                          onBlur={(event) =>
                            handleUpdate(item, { display_order: Number(event.target.value || 0) })
                          }
                          type="number"
                        />
                      </label>
                    </div>
                    <button
                      className="button button-ghost"
                      disabled={isBusy}
                      onClick={() => handleDelete(item)}
                      type="button"
                    >
                      Delete
                    </button>
                  </article>
                ))}
                {!items.length ? <p className="muted">No photos uploaded yet.</p> : null}
              </div>
            </div>
          </div>
        )}

        <p className="form-status" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}
