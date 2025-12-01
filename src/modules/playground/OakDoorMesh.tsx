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
