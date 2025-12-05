// FILE: src/modules/playground/PlaygroundPanel.tsx
// DESCRIPTION:
//   Playground harness that renders the LandingScene so we can
//   iterate on the oak door experience without touching the main shell yet.

import { LandingScene } from "../../scenes/LandingScene";

const PlaygroundPanel = () => {
  const handleEnter = () => {
    console.log("[Playground] Enter HyperVerse requested");
    // Later: navigate from here into Nexus / Handbook / Corridor, etc.
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <LandingScene onEnter={handleEnter} />
    </div>
  );
};

export default PlaygroundPanel;
