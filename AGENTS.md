# mvideo Guidelines

## Project Overview

**mvideo** is a video editing studio built with **Remotion** and **Next.js**. It provides a browser-based video editing experience similar to professional NLEs (Non-Linear Editors) like DaVinci Resolve or Premiere Pro.

### Key Features
- Video preview with Remotion Player
- Multi-track timeline (video, audio, overlays, subtitles)
- Resizable panel layout (Resources, Preview, Inspector, Timeline)
- Keyboard shortcuts for editing workflow
- AWS Lambda rendering support
- Asset ingestion with FFmpeg

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 + React 19 |
| Video Engine | Remotion 4.0 |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Validation | Zod |
| Package Manager | Bun |
| Rendering | AWS Lambda (optional) |

## Project Structure

```
mvideo/
├── Makefile              # Build commands (setup, dev, build, lint)
├── AGENTS.md             # This file
└── bilibili/             # Main application
    ├── src/
    │   ├── app/          # Next.js App Router pages & API routes
    │   │   ├── page.tsx  # Main studio UI
    │   │   └── api/      # REST endpoints (assets, lambda, ingestion)
    │   ├── components/   # React components
    │   │   └── studio/   # Studio panels (Timeline, Preview, Inspector, Resources)
    │   ├── remotion/     # Remotion compositions
    │   │   ├── Root.tsx  # Remotion entry point
    │   │   ├── composition-registry.ts  # All compositions registered here
    │   │   ├── Compositions/  # Video compositions (Intro, Main, Outro, Final)
    │   │   └── MyComp/   # Reusable composition components
    │   ├── services/     # State stores (project, UI)
    │   ├── hooks/        # Custom React hooks (keyboard shortcuts)
    │   ├── helpers/      # Utility functions
    │   ├── lambda/       # AWS Lambda rendering API
    │   └── server/       # Server-side utilities (FFmpeg, asset store)
    ├── types/            # TypeScript types & Zod schemas
    │   ├── constants.ts  # Video settings, composition props, defaults
    │   ├── schema.ts     # API request/response schemas
    │   └── models.ts     # Data models
    └── public/           # Static assets
```

## Quick Start

```bash
# Install dependencies
make setup

# Start development server
make dev

# Build for production
make build

# Run linting
make lint
```

## Video Configuration

Default video settings (defined in `types/constants.ts`):

| Setting | Value |
|---------|-------|
| Resolution | 1280x720 (720p) |
| Frame Rate | 30 FPS |
| Intro Duration | 150 frames (5s) |
| Main Duration | 900 frames (30s) |
| Outro Duration | 150 frames (5s) |

## Compositions

The project uses a composition-based architecture:

1. **IntroComposition** - Opening title/branding
2. **MainComposition** - Primary video content with overlays
3. **OutroComposition** - Closing CTA/credits
4. **FinalComposition** - Combines all above into final output

Register new compositions in `src/remotion/composition-registry.ts`.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| ← / → | Step 1 frame |
| Shift+← / Shift+→ | Step 5 frames |
| Home | Skip to start |
| End | Skip to end |
| V | Select tool |
| C | Razor tool |
| H | Hand tool |
| S | Toggle snap |
| N | Toggle ripple |
| +/- | Zoom in/out |
| Cmd/Ctrl+Z | Undo |
| Cmd/Ctrl+Shift+Z | Redo |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/assets` | GET/POST | List/upload assets |
| `/api/assets/[id]` | GET/DELETE | Get/delete asset |
| `/api/ingestion/import` | POST | Import video files |
| `/api/lambda/render` | POST | Start Lambda render |
| `/api/lambda/progress` | GET | Check render progress |

## Development Guidelines

### Adding New Compositions

1. Create component in `src/remotion/Compositions/`
2. Define props schema in `types/constants.ts`
3. Register in `src/remotion/composition-registry.ts`

### Working with Overlays

Overlay types supported in MainComposition:
- `title` - Large title text
- `lower-third` - Name/title bar
- `cta` - Call-to-action button
- `text` - Generic text
- `image` - Image overlay

### State Management

- **Project Store** (`services/project-store.ts`) - Project data, timeline state
- **UI Store** (`services/ui-store.ts`) - UI state, panel visibility

## Skills Available

This project has Remotion best practices skill installed at `.opencode/skills/remotion-best-practices/`. Reference these for:
- Animations & transitions
- Audio/video handling
- Captions & subtitles
- Charts & visualizations
- Font loading
- Asset management
