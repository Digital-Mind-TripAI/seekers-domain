/* FILE: src/scenes/OakDoorScene.tsx
   DESCRIPTION:
     Oak Door 3D scene with:
       - ground plane
       - textured oak door
       - BRIGHT glow halo behind the door
       - glow changes on hover + click
       - subtle breathing scale when "touched"
   INSERT INTO:
     Replace the entire contents of src/scenes/OakDoorScene.tsx
*/

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { TextureLoader, MeshBasicMaterial, Group, Texture } from "three";
import { OrbitControls } from "@react-three/drei";
import "./OakDoorScene.css";

function OakDoorGroup({ onActivated }: { onActivated?: () => void }) {
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();
    // try to load the texture from public/; if it fails we keep `texture` null
    loader.load(
      "/opak-door-main.jpg",
      (tex) => setTexture(tex),
      undefined,
      () => setTexture(null)
    );
  }, []);

  const glowMatRef = useRef<MeshBasicMaterial | null>(null);
  const groupRef = useRef<Group | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useFrame(() => {
    // Strong, obvious glow change based on interaction
    if (glowMatRef.current) {
      let opacity = 0.25; // base idle glow

      if (isHovered) opacity = 0.6; // stronger when hovered
      if (isTouched) opacity = 0.9; // very strong when clicked/activated

      glowMatRef.current.opacity = opacity;
    }

    // Subtle breathing / scale effect when touched
    if (groupRef.current) {
      const t = performance.now() / 1000;
      const baseScale = isTouched ? 1.05 : isHovered ? 1.02 : 1;
      const breathe = isTouched ? 1 + Math.sin(t * 3) * 0.02 : 1;
      const finalScale = baseScale * breathe;
      groupRef.current.scale.setScalar(finalScale);
    }
  });

  const handleClick = () => {
    setIsTouched(true);
    console.log("[NEXUS] Oak Door touched – activation sequence will go here.");
    if (onActivated) onActivated();
  };

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#05050b" />
      </mesh>

      {/* BRIGHT glow halo behind the door */}
      <mesh position={[0, 1.2, -2.05]}>
        <planeGeometry args={[5.4, 4.3]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color="#26ffe6"
          transparent
          opacity={0.25} // this gets overridden in useFrame
        />
      </mesh>

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
        {texture ? (
          <meshStandardMaterial map={texture} emissive="#23180f" emissiveIntensity={0.25} />
        ) : (
          <meshStandardMaterial color="#6b4b2b" emissive="#23180f" emissiveIntensity={0.08} />
        )}
      </mesh>
    </group>
  );
}

export function OakDoorScene({ onActivated }: { onActivated?: () => void }) {
  return (
    <div className="oak-door-container">
      <Canvas camera={{ position: [0, 1.8, 7], fov: 45 }}>
        <color attach="background" args={["#020208"]} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} />
        <directionalLight position={[-4, 3, 2]} intensity={0.5} />

        <Suspense fallback={null}>
          <OakDoorGroup onActivated={onActivated} />
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
    </div>
  );
}
