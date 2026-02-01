export type AssetType = 'video' | 'audio' | 'image';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  src: string;
  durationInFrames?: number;
  width?: number;
  height?: number;
}

export interface Clip {
  id: string;
  assetId: string;
  trackId: string;
  startFrame: number; // Position on timeline
  displayStartFrame: number; // Trim start (relative to asset)
  durationInFrames: number; // Length on timeline
  volume?: number;
  playbackRate?: number;
}

export interface Track {
  id: string;
  name: string;
  type: 'video' | 'audio';
  index: number;
}

export interface Project {
  id: string;
  name: string;
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
}
