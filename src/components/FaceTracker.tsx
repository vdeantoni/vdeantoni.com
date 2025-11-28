"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useGazeTracking from "@/hooks/useGazeTracking";
import { SPRITE_TILE_SIZE } from "@/utils/faceAnimations";

interface FaceTrackerProps {
  className?: string;
  spritePath?: string;
  spriteGridSize?: number;
  showDebug?: boolean;
  facePosition?: {
    top?: string;
    left?: string;
    transform?: string;
  };
  faceSize?: number;
  inactivityDelay?: number;
}

/**
 * FaceTracker Component
 * Displays a face overlay using CSS sprite that follows mouse/touch movement
 */
export default function FaceTracker({
  className = "",
  spritePath = "/faces/gaze_grid.webp",
  spriteGridSize = 11,
  showDebug = false,
  facePosition = {
    top: "180px",
    left: "267px",
    transform: "translate(-50%, -50%) scale(0.725)",
  },
  faceSize = 512,
  inactivityDelay = 1000,
}: FaceTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [spriteLoaded, setSpriteLoaded] = useState(false);

  const { spritePosition, animationState } = useGazeTracking(containerRef, {
    inactivityDelay,
    spriteGridSize,
  });

  // Preload sprite image
  useEffect(() => {
    const img = new Image();
    img.src = spritePath;
    img.onload = () => setSpriteLoaded(true);
  }, [spritePath]);

  // Always show face once loaded, default to center position (0, 0)
  const centerIndex = Math.floor(spriteGridSize / 2);
  const centerPosition = {
    x: centerIndex * SPRITE_TILE_SIZE,
    y: centerIndex * SPRITE_TILE_SIZE,
  };
  const displayPosition = spritePosition || centerPosition;
  const spriteSizeInPx = spriteGridSize * SPRITE_TILE_SIZE;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
    >
      {spriteLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute"
          style={{
            width: `${faceSize}px`,
            height: `${faceSize}px`,
            backgroundImage: `url(${spritePath})`,
            backgroundSize: `${spriteSizeInPx}px ${spriteSizeInPx}px`,
            backgroundPosition: `-${displayPosition.x}px -${displayPosition.y}px`,
            backgroundRepeat: "no-repeat",
            imageRendering: "auto",
            ...facePosition,
          }}
          role="img"
          aria-label="Face following gaze"
        />
      )}

      {showDebug && (
        <div className="absolute top-2.5 left-2.5 bg-black/80 text-white px-3 py-2 rounded font-mono text-xs leading-relaxed">
          <div>State: {animationState}</div>
          <div>
            Position:{" "}
            {spritePosition
              ? `${spritePosition.x}, ${spritePosition.y}`
              : "center (default)"}
          </div>
        </div>
      )}
    </div>
  );
}
