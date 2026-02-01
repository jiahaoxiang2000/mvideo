# Re-implementation Plan: Bilibili Studio MVP

## Goal
Re-implement a Minimum Viable Product (MVP) of the Remotion Studio within the `bilibili` project, focusing on core video editing functions and using online Remotion packages.

## Core Functions (MVP)
1.  **Project State Management**: A central store (Zustand) to manage tracks, clips, and playhead position.
2.  **Timeline**: A functional timeline for:
    *   Visualizing clips across multiple tracks.
    *   Dragging clips to change their position.
    *   Trimming clips (start/end).
3.  **Preview Player**: Integrated Remotion Player that stays in sync with the timeline.
4.  **Asset Management**: Basic ability to list and use media assets.
5.  **Property Inspector**: Basic editing of clip properties (e.g., transform, volume).

## Technical Stack
*   **Framework**: Next.js (App Router)
*   **Video Engine**: Remotion (Online version: `4.0.414`)
*   **State**: Zustand
*   **UI**: Tailwind CSS + Lucide Icons + react-resizable-panels

## Implementation Steps

### Phase 1: Setup & State
- [ ] Initialize Next.js project and install dependencies.
- [ ] Define core types (`Project`, `Track`, `Clip`, `Asset`).
- [ ] Implement `useProjectStore` with Zustand.

### Phase 2: Core UI Components
- [ ] **StudioLayout**: Main grid with resizable panels.
- [ ] **Timeline**: Basic track and clip rendering.
- [ ] **PreviewPlayer**: Remotion Player integration.
- [ ] **ResourcesPanel**: Simple asset list.

### Phase 3: Interaction & Sync
- [ ] Implement playhead synchronization between Timeline and Player.
- [ ] Implement clip dragging and trimming logic.
- [ ] Connect Inspector to selected clip properties.

### Phase 4: Remotion Integration
- [ ] Create a dynamic Remotion composition that renders the project state.
- [ ] Ensure real-time preview updates when state changes.

## Key Differences from Previous Plan
*   **Simplified Scope**: Removed complex ingestion pipelines, plugin systems, and advanced rendering queues for the initial MVP.
*   **Online Dependencies**: No local workspace links; uses standard npm packages.
*   **Focus on Core Loop**: Prioritize the Edit-Preview loop.
