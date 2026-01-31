"use client";

import React, { useCallback } from "react";
import { Timeline } from "./Timeline/Timeline";
import { useProjectStore } from "../../services/project-store";
import type { Asset, AssetKind } from "../../../types/models";

type AssetDragPayload = {
  source: "resources";
  kind: AssetKind;
  record: {
    id: string;
    originalName: string;
    metadata: {
      durationSeconds: number | null;
      width: number | null;
      height: number | null;
    };
  };
};

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
  const { project, updateClip, addAsset } = useProjectStore();

  const handleUpdateClip = (clipId: string, partial: any) => {
    updateClip(clipId, partial);
  };

  const handleSelectClip = (clipId: string, trackId: string) => {
    onClipSelect?.(clipId, trackId);
  };

  const handleAssetDrop = useCallback(
    (event: React.DragEvent) => {
      const payloadText =
        event.dataTransfer.getData("application/vnd.mvideo.asset") ||
        event.dataTransfer.getData("application/json");

      if (!payloadText) {
        return;
      }

      let payload: AssetDragPayload | null = null;
      try {
        payload = JSON.parse(payloadText) as AssetDragPayload;
      } catch {
        return;
      }

      if (!payload || payload.source !== "resources") {
        return;
      }

      if (project.assets.some((asset) => asset.id === payload.record.id)) {
        return;
      }

      const durationSeconds = payload.record.metadata.durationSeconds;
      const durationInFrames = durationSeconds
        ? Math.round(durationSeconds * project.fps)
        : undefined;

      const meta: Record<string, unknown> = {};
      if (payload.record.metadata.width) {
        meta.width = payload.record.metadata.width;
      }
      if (payload.record.metadata.height) {
        meta.height = payload.record.metadata.height;
      }

      const asset: Asset = {
        id: payload.record.id,
        kind: payload.kind,
        src: `/api/assets/${payload.record.id}/source`,
        name: payload.record.originalName,
        durationInFrames,
        meta: Object.keys(meta).length ? meta : undefined,
      };

      addAsset(asset);
    },
    [addAsset, project.assets, project.fps]
  );

  return (
    <Timeline
      project={project}
      currentFrame={currentFrame}
      zoom={zoom}
      snapEnabled={snapEnabled}
      onSeek={onSeek}
      onUpdateClip={handleUpdateClip}
      onSelectClip={handleSelectClip}
      onAssetDrop={handleAssetDrop}
      onZoomChange={onZoomChange}
    />
  );
};
