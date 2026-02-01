'use client';

import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Download, Share2 } from 'lucide-react';
import { useProjectStore } from '../../store/useProjectStore';

export const StudioToolbar: React.FC = () => {
  const { project, playhead, setPlayhead } = useProjectStore();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-bold">{project.name}</span>
        </div>
        <div className="h-4 w-px bg-zinc-800" />
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white">
            <SkipBack size={16} onClick={() => setPlayhead(0)} />
          </button>
          <button className="p-1.5 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white">
            <Play size={16} />
          </button>
          <button className="p-1.5 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white">
            <SkipForward size={16} onClick={() => setPlayhead(project.durationInFrames - 1)} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-medium transition-colors">
          <Share2 size={14} />
          Share
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-xs font-medium transition-colors">
          <Download size={14} />
          Export
        </button>
      </div>
    </div>
  );
};
