// src/scenes/OakDoorScene.tsx
import React, { useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

interface OakDoorSceneProps {
  onEnter?: () => void;
}

/**
 * OakDoorScene
 * - The physical threshold into the Hyperverse.
 * - Door click opens the Pinky Promise modal first.
 *   Only after the Seeker agrees do we fire onEnter().
 */
export const OakDoorScene: React.FC<OakDoorSceneProps> = ({ onEnter }) => {
  const [isPromiseModalOpen, setIsPromiseModalOpen] = useState(false);
  const [isPromised, setIsPromised] = useState(false);

  const handleDoorClick = useCallback(() => {
    if (!isPromised) {
      // We haven't made the Pinky Promise yet → open modal.
      setIsPromiseModalOpen(true);
    } else if (onEnter) {
      // Already promised, door can transport immediately.
      onEnter();
    }
  }, [isPromised, onEnter]);

  const handleLockPinkies = () => {
    setIsPromised(true);
    setIsPromiseModalOpen(false);
    if (onEnter) onEnter();
  };

  const handleCancelPromise = () => {
    setIsPromiseModalOpen(false);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />

        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#020617" />
        </mesh>

        {/* Simple placeholder oak door
            Replace this with your glTF or custom geometry later.
        */}
        <mesh position={[0, 1.75, 0]} onClick={handleDoorClick}>
          <boxGeometry args={[2, 3.5, 0.2]} />
          <meshStandardMaterial color="#8b5a2b" />
        </mesh>

        {/* Optional little glow / hint behind the door */}
        <mesh position={[0, 1.75, -0.11]}>
          <planeGeometry args={[1.8, 3.2]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.35} />
        </mesh>

        <OrbitControls enablePan={false} minDistance={4} maxDistance={10} />
      </Canvas>

      {/* === PINKY PROMISE MODAL =============================== */}
      {isPromiseModalOpen && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
            background: "rgba(2, 6, 23, 0.78)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: 520,
              background: "rgba(2, 6, 23, 0.98)",
              borderRadius: 18,
              border: "1px solid rgba(148, 163, 184, 0.85)",
              padding: 20,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.95)",
              color: "#e4ffe4",
            }}
          >
            <h2
              style={{
                fontSize: 20,
                marginBottom: 8,
                letterSpacing: "0.04em",
              }}
            >
              The Pinky Promise
            </h2>

            <p
              style={{
                fontSize: 13,
                opacity: 0.9,
                marginBottom: 12,
              }}
            >
              Before you pass through the Oak Door and enter the Seeker’s
              Domain, you are invited to make a small promise with big gravity:
            </p>

            <ul
              style={{
                fontSize: 12,
                opacity: 0.85,
                marginBottom: 14,
                paddingLeft: 18,
                listStyle: "disc",
              }}
            >
              <li>I will treat myself and others here as Seekers, not objects.</li>
              <li>
                I will honor my emotional state and take responsibility for how
                I move in this space.
              </li>
              <li>
                I step through this door to grow, not to harm, exploit, or
                diminish.
              </li>
            </ul>

            <p
              style={{
                fontSize: 12,
                opacity: 0.8,
                marginBottom: 16,
              }}
            >
              If this resonates, we lock pinkies and cross together.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button
                onClick={handleCancelPromise}
                style={{
                  border: "none",
                  borderRadius: 999,
                  padding: "6px 12px",
                  fontSize: 12,
                  background: "transparent",
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
              >
                Not Yet
              </button>
              <button
                onClick={handleLockPinkies}
                style={{
                  border: "none",
                  borderRadius: 999,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  background:
                    "linear-gradient(90deg, #f97316 0%, #ec4899 40%, #4eff4e 100%)",
                  color: "#02030f",
                  cursor: "pointer",
                }}
              >
                Lock Pinkies 🤝
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
