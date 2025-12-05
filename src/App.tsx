import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { HandbookPanel } from "./modules/handbook/HandbookPanel";
import { StudioPanel } from "./modules/studio/StudioPanel";
import PlaygroundPanel from "./modules/playground/PlaygroundPanel";
import { NexusPanel } from "./modules/nexus/Panel";
import { ErrorBoundary } from "./ErrorBoundary";

export default function App() {
  return (
    // HashRouter keeps navigation working even when opened from file:// or static hosts without rewrite rules.
    <ErrorBoundary>
      <HashRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/nexus" replace />} />
            <Route path="/nexus" element={<NexusPanel />} />
            <Route path="/handbook" element={<HandbookPanel />} />
            <Route path="/studio" element={<StudioPanel />} />
            <Route path="/playground" element={<PlaygroundPanel />} />
            {/* we can add more routes/modules here later */}
          </Routes>
        </AppShell>
      </HashRouter>
    </ErrorBoundary>
  );
}
