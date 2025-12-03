# Seekers Domain - AI Coding Agent Instructions

## Architecture Overview
This is a React + TypeScript SPA using Vite, featuring modular 3D experiences with Three.js/React Three Fiber. The app has two primary architectural patterns:

### Modules
- **Structure**: Each module exports a `NexusModule` object with `id`, `route`, `label`, `Scene` (3D component), and `Panel` (UI component).
- **Example**: `src/modules/handbook/index.tsx` exports `handbookModule` with rotating cube Scene and simple Panel.
- **Registration**: Modules are registered in `src/core/moduleRegistry.ts` and routed in `src/App.tsx`.

### Realms
- **Structure**: Realms export a `Realm` object with `id`, `route`, `label`, `Environment` (3D world), and `Interface` (HUD/UI).
- **Example**: `src/modules/nexus/index.tsx` defines `nexusRealm` with LandingScene Environment and gateway Panel Interface.
- **Purpose**: Realms represent immersive 3D spaces with overlaid UI, unlike modules which are primarily 2D panels.

## Key Patterns
- **3D Scenes**: Use `@react-three/fiber` and `@react-three/drei`. Scenes are full-canvas experiences (see `src/scenes/LandingScene.tsx` for animated door emergence).
- **Inline Styles**: Components use inline `style` objects with CSS custom properties for theming (see `src/styles/theme.css`).
- **Data-Driven UI**: Complex UIs like the Codex Interface pull from typed data files (e.g., `src/modules/codex/manifestoData.ts`).
- **Type Definitions**: Core types in `src/types/hyperverse_types.ts` define SeekerStone, Quest, and Attribute structures.
- **Asset Loading**: Textures loaded via `useLoader(TextureLoader, path)` in 3D components.

## Developer Workflows
- **Development**: `pnpm run dev` starts Vite dev server with HMR.
- **Build**: `pnpm run build` runs TypeScript compilation then Vite build.
- **Linting**: `pnpm run lint` uses ESLint with TypeScript-aware rules.
- **No Tests**: Unit tests not implemented yet; add with Vitest if needed.
- **3D Debugging**: Use browser dev tools; Three.js objects logged to console for inspection.

## Conventions
- **File Comments**: Every file starts with `// FILE: path` and `DESCRIPTION:` block explaining purpose.
- **Component Naming**: PascalCase for components, camelCase for instances.
- **State Management**: Currently prop-drilling; eventBus and nexusState are placeholders for future global state.
- **Routing**: React Router DOM with nested routes; AppShell provides consistent layout.
- **3D Animation**: Use `useFrame` hook for per-frame updates; easing functions like `easeOutCubic` for smooth transitions.

## Integration Points
- **Three.js**: Core 3D rendering; import geometries/materials from `three`.
- **React Router**: Navigation between modules/realms.
- **No External APIs**: All data is local JSON; future integrations via fetch/Axios.
- **Styling**: CSS modules not used; rely on inline styles and global CSS.

## Cross-Component Communication
- **Event Bus**: `src/core/eventBus.ts` (empty; planned for pub/sub pattern).
- **Props**: Standard React props for parent-child communication.
- **Context**: Not implemented; consider for theme/global state.

Reference: `src/core/types.ts` for module/realm interfaces, `src/App.tsx` for routing structure.