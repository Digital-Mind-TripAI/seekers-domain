// src/components/WarpDriveAnimation.js

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useVortex } from '../context/VortexContext';
import { useCosmicAtlas } from '../hooks/useCosmicAtlas';

// Import your MP4 assets (You will need to add these to your assets folder)
// Tip: Use small, optimized looping videos or 3-5 second transitions
import WarpSpark from '../assets/videos/warp-spark.mp4';
import WarpNeon from '../assets/videos/warp-neon.mp4';
import WarpZen from '../assets/videos/warp-zen.mp4';
import WarpTerra from '../assets/videos/warp-terra.mp4';
import WarpWild from '../assets/videos/warp-wild.mp4';

// Map sectors to videos
const WARP_VIDEOS = {
  Spark: WarpSpark,
  Neon: WarpNeon,
  Zen: WarpZen,
  Terra: WarpTerra,
  Wild: WarpWild
};

export const WarpDriveAnimation = ({ comet }) => {
  const { completeWarp } = useVortex(); // We will create this function next
  const videoRef = useRef(null);

  // Fallback to Spark if sector video is missing
  const videoSrc = WARP_VIDEOS[comet.sector] || WarpSpark;

  useEffect(() => {
    // Auto-play safety check
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  return (
    <VideoWrapper>
      <video 
        ref={videoRef}
        src={videoSrc} 
        autoPlay 
        muted // Muted is often required for autoplay, but you can try unmuted
        playsInline // Important for mobile
        onEnded={completeWarp} // <--- THIS IS THE TRIGGER
      />
      
      {/* Optional: Overlay text while flying */}
      <OverlayText>
        WARPING TO {comet.name.toUpperCase()}...
      </OverlayText>
    </VideoWrapper>
  );
};

// --- STYLED COMPONENTS ---

const VideoWrapper = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  z-index: 9999;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover; // Ensures the video fills the screen
  }
`;

const OverlayText = styled.div`
  position: absolute;
  bottom: 50px;
  color: white;
  font-family: 'Cinzel', serif;
  letter-spacing: 5px;
  animation: pulse 1s infinite alternate;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);

  @keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;