'use client';

import React, { useRef, useState } from 'react';
import useGazeTracking from '@/hooks/useGazeTracking';

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
  className = '',
  basePath = '/faces/',
  showDebug = false,
  facePosition = { top: '179px', left: '269px', transform: 'translate(-50%, -50%) scale(0.725)' },
  faceSize = 256,
}: FaceTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { currentImage, isLoading, error } = useGazeTracking(containerRef, basePath);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 text-red-600 bg-red-50 border border-red-200 rounded p-5">
        Error loading face images: {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      onMouseMove={handleMouseMove}
    >
      {currentImage && (
        <img
          src={currentImage}
          alt="Face following gaze"
          className="absolute transition-opacity duration-100 ease-out"
          style={{
            width: `${faceSize}px`,
            height: `${faceSize}px`,
            objectFit: 'contain',
            ...facePosition,
          }}
        />
      )}

      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 text-sm">
          Loading face...
        </div>
      )}

      {showDebug && (
        <div className="absolute top-2.5 left-2.5 bg-black/80 text-white px-3 py-2 rounded font-mono text-xs leading-relaxed">
          <div>Mouse: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})</div>
          <div>Image: {currentImage?.split('/').pop()}</div>
        </div>
      )}
    </div>
  );
}
