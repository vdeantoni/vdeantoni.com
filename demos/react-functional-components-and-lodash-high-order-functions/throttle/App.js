import { throttle } from "lodash";
import React, { useEffect, useState, useCallback } from "react";

export default function App() {
  const [height, setHeight] = useState(window.innerHeight);

  const scrollListener = useCallback(
    throttle(() => {
      // increase the div's height every time we scroll past 75%
      // to simulate infinite scroll
      const rect = document.body.getBoundingClientRect();
      const target = rect.height * 0.75;
      if (-rect.y + window.innerHeight >= target) {
        setHeight(rect.height * 1.1);
      }
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });

  return (
    <div className="App">
      <h1>Throttled Scroll</h1>
      <div style={{ minHeight: `${height}px` }} />
    </div>
  );
}
