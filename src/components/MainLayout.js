// src/components/MainLayout.js

import React from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useVortex } from '../context/VortexContext';

// Import your stages
import { CometCarousel } from './CometCarousel';
import { WarpDriveAnimation } from './WarpDriveAnimation';
import { CometHabitat } from './CometHabitat';

// Import the Oak Door Scene
// Note: Ensure OakDoorScene accepts an 'onOpen' or 'onComplete' prop
import { OakDoorScene } from '../scenes/OakDoorScene'; 

export const MainLayout = () => {
  const { vortexState, currentComet, enterTheGuild } = useVortex();

  return (
    <WindowContainer>
      <AnimatePresence mode='wait'>
        
        {/* STATE 0: THE ENTRY (The Oak Door) */}
        {vortexState === 'entry' && (
          <motion.div
            key="oak-door"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }} // Fade into the Codex
            transition={{ duration: 1.5 }}
            style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 100 }}
          >
            {/* Pass the context function to the scene */}
            <OakDoorScene onOpenComplete={enterTheGuild} />
          </motion.div>
        )}

        {/* STATE 1: BROWSING (The Atlas) */}
        {vortexState === 'browsing' && (
          <motion.div
            key="atlas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <CometCarousel />
          </motion.div>
        )}

        {/* STATE 2: WARPING (The Cinematic) */}
        {vortexState === 'warping' && (
          <motion.div
            key="warp"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 99 }}
          >
            <WarpDriveAnimation comet={currentComet} />
          </motion.div>
        )}

        {/* STATE 3: ARRIVED (The Destination) */}
        {vortexState === 'arrived' && (
          <motion.div
            key="habitat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          >
            <CometHabitat />
          </motion.div>
        )}

      </AnimatePresence>
    </WindowContainer>
  );
};

const WindowContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: relative;
  overflow: hidden;
`;