// src/context/VortexContext.js

import React, { createContext, useContext, useState } from 'react';

const VortexContext = createContext();

export const VortexProvider = ({ children }) => {
  const [currentComet, setCurrentComet] = useState(null); 
  const [vortexState, setVortexState] = useState('browsing'); 

  // 1. ENGAGE: Starts the process
  const engageTether = (comet) => {
    setCurrentComet(comet);
    setVortexState('warping'); // This triggers the <WarpDriveAnimation /> to render
    console.log(`🚀 Warp engines engaged for: ${comet.name}`);
    
    // REMOVED: The setTimeout is gone. We wait for the video now.
  };
  
  // 2. COMPLETE: Called by the video when it finishes
  const completeWarp = () => {
    setVortexState('arrived'); // This triggers <CometHabitat />
    console.log("✅ Warp complete. Arrived at destination.");
  };

  const returnToAtlas = () => {
    setCurrentComet(null);
    setVortexState('browsing');
  };

  return (
    <VortexContext.Provider value={{ 
      currentComet, 
      vortexState, 
      engageTether, 
      completeWarp, // Export this so the video player can use it
      returnToAtlas 
    }}>
      {children}
    </VortexContext.Provider>
  );
};

export const useVortex = () => {
  return useContext(VortexContext);
};