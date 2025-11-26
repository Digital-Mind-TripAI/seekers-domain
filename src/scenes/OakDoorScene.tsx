/* FILE: src/scenes/OakDoorScene.tsx
   DESCRIPTION:
     Oak Door 3D scene with:
       - ground plane
       - textured oak door
       - big teal aura behind the door
       - hybrid glyph layer (fixed shapes, procedurally animated)
       - ripple ring + camera pull when door is clicked
       - calls onActivated() AFTER the mini transition completes
*/

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import {
  TextureLoader,
  MeshBasicMaterial,
  Group,
  AdditiveBlending,
  Mesh,
  PerspectiveCamera as ThreePerspectiveCamera,
} from "three";
import { useRef, useState, RefObject } from "react";

type OakDoorSceneProps = {
  onActivated?: () => void;
};

type OakDoorGroupProps = {
  onActivated?: () => void;
  cameraRef: RefObject<ThreePerspectiveCamera | null>;
};

function OakDoorGroup({ onActivated, cameraRef }: OakDoorGroupProps) {
  const texture = useLoader(TextureLoader, "/oak-door-main.png");

  const glowMatRef = useRef<MeshBasicMaterial | null>(null);
  const groupRef = useRef<Group | null>(null);

  // Hybrid glyph material refs (fixed shapes, animated behavior)
  const glyph1MatRef = useRef<MeshBasicMaterial | null>(null);
  const glyph2MatRef = useRef<MeshBasicMaterial | null>(null);
  const glyph3MatRef = useRef<MeshBasicMaterial | null>(null);

  const glyph1MeshRef = useRef<Mesh | null>(null);
  const glyph2MeshRef = useRef<Mesh | null>(null);
  const glyph3MeshRef = useRef<Mesh | null>(null);

  // Ripple ring for "membrane" effect
  const rippleMatRef = useRef<MeshBasicMaterial | null>(null);
  const rippleMeshRef = useRef<Mesh | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Transition refs (refs so we can change them in useFrame without re-renders)
  const isTransitioningRef = useRef(false);
  const transitionStartRef = useRef<number | null>(null);
  const hasActivatedRef = useRef(false);

  // We'll remember the camera's starting position when the transition begins
  const initialCamPosRef = useRef<{ x: number; y: number; z: number } | null>(
    null,
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // ---------- Aura Glow ----------
    if (glowMatRef.current) {
      let opacity = 0.25; // idle

      if (isHovered) opacity = 0.6; // hover
      if (isTouched) opacity = 0.9; // clicked / activated

      glowMatRef.current.opacity = opacity;
    }

    // ---------- Door Breathing ----------
    if (groupRef.current) {
      const baseScale = isTouched ? 1.05 : isHovered ? 1.02 : 1;
      const breathe = isTouched ? 1 + Math.sin(t * 3) * 0.02 : 1;
      const finalScale = baseScale * breathe;
      groupRef.current.scale.setScalar(finalScale);
    }

    // ---------- Hybrid Glyph Animation ----------
    let baseStrength = 0.15;
    if (isHovered) baseStrength = 0.4;
    if (isTouched) baseStrength = 0.8;

    const o1 = baseStrength + 0.2 * Math.sin(t * 2.3);
    const o2 = baseStrength + 0.2 * Math.sin(t * 2.1 + 1.2);
    const o3 = baseStrength + 0.2 * Math.sin(t * 2.5 + 2.4);

    if (glyph1MatRef.current) {
      glyph1MatRef.current.opacity = Math.max(0, Math.min(1, o1));
    }
    if (glyph2MatRef.current) {
      glyph2MatRef.current.opacity = Math.max(0, Math.min(1, o2));
    }
    if (glyph3MatRef.current) {
      glyph3MatRef.current.opacity = Math.max(0, Math.min(1, o3));
    }

    // Small, subtle motions so they feel alive/intelligent
    if (glyph1MeshRef.current) {
      glyph1MeshRef.current.rotation.z = 0.1 * Math.sin(t * 1.5);
    }
    if (glyph2MeshRef.current) {
      glyph2MeshRef.current.rotation.z = -0.12 * Math.sin(t * 1.8);
    }
    if (glyph3MeshRef.current) {
      glyph3MeshRef.current.rotation.z = 0.08 * Math.sin(t * 1.3);
    }

    // ---------- Transition: Ripple + Camera Pull ----------
    if (isTransitioningRef.current && transitionStartRef.current !== null) {
      const nowSec = performance.now() / 1000;
      const elapsed = nowSec - transitionStartRef.current;
      const duration = 1.2; // seconds
      const progress = Math.min(1, elapsed / duration);

      // 1) Ripple expansion on the door
      if (rippleMeshRef.current && rippleMatRef.current) {
        const scale = 1 + progress * 3.5;
        rippleMeshRef.current.scale.set(scale, scale, scale);

        // Fade out as it expands
        const rippleOpacity = (1 - progress) * 0.9;
        rippleMatRef.current.opacity = rippleOpacity;
      }

      // 2) Camera pull-in toward the door
      if (initialCamPosRef.current && cameraRef.current) {
        const start = initialCamPosRef.current;
        // Target position: closer to the door, slightly lower
        const target = { x: 0, y: 1.5, z: 4.0 };

        const easeInOut = (p: number) =>
          p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const eased = easeInOut(progress);

        cameraRef.current.position.x =
          start.x + (target.x - start.x) * eased;
        cameraRef.current.position.y =
          start.y + (target.y - start.y) * eased;
        cameraRef.current.position.z =
          start.z + (target.z - start.z) * eased;
        cameraRef.current.lookAt(0, 1.2, -2);
      }

      // 3) At the end of the transition, trigger activation once
      if (progress >= 1 && !hasActivatedRef.current) {
        hasActivatedRef.current = true;
        if (onActivated) {
          onActivated();
        }
      }
    }
  });

  const handleClick = () => {
    if (!isTouched && !isTransitioningRef.current) {
      setIsTouched(true);
      isTransitioningRef.current = true;
      transitionStartRef.current = performance.now() / 1000;

      // Remember where the camera was when the Seeker clicked
      if (cameraRef.current) {
        initialCamPosRef.current = {
          x: cameraRef.current.position.x,
          y: cameraRef.current.position.y,
          z: cameraRef.current.position.z,
        };
      }

      console.log("[NEXUS] Oak Door clicked – transition sequence started.");
    }
  };

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#05050b" />
      </mesh>

      {/* BIG, soft teal aura behind door */}
      <mesh position={[0, 1.2, -2.12]}>
        <planeGeometry args={[7.5, 6]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color="#26ffe6"
          transparent
          opacity={0.25}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Hybrid glyph layer: fixed shapes, animated behavior */}
      <group position={[0, 1.2, -1.99]}>
        {/* Horizontal band (arcane inscription feel) */}
        <mesh ref={glyph1MeshRef} position={[0, 0.4, 0]}>
          <planeGeometry args={[3.6, 0.35]} />
          <meshBasicMaterial
            ref={glyph1MatRef}
            color="#ffb347" // warm gold
            transparent
            opacity={0.0}
          />
        </mesh>

        {/* Vertical spine (geometric / sigil fusion) */}
        <mesh ref={glyph2MeshRef} position={[0.0, -0.1, 0]}>
          <planeGeometry args={[0.4, 2.6]} />
          <meshBasicMaterial
            ref={glyph2MatRef}
            color="#3fffe0" // teal digital
            transparent
            opacity={0.0}
          />
        </mesh>

        {/* Top arc (DMT-style curved geometry) */}
        <mesh ref={glyph3MeshRef} position={[0, 1.1, 0]}>
          <ringGeometry args={[0.7, 1.2, 40, 1, Math.PI * 0.1, Math.PI * 0.8]} />
          <meshBasicMaterial
            ref={glyph3MatRef}
            color="#ffeaa7"
            transparent
            opacity={0.0}
          />
        </mesh>

        {/* Ripple ring – membrane effect */}
        <mesh ref={rippleMeshRef} position={[0, 0, 0.01]}>
          <ringGeometry args={[1.0, 2.4, 64]} />
          <meshBasicMaterial
            ref={rippleMatRef}
            color="#3fffe0"
            transparent
            opacity={0.0}
            blending={AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Textured oak door */}
      <mesh
        position={[0, 1.2, -2]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        <planeGeometry args={[5.0, 4.0]} />
        <meshStandardMaterial
          map={texture}
          transparent={true}
          emissive="#23180f"
          emissiveIntensity={0.25}
        />
      </mesh>
    </group>
  );
}

export function OakDoorScene(props: OakDoorSceneProps) {
  const cameraRef = useRef<ThreePerspectiveCamera | null>(null);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas>
        {/* Explicit camera so we can safely animate it via ref */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 1.8, 7]}
          fov={45}
        />

        <color attach="background" args={["#020208"]} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} />
        <directionalLight position={[-4, 3, 2]} intensity={0.5} />

        <OakDoorGroup onActivated={props.onActivated} cameraRef={cameraRef} />

        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={9}
          target={[0, 1.6, -2]}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
    </div>
  );
}
