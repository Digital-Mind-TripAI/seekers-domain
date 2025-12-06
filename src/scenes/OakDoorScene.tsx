// src/scenes/OakDoorScene.tsx

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, useTexture, Stars, OrbitControls, Sparkles, Html } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { DoubleSide, MeshStandardMaterial, Color } from "three";
import { useSpring, a } from '@react-spring/three'; 
import * as THREE from 'three';
import "../styles/scenes/OakDoorScene.css";

// Ensure this path matches your asset location
import oakDoorTextureUrl from "../assets/oak-door-main.jpg";

// --- CONSTANTS ---
const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 0, 8);

// --- DUMMY COMPONENTS ---
const PinkyPromiseModal: React.FC<{ onLock: () => void; onCancel: () => void }> = ({ onLock, onCancel }) => (
  <div 
    style={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
        zIndex: 1000, padding: '30px', background: 'rgba(50, 0, 70, 0.95)', borderRadius: '10px', 
        color: 'white', textAlign: 'center', border: '2px solid hotpink', 
        boxShadow: '0 0 20px hotpink', fontFamily: 'Cinzel, serif'
    }}
  >
    <h2>THE SEEKER'S VOW</h2>
    <p style={{ margin: '20px 0' }}>Do you promise to proceed with courage and curiosity?</p>
    <button onClick={onLock} style={{ padding: '10px 20px', margin: '5px', background: 'hotpink', border: 'none', color: 'black', fontWeight: 'bold' }}>LOCK PINKIES</button>
    <button onClick={onCancel} style={{ padding: '10px 20px', margin: '5px', background: 'transparent', border: '1px solid white', color: 'white' }}>CANCEL</button>
  </div>
);

const Corridor = () => {
    return (
        <mesh position={[0, 0, -50]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[5, 5, 100, 32]} />
            <meshStandardMaterial color="#1a0f35" side={DoubleSide} />
        </mesh>
    );
};

// --- TYPES ---
type Phase = "idle" | "activating" | "pullThrough" | "done";

export interface OakDoorSceneProps {
  onEnter?: () => void;
}

