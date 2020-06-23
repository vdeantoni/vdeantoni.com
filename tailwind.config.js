module.exports = {
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {},
      textColor: {
        default: "var(--color-text-default)",
        nav: "var(--color-text-nav)",
        footer: "var(--color-text-footer)",
      },
      backgroundColor: {
        default: "var(--color-bg-default)",
        nav: "var(--color-bg-nav)",
        footer: "var(--color-bg-footer)",
      },
      borderColor: theme => ({
        default: theme('currentColor'),
      })
    },
  },
}
