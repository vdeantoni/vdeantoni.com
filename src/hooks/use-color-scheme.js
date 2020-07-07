import { useEffect, useState } from "react";

const useColorScheme = () => {
  const [scheme, setScheme] = useState("default");

  useEffect(() => {
    const initialState = sessionStorage.getItem("color-scheme") ?? "default";
    setScheme(initialState);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("color-scheme", scheme);
    document.documentElement.setAttribute("data-color-scheme", scheme);
  }, [scheme]);

  return [scheme, setScheme];
};

export default useColorScheme;
