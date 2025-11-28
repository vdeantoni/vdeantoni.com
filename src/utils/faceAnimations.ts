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
export const P_MIN = -15;
export const P_MAX = 15;
export const STEP = 3;
export const SPRITE_TILE_SIZE = 512;
export const SPRITE_GRID_SIZE = 11;

/**
 * Easing Function
 */

export const easeOutCubic: EasingFunction = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Grid and Sprite Calculations
 */

export function quantizeToGrid(value: number): number {
  const clamped = Math.max(P_MIN, Math.min(P_MAX, value));
  return Math.round(clamped / STEP) * STEP;
}

export function facePositionToSprite(position: FacePosition): SpritePosition {
  // Convert grid position to sprite pixel position
  // Grid: -15 to 15 (step 3) = 11 positions
  // Sprite: 11x11 grid, each tile 512x512px
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
  easing: EasingFunction = easeOutCubic
): FacePosition {
  const easedProgress = easing(progress);

  return {
    px: quantizeToGrid(from.px + (to.px - from.px) * easedProgress),
    py: quantizeToGrid(from.py + (to.py - from.py) * easedProgress),
  };
}

