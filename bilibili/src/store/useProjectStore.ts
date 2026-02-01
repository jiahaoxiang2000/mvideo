import { create } from 'zustand';
import { Project, Track, Clip, Asset } from '../types';

interface ProjectState {
  project: Project;
  tracks: Track[];
  clips: Clip[];
  assets: Asset[];
  playhead: number;
  selectedClipId: string | null;
  
  // Actions
  setPlayhead: (frame: number) => void;
  setSelectedClipId: (id: string | null) => void;
  addClip: (clip: Clip) => void;
  updateClip: (id: string, updates: Partial<Clip>) => void;
  removeClip: (id: string) => void;
  addAsset: (asset: Asset) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  project: {
    id: 'default',
    name: 'New Project',
    fps: 30,
    width: 1920,
    height: 1080,
    durationInFrames: 300,
  },
  tracks: [
    { id: 'track-1', name: 'Video 1', type: 'video', index: 0 },
    { id: 'track-2', name: 'Audio 1', type: 'audio', index: 1 },
  ],
  clips: [],
  assets: [],
  playhead: 0,
  selectedClipId: null,

  setPlayhead: (frame) => set({ playhead: frame }),
  setSelectedClipId: (id) => set({ selectedClipId: id }),
  addClip: (clip) => set((state) => ({ clips: [...state.clips, clip] })),
  updateClip: (id, updates) => set((state) => ({
    clips: state.clips.map((c) => (c.id === id ? { ...c, ...updates } : c)),
  })),
  removeClip: (id) => set((state) => ({
    clips: state.clips.filter((c) => c.id !== id),
    selectedClipId: state.selectedClipId === id ? null : state.selectedClipId,
  })),
  addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
}));
