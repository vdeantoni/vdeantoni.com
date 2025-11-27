import { useState, useEffect, useCallback, RefObject } from "react";

// Grid configuration (must match your generation parameters)
const P_MIN = -15;
const P_MAX = 15;
const STEP = 3;
const SIZE = 512;

/**
 * Converts normalized coordinates [-1, 1] to grid coordinates
 */
function quantizeToGrid(val: number): number {
  const raw = P_MIN + ((val + 1) * (P_MAX - P_MIN)) / 2; // [-1,1] -> [-15,15]
  const snapped = Math.round(raw / STEP) * STEP;
  return Math.max(P_MIN, Math.min(P_MAX, snapped));
}

/**
 * Converts grid coordinates to filename format
 */
function gridToFilename(px: number, py: number): string {
  const sanitize = (val: number) => {
    // Ensure we have a decimal point (e.g., 9 becomes 9.0)
    const numStr = Number.isInteger(val) ? `${val}.0` : val.toString();
    return numStr.replace("-", "m").replace(".", "p");
  };
  return `gaze_px${sanitize(px)}_py${sanitize(py)}_${SIZE}.webp`;
}

interface UseGazeTrackingReturn {
  currentImage: string | null;
}

/**
 * Custom hook for gaze tracking
 * @param containerRef - Reference to the container element
 * @param basePath - Base path to face images (default: '/faces/')
 * @returns Object containing currentImage, isLoading, and error
 */
export function useGazeTracking(
  containerRef: RefObject<HTMLElement>,
  basePath: string,
): UseGazeTrackingReturn {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => setIsActive(false), 3000);
      return () => clearTimeout(timeout);
    } else {
      // TODO: animate faces back to neutral position
    }
  }, [isActive]);

  const updateGaze = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Convert to normalized coordinates [-1, 1]
      const nx = (clientX - centerX) / (rect.width / 2);
      const ny = -((clientY - centerY) / (rect.height / 2)); // Inverted Y axis

      // Clamp to [-1, 1] range
      const clampedX = Math.max(-1, Math.min(1, nx));
      const clampedY = Math.max(-1, Math.min(1, ny));

      // Convert to grid coordinates
      const px = quantizeToGrid(clampedX);
      const py = quantizeToGrid(clampedY);

      // Generate filename
      const filename = gridToFilename(px, py);
      const imagePath = `${basePath}${filename}`;

      if (clientX > 0 && clientY > 0) {
        setIsActive(true);
      }
      setCurrentImage(imagePath);
    },
    [containerRef, basePath],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      updateGaze(e.clientX, e.clientY);
    },
    [updateGaze],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateGaze(touch.clientX, touch.clientY);
      }
    },
    [updateGaze],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add event listeners to window for global tracking
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    } as AddEventListenerOptions);

    // Set initial center gaze
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    updateGaze(centerX, centerY);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef, handleMouseMove, handleTouchMove, updateGaze]);

  return { currentImage: !isActive ? null : currentImage };
}

export default useGazeTracking;
