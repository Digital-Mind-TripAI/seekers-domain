// src/modules/landing/LandingPanel.tsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OakDoorExperience } from "../../scenes/OakDoorScene";
import { useNavigate } from "react-router-dom";

const LandingPanel: React.FC = () => {
  const [showCinematic, setShowCinematic] = useState(false);
  const navigate = useNavigate();

  const handlePortalReady = () => {
    setShowCinematic(true);
  };

  const handleCinematicEnd = () => {
    // 👇 Decide where to send them based on whether they already have a profile
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem("hyperverse_seeker_profile");
        if (raw) {
          const profile = JSON.parse(raw);
          // If they at least have a stored name, treat them as a Returning Seeker
          if (profile?.seekerName && String(profile.seekerName).trim().length > 0) {
            navigate("/codex");
            return;
          }
        }
      } catch {
        // If something goes wrong, fall through to onboarding
      }
    }

    // No profile (or invalid) → New Seeker → Onboarding
    navigate("/onboarding");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000008",
        overflow: "hidden",
      }}
    >
      {/* 3D Door / Corridor */}
      <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 50 }}>
        <color attach="background" args={["#000008"]} />
        <OakDoorExperience
          onPortalReady={handlePortalReady}
          onPortalComplete={handleCinematicEnd}
        />
      </Canvas>

      {/* Wormhole cinematic overlay */}
      {showCinematic && (
        <video
          autoPlay
          onEnded={handleCinematicEnd}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundColor: "black",
          }}
        >
          {/* Add <source src="..." /> here when the cinematic asset is available */}
        </video>
      )}
    </div>
  );
};

export default LandingPanel;
