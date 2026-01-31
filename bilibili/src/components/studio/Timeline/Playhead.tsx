"use client";

import React from "react";

interface PlayheadProps {
  currentFrame: number;
  pixelsPerFrame: number;
  headerWidth: number;
}

export const Playhead: React.FC<PlayheadProps> = ({
  currentFrame,
  pixelsPerFrame,
  headerWidth,
}) => {
  return (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-studio-playhead z-30 pointer-events-none"
      style={{ left: currentFrame * pixelsPerFrame + headerWidth }}
    >
      <div
        className="absolute -top-0 left-1/2 -translate-x-1/2 w-3 h-4 bg-studio-playhead"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)",
        }}
      />
    </div>
  );
};
