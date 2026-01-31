import { useMemo } from "react";
import type { Project } from "../../types/models";
import { resolveProjectToMainCompositionProps } from "../services/resolve-composition-props";

/**
 * Hook that resolves project data to MainComposition props for live preview.
 * Updates automatically when project tracks, clips, or assets change.
 */
export const useResolvedCompositionProps = (project: Project) => {
  // Create stable dependency keys for memoization (avoids JSON.stringify on every render)
  const assetsKey = useMemo(() => 
    project.assets.map(a => `${a.id}:${a.src}`).join(','),
    [project.assets]
  );

  const tracksKey = useMemo(() =>
    project.tracks.map(t => 
      `${t.id}:${t.clips.map(c => 
        `${c.id}:${c.assetId}:${c.startFrame}:${c.durationInFrames}:${c.trimStartFrame ?? 0}`
      ).join('|')}`
    ).join(';'),
    [project.tracks]
  );

  const compositionProps = useMemo(() => {
    return resolveProjectToMainCompositionProps(project);
  }, [project, assetsKey, tracksKey]);

  return compositionProps;
};
