import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { HandbookPanel } from "./modules/handbook/HandbookPanel";
import { StudioPanel } from "./modules/studio/StudioPanel";
import PlaygroundPanel from "./modules/playground/PlaygroundPanel";
import { NexusPanel } from "./modules/nexus/Panel";

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
