// FILE: Playground.tsx

import React, { useState, useCallback } from "react";
import { PortalCinematic } from "../components/PortalCinematic";

type PortalPhase = "door" | "wormhole" | "cinematic";

export const Playground: React.FC = () => {
  const [phase, setPhase] = useState<PortalPhase>("door");

  const handleWormholeComplete = useCallback(() => {
    console.log("Wormhole complete – launching cinematic");
    setPhase("cinematic");
  }, []);

  return (
    <div className="playground-layout">
      <aside className="playground-sidebar">
        <h2>Seeker&apos;s Domain</h2>
        <nav className="playground-nav">
          <button>Seeker&apos;s Handbook</button>
          <button>Creator Studio</button>
          <button className="active">Prototype / Playground</button>
        </nav>
      </aside>

      <main className="playground-main">
        <div className="portal-canvas-wrapper">
          {phase !== "cinematic" && (
            <PortalExperience
              onWormholeComplete={handleWormholeComplete}
            />
          )}
        </div>

        <PortalCinematic active={phase === "cinematic"} />
      </main>
    </div>
  );
};

interface PortalExperienceProps {
  onWormholeComplete: () => void;
}

const PortalExperience: React.FC<PortalExperienceProps> = ({
  onWormholeComplete,
}) => {
  return (
    <div className="portal-experience">
      {/* INSERT YOUR ThreeJS/Physics scene here */}

      {/* Example trigger for testing */}
      <button
        onClick={() => {
          console.log("Manual trigger → Wormhole complete");
          onWormholeComplete();
        }}
      >
        Test Wormhole Complete
      </button>
    </div>
  );
};
