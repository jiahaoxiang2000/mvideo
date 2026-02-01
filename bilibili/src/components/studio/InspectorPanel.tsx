'use client';

import React from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { Settings2, Trash2 } from 'lucide-react';

export const InspectorPanel: React.FC = () => {
  const { clips, selectedClipId, updateClip, removeClip } = useProjectStore();
  
  const selectedClip = clips.find(c => c.id === selectedClipId);

  if (!selectedClip) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <Settings2 size={32} className="text-zinc-800 mb-2" />
        <div className="text-xs text-zinc-600">
          Select a clip on the timeline to view its properties.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Inspector</h2>
        <button 
          onClick={() => removeClip(selectedClip.id)}
          className="p-1.5 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Timing Section */}
        <section>
          <h3 className="text-[10px] font-bold text-zinc-600 uppercase mb-3">Timing</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500">Start Frame</label>
              <input 
                type="number"
                value={selectedClip.startFrame}
                onChange={(e) => updateClip(selectedClip.id, { startFrame: parseInt(e.target.value) || 0 })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs focus:border-blue-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500">Duration</label>
              <input 
                type="number"
                value={selectedClip.durationInFrames}
                onChange={(e) => updateClip(selectedClip.id, { durationInFrames: parseInt(e.target.value) || 1 })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Audio Section */}
        <section>
          <h3 className="text-[10px] font-bold text-zinc-600 uppercase mb-3">Audio</h3>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] text-zinc-500">Volume</label>
              <span className="text-[10px] text-zinc-400">{Math.round((selectedClip.volume ?? 1) * 100)}%</span>
            </div>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={selectedClip.volume ?? 1}
              onChange={(e) => updateClip(selectedClip.id, { volume: parseFloat(e.target.value) })}
              className="w-full accent-blue-500"
            />
          </div>
        </section>
      </div>
    </div>
  );
};
