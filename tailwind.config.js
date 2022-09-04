/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",

      white: "#fff",
      black: "#000",

      text: "var(--color-text)",
      background: "var(--color-background)",
      heading: "var(--color-heading)",
      primary: "var(--color-primary)",
      primaryHover: "var(--color-primary-hover)",
      secondary: "var(--color-secondary)",
      secondaryHover: "var(--color-secondary-hover)",
      tertiary: "var(--color-tertiary)",
      tertiaryHover: "var(--color-tertiary-hover)",
      accent: "var(--color-accent)",
      accentHover: "var(--color-accent-hover)",
      muted: "var(--color-muted)",
      mutedHover: "var(--color-muted-hover)",
    },
    extend: {
      borderColor: (theme) => ({
        DEFAULT: "var(--color-border)",
        hover: "var(--color-border-hover)",
        ...theme("colors"),
      }),
      opacity: {
        10: 0.1,
      },
      gridTemplateColumns: {
        "2-left-fixed-200": "200px 1fr",
        "2-left-fixed-350": "350px 1fr",
        "2-left-fixed-400": "400px 1fr",
      },
      zIndex: {
        "-1": "-1",
      },
      boxShadow: {
        "outline-angled": "8px 8px 0px 0px var(--color-primary-hover)",
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "group-hover"],
    boxShadow: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [],
};
