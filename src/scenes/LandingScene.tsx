// FILE: src/scenes/LandingScene.tsx
// DEBUG VERSION:
//   - Renders text + border so we can see if the component is mounted
//   - Simple 3D panel in a void
//   - Logs to console on mount

import "../styles/scenes/LandingScene.css";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  Group,
  Mesh,
  MeshBasicMaterial,
  AdditiveBlending,
} from "three";
import { useRef, useState, useEffect } from "react";

type LandingSceneProps = {
  onEnter?: () => void;
};

type DoorPanelProps = {
  onEnter?: () => void;
};

function DoorPanel({ onEnter }: DoorPanelProps) {
  const cardGroupRef = useRef<Group | null>(null);
  const glowMatRef = useRef<MeshBasicMaterial | null>(null);
  const [hasArrived, setHasArrived] = useState(false);
  const [hovered, setHovered] = useState(false);

  const doorTex = useLoader(TextureLoader, "/oak-door-main.jpg");
  const startTimeRef = useRef<number | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!cardGroupRef.current) return;

    // first frame
    if (startTimeRef.current === null) {
      startTimeRef.current = t;
    }

    const elapsed = t - startTimeRef.current;
    const duration = 2.0;
    const clamped = Math.min(elapsed / duration, 1);

    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    const p = easeOut(clamped);

    const startZ = -25;
    const endZ = -6.5;
    const z = startZ + (endZ - startZ) * p;

    const startTiltX = -0.45;
    const startTiltY = 0.6;
    const tiltX = startTiltX * (1 - p * 0.9);
    const tiltY = startTiltY * (1 - p);

    cardGroupRef.current.position.set(0, 0, z);
    cardGroupRef.current.rotation.set(tiltX, tiltY, 0);

    if (clamped >= 1 && !hasArrived) {
      setHasArrived(true);
    }

    if (hasArrived) {
      const breathe = 1 + Math.sin(t * 1.2) * 0.01;
      cardGroupRef.current.scale.setScalar(breathe);
    }

    if (glowMatRef.current) {
      const base = hovered ? 0.75 : 0.45;
      const osc = 0.12 * Math.sin(t * 2.1);
      glowMatRef.current.opacity = base + osc;
    }
  });

  const handleClick = () => {
    console.log("[LandingScene] Door clicked");
    if (onEnter) onEnter();
  };

  return (
    <group ref={cardGroupRef}>
      {/* Back glow */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[9, 6]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color="#26ffe6"
          transparent
          opacity={0.4}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Card */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial color="#050816" />
      </mesh>

      {/* Door texture */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[5.5, 4.1]} />
        <meshBasicMaterial map={doorTex} transparent opacity={1} />
      </mesh>
    </group>
  );
}

function LandingExperience({ onEnter }: LandingSceneProps) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 3, 6]} intensity={0.5} />
      <directionalLight position={[-4, -3, -4]} intensity={0.25} />

      {/* big, dark floor just to catch a little light */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, -4]}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial color="#02030a" />
      </mesh>

      <DoorPanel onEnter={onEnter} />
    </>
  );
}

export function LandingScene({ onEnter }: LandingSceneProps) {
  useEffect(() => {
    console.log("[LandingScene] MOUNTED");
  }, []);

  return (
    <div className="landing-root">
      {/* DEBUG HUD so we know the component is mounted */}
      <div className="landing-debug-banner">
        LandingScene ONLINE – if you don&apos;t see the panel,
        the Canvas isn&apos;t rendering.
      </div>

      <div className="landing-canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={["#020208"]} />
          <LandingExperience onEnter={onEnter} />
        </Canvas>
      </div>
    </div>
  );
}
