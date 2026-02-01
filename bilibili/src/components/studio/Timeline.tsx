'use client';

import React from 'react';
import { useProjectStore } from '../../store/useProjectStore';

export const Timeline: React.FC = () => {
  const { project, tracks, clips, playhead, setPlayhead, selectedClipId, setSelectedClipId, updateClip } = useProjectStore();
  
  const pixelsPerFrame = 2;
  const timelineWidth = project.durationInFrames * pixelsPerFrame;

  const handleTimelineClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const frame = Math.max(0, Math.min(project.durationInFrames - 1, Math.floor(x / pixelsPerFrame)));
    setPlayhead(frame);
  };

  const handleClipClick = (e: React.MouseEvent, clipId: string) => {
    e.stopPropagation();
    setSelectedClipId(clipId);
  };

  const handleClipDrag = (e: React.DragEvent, clipId: string) => {
    // Basic drag logic would go here
    // For MVP, we can just use a simple mouse move if we wanted full dragging
  };

  return (
    <div className="h-full flex flex-col bg-zinc-900 select-none" onClick={() => setSelectedClipId(null)}>
      {/* Ruler */}
      <div 
        className="h-8 border-b border-zinc-800 relative cursor-pointer"
        onClick={handleTimelineClick}
      >
        <div style={{ width: timelineWidth }} className="h-full relative">
          {/* Simple markers every 30 frames */}
          {Array.from({ length: Math.ceil(project.durationInFrames / 30) }).map((_, i) => (
            <div 
              key={i} 
              className="absolute top-0 h-full border-l border-zinc-700 text-[10px] pl-1 pt-1 text-zinc-500"
              style={{ left: i * 30 * pixelsPerFrame }}
            >
              {i}s
            </div>
          ))}
        </div>
      </div>

      {/* Tracks Area */}
      <div className="flex-1 overflow-auto">
        <div className="relative" style={{ width: timelineWidth, minHeight: '100%' }}>
          {tracks.map((track) => (
            <div 
              key={track.id} 
              className="h-16 border-b border-zinc-800 relative group"
            >
              <div className="absolute left-0 top-0 h-full w-24 bg-zinc-800/50 border-r border-zinc-700 z-10 flex items-center px-2 text-xs font-medium">
                {track.name}
              </div>
              
              {/* Clips on this track */}
              {clips.filter(c => c.trackId === track.id).map(clip => (
                <div
                  key={clip.id}
                  onClick={(e) => handleClipClick(e, clip.id)}
                  className={`absolute top-1 bottom-1 rounded border flex items-center px-2 text-[10px] overflow-hidden whitespace-nowrap transition-colors cursor-move ${
                    selectedClipId === clip.id 
                      ? 'bg-blue-500 border-white z-10' 
                      : 'bg-blue-600/50 border-blue-400 hover:bg-blue-600/70'
                  }`}
                  style={{
                    left: clip.startFrame * pixelsPerFrame,
                    width: clip.durationInFrames * pixelsPerFrame,
                  }}
                >
                  Clip {clip.id.slice(0, 4)}
                </div>
              ))}
            </div>
          ))}

          {/* Playhead */}
          <div 
            className="absolute top-0 bottom-0 w-px bg-red-500 z-20 pointer-events-none"
            style={{ left: playhead * pixelsPerFrame }}
          >
            <div className="absolute -top-1 -left-1.5 w-3 h-3 bg-red-500 rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
};
