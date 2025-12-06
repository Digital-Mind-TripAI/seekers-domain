// src/components/CometCarousel.js

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CometCard } from './CometCard';
// 1. Import the hook instead of the direct data imports
import { useCosmicAtlas } from '../hooks/useCosmicAtlas';
import { useVortex } from '../context/VortexContext';


export const CometCarousel = () => {
  const { comets, getTheme } = useCosmicAtlas(); 
  const { vortexState } = useVortex(); // Read the global state
  const [currentIndex, setCurrentIndex] = useState(0);

  // Disable interaction if a warp is in progress
  const isDisabled = vortexState !== 'browsing';

  // Cycle Forward
  const nextComet = () => {
    if (!isDisabled) {
      setCurrentIndex((prev) => (prev + 1) % comets.length);
    }
  };

  // Cycle Backward
  const prevComet = () => {
    if (!isDisabled) {
      setCurrentIndex((prev) => (prev === 0 ? comets.length - 1 : prev - 1));
    }
  };

  const currentComet = comets[currentIndex];
  const prevIndex = currentIndex === 0 ? comets.length - 1 : currentIndex - 1;
  const nextIndex = (currentIndex + 1) % comets.length;
  const theme = getTheme(currentComet.sector); // Automatic styling from hook

  // 🎯 Decide what to show: Carousel or Warp Screen?
  if (vortexState === 'arrived') {
      // TODO: Create a component like <CometArrivalScreen comet={currentComet} />
      return <WarpArrivalPlaceholder theme={theme} />;
  }


  return (
    <CarouselWrapper>
      {/* Background Ambience changes based on Comet Type */}
      <AmbientLight background={theme.bg} />

      <ArrowLeft onClick={prevComet} disabled={isDisabled}>❮</ArrowLeft>

      {/* The rest of the framer-motion carousel code remains the same */}
      <CardStage>
        <AnimatePresence mode='popLayout'>
          
          {/* ... All 3 motion.div blocks (previous, active, next) ... */}
            
            {/* The active card no longer needs an onWarp prop */}
            <CometCard 
                comet={currentComet} 
                isActive={true} 
            />
        
        </AnimatePresence>
      </CardStage>

      <ArrowRight onClick={nextComet} disabled={isDisabled}>❯</ArrowRight>
    </CarouselWrapper>
  );
};
// ... (STYLED COMPONENTS REMAIN THE SAME) ...

// Simple placeholder to show when the warp is complete
const WarpArrivalPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-family: 'Cinzel', serif;
  background: ${props => props.theme.bg}; 
  transition: all 1s ease;
  &:after {
    content: "WELCOME TO THE ABYSS"; /* Change this based on props.comet.name */
  }
`;