// src/core/SceneHost.tsx
import { Canvas } from "@react-three/fiber";
import HandbookScene from "../modules/handbook/Scene";

export default function SceneHost() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={["#02030f"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <HandbookScene />
      </Canvas>
    </div>
  );
}
