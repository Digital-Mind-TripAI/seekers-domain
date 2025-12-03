// FILE: src/scenes/LandingScene.tsx
// DEBUG VERSION:
//   - Simple 3D panel in a void
//   - Confirms the NexusScene is wired correctly

import "../styles/scenes/LandingScene.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type LandingSceneProps = {
  onEnter?: () => void;
};

function FloatingPanel() {
  const ref = useRef<THREE.Mesh | null>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
    ref.current.rotation.x += delta * 0.15;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <boxGeometry args={[3, 2, 0.3]} />
      <meshStandardMaterial
        color={"#38bdf8"}
        emissive={"#0f172a"}
        emissiveIntensity={0.7}
        metalness={0.4}
        roughness={0.3}
      />
    </mesh>
  );
}

export function LandingScene({ onEnter }: LandingSceneProps) {
  useEffect(() => {
    console.log("LandingScene mounted");
    if (onEnter) onEnter();
  }, [onEnter]);

  return (
    <div className="landing-root">
      <div className="landing-debug-banner">
        LandingScene ONLINE – if you don&apos;t see the panel, the Canvas
        isn&apos;t rendering.
      </div>

      <div className="landing-canvas-container">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={["#020617"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 4]} intensity={1.2} />
          <FloatingPanel />
        </Canvas>
      </div>
    </div>
  );
}
