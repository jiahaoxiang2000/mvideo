'use client';

import React from 'react';
import { StudioLayout } from '../components/studio/StudioLayout';
import { StudioToolbar } from '../components/studio/StudioToolbar';
import { ResourcesPanel } from '../components/studio/ResourcesPanel';
import { PreviewPlayer } from '../components/studio/PreviewPlayer';
import { InspectorPanel } from '../components/studio/InspectorPanel';
import { Timeline } from '../components/studio/Timeline';

export default function StudioPage() {
  return (
    <StudioLayout
      toolbar={<StudioToolbar />}
      resources={<ResourcesPanel />}
      preview={<PreviewPlayer />}
      inspector={<InspectorPanel />}
      timeline={<Timeline />}
    />
  );
}
