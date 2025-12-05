// src/App.tsx
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { CodexInterface } from "./modules/codex/CodexInterface";
import { StudioPanel } from "./modules/studio/StudioPanel";
import PlaygroundPanel from "./modules/playground/PlaygroundPanel";
import { NexusPanel } from "./modules/nexus/Panel";
import { ErrorBoundary } from "./ErrorBoundary";
import LandingPanel from "./modules/landing/LandingPanel";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<LandingPanel />} />
            <Route path="/nexus" element={<NexusPanel />} />
            <Route path="/codex" element={<CodexInterface />} />
            <Route path="/studio" element={<StudioPanel />} />
            <Route path="/playground" element={<PlaygroundPanel />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </ErrorBoundary>
  );
}
