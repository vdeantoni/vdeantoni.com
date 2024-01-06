"use client";

import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const colorSchemeState = atom({
  key: "colorSchemeState",
  default: sessionStorage.getItem("color-scheme") ?? "dark",
});

const useColorScheme = (): ReturnType<typeof useRecoilState<string>> => {
  const [scheme, setScheme] = useRecoilState(colorSchemeState);

  useEffect(() => {
    sessionStorage.setItem("color-scheme", scheme);
    document.documentElement.setAttribute("data-color-scheme", scheme);
  }, [scheme]);

  return [scheme, setScheme];
};

export default useColorScheme;
