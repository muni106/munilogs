import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",          // easy light/dark toggle later
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cyberpunk"],    // built-in neon palette 🕶️
  },
});
