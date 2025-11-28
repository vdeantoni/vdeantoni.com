/**
 * Face tracking utilities
 * Grid calculations, easing functions, and sprite positioning
 */

import type {
  EasingFunction,
  FacePosition,
  SpritePosition,
} from "@/types/face-tracking";

// Constants for face grid
export const STEP = 3;
export const SPRITE_TILE_SIZE = 512;

/**
 * Calculate grid bounds based on sprite grid size
 * For N x N grid: range is from -(N-1)/2 * STEP to (N-1)/2 * STEP
 * Example: 11x11 → -15 to 15, 13x13 → -18 to 18
 */
export function getGridBounds(gridSize: number) {
  const halfSteps = (gridSize - 1) / 2;
  return {
    P_MIN: -halfSteps * STEP,
    P_MAX: halfSteps * STEP,
  };
}

/**
 * Easing Function
 */

export const easeOutCubic: EasingFunction = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Grid and Sprite Calculations
 */

export function quantizeToGrid(value: number, gridSize: number): number {
  const { P_MIN, P_MAX } = getGridBounds(gridSize);
  const clamped = Math.max(P_MIN, Math.min(P_MAX, value));
  return Math.round(clamped / STEP) * STEP;
}

export function facePositionToSprite(
  position: FacePosition,
  gridSize: number,
): SpritePosition {
  // Convert grid position to sprite pixel position
  // Example: 11x11 grid → -15 to 15 (step 3) = 11 positions
  // Example: 13x13 grid → -18 to 18 (step 3) = 13 positions
  const { P_MIN } = getGridBounds(gridSize);
  const gridX = (position.px - P_MIN) / STEP;
  const gridY = (position.py - P_MIN) / STEP;

  return {
    x: gridX * SPRITE_TILE_SIZE,
    y: gridY * SPRITE_TILE_SIZE,
  };
}

export function interpolatePosition(
  from: FacePosition,
  to: FacePosition,
  progress: number,
  gridSize: number,
  easing: EasingFunction = easeOutCubic,
): FacePosition {
  const easedProgress = easing(progress);

  return {
    px: quantizeToGrid(from.px + (to.px - from.px) * easedProgress, gridSize),
    py: quantizeToGrid(from.py + (to.py - from.py) * easedProgress, gridSize),
  };
}
