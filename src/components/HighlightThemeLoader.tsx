"use client";

import { useContext, useEffect } from "react";
import { ColorSchemeContext } from "@/contexts/ColorSchemeContext";

export default function HighlightThemeLoader() {
  const { scheme } = useContext(ColorSchemeContext);

  useEffect(() => {
    // Remove existing highlight.js stylesheets
    const existingLinks = document.querySelectorAll('link[data-highlight-theme]');
    existingLinks.forEach(link => link.remove());

    // Add the appropriate theme
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-highlight-theme', 'true');
    
    if (scheme === 'dark') {
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
    } else {
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    }
    
    document.head.appendChild(link);
  }, [scheme]);

  return null;
}