/* FILE: src/scenes/CorridorScene.tsx
   DESCRIPTION:
     Hybrid arcane/digital corridor:
       - stone/metal corridor
       - glowing floor strips and wall inlays
       - pulsing portal ring at the far end
       - subtle animation to make it feel alive
   INSERT INTO:
     Create a new file at src/scenes/CorridorScene.tsx with this content.
*/

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

function CorridorGeometry() {
  const portalRef = useRef<Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (portalRef.current) {
      const scale = 1.1 + Math.sin(t * 2) * 0.05;
      portalRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -1, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 30]} />
        <meshStandardMaterial color="#14151d" roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-3, 1, -6]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[30, 4]} />
        <meshStandardMaterial color="#111015" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Right wall */}
      <mesh position={[3, 1, -6]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[30, 4]} />
        <meshStandardMaterial color="#111015" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 3, -6]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 30]} />
        <meshStandardMaterial color="#050509" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* Floor neon strips (digital vibe) */}
      {Array.from({ length: 10 }).map((_, i) => {
        const z = -2 - i * 2.5;
        return (
          <mesh
            key={i}
            position={[0, -0.98, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[4.5, 0.18]} />
            <meshBasicMaterial color="#3fffe0" />
          </mesh>
        );
      })}

      {/* Wall inlays (arcane/digital glyph bands) */}
      {Array.from({ length: 7 }).map((_, i) => {
        const z = -2 - i * 3.5;
        return (
          <>
            {/* Left band */}
            <mesh key={`l-${i}`} position={[-2.99, 1.2, z]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[1.6, 0.2]} />
              <meshBasicMaterial color="#ffb347" />
            </mesh>
            {/* Right band */}
            <mesh key={`r-${i}`} position={[2.99, 1.2, z]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[1.6, 0.2]} />
              <meshBasicMaterial color="#ffb347" />
            </mesh>
          </>
        );
      })}

      {/* Portal at the far end */}
      <mesh ref={portalRef} position={[0, 1.4, -22]}>
        <ringGeometry args={[1.4, 2.2, 64]} />
        <meshBasicMaterial color="#3fffe0" />
      </mesh>

      {/* Inner disc to imply depth */}
      <mesh position={[0, 1.4, -22.01]}>
        <circleGeometry args={[1.35, 48]} />
        <meshBasicMaterial color="#050711" />
      </mesh>

      {/* Light from the portal */}
      <pointLight
        color="#3fffe0"
        intensity={7}
        distance={25}
        position={[0, 1.4, -22]}
      />

      {/* Soft ambient fill from behind */}
      <pointLight
        color="#ffb347"
        intensity={1.8}
        distance={18}
        position={[0, 2.5, -10]}
      />
    </group>
  );
}

export function CorridorScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 1.8, 6], fov: 60 }}>
        <color attach="background" args={["#050610"]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} />

        <CorridorGeometry />

        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          target={[0, 1.4, -10]}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
    </div>
  );
}
