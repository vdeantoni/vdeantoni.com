import { useEffect, useRef } from "react";

const useRequestAnimationFrame = (callback, deps = []) => {
  const ref = useRef(0);

  const loop = () => {
    callback();
    ref.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    ref.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(ref.current);
    };
  }, deps);
};

export default useRequestAnimationFrame;
