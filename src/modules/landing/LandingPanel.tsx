// src/modules/landing/LandingPanel.tsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OakDoorExperience } from "../../scenes/OakDoorScene";

const LandingPanel: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000008",
      }}
    >
      <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 50 }}>
        <color attach="background" args={["#000008"]} />
        <OakDoorExperience />
      </Canvas>
    </div>
  );
};

export default LandingPanel;
