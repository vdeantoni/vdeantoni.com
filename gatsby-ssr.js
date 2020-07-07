import React from "react";

const init = () => {
  const getPreferredColorScheme = () => {
    const darkQuery = "(prefers-color-scheme: dark)";
    const darkMQL = window.matchMedia ? window.matchMedia(darkQuery) : {};
    if (darkMQL.media === darkQuery && darkMQL.matches) {
      return "dark";
    }

    const lightQuery = "(prefers-color-scheme: light)";
    const lightMQL = window.matchMedia ? window.matchMedia(lightQuery) : {};
    if (lightMQL.media === lightQuery && lightMQL.matches) {
      return "light";
    }

    return "default";
  };

  const colorScheme =
    sessionStorage.getItem("color-scheme") ?? getPreferredColorScheme();

  document.documentElement.setAttribute("data-color-scheme", colorScheme);

  sessionStorage.setItem("color-scheme", colorScheme);
};

const InitScript = ({ script }) => {
  return <script dangerouslySetInnerHTML={{ __html: `(${script})();` }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<InitScript script={init} key="init-script" />);
};
