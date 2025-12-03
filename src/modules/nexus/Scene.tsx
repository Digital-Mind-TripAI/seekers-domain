// src/modules/nexus/Scene.tsx
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Text, Sparkles, Trail } from "@react-three/drei";
import * as THREE from "three";
import { gatewayData } from "./gatewayData";

// Reusable Portal Node Component
function PortalNode({ data, onClick }: { data: any; onClick: (id: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle "breathing" rotation
    meshRef.current.rotation.y += 0.005;
    meshRef.current.position.y += Math.sin(t + data.position[0]) * 0.002;
  });

  return (
    <group position={data.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* The Crystal Core */}
        <mesh
          ref={meshRef}
          onClick={() => onClick(data.id)}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
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

      {/* Floating Label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.15}
        color={hovered ? "#ffffff" : data.color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff" // Ensure you have a font or remove this line to use default
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

export default function Scene() {
  const handlePortalClick = (id: string) => {
    console.log("Traveling to:", id);
    // Future: Navigator.goTo(id);
  };

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
      
      {/* The Void Environment */}
      <color attach="background" args={["#050505"]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.4} color="#00E6FF" />

      {/* Generate Portals from Data */}
      {gatewayData.portals.map((portal) => (
        <PortalNode key={portal.id} data={portal} onClick={handlePortalClick} />
      ))}
    </>
  );
}