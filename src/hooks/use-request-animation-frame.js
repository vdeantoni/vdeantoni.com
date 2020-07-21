import { useEffect, useRef } from "react";

const useRequestAnimationFrame = (callback, deps = []) => {
  const ref = useRef(0);

  const loop = () => {
    ref.current = requestAnimationFrame(loop);
    callback();
  };

  useEffect(() => {
    ref.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useRequestAnimationFrame;
