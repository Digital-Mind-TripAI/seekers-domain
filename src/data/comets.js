// src/data/comets.js

// 1. The Global Sector Themes (The Vibe Engine)
export const SECTOR_THEMES = {
  Spark: { primary: "#06b6d4", secondary: "#3b82f6", bg: "radial-gradient(circle, #06b6d4 0%, #1e3a8a 100%)" }, // Tech/Knowledge
  Terra: { primary: "#4ade80", secondary: "#14532d", bg: "linear-gradient(135deg, #14532d 0%, #000000 100%)" }, // Nature/Growth
  Neon:  { primary: "#eab308", secondary: "#a855f7", bg: "radial-gradient(circle, #a855f7 0%, #4c1d95 100%)" }, // Play/Action
  Zen:   { primary: "#a5f3fc", secondary: "#0891b2", bg: "linear-gradient(to top, #0891b2, #000000)" }, // Water/Ice/Peace
  Wild:  { primary: "#d97706", secondary: "#78350f", bg: "linear-gradient(45deg, #78350f 0%, #000000 100%)" }  // Earth/Ruins
};

// 2. The Master Atlas
export const comets = [
  
  // --- FORMERLY "UNIVERSITY COMET" ---
  // Re-imagined as a repository of ancient and future wisdom.
  {
    id: "comet-archive",
    name: "The Cosmic Athenaeum",
    sector: "Spark", 
    image: "/assets/comets/university.png", // Placeholder path
    description: "A floating citadel of knowledge dedicated to the history of the universe and the expansion of the mind. Here, we study not for grades, but for gnosis.",
    stats: { 
      intensity: 70, // Requires focus
      joy: 50, 
      peace: 80 
    },
    activities: [
      { type: "Tool", name: "The Akashic Library", icon: "📚" },
      { type: "Quest", name: "Star Mapping", icon: "🔭" },
      { type: "Community", name: "The Debate Hall", icon: "🗣️" },
      { type: "Audio", name: "Lecture: Cosmic History", icon: "🎧" }
    ]
  },

  // --- FORMERLY "FULVABLOOM COMET" ---
  // Re-imagined as a living laboratory for life creation.
  {
    id: "comet-eden",
    name: "Eden Prime",
    sector: "Terra", 
    image: "/assets/comets/fulvabloom.png", 
    description: "A zero-gravity botanical wonder. Stewards here learn the delicate art of nurturing life in the void. A place to reconnect with the roots of existence.",
    stats: { 
      intensity: 40, 
      joy: 90, 
      peace: 90 
    },
    activities: [
      { type: "Tool", name: "Hydroponic Design", icon: "🌱" },
      { type: "Quest", name: "The Alchemist's Garden", icon: "⚗️" },
      { type: "Video", name: "Zero-G Growth Patterns", icon: "▶️" }
    ]
  },

  // --- FORMERLY "COMET SCIENCELAB-1" ---
  // Re-imagined as the workshop for builders and inventors.
  {
    id: "comet-foundry",
    name: "The Iron Foundry",
    sector: "Spark",
    image: "/assets/comets/sciencelab.png",
    description: "The engine room of the HyperVerse. A place of metal, ice, and innovation where we build the tools that build the future.",
    stats: { 
      intensity: 95, // High mental load
      joy: 60, 
      peace: 30 
    },
    activities: [
      { type: "Tool", name: "Robotics Workbench", icon: "🤖" },
      { type: "Quest", name: "Quantum Physics Puzzle", icon: "⚛️" },
      { type: "Community", name: "Inventor's Roundtable", icon: "💡" }
    ]
  },

  // --- FORMERLY "COMET LOWGRAVITYIA" ---
  // Re-imagined as a playground for the Inner Child.
  {
    id: "comet-velocity",
    name: "Velocity Park",
    sector: "Neon",
    image: "/assets/comets/lowgravity.png",
    description: "Physics is optional here. A sanctuary dedicated to the release of kinetic energy and the joy of the Inner Child. Leave your dignity at the door.",
    stats: { 
      intensity: 90, // High physical energy
      joy: 100, 
      peace: 10 
    },
    activities: [
      { type: "Quest", name: "Zero-G Zip Line", icon: "🚀" },
      { type: "Community", name: "Anti-Gravity Sports", icon: "⚽" },
      { type: "Audio", name: "High-BPM Focus Mix", icon: "🎵" }
    ]
  },

  // --- FORMERLY "COMET WILDERSTRONOMY" ---
  // Re-imagined as a place for solitude and shadow work.
  {
    id: "comet-wilds",
    name: "The Hinterlands",
    sector: "Wild",
    image: "/assets/comets/wilder.png",
    description: "Untouched wilderness, ancient ruins, and desolate canyons. This is where Seekers go to face the unknown and find silence among the noise.",
    stats: { 
      intensity: 60, 
      joy: 50, 
      peace: 100 // Pure solitude
    },
    activities: [
      { type: "Quest", name: "Ruins Exploration", icon: "🗿" },
      { type: "Tool", name: "Moonlight Meditation", icon: "🌙" },
      { type: "Video", name: "Safari Observation", icon: "🦁" }
    ]
  },

  // --- FORMERLY "COMET AQUATICO" ---
  // Re-imagined as the center for emotional healing (Water = Emotion).
  {
    id: "comet-abyss",
    name: "The Azure Abyss",
    sector: "Zen",
    image: "/assets/comets/aquatico.png",
    description: "A world of bioluminescent pools and deep crystal lagoons. Water is the element of emotion; dive deep here to cleanse the spirit.",
    stats: { 
      intensity: 20, // Very chill
      joy: 80, 
      peace: 100 
    },
    activities: [
      { type: "Tool", name: "Submarine Dive", icon: "⚓" },
      { type: "Quest", name: "The Glowing Cave", icon: "✨" },
      { type: "Audio", name: "Binaural Ocean Sounds", icon: "🌊" }
    ]
  }
];