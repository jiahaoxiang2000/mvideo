"use client";

import React from "react";
import { Timeline } from "./Timeline/Timeline";
import { useProjectStore } from "../../services/project-store";

interface TimelinePanelProps {
  currentFrame: number;
  totalFrames: number;
  fps: number;
  zoom: number;
  snapEnabled: boolean;
  onSeek: (frame: number) => void;
  onClipSelect?: (clipId: string, trackId: string) => void;
  onZoomChange?: (zoom: number) => void;
}

export const TimelinePanel = ({
  currentFrame,
  zoom,
  snapEnabled,
  onSeek,
  onClipSelect,
  onZoomChange,
}: TimelinePanelProps) => {
  const { project, updateClip } = useProjectStore();

  const handleUpdateClip = (clipId: string, partial: any) => {
    updateClip(clipId, partial);
  };

  const handleSelectClip = (clipId: string, trackId: string) => {
    onClipSelect?.(clipId, trackId);
  };

  return (
    <Timeline
      project={project}
      currentFrame={currentFrame}
      zoom={zoom}
      snapEnabled={snapEnabled}
      onSeek={onSeek}
      onUpdateClip={handleUpdateClip}
      onSelectClip={handleSelectClip}
      onZoomChange={onZoomChange}
    />
  );
};
