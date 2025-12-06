// src/scenes/OakDoorScene.tsx

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Stars, Sparkles, Html } from "@react-three/drei";
import { Group, Mesh, DoubleSide, MeshStandardMaterial } from "three";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import "../styles/scenes/OakDoorScene.css";

// Ensure this path matches your asset location
import oakDoorTextureUrl from "../assets/oak-door-main.jpg";

// --- CONSTANTS ---
const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 1.3, 8);

// --- DUMMY COMPONENTS ---
const PinkyPromiseModal: React.FC<{ onLock: () => void; onCancel: () => void }> = ({ onLock, onCancel }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      padding: "30px",
      background: "rgba(50, 0, 70, 0.95)",
      borderRadius: "10px",
      color: "white",
      textAlign: "center",
      border: "2px solid hotpink",
      boxShadow: "0 0 20px hotpink",
      fontFamily: "Cinzel, serif",
    }}
  >
    <h2>THE SEEKER'S VOW</h2>
    <p style={{ margin: "20px 0" }}>Do you promise to proceed with courage and curiosity?</p>
    <button
      onClick={onLock}
      style={{
        padding: "10px 20px",
        margin: "5px",
        background: "hotpink",
        border: "none",
        color: "black",
        fontWeight: "bold",
      }}
    >
      LOCK PINKIES
    </button>
    <button
      onClick={onCancel}
      style={{ padding: "10px 20px", margin: "5px", background: "transparent", border: "1px solid white", color: "white" }}
    >
      CANCEL
    </button>
  </div>
);

const Corridor = () => (
  <mesh position={[0, 0, -50]} rotation={[0, 0, 0]}>
    <cylinderGeometry args={[5, 5, 100, 32]} />
    <meshStandardMaterial color="#1a0f35" side={DoubleSide} />
  </mesh>
);

// --- TYPES ---
type Phase = "idle" | "activating" | "pullThrough" | "done";

export interface OakDoorSceneProps {
  onOpenComplete?: () => void;
}

export interface OakDoorExperienceProps {
  isPromised?: boolean;
  autoStart?: boolean;
  onTriggerPromise?: () => void;
  onPortalReady?: () => void;
  onPortalComplete?: () => void;
}

const CameraReset: React.FC = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.copy(INITIAL_CAMERA_POSITION);
    camera.lookAt(0, 1, -2);
  }, [camera]);
  return null;
};

// --- 3D COMPONENT: THE DOOR EXPERIENCE ---
export const OakDoorExperience: React.FC<OakDoorExperienceProps> = ({
  isPromised = true,
  autoStart = false,
  onTriggerPromise = () => {},
  onPortalReady = () => {},
  onPortalComplete = () => {},
}: OakDoorExperienceProps) => {
  const groupRef = useRef<Group>(null);
  const doorRef = useRef<Mesh>(null);
  const portalMaterialRef = useRef<MeshStandardMaterial>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const activationProgress = useRef(0);
  const portalReadyEmitted = useRef(false);
  const pullThroughComplete = useRef(false);

  const doorTexture = useTexture(oakDoorTextureUrl);
  const pullThroughTarget = useRef(new THREE.Vector3(0, 1.3, -10));

  const { rotationY, positionZ } = useSpring({
    rotationY: phase === "pullThrough" ? Math.PI * 0.7 : 0,
    positionZ: phase === "pullThrough" ? -1.5 : 0,
    config: { mass: 1, tension: 50, friction: 10, clamp: true },
  });

  // --- LOGIC 1: AUTO-START ---
  useEffect(() => {
    if (autoStart && phase === "idle") {
      setPhase("activating");
    }
  }, [autoStart, phase]);

  // --- LOGIC 2: Manual Click ---
  const handleDoorClick = () => {
    if (phase === "idle") {
      if (!isPromised) {
        onTriggerPromise();
        return;
      }
      setPhase("activating");
    }

    if (phase === "activating" && portalReadyEmitted.current) {
      setPhase("pullThrough");
    }
  };

  // --- LOGIC 3: Frame Loop ---
  useFrame((state, delta) => {
    if (phase === "activating") {
      activationProgress.current += delta;

      const normalized = Math.min(activationProgress.current / 2.5, 1);
      if (portalMaterialRef.current) {
        portalMaterialRef.current.emissiveIntensity = 0.6 + normalized * 2.4;
        portalMaterialRef.current.emissive.set("#8b5cf6");
        portalMaterialRef.current.color.set("#2a134d");
      }

      if (activationProgress.current > 1 && !portalReadyEmitted.current) {
        portalReadyEmitted.current = true;
        onPortalReady();
      }

      if (activationProgress.current > 3) {
        setPhase("pullThrough");
      }
    }

    if (phase === "pullThrough") {
      const cam = state.camera;
      cam.position.lerp(pullThroughTarget.current, 0.02);
      cam.lookAt(0, 1, -20);

      if (!pullThroughComplete.current && cam.position.z <= pullThroughTarget.current.z + 0.2) {
        pullThroughComplete.current = true;
        setPhase("done");
        onPortalComplete();
      }
    }
  });

  return (
    <>
      <CameraReset />
      <ambientLight intensity={0.15} />
      <pointLight position={[2, 3, 3]} intensity={3} color="#b9c7ff" />
      <Stars radius={60} depth={30} count={8000} factor={3} saturation={0} fade speed={0.3} />
      <Sparkles count={35} speed={0.5} opacity={0.8} scale={[12, 8, 12]} color="#76e4ff" />

      <group ref={groupRef} position={[0, -0.2, 0]}>
        <a.group ref={doorRef} position-z={positionZ} rotation-y={rotationY} onClick={handleDoorClick}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.6, 4.4, 0.25]} />
            <meshStandardMaterial map={doorTexture} roughness={0.8} metalness={0.2} />
          </mesh>

          <mesh position={[0, 0, -0.14]} receiveShadow>
            <planeGeometry args={[2.4, 4.2]} />
            <meshStandardMaterial
              ref={portalMaterialRef}
              color="#24113e"
              emissive="#5f3bc4"
              emissiveIntensity={0.4}
              side={DoubleSide}
              transparent
              opacity={0.95}
            />
          </mesh>
        </a.group>
      </group>

      <Corridor />
      <Html position={[0, -2, 2]} center>
        <div className="oak-door-hint">CLICK THE DOOR TO ENTER</div>
      </Html>
    </>
  );
};

// --- FULL SCENE WRAPPER ---
// Provides the canvas + optional promise modal wrapper for the door experience
export const OakDoorScene: React.FC<OakDoorSceneProps> = ({ onOpenComplete }) => {
  const [needsPromise, setNeedsPromise] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);

  return (
    <div className="oak-door-root">
      <div className="oak-door-canvas-container">
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [INITIAL_CAMERA_POSITION.x, INITIAL_CAMERA_POSITION.y, INITIAL_CAMERA_POSITION.z], fov: 50 }}
        >
          <color attach="background" args={["#050211"]} />
          <OakDoorExperience
            key={sceneKey}
            isPromised={!needsPromise}
            autoStart
            onTriggerPromise={() => setNeedsPromise(true)}
            onPortalReady={() => {}}
            onPortalComplete={() => {
              onOpenComplete?.();
            }}
          />
        </Canvas>
      </div>

      {needsPromise && (
        <PinkyPromiseModal
          onLock={() => {
            setNeedsPromise(false);
            setSceneKey((k) => k + 1);
          }}
          onCancel={() => setNeedsPromise(false)}
        />
      )}
    </div>
  );
};
