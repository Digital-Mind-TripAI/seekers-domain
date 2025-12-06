// src/hooks/useCosmicAtlas.js
import { useMemo } from 'react';
import { comets, SECTOR_THEMES } from '../data/comets';

export const useCosmicAtlas = () => {
  
  // 1. Get a specific comet (for deep linking or saved locations)
  const getCometById = (id) => comets.find(c => c.id === id);

  // 2. Get all comets in a specific "Vibe" (Sector)
  // Useful if the Seeker sets their cockpit to "Zen Mode"
  const getCometsBySector = (sector) => {
    return comets.filter(c => c.sector === sector);
  };

  // 3. The Oracle Function
  // Returns a random comet based on a requested intensity
  const consultOracle = (desiredIntensity) => {
    // Filter comets that match the user's energy level (+/- 10%)
    const matches = comets.filter(c => 
      c.stats.intensity >= desiredIntensity - 10 && 
      c.stats.intensity <= desiredIntensity + 10
    );
    // Return a random match, or a random comet if no match found
    return matches.length > 0 
      ? matches[Math.floor(Math.random() * matches.length)]
      : comets[Math.floor(Math.random() * comets.length)];
  };

  // 4. Get Theme Colors
  const getTheme = (sector) => SECTOR_THEMES[sector] || SECTOR_THEMES['Spark'];

  return {
    comets, // The full list
    getCometById,
    getCometsBySector,
    consultOracle,
    getTheme
  };
};