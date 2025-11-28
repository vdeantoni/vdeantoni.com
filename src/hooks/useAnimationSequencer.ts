import { useCallback, useRef } from "react";
import type {
  FacePosition,
  AnimationState,
} from "@/types/face-tracking";
import {
  interpolatePosition,
  easeOutCubic,
} from "@/utils/faceAnimations";

/**
 * Animation Sequencer Hook
 *
 * Manages smooth RAF-based animations for face tracking.
 * Handles return-to-center transitions with easing.
 *
 * @param onPositionUpdate - Callback to update sprite position
 * @param onStateChange - Callback to update animation state
 * @param currentPositionRef - Ref to current face position (avoids stale closures)
 * @returns Animation control functions
 */
export function useAnimationSequencer(
  onPositionUpdate: (position: FacePosition) => void,
  onStateChange: (state: AnimationState) => void,
  currentPositionRef: React.RefObject<FacePosition>
) {
  const transitionFrameRef = useRef<number | null>(null);

  /**
   * Animate smoothly from one position to another using requestAnimationFrame
   */
  const animateToPosition = useCallback(
    (
      from: FacePosition,
      to: FacePosition,
      duration: number,
      onComplete?: () => void
    ) => {
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const interpolated = interpolatePosition(
          from,
          to,
          progress,
          easeOutCubic
        );
        onPositionUpdate(interpolated);

        if (progress < 1) {
          transitionFrameRef.current = requestAnimationFrame(animate);
        } else {
          transitionFrameRef.current = null;
          onComplete?.();
        }
      };

      // Cancel any ongoing transition
      if (transitionFrameRef.current) {
        cancelAnimationFrame(transitionFrameRef.current);
      }
      transitionFrameRef.current = requestAnimationFrame(animate);
    },
    [onPositionUpdate]
  );

  /**
   * Smoothly transition back to center position
   */
  const returnToCenter = useCallback(
    (onComplete?: () => void) => {
      onStateChange("transitioning");
      animateToPosition(
        currentPositionRef.current || { px: 0, py: 0 },
        { px: 0, py: 0 },
        500,
        () => {
          // Wait 200ms at center, then go to idle (stay visible)
          setTimeout(() => {
            onStateChange("idle");
            onComplete?.();
          }, 200);
        }
      );
    },
    [animateToPosition, currentPositionRef, onStateChange]
  );

  /**
   * Cancel any ongoing animations
   */
  const cancelAnimations = useCallback(() => {
    if (transitionFrameRef.current) {
      cancelAnimationFrame(transitionFrameRef.current);
      transitionFrameRef.current = null;
    }
  }, []);

  /**
   * Cleanup function to clear all timers
   */
  const cleanup = useCallback(() => {
    cancelAnimations();
  }, [cancelAnimations]);

  return {
    returnToCenter,
    cancelAnimations,
    cleanup,
  };
}

export default useAnimationSequencer;
