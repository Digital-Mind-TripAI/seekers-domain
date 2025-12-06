import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture, Stars, OrbitControls, Sparkles } from "@react-three/drei";
import { Group, Mesh, DoubleSide } from "three";
import "../styles/scenes/OakDoorScene.css";

// Ensure this path matches your asset location
import oakDoorTextureUrl from "../assets/oak-door-main.jpg";

// --- TYPES ---
type Phase = "idle" | "activating" | "pullThrough" | "done";

export interface OakDoorSceneProps {
  onEnter?: () => void;
}

export interface OakDoorExperienceProps {
  isPromised?: boolean;
  onTriggerPromise?: () => void;
  onPortalReady?: () => void;
  onPortalComplete?: () => void;
}

// --- 3D COMPONENT: THE DOOR EXPERIENCE ---
export const OakDoorExperience: React.FC<OakDoorExperienceProps> = ({
  isPromised = true,
  onTriggerPromise = () => {},
  onPortalReady = () => {},
  onPortalComplete = () => {},
}: OakDoorExperienceProps) => {
  const groupRef = useRef<Group>(null);
  const doorRef = useRef<Mesh>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const activationProgress = useRef(0);
  const portalReadyEmitted = useRef(false);

  // Load texture
  const doorTexture = useTexture(oakDoorTextureUrl);

  // The Interaction Logic
  const handleDoorClick = () => {
    if (phase !== "idle") return; // Ignore clicks if already animating

    if (!isPromised) {
      // 1. If not promised, trigger the UI Modal
      if (onTriggerPromise) onTriggerPromise();
    } else {
      // 2. If promised, start the sequence
      setPhase("activating");
    }
  };

  useFrame((state: unknown, delta: number) => {
    if (!groupRef.current) return;

    // PHASE 1: IDLE (Breathing)
    if (phase === "idle") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = state as any;
      groupRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.3) * 0.05;
    }

    // PHASE 2: ACTIVATING (The Wormhole Charge)
    if (phase === "activating") {
      activationProgress.current += delta * 0.8;
      
      // Shake Effect
      const shake = (1 - Math.min(activationProgress.current, 1)) * 0.05; 
      groupRef.current.position.x = (Math.random() - 0.5) * shake;
      
      // Open the door
      if (doorRef.current) {
        // Rotate open to 90 degrees (PI/2)
        doorRef.current.rotation.y = THREE.MathUtils.lerp(doorRef.current.rotation.y, -Math.PI / 2, delta * 2);
      }

      // Transition to Pull Through
      if (activationProgress.current >= 1) {
        activationProgress.current = 0;
        portalReadyEmitted.current = false;
        setPhase("pullThrough");
      }
    }

    // PHASE 3: PULL THROUGH (Fly In)
    if (phase === "pullThrough") {
      if (!portalReadyEmitted.current) {
        portalReadyEmitted.current = true;
        if (onPortalReady) onPortalReady();
      }

      // Move camera forward into the void
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s = state as any;
      s.camera.position.z -= delta * 12; 
      
      // Trigger completion when we pass the threshold
      if (s.camera.position.z < -5) {
        onPortalComplete();
        setPhase("done");
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* THE DOOR MESH */}
        <mesh 
          ref={doorRef}
          position={[0, 0, 0]} 
          onClick={handleDoorClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          {/* Using your box geometry for the door slab */}
          <boxGeometry args={[3, 5, 0.2]} />
          <meshStandardMaterial 
            map={doorTexture} 
            color={phase === "idle" ? "white" : "#bbf7d0"} // Tints green when active
            emissive={phase === "activating" ? "#4eff4e" : "#000000"}
            emissiveIntensity={phase === "activating" ? 0.6 : 0}
          />
        </mesh>

        {/* THE PORTAL FRAME (Glowing Rim) */}
        <mesh position={[0, 0, -0.15]}>
          <planeGeometry args={[3.4, 5.4]} />
          <meshBasicMaterial color="#bf9b30" transparent opacity={0.4} side={DoubleSide} />
        </mesh>
      </Float>
      
      {/* Dynamic Lighting */}
      <pointLight 
        position={[0, 2, 4]} 
        intensity={phase === "activating" ? 3 : 1} 
        color={phase === "activating" ? "#4eff4e" : "#ffd700"} 
        distance={15} 
      />
      
      {/* Background Particles (The Hyperverse awaiting) */}
      <Sparkles count={100} scale={10} size={4} speed={0.4} opacity={0.5} color="#4eff4e" />
    </group>
  );
};

// --- 3D COMPONENT: THE CORRIDOR (Context) ---
const Corridor: React.FC = () => {
  return (
    <group>
      {/* Floor Reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 40]} />
        <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
};

// --- UI COMPONENT: THE PINKY PROMISE ---
const PinkyPromiseModal = ({ onLock, onCancel }: { onLock: () => void, onCancel: () => void }) => (
  <div className="modal-overlay">
    <div className="promise-card">
      <div className="nexus-glyph-header">❖</div>
      <h2>THE VENDOR'S VOW</h2>
      <p className="manifesto-text">
        "We don't do lawyers here. We do Honor.<br/><br/>
        By locking pinkies, you are making a promise to the Community, 
        to The Truth, and—most importantly—to the kid inside yourself."
      </p>
      <ul className="promise-list">
        <li><strong>1. Be Real</strong> (No fake scarcity, no fear tactics).</li>
        <li><strong>2. Be Useful</strong> (Sell tools, not snake oil).</li>
        <li><strong>3. Be Kind</strong> (Treat every Seeker like a friend).</li>
      </ul>
      <p className="disclaimer">
        If you break this promise, we won't sue you. 
        We'll just be really disappointed, and we'll have to lock the door.
      </p>
      <div className="button-row">
        <button className="cancel-btn" onClick={onCancel}>Not Yet</button>
        <button className="pinky-btn" onClick={onLock}>LOCK PINKIES 🤝</button>
      </div>
    </div>
  </div>
);

// --- MAIN SCENE EXPORT ---
export function OakDoorScene({ onEnter }: OakDoorSceneProps) {
  const [showModal, setShowModal] = useState(false);
  const [isPromised, setIsPromised] = useState(false);

  const handleLock = () => {
    setIsPromised(true);
    setShowModal(false);
    // The user will click the door again (or auto-trigger) to enter.
    // For better UX, the door logic inside OakDoorExperience handles the "next click" behavior.
  };

  return (
    <div className="oak-door-root" style={{ width: "100vw", height: "100vh", background: "#000" }}>
      
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} shadows>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 25]} />
        
        <ambientLight intensity={0.3} />
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />
        
        <OakDoorExperience 
          isPromised={isPromised}
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

// Helper for Three.js math
import * as THREE from "three";
