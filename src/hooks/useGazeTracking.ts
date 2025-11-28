import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import type {
  FacePosition,
  SpritePosition,
  AnimationState,
  UseGazeTrackingOptions,
  UseGazeTrackingReturn,
} from "@/types/face-tracking";
import {
  P_MIN,
  P_MAX,
  quantizeToGrid,
  facePositionToSprite,
} from "@/utils/faceAnimations";
import { useAnimationSequencer } from "./useAnimationSequencer";
import { useInactivityTimers } from "./useInactivityTimers";

/**
 * Converts normalized coordinates [-1, 1] to grid coordinates
 */
function normalizedToGrid(nx: number, ny: number): FacePosition {
  const rawX = P_MIN + ((nx + 1) * (P_MAX - P_MIN)) / 2;
  const rawY = P_MIN + ((ny + 1) * (P_MAX - P_MIN)) / 2;

  return {
    px: quantizeToGrid(rawX),
    py: quantizeToGrid(rawY),
  };
}

/**
 * Gaze Tracking Hook (Main Orchestrator)
 *
 * Coordinates face tracking functionality by combining:
 * - Mouse/touch position tracking with throttling
 * - Animation sequencing (via useAnimationSequencer)
 * - Inactivity timer (via useInactivityTimers)
 *
 * Architecture:
 * 1. User moves mouse → Update face position immediately
 * 2. User stops moving (configurable delay) → Smoothly return to center
 * 3. Face stays visible at center when idle
 *
 * Performance:
 * - Mouse events throttled to 60fps (16ms)
 * - CSS sprite for single image load
 * - RAF-based smooth animations
 *
 * @param containerRef - React ref to the container element
 * @param options - Configuration options
 * @returns Current sprite position and animation state
 */
export function useGazeTracking(
  containerRef: RefObject<HTMLElement>,
  options: UseGazeTrackingOptions = {}
): UseGazeTrackingReturn {
  const { inactivityDelay = 3000 } = options;

  // Core state - initialize at center position (always visible)
  const [currentPosition, setCurrentPosition] = useState<FacePosition>({
    px: 0,
    py: 0,
  });
  const [spritePosition, setSpritePosition] = useState<SpritePosition | null>(
    facePositionToSprite({ px: 0, py: 0 })
  );
  const [animationState, setAnimationState] =
    useState<AnimationState>("idle");

  // Refs for accessing latest state (avoids closure issues)
  const animationStateRef = useRef<AnimationState>(animationState);
  const currentPositionRef = useRef<FacePosition>(currentPosition);
  const lastMouseMoveRef = useRef<number>(0);

  // Sync refs with state
  useEffect(() => {
    animationStateRef.current = animationState;
  }, [animationState]);

  useEffect(() => {
    currentPositionRef.current = currentPosition;
  }, [currentPosition]);

  /**
   * Update face position and sprite
   */
  const updatePosition = useCallback((position: FacePosition) => {
    const sprite = facePositionToSprite(position);
    setSpritePosition(sprite);
    setCurrentPosition(position);
  }, []);

  // Animation sequencer hook
  const {
    returnToCenter,
    cancelAnimations,
    cleanup: cleanupAnimations,
  } = useAnimationSequencer(updatePosition, setAnimationState, currentPositionRef);

  /**
   * Handle transition to inactive state
   */
  const handleInactive = useCallback(() => {
    returnToCenter();
  }, [returnToCenter]);

  // Inactivity timer hook
  const { resetInactivityTimer, clearAllTimers, cleanup: cleanupTimers } =
    useInactivityTimers({
      inactivityDelay,
      onInactive: handleInactive,
    });

  /**
   * Update gaze based on mouse/touch coordinates
   */
  const updateGaze = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      // Don't interrupt ongoing animations
      if (animationStateRef.current === "transitioning") {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize to [-1, 1] range
      const nx = (clientX - centerX) / (rect.width / 2);
      const ny = -((clientY - centerY) / (rect.height / 2)); // Inverted Y

      // Clamp and convert to grid coordinates
      const clampedX = Math.max(-1, Math.min(1, nx));
      const clampedY = Math.max(-1, Math.min(1, ny));
      const position = normalizedToGrid(clampedX, clampedY);

      // Update state
      setAnimationState("active");
      updatePosition(position);
    },
    [containerRef, updatePosition]
  );

  /**
   * Throttled pointer move handler (manual throttle for 60fps)
   */
  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      const now = performance.now();
      const timeSinceLastMove = now - lastMouseMoveRef.current;

      // Throttle to ~60fps (16ms)
      if (timeSinceLastMove < 16) {
        return;
      }

      lastMouseMoveRef.current = now;
      updateGaze(clientX, clientY);
      resetInactivityTimer();
    },
    [updateGaze, resetInactivityTimer]
  );

  /**
   * Mouse move event handler
   */
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY);
    },
    [handlePointerMove]
  );

  /**
   * Touch move event handler
   */
  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        handlePointerMove(touch.clientX, touch.clientY);
      }
    },
    [handlePointerMove]
  );

  /**
   * Setup event listeners and cleanup on unmount
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add global event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, {
      passive: true,
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);

      // Clean up all timers and animations
      cancelAnimations();
      clearAllTimers();
      cleanupAnimations();
      cleanupTimers();
    };
  }, [
    containerRef,
    handleMouseMove,
    handleTouchMove,
    cancelAnimations,
    clearAllTimers,
    cleanupAnimations,
    cleanupTimers,
  ]);

  return {
    spritePosition,
    animationState,
  };
}

export default useGazeTracking;
