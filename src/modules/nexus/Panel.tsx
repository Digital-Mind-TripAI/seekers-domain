// src/modules/nexus/Panel.tsx
import React, { useState } from "react";
import { gatewayData } from "./gatewayData";
import "./Panel.css";

// Note: You will need to define or import the 'useNavigator' hook
// for the real app to handle navigation when a portal is clicked.

export function NexusPanel() {
  const [stage, setStage] = useState<"veil" | "threshold" | "entered">("veil");

  const handleEnter = () => {
    setStage("threshold");
  };

  const handleCrossThreshold = () => {
    setStage("entered");
  };

  return (
    <div className="nexus-panel-root">
      {/* STAGE 1: THE OUTER VEIL */}
      {stage === "veil" && (
        <div className="nexus-stage">
          <h1 className="nexus-title">{gatewayData.outerVeil.text}</h1>
          <p className="nexus-subtitle">{gatewayData.outerVeil.vibe}</p>
          <button onClick={handleEnter} className="nexus-primary-button">
            INITIALIZE SEQUENCE
          </button>
        </div>
      )}

      {/* STAGE 2: THE THRESHOLD (Choosing the lens) */}
      {stage === "threshold" && (
        <div className="nexus-stage">
          <p
            style={{
              fontSize: "1.1rem",
              maxWidth: "48ch",
              lineHeight: 1.6,
              color: "rgba(220,231,245,0.9)",
              fontWeight: 300,
            }}
          >
            "{gatewayData.threshold.welcome}"
          </p>

          <div className="nexus-grid">
            {gatewayData.threshold.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={handleCrossThreshold}
                className="nexus-card"
              >
                <span className="nexus-card-label">{choice.label}</span>
                <span className="nexus-card-sub">{choice.sub}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 3: ENTERED (UI clears to reveal 3D portals and a small prompt) */}
      {stage === "entered" && (
        <div className="nexus-entered-hint">
          <p>SELECT A PORTAL TO BEGIN</p>
        </div>
      )}
    </div>
  );
}

export default NexusPanel;
