// src/scenes/OakDoorScene.tsx
import React, { useRef, useState } from "react";
import { Group, Mesh, Vector3, MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";

type Phase = "idle" | "activating" | "pullThrough" | "done";

export interface OakDoorExperienceProps {
  /** Called when the pull-through finishes (navigate to Nexus/Handbook) */
  onPortalComplete?: () => void;
}

// Adjust this path to match where your oak door texture actually is
import oakDoorTextureUrl from "../assets/oak-door-main.png";

export const OakDoorExperience: React.FC<OakDoorExperienceProps> = ({
  onPortalComplete,
}) => {
  const [phase, setPhase] = useState<Phase>("idle");
  const activationProgress = useRef(0); // 0 → 1
  const groupRef = useRef<Group | null>(null);
  const doorRef = useRef<Mesh | null>(null);
  const portalRef = useRef<Mesh | null>(null);

  const doorTexture = useTexture(oakDoorTextureUrl);

  // For convenience, predefine some vectors
  const pullStart = useRef(new Vector3(0, 0, 0));
  const pullEnd = useRef(new Vector3(0, 0, -4)); // move scene toward camera to simulate pull

  useFrame((_state, delta) => {
    // Subtle idle animation
    if (phase === "idle" && groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(_state.clock.getElapsedTime() * 0.2) * 0.03;
    }

    if (phase === "activating") {
      activationProgress.current = Math.min(
        1,
        activationProgress.current + delta / 2.0 // ~2s
      );

      const t = activationProgress.current;

      // 0–0.4: door “charges” / cracks open feel
      if (doorRef.current) {
        const door = doorRef.current;
        const crackPhase = Math.min(1, t / 0.4);

        const scaleX = 1 + crackPhase * 0.05;
        const scaleY = 1 + crackPhase * 0.02;
        door.scale.set(scaleX, scaleY, 1);

        door.rotation.y = (1 - crackPhase) * 0.05;

        const mat = door.material as MeshStandardMaterial;
        mat.emissiveIntensity = 0.2 + crackPhase * 0.8;
      }

      // 0.2–1: portal forms behind the door
      if (portalRef.current) {
        const portal = portalRef.current;
        const portalPhase = Math.max(0, (t - 0.2) / 0.8); // delayed start
        const eased = easeInOut(portalPhase);

        const scale = 0.1 + eased * 1.3;
        portal.scale.set(scale, scale, scale);

        const mat = portal.material as MeshStandardMaterial;
        mat.emissiveIntensity = 0.2 + eased * 1.5;

        // Spin for wormhole feel
        portal.rotation.z += delta * (0.8 + eased);
      }

      if (activationProgress.current >= 1) {
        setPhase("pullThrough");
        activationProgress.current = 0;

        if (groupRef.current) {
          pullStart.current.copy(groupRef.current.position);
        }
      }
    }

    if (phase === "pullThrough" && groupRef.current) {
      activationProgress.current = Math.min(
        1,
        activationProgress.current + delta / 1.2 // ~1.2s
      );

      const t = easeInOut(activationProgress.current);
      const group = groupRef.current;

      // Move the whole world forward, like you’re being pulled in
      group.position.lerpVectors(pullStart.current, pullEnd.current, t);
      group.rotation.y += delta * 0.8; // tunnel spin

      if (activationProgress.current >= 1) {
        setPhase("done");
        if (onPortalComplete) onPortalComplete();
      }
    }
  });

  const handleDoorClick = () => {
    if (phase === "idle") {
      activationProgress.current = 0;
      setPhase("activating");
      // TODO: hook a chime / portal sound here later
    }
  };

  return (
    <group ref={groupRef} position={[0, 0, -6]}>
      <Corridor />

      {/* Door + subtle halo */}
      <group>
        <Float
          speed={phase === "idle" ? 0.6 : 1.2}
          rotationIntensity={phase === "idle" ? 0.1 : 0.3}
          floatIntensity={phase === "idle" ? 0.15 : 0.4}
        >
          <mesh
            ref={doorRef}
            position={[0, 1.4, 0]}
            onClick={handleDoorClick}
            castShadow
          >
            <planeGeometry args={[2.4, 4.0]} />
            <meshStandardMaterial
              map={doorTexture}
              metalness={0.1}
              roughness={0.6}
              emissive={"#3ce0ff"}
              emissiveIntensity={phase === "idle" ? 0.15 : 0.4}
            />
          </mesh>

          {/* Soft glowing frame behind door */}
          <mesh position={[0, 1.4, -0.05]}>
            <planeGeometry args={[2.6, 4.2]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.08} />
          </mesh>
        </Float>
      </group>

      {/* Portal torus behind the door */}
      <mesh ref={portalRef} position={[0, 1.4, -0.2]}>
        <torusGeometry args={[1.1, 0.08, 32, 64]} />
        <meshStandardMaterial
          color="#33ccff"
          emissive="#33ccff"
          emissiveIntensity={0.0}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Ground */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#050509" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Lights */}
      <hemisphereLight
        intensity={0.4}
        groundColor="#010101"
        color="#334455"
      />
      <spotLight
        position={[0, 6, 4]}
        angle={0.6}
        penumbra={0.5}
        intensity={1.4}
        castShadow
        color="#ffffff"
      />
      <pointLight
        position={[0, 1.4, 0.5]}
        intensity={phase === "idle" ? 0.6 : 1.2}
        distance={7}
        color="#33ddff"
      />
    </group>
  );
};

const Corridor: React.FC = () => {
  return (
    <group>
      {/* Left wall */}
      <mesh
        position={[-3, 1.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#050912" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Right wall */}
      <mesh
        position={[3, 1.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#050912" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh
        position={[0, 3, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6, 10]} />
        <meshStandardMaterial color="#02040a" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Back wall behind door */}
      <mesh position={[0, 1.5, -0.6]} receiveShadow>
        <planeGeometry args={[6, 5]} />
        <meshStandardMaterial color="#03040a" roughness={0.9} metalness={0.2} />
      </mesh>
    </group>
  );
};

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
