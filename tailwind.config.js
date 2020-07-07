module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
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
      accent: "var(--color-accent)",
      accentHover: "var(--color-accent-hover)",
      muted: "var(--color-muted)",
      mutedHover: "var(--color-muted-hover)",
    },
    borderColor: {
      default: "var(--color-border)",
      hover: "var(--color-border-hover)",
    },
    extend: {
      opacity: {
        "10": 0.1,
      },
      gridTemplateColumns: {
        "2-left-fixed-350": "350px 1fr",
        "2-left-fixed-400": "400px 1fr",
      },
    },
  },
  variants: {},
  plugins: [],
};
