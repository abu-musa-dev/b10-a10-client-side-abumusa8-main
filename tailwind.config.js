// tailwind.config.js (ES Module syntax)
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Enables dark mode with a class on the root element
  plugins: [daisyui], // Correct way to import DaisyUI plugin
  daisyui: {
    themes: [
      "light", // Light theme (default)
      "dark", // Dark theme
      "cupcake", // Example of other DaisyUI themes
    ],
  },
};
