import { portfolioBucket, supabase } from "./supabaseClient.js";

export const portfolioCategories = [
  "Weddings",
  "Birthdays",
  "Baby Showers",
  "Corporate Events",
  "Luxury Decor",
];

export function getPublicImageUrl(path) {
  if (!supabase || !path) return "";

  const { data } = supabase.storage.from(portfolioBucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function fetchPortfolioItems() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((item) => ({
    ...item,
    imageUrl: getPublicImageUrl(item.image_path),
  }));
}

export async function uploadPortfolioPhoto({ file, title, category, displayOrder }) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const filePath = `${category}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(portfolioBucket)
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw uploadError;

  const { error: insertError } = await supabase.from("portfolio_items").insert({
    title,
    category,
    image_path: filePath,
    display_order: Number(displayOrder || 0),
  });

  if (insertError) throw insertError;
}

export async function updatePortfolioItem(id, updates) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("portfolio_items")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

export async function deletePortfolioPhoto(item) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error: storageError } = await supabase.storage
    .from(portfolioBucket)
    .remove([item.image_path]);

  if (storageError) throw storageError;

  const { error: tableError } = await supabase
    .from("portfolio_items")
    .delete()
    .eq("id", item.id);

  if (tableError) throw tableError;
}
