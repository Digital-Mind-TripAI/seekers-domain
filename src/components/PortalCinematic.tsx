// src/components/PortalCinematic.tsx
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface PortalCinematicProps {
  /** If true, show + play the cinematic overlay */
  active: boolean;
  /** Optional: called when the cinematic finishes, right before navigation */
  onComplete?: () => void;
}

export const PortalCinematic: React.FC<PortalCinematicProps> = ({
  active,
  onComplete,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!active || !videoRef.current) return;

    const video = videoRef.current;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        // Autoplay might be blocked – user will have to click
        console.warn("Portal cinematic autoplay blocked:", err);
      }
    };

    tryPlay();
  }, [active]);

  const handleEnded = () => {
    console.log("Portal cinematic ended – navigating to /codex");

    if (onComplete) {
      onComplete();
    }

    // This will result in "#/codex" in the URL because we are using HashRouter
    navigate("/codex");
  };

  if (!active) return null;

  return (
    <div className="portal-cinematic-overlay">
      <video
        ref={videoRef}
        className="portal-cinematic-video"
        src="/cinematics/portal-wormhole.mp4"
        autoPlay
        playsInline
        onEnded={handleEnded}
      >
        <track kind="captions" src="" label="No captions" />
      </video>
    </div>
  );
};
