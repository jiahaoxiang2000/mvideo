"use client";

import React, { useMemo } from "react";

interface WaveformProps {
  durationInFrames: number;
  pixelsPerFrame: number;
  color?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  durationInFrames,
  pixelsPerFrame,
  color = "rgba(255, 255, 255, 0.3)",
}) => {
  const width = durationInFrames * pixelsPerFrame;
  
  const points = useMemo(() => {
    const numPoints = Math.floor(width / 2);
    const result: number[] = [];
    for (let i = 0; i < numPoints; i++) {
      result.push(Math.random() * 0.8 + 0.1);
    }
    return result;
  }, [width]);

  if (width < 10) return null;

  return (
    <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden">
      <svg width={width} height="100%" preserveAspectRatio="none">
        {points.map((p, i) => (
          <rect
            key={i}
            x={i * 2}
            y={`${(1 - p) * 50}%`}
            width="1"
            height={`${p * 100}%`}
            fill={color}
          />
        ))}
      </svg>
    </div>
  );
};
