// src/modules/nexus/gatewayData.ts

export const gatewayData = {
  outerVeil: {
    text: "ENTER THE NEXUS",
    vibe: "Ancient-tech fusion, low hum, energetic presence",
  },
  threshold: {
    welcome: "Welcome, traveler. You’ve reached the Threshold. What happens next is entirely yours.",
    choices: [
      { id: "curious", label: "I’m Curious", sub: "Explore gently" },
      { id: "ready", label: "I’m Ready", sub: "Step into deeper engagement" },
      { id: "returning", label: "I’m Returning", sub: "Resume where you left off" }
    ]
  },
  portals: [
    {
      id: "core",
      name: "The Core",
      symbol: "Glowing Ember / Heart-Stone",
      color: "#FFD700", // Warm Gold
      tone: "Begin within.",
      position: [0, 0, 0], // Center
      visuals: "Fluid, soft geometry. Rhythmic breathing."
    },
    {
      id: "codex",
      name: "The Codex",
      symbol: "Ancient Tablet",
      color: "#4B0082", // Deep Indigo
      tone: "Understand the map.",
      position: [0, 2, -4], // North
      visuals: "Floating diagrams, ancient glyphs."
    },
    {
      id: "handbook",
      name: "The Handbook",
      symbol: "Glowing Book",
      color: "#00FFFF", // Cyan
      tone: "Don’t panic. Explore.",
      position: [3.8, 0.5, -1.2], // North-East
      visuals: "Pages turning, tiny sparkles."
    },
    {
      id: "path",
      name: "The Path",
      symbol: "Spiral Staircase",
      color: "#FF8C00", // Sunrise Orange
      tone: "Walk your journey.",
      position: [2.3, -1, 3], // South-East
      visuals: "Light pulsing forward on a path."
    },
    {
      id: "community",
      name: "The Community",
      symbol: "Connected Nodes",
      color: "#228B22", // Forest Emerald
      tone: "You’re not alone.",
      position: [-2.3, -1, 3], // South-West
      visuals: "Soft pulsing connections."
    },
    {
      id: "technology",
      name: "The Technology",
      symbol: "Digital Cube",
      color: "#8A2BE2", // Electric Violet
      tone: "Mind fuels machine.",
      position: [-3.8, 0.5, -1.2], // North-West
      visuals: "Interlocking circuits, living geometry."
    }
  ]
};