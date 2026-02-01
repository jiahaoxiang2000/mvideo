'use client';

import React from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { Plus, Video, Music, Image as ImageIcon } from 'lucide-react';

export const ResourcesPanel: React.FC = () => {
  const { assets, addAsset, addClip } = useProjectStore();

  const handleAddDemoAsset = () => {
    const id = `asset-${Date.now()}`;
    addAsset({
      id,
      name: `Demo Video ${assets.length + 1}`,
      type: 'video',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      durationInFrames: 300,
    });
  };

  const handleAddToTimeline = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    addClip({
      id: `clip-${Date.now()}`,
      assetId,
      trackId: 'track-1',
      startFrame: 0,
      displayStartFrame: 0,
      durationInFrames: asset.durationInFrames || 150,
    });
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Assets</h2>
        <button 
          onClick={handleAddDemoAsset}
          className="p-1 hover:bg-zinc-800 rounded transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-2">
        {assets.length === 0 ? (
          <div className="text-xs text-zinc-600 italic text-center mt-8">
            No assets yet. Click + to add.
          </div>
        ) : (
          assets.map((asset) => (
            <div 
              key={asset.id}
              className="p-2 bg-zinc-900 border border-zinc-800 rounded flex items-center gap-3 group hover:border-zinc-600 transition-colors cursor-pointer"
              onClick={() => handleAddToTimeline(asset.id)}
            >
              <div className="w-10 h-10 bg-zinc-800 rounded flex items-center justify-center shrink-0">
                {asset.type === 'video' && <Video size={18} className="text-blue-400" />}
                {asset.type === 'audio' && <Music size={18} className="text-green-400" />}
                {asset.type === 'image' && <ImageIcon size={18} className="text-purple-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{asset.name}</div>
                <div className="text-[10px] text-zinc-500">
                  {asset.durationInFrames ? `${(asset.durationInFrames / 30).toFixed(1)}s` : 'Static'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
