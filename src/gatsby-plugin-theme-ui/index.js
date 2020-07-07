import "typeface-inter";

const spacing = {
  "0": "0",
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "18": "4.5rem",
  "20": "5rem",
  "22": "5.5rem",
  "24": "6rem",
  "26": "6.5rem",
  "28": "7rem",
  "30": "7.5rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "48": "12rem",
  "56": "14rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
};

export default {
  colors: {
    text: "#191924",
    background: "#fff",
    heading: "#07070a",
    primary: "#06f",
    primaryHover: "#005ae0",
    secondary: "#07070a",
    secondaryHover: "#191924",
    accent: "#fb3640",
    accentHover: "#fa0f1b",
    muted: "#f6f6f6",
    mutedHover: "#ebebeb",
    border: "#ebece9",
    borderHover: "#b9bdb3",

    modes: {
      dark: {
        text: "#fff",
        background: "#191924",
        heading: "#fff",
        primary: "#3385ff",
        primaryHover: "#005ae0",
        secondary: "#07070a",
        secondaryHover: "#191924",
        accent: "#fb3640",
        accentHover: "#fa0f1b",
        muted: "#2a2a3c",
        mutedHover: "#212130",
        border: "#2a2a3c",
        borderHover: "#434360",
      },
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inherit",
    monospace:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
  fontWeights: {
    hairline: "100",
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  lineHeights: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  space: {
    ...spacing,
  },
  sizes: {
    auto: "auto",
    half: "50%",
    full: "100%",
    screen: "100vw",
    ...spacing,
  },
  borders: [
    0,
    "1px solid",
    "2px solid",
    "3px solid",
    "4px solid",
    "5px solid",
    "6px solid",
    "7px solid",
    "8px solid",
    "9px solid",
    "10px solid",
  ],
  radii: {
    none: "0",
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.375rem",
    xl: "0.5rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    "4xl": "2rem",
    full: "9999px",
  },
  shadows: {
    none: "none",
    xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    lg: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    xl:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    "2xl":
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "3xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    outline: "0 0 0 3px rgba(66, 153, 225, 0.5)",
  },
  styles: {
    root: {
      color: "text",
      fontFamily: "body",
      fontWeight: "normal",
      fontSize: "md",
      lineHeight: "normal",
      letterSpacing: "normal",

      ".gatsby-image-wrapper": {
        width: "100%",
        height: "100%",
      },

      "*": {
        border: "0 solid",
        borderColor: "border",
      },
    },
    a: {
      variant: "actionable",
      display: "inline-flex",
      alignItems: "center",
      color: "primary",
      textDecoration: "none",

      "&:hover, &:focus, &:active, &[aria-current=page]": {
        color: "primaryHover",
      },
    },
    h1: {
      variant: "heading",
      fontSize: ["4xl", "5xl", "6xl"],
    },
    h2: {
      variant: "heading",
      fontSize: ["3xl", "4xl", "5xl"],
    },
    h3: {
      variant: "heading",
      fontSize: ["2xl", "3xl", "4xl"],
    },
    h4: {
      variant: "heading",
      fontSize: ["xl", "2xl", "3xl"],
    },
    h5: {
      variant: "heading",
      fontSize: ["lg", "xl", "2xl"],
    },
    h6: {
      variant: "heading",
      fontSize: ["md", "lg", "xl"],
    },
    p: {
      lead: {
        fontSize: "xl",
      },
    },
    small: {
      fontSize: "sm",
    },
    hr: {
      borderTop: "1px solid",
      borderTopColor: "border",
    },
  },
  heading: {
    color: "heading",
    fontFamily: "heading",
    fontWeight: "semibold",
    lineHeight: "tight",
    letterSpacing: "tight",
  },
  actionable: {
    cursor: "pointer",
    transition: "all 150ms ease-in",
  },
  container: {
    px: [4, 6, 6, 4],
    maxWidth: 1110,

    sm: {
      maxWidth: 640,
    },

    md: {
      maxWidth: 768,
    },

    lg: {
      maxWidth: 1024,
    },

    xl: {
      maxWidth: 1280,
    },
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "text",
    bg: "muted",
    fontFamily: "body",
    fontSize: ["sm", "md", "lg"],
    lineHeight: "none",
    textDecoration: "none",
    border: "1px solid",
    borderColor: "border",
    borderRadius: "md",
    px: 4,
    py: 3,
    cursor: "pointer",
    transition: "all .15s ease-in",
  },
  buttons: {
    sm: {
      px: 3,
      py: 2,
      fontSize: ["xs", "sm", "md"],
    },

    lg: {
      px: 5,
      py: 4,
      fontSize: ["md", "lg", "xl"],
    },

    primary: {
      variant: "actionable",
      bg: "primary",
      color: "white",
      borderColor: "primary",

      "&:hover, &:focus": {
        bg: "primaryHover",
        color: "white",
        borderColor: "primaryHover",
      },
    },

    secondary: {
      variant: "actionable",
      bg: "secondary",
      color: "white",
      borderColor: "secondary",

      "&:hover, &:focus": {
        bg: "secondaryHover",
        color: "white",
        borderColor: "secondaryHover",
      },
    },

    link: {
      variant: "actionable",
      bg: "transparent",
      color: "text",
      borderColor: "transparent",

      "&:hover, &:focus": {
        bg: "muted",
        color: "text",
        borderColor: "transparent",
      },
    },

    icon: {
      variant: "actionable",
      bg: "transparent",
      borderColor: "transparent",
      p: 0,
    },
  },
};
