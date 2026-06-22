import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Relative paths make the built site work on GitHub Pages project URLs.
  base: "./",
});
