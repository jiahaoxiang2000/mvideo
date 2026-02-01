import React from 'react';
import { AbsoluteFill, Video, Audio, Img, useVideoConfig } from 'remotion';
import { Clip, Asset } from '../types';

interface MainCompositionProps {
  clips: Clip[];
  assets: Asset[];
}

export const MainComposition: React.FC<MainCompositionProps> = ({ clips, assets }) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-black">
      {clips.map((clip) => {
        const asset = assets.find((a) => a.id === clip.assetId);
        if (!asset) return null;

        const startFrom = clip.startFrame;
        const duration = clip.durationInFrames;

        return (
          <AbsoluteFill
            key={clip.id}
            startFrom={startFrom}
            durationInFrames={duration}
          >
            {asset.type === 'video' && (
              <Video
                src={asset.src}
                startFrom={clip.displayStartFrame}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                volume={clip.volume ?? 1}
              />
            )}
            {asset.type === 'audio' && (
              <Audio
                src={asset.src}
                startFrom={clip.displayStartFrame}
                volume={clip.volume ?? 1}
              />
            )}
            {asset.type === 'image' && (
              <Img
                src={asset.src}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            )}
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
