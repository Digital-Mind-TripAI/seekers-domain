// src/App.tsx
import { HashRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { CodexInterface } from "./modules/codex/CodexInterface";
import { AnnexPanel } from "./modules/annex/AnnexPanel";
import { NexusPanel } from "./modules/nexus/Panel";
import { ErrorBoundary } from "./ErrorBoundary";
import LandingPanel from "./modules/landing/LandingPanel";
import OnboardingPanel from "./modules/onboarding/OnboardingPanel";

export default function App() {
  return (
    <ErrorBoundary>
      <HashRouter>
        <AppShell>
          <Routes>
            {/* Oak Door + Portal */}
            <Route path="/" element={<LandingPanel />} />

            {/* New vs Returning branching */}
            <Route path="/onboarding" element={<OnboardingPanel />} />

            {/* Core Realms */}
            <Route path="/nexus" element={<NexusPanel />} />
            <Route path="/codex" element={<CodexInterface />} />
            <Route path="/annex" element={<AnnexPanel />} />

            {/* Optional legacy alias */}
            <Route path="/handbook" element={<CodexInterface />} />
          </Routes>
        </AppShell>
      </HashRouter>
    </ErrorBoundary>
  );
}
