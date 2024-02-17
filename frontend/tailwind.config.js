/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}" // ⚠️ Required this line to compile RizzUI style.
  ],
  darkMode: ["class", '[data-theme="dark"]'], // ⚠️ Required this line for dark mode implementation
  theme: {
    extend: {
      colors: {
        /*
         * body, modal, drawer background & ring-offset-color
         */
        background: "rgb(var(--background) / <alpha-value>)",

        /*
         * body text color
         */
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        /*
         * border, default flat bg color for input components, tab & dropdown hover color
         */
        muted: "rgb(var(--muted) / <alpha-value>)",

        /*
         * disable foreground color
         */
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",

        /*
         * primary colors
         */
        primary: {
          lighter: "rgb(var(--primary-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--primary-default) / <alpha-value>)",
          dark: "rgb(var(--primary-dark) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)"
        },

        /*
         * secondary colors
         */
        secondary: {
          lighter: "rgb(var(--secondary-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--secondary-default) / <alpha-value>)",
          dark: "rgb(var(--secondary-dark) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)"
        },

        /*
         * danger colors
         */
        red: {
          lighter: "rgb(var(--red-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--red-default) / <alpha-value>)",
          dark: "rgb(var(--red-dark) / <alpha-value>)"
        },

        /*
         * warning colors
         */
        orange: {
          lighter: "rgb(var(--orange-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--orange-default) / <alpha-value>)",
          dark: "rgb(var(--orange-dark) / <alpha-value>)"
        },

        /*
         * info colors
         */
        blue: {
          lighter: "rgb(var(--blue-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--blue-default) / <alpha-value>)",
          dark: "rgb(var(--blue-dark) / <alpha-value>)"
        },

        /*
         * success colors
         */
        green: {
          lighter: "rgb(var(--green-lighter) / <alpha-value>)",
          DEFAULT: "rgb(var(--green-default) / <alpha-value>)",
          dark: "rgb(var(--green-dark) / <alpha-value>)"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/forms")] // ⚠️ Required @tailwindcss/forms plugin.
};
