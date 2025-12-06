// src/components/CometCard.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// 1. Import the new hooks
import { useVortex } from '../context/VortexContext';
import { getCometTheme } from '../data/comets'; 
import SealIcon from '../assets/seal-icon.png'; 

// Removed the `onWarp` prop, now it uses the global `engageTether` function
export const CometCard = ({ comet, isActive }) => { 
  const [isFlipped, setIsFlipped] = useState(false);
  // 2. Access the global function
  const { engageTether, vortexState } = useVortex(); 
  
  // Get theme colors
  const theme = getCometTheme(comet); 

  // ... (handleFlip logic remains the same) ...
  const handleFlip = () => {
    if (isActive && vortexState === 'browsing') { // Cannot flip while warping
      setIsFlipped(!isFlipped);
    }
  };


  return (
    <CardContainer onClick={handleFlip} className={isFlipped ? 'flipped' : ''}>
      <CardInner>
        
        {/* --- FRONT: The Planetary Scan --- */}
        <CardFront 
            style={{ 
                borderColor: theme.primary, 
                // Add a glow that changes with the comet's theme
                boxShadow: `0 0 20px ${theme.primary}40` 
            }}
        >
          {/* ... (rest of front content) ... */}

        </CardFront>

        {/* --- BACK: The Activities Menu --- */}
        <CardBack>
          {/* ... (rest of back content) ... */}

          {/* THE WARP BUTTON (The Pinky Promise) */}
          <WarpButton 
             onClick={(e) => {
                e.stopPropagation(); 
                engageTether(comet); // 3. Calls the global warp function
             }}
             disabled={vortexState !== 'browsing'} // Disable if warp is already in progress
          >
            <img src={SealIcon} alt="Pinky Promise Seal" />
            <span>{vortexState === 'warping' ? 'TETHERING...' : 'ENGAGE TETHER'}</span>
          </WarpButton>

        </CardBack>

      </CardInner>
    </CardContainer>
  );
};
// ... (STYLED COMPONENTS REMAIN THE SAME) ...