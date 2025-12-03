/* FILE: src/scenes/OakDoorScene.tsx
   DESCRIPTION:
     Oak Door entry scene with:
       - Ground plane
       - Textured oak door
       - Teal aura glow
       - Hybrid glyphs (fixed shapes, procedural animation)
       - Ripple ring "membrane"
       - Phase 1: camera pulled toward the door
       - Phase 2: organic / psychedelic wormhole blooms behind the door
       - Door fades / shrinks as wormhole takes over
       - onActivated() called AFTER wormhole phase completes
*/

import "../styles/scenes/OakDoorScene.css";

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
import { useRef, useState, RefObject, Suspense } from "react";

type OakDoorSceneProps = {
  onActivated?: () => void;
};

type OakDoorGroupProps = {
  onActivated?: () => void;
  cameraRef: RefObject<ThreePerspectiveCamera | null>;
};

function OakDoorGroup({ onActivated, cameraRef }: OakDoorGroupProps) {
  const texture = useLoader(TextureLoader, "/opak-door-main.jpg");

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

  // Door material ref (so we can fade / dim it)
  const doorMatRef = useRef<MeshBasicMaterial | null>(null);

  // Wormhole group & rings
  const wormholeGroupRef = useRef<Group | null>(null);
  const wormholeRingsRef = useRef<Mesh[]>([]);

  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Transition phases:
  // 0 = idle, 1 = approach door, 2 = tunnel, 3 = done
  const phaseRef = useRef<0 | 1 | 2 | 3>(0);
  const phaseStartRef = useRef<number | null>(null);
  const hasActivatedRef = useRef(false);

  // Camera starting position for Phase 1
  const initialCamPosRef = useRef<{ x: number; y: number; z: number } | null>(
    null,
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const nowSec = performance.now() / 1000;

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

    // During tunnel phase, let them start to fade
    if (phaseRef.current === 2) {
      baseStrength *= 0.5;
    }

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

    // ---------- Wormhole swirl (C + D hybrid) ----------
    if (wormholeGroupRef.current) {
      wormholeGroupRef.current.rotation.z = 0.1 * Math.sin(t * 0.7);
      wormholeGroupRef.current.rotation.y = 0.1 * Math.cos(t * 0.9);
    }

    if (wormholeRingsRef.current.length > 0) {
      wormholeRingsRef.current.forEach((ring, index) => {
        const offset = index * 0.3;
        ring.rotation.y = t * (0.8 + offset * 0.2);
        ring.rotation.z = Math.sin(t * 1.2 + offset) * 0.4;
      });
    }

    // ---------- Phase Logic ----------
    if (phaseRef.current === 1 && phaseStartRef.current !== null) {
      // Phase 1: Approach the door / membrane
      const duration1 = 1.0;
      const elapsed = nowSec - phaseStartRef.current;
      const progress = Math.min(1, elapsed / duration1);

      // Ripple expansion on the door
      if (rippleMeshRef.current && rippleMatRef.current) {
        const scale = 1 + progress * 3.5;
        rippleMeshRef.current.scale.set(scale, scale, scale);
        const rippleOpacity = (1 - progress) * 0.9;
        rippleMatRef.current.opacity = rippleOpacity;
      }

      // Camera pull-in toward just in front of the door
      if (initialCamPosRef.current && cameraRef.current) {
        const start = initialCamPosRef.current;
        const target = { x: 0, y: 1.5, z: 4.0 }; // in front of door

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

      // At end of Phase 1 → begin tunnel
      if (progress >= 1) {
        phaseRef.current = 2;
        phaseStartRef.current = nowSec;
        console.log("[NEXUS] Oak Door – entering tunnel phase.");
      }
    } else if (phaseRef.current === 2 && phaseStartRef.current !== null) {
      // Phase 2: Tunnel / wormhole bloom
      const duration2 = 1.4;
      const elapsed2 = nowSec - phaseStartRef.current;
      const progress2 = Math.min(1, elapsed2 / duration2);

      // Door group shrink & fade
      if (groupRef.current) {
        const shrink = 1 - 0.6 * progress2;
        groupRef.current.scale.setScalar(Math.max(0.01, shrink));
        groupRef.current.position.z = -2 - progress2 * 0.5;
      }

      if (doorMatRef.current) {
        // dim door as we go into the tunnel
        doorMatRef.current.opacity = 1 - progress2 * 0.9;
      }
      if (glowMatRef.current) {
        glowMatRef.current.opacity = 0.25 * (1 - progress2);
      }

      // Wormhole group: scale & "arrival"
      if (wormholeGroupRef.current) {
        const baseScale = 0.2 + progress2 * 0.9;
        wormholeGroupRef.current.scale.setScalar(baseScale);
        // Pull wormhole slightly toward camera as it blooms
        wormholeGroupRef.current.position.z = -4 + progress2 * 1.5;
      }

      // Camera moves THROUGH the doorway into the tunnel
      if (cameraRef.current) {
        const start = { x: 0, y: 1.5, z: 4.0 };
        const target = { x: 0, y: 1.5, z: 0.5 };

        const easeIn = (p: number) => p * p;
        const eased2 = easeIn(progress2);

        cameraRef.current.position.x =
          start.x + (target.x - start.x) * eased2;
        cameraRef.current.position.y =
          start.y + (target.y - start.y) * eased2;
        cameraRef.current.position.z =
          start.z + (target.z - start.z) * eased2;

        // Look slightly ahead into the tunnel
        cameraRef.current.lookAt(0, 1.5, -2.0);
      }

      // At end of tunnel phase → trigger activation once
      if (progress2 >= 1 && !hasActivatedRef.current) {
        hasActivatedRef.current = true;
        phaseRef.current = 3;
        console.log("[NEXUS] Oak Door – tunnel phase complete, activating next scene.");
        if (onActivated) {
          onActivated();
        }
      }
    }
  });

  const handleClick = () => {
    if (phaseRef.current !== 0) return;

    setIsTouched(true);
    phaseRef.current = 1;
    phaseStartRef.current = performance.now() / 1000;

    // Remember where the camera was when the Seeker clicked
    if (cameraRef.current) {
      initialCamPosRef.current = {
        x: cameraRef.current.position.x,
        y: cameraRef.current.position.y,
        z: cameraRef.current.position.z,
      };
    }

    console.log("[NEXUS] Oak Door clicked – phase 1 (approach door) started.");
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

      {/* Wormhole tunnel (C + D hybrid) */}
      <group
        ref={wormholeGroupRef}
        position={[0, 1.5, -4]}
        scale={[0.2, 0.2, 0.2]}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <mesh
            key={index}
            position={[0, 0, -index * 0.9]}
            ref={(mesh) => {
              if (mesh && !wormholeRingsRef.current.includes(mesh)) {
                wormholeRingsRef.current.push(mesh);
              }
            }}
          >
            <torusGeometry
              args={[
                1.8 - index * 0.05, // radius
                0.18 + index * 0.02, // tube
                32,
                64,
              ]}
            />
            <meshBasicMaterial
              color={index % 2 === 0 ? "#ff66ff" : "#3fffe0"}
              transparent
              opacity={0.85}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
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
        <meshBasicMaterial
          ref={doorMatRef}
          map={texture}
          transparent={true}
          opacity={1}
        />
      </mesh>
    </group>
  );
}

export function OakDoorScene(props: OakDoorSceneProps) {
  const cameraRef = useRef<ThreePerspectiveCamera | null>(null);

  return (
    <div className="oak-door-root">
      <div className="oak-door-canvas-container">
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

          <Suspense fallback={null}>
            <OakDoorGroup onActivated={props.onActivated} cameraRef={cameraRef} />
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={9}
            target={[0, 1.6, -2]}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.05}
          />
        </Canvas>

        {/* Optional overlay: hint text */}
        {/* 
        <div className="oak-door-overlay">
          <div className="oak-door-hint">
            Click the door to cross the threshold
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
