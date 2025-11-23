"use client";

import {
  createContext,
  useContext,
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
