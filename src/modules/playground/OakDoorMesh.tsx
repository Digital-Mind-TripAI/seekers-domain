// src/modules/playground/OakDoorMesh.tsx
// Minimal mesh stub so the playground can import without throwing.
import { memo } from "react";

const OakDoorMesh = memo(function OakDoorMesh() {
  return (
    <>
      {/* Soft glow behind the door */}
      <mesh position={[0, 1.2, -2.05]}>
        <planeGeometry args={[5, 4]} />
        <meshStandardMaterial
          color="#2effff"
          transparent
          opacity={0.15}
          emissive="#2effff"
          emissiveIntensity={2}
        />
      </mesh>
    </>
  );
});

export default OakDoorMesh;
