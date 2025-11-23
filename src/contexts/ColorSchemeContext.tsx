"use client";

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ColorSchemeContextType {
  scheme: string;
  setScheme: (scheme: string) => void;
}

export const ColorSchemeContext = createContext<ColorSchemeContextType>({
  scheme: "dark",
  setScheme: () => {},
});

export const ColorSchemeProvider = ({ children }: { children: ReactNode }) => {
  const [scheme, setSchemeState] = useState("dark");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // This effect runs only on the client to initialize the color scheme from sessionStorage.
    // We suppress the warning because we need to read from sessionStorage (which is not available on server)
    // and set the state accordingly. This inevitably causes a re-render on the client, which is intentional
    // to match the user's preference and avoid hydration mismatches if we tried to guess on server.
    const stored = sessionStorage.getItem("color-scheme") ?? "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSchemeState(stored);
    document.documentElement.setAttribute("data-color-scheme", stored);
    setIsInitialized(true);
  }, []);

  const setScheme = (newScheme: string) => {
    setSchemeState(newScheme);
    sessionStorage.setItem("color-scheme", newScheme);
    document.documentElement.setAttribute("data-color-scheme", newScheme);
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <ColorSchemeContext.Provider value={{ scheme, setScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};
