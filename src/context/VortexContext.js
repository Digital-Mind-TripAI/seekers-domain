// src/context/VortexContext.js

import React, { createContext, useContext, useState } from 'react';

const VortexContext = createContext();

export const VortexProvider = ({ children }) => {
  const [currentComet, setCurrentComet] = useState(null); 
  
  // 1. CHANGE DEFAULT STATE: Start at the 'entry' (The Oak Door)
  const [vortexState, setVortexState] = useState('entry'); 

  // 2. NEW FUNCTION: Call this when the Oak Door animation finishes
  const enterTheGuild = () => {
    setVortexState('browsing');
    console.log("🚪 The Oak Door is open. Welcome to the Codex.");
  };

  const engageTether = (comet) => {
    setCurrentComet(comet);
    setVortexState('warping'); 
    console.log(`🚀 Warp engines engaged for: ${comet.name}`);
  };
  
  const completeWarp = () => {
    setVortexState('arrived'); 
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
      enterTheGuild, // Export the new function
      engageTether, 
      completeWarp, 
      returnToAtlas 
    }}>
      {children}
    </VortexContext.Provider>
  );
};

export const useVortex = () => {
  return useContext(VortexContext);
};