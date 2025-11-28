/**
 * Face tracking type definitions
 */

export interface FacePosition {
  px: number; // Horizontal position on grid (-15 to 15, step 3)
  py: number; // Vertical position on grid (-15 to 15, step 3)
}

export interface SpritePosition {
  x: number; // X position in sprite image (pixels)
  y: number; // Y position in sprite image (pixels)
}

export interface EasingFunction {
  (t: number): number; // t is progress from 0 to 1, returns eased value 0 to 1
}

export type AnimationState =
  | "idle" // At center, no activity
  | "active" // Following mouse/touch
  | "transitioning"; // Animating back to center

export interface UseGazeTrackingOptions {
  inactivityDelay?: number; // Delay before transitioning to inactive (ms)
}

export interface UseGazeTrackingReturn {
  spritePosition: SpritePosition | null;
  animationState: AnimationState;
}