export interface OakDoorExperienceProps {
  isPromised?: boolean;
  autoStart?: boolean; 
  onTriggerPromise?: () => void;
  onPortalReady?: () => void;
  onPortalComplete?: () => void;
}

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
  
  // FIX: Create a ref for the portal material so we can animate it without re-rendering
  const portalMaterialRef = useRef<MeshStandardMaterial>(null);
  
  const [phase, setPhase] = useState<Phase>("idle");
  const activationProgress = useRef(0);
  const portalReadyEmitted = useRef(false);

  const doorTexture = useTexture(oakDoorTextureUrl);

  const { rotationY, positionZ } = useSpring({
    rotationY: phase === 'pullThrough' ? Math.PI * 0.7 : 0,
    positionZ: phase === 'pullThrough' ? -1.5 : 0,
    config: { mass: 1, tension: 50, friction: 10, clamp: true }
  });

  const { camPositionZ } = useSpring({
    camPositionZ: phase === 'pullThrough' ? -40 : 8,
    config: { mass: 5, tension: 50, friction: 80, clamp: true, precision: 0.0001 },
  });

  // --- LOGIC 1: AUTO-START ---
  useEffect(() => {
    if (!autoStart || phase !== "idle") return;
    const handle = requestAnimationFrame(() => setPhase("activating"));
    return () => cancelAnimationFrame(handle);
  }, [autoStart, phase]);

  // --- LOGIC 2: Manual Click ---
  const handleDoorClick = () => {
    if (phase === "idle") {
      if (!isPromised) {
        onTriggerPromise(); 
      } else {
        setPhase("activating");
      }
    }
    
    if (phase === "activating" && portalReadyEmitted.current) {
        setPhase("pullThrough");
    }
  };

  // --- LOGIC 3: Frame Loop ---
  useFrame((state, delta) => {
    // 1. Handle Visual Pulse (Activating Phase)
    if (phase === "activating" || phase === "pullThrough") {
      activationProgress.current += delta * 0.5;
      
      // FIX: Calculate intensity inside the frame loop
      const activationIntensity = Math.sin(activationProgress.current * 4) * 0.5 + 0.5;
      
      // FIX: Imperatively update material color/intensity
      if (portalMaterialRef.current) {
        const targetColor = portalReadyEmitted.current ? new Color('#8bff00') : new Color('#ff008b');
        portalMaterialRef.current.color.lerp(targetColor, 0.1);
        portalMaterialRef.current.emissive.lerp(targetColor, 0.1);
        portalMaterialRef.current.emissiveIntensity = activationIntensity * 2;
      }

      // Logic trigger
      if (phase === "activating" && activationProgress.current > 1.5 && !portalReadyEmitted.current) {
        portalReadyEmitted.current = true;
        onPortalReady(); 
        
        setTimeout(() => {
            if (groupRef.current) setPhase("pullThrough");
        }, 1500); 
      }
    }

    // 2. Handle Camera (Pull Through Phase)
    if (phase === 'pullThrough') {
        const targetZ = camPositionZ.get();
        state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05); 
        state.camera.updateProjectionMatrix();
        
        // FIX: Removed the redundant '&& phase !== done' check
        if (Math.abs(state.camera.position.z - targetZ) < 0.1) {
            if (!portalReadyEmitted.current) { 
                onPortalComplete();
            }
            setPhase('done');
        }
    }

    // 3. Idle Animation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <a.group ref={groupRef} onClick={handleDoorClick} rotation={[0, 0, 0]} position={[0, 0, 0]}>
      <a.mesh 
        ref={doorRef} 
        rotation-y={rotationY}
        position-z={positionZ}
        castShadow 
      >
        <boxGeometry args={[4, 7, 0.4]} />
        <meshStandardMaterial map={doorTexture} side={DoubleSide} />
      </a.mesh>
      
      {/* The Portal Light/Glow */}
      <mesh position={[0, 0, -0.2]} visible={phase !== 'idle'}>
        <ringGeometry args={[1.5, 3, 32]} />
        {/* FIX: Attached the ref here to manipulate in useFrame */}
        <meshStandardMaterial 
            ref={portalMaterialRef}
            color="#ff008b" 
            emissive="#ff008b" 
            emissiveIntensity={0} 
            side={DoubleSide} 
        />
      </mesh>
      
      <Sparkles 
        count={50} 
        speed={1} 
        opacity={phase !== 'idle' ? 1 : 0} 
        scale={6} 
        size={3} 
        color={phase === 'pullThrough' ? "#8bff00" : "#ff008b"}
      />
      
      <Float floatIntensity={1} rotationIntensity={0.5} speed={1.5}>
        <mesh position={[0, 4.5, 0]}>
          <planeGeometry args={[5, 1]} />
          <meshBasicMaterial transparent opacity={0} />
          <Html distanceFactor={10}>
            <div style={{ 
                color: 'white', fontSize: '36px', fontFamily: 'Cinzel, serif', 
                textShadow: `0 0 10px #ff008b` 
            }}>
              THE OAK DOOR
            </div>
          </Html>
        </mesh>
      </Float>
    </a.group>
  );
};

// --- MAIN SCENE EXPORT ---

const CustomCameraControl = () => {
    const { camera } = useThree();
    useEffect(() => {
        camera.position.copy(INITIAL_CAMERA_POSITION);
        camera.updateProjectionMatrix();
    }, [camera]); 
    return null;
}

export function OakDoorScene({ onEnter }: OakDoorSceneProps) {
  const [showModal, setShowModal] = useState(false);
  const [isPromised, setIsPromised] = useState(false);
  const [autoStart, setAutoStart] = useState(false); 

  const handleLock = () => {
    setIsPromised(true);
    setShowModal(false);
    setAutoStart(true); 
    console.log("Pinky Promise Locked. Initiating Door Sequence.");
  };
  
  return (
    <div className="oak-door-root" style={{ width: "100vw", height: "100vh", background: "#000" }}>
      
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} shadows>
        <CustomCameraControl /> 
        
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 25]} />
        
        <ambientLight intensity={0.3} />
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
        
        <OakDoorExperience 
          isPromised={isPromised}
          autoStart={autoStart} 
          onTriggerPromise={() => setShowModal(true)}
          onPortalComplete={() => onEnter && onEnter()}
        />
        
        <Corridor />
        
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/2} />
      </Canvas>

      {showModal && (
        <PinkyPromiseModal onLock={handleLock} onCancel={() => setShowModal(false)} />
      )}
      
    </div>
  );
}
