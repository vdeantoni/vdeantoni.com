"use client";

import React, { useRef, useState } from "react";
import useGazeTracking from "@/hooks/useGazeTracking";

interface FaceTrackerProps {
  className?: string;
  basePath?: string;
  showDebug?: boolean;
  facePosition?: {
    top?: string;
    left?: string;
    transform?: string;
  };
  faceSize?: number;
}

/**
 * FaceTracker Component
 * Displays a face overlay that follows mouse/touch movement
 */
export default function FaceTracker({
  className = "",
  basePath = "/faces/",
  showDebug = false,
  facePosition = {
    top: "180px",
    left: "267px",
    transform: "translate(-50%, -50%) scale(0.725)",
  },
  faceSize = 256,
}: FaceTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { currentImage } = useGazeTracking(containerRef, basePath);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
    >
      {currentImage && (
        <img
          src={currentImage}
          alt="Face following gaze"
          className="absolute transition-opacity duration-100 ease-out"
          style={{
            width: `${faceSize}px`,
            height: `${faceSize}px`,
            objectFit: "contain",
            ...facePosition,
          }}
        />
      )}

      {showDebug && (
        <div className="absolute top-2.5 left-2.5 bg-black/80 text-white px-3 py-2 rounded font-mono text-xs leading-relaxed">
          <div>Image: {currentImage?.split("/").pop()}</div>
        </div>
      )}
    </div>
  );
}
