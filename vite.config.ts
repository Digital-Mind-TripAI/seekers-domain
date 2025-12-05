import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths only for production builds opened from file:// or static sub-paths;
  // keep dev server at "/" to avoid broken module URLs.
  base: process.env.NODE_ENV === "production" ? "./" : "/",
  plugins: [react()],
});
