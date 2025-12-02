import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "../layout/AppShell";
import { HandbookPanel } from "./handbook/HandbookPanel";
import { StudioPanel } from "./studio/StudioPanel";
import { PlaygroundPanel } from "./playground/PlaygroundPanel";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/handbook" replace />} />
          <Route path="/handbook" element={<HandbookPanel />} />
          <Route path="/studio" element={<StudioPanel />} />
          <Route path="/playground" element={<PlaygroundPanel />} />
          {/* we can add more routes/modules here later */}
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
