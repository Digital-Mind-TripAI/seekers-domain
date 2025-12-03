// src/modules/nexus/Scene.tsx
import { useRef, useState } from "react";
// Only import components you have available, assuming you are using react-three/fiber and drei
import { Float, Stars, Text, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gatewayData } from "./gatewayData";

interface PortalData {
  id: string;
  position: [number, number, number];
  color: string;
  name: string;
  tone: string;
}

// Reusable Portal Node Component
function PortalNode({ data, onClick }: { data: PortalData; onClick: (id: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle "breathing" rotation
    meshRef.current.rotation.y += 0.005;
    // Slight vertical bobbing based on its initial position
    meshRef.current.position.y = data.position[1] + Math.sin(t * 0.5 + data.position[0]) * 0.1; 
  });

  return (
    <group position={[data.position[0], data.position[1], data.position[2]]}>
      {/* Float adds a slight randomized movement */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* The Crystal Core (Octahedron is a great crystal shape) */}
        <mesh
          ref={meshRef}
          onClick={() => onClick(data.id)}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          // Make the mesh slightly more prominent when hovered
          scale={hovered ? 1.1 : 1}
        >
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color={hovered ? "#ffffff" : data.color}
            emissive={data.color}
            emissiveIntensity={hovered ? 2 : 0.5}
            wireframe={!hovered}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* The Glow Halo */}
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={hovered ? 0.1 : 0.02}
            wireframe
          />
        </mesh>
      </Float>

      {/* Floating Labels */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color={hovered ? "#ffffff" : data.color}
        anchorX="center"
        anchorY="middle"
        // Ensure this font is available or remove the line
        // font="/fonts/Inter-Bold.woff"
      >
        {data.name.toUpperCase()}
      </Text>
      
      {hovered && (
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.1}
          color="#aaaaaa"
          anchorX="center"
          anchorY="middle"
        >
          {data.tone}
        </Text>
      )}
    </group>
  );
}

// Main Nexus Scene Component
export default function Scene() {
  const handlePortalClick = (id: string) => {
    console.log("Traveling to:", id);
    // Future: Navigator.goTo(id);
  };

  return (
    <>
      {/* General Lighting */}
      <ambientLight intensity={0.2} />
      {/* A warm, distant light source */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
      
      {/* The Void Environment */}
      <color attach="background" args={["#050505"]} />
      {/* Background stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      {/* Subtle floating particles in the foreground */}
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.4} color="#00E6FF" />
      
      {/* Generate Portals from Data */}
      {gatewayData.portals.map((portal) => (
        <PortalNode key={portal.id} data={portal} onClick={handlePortalClick} />
      ))}
    </>
  );
}