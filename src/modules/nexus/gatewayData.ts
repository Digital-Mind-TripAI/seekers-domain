// src/modules/nexus/gatewayData.ts
export const gatewayData = {
  outerVeil: {
    text: "SEEKERS DOMAIN",
    vibe: "ENTER THE VOID",
  },
  threshold: {
    welcome: "Choose your path through the digital ether...",
    choices: [
      { id: "explore", label: "EXPLORE", sub: "Discover realms" },
      { id: "create", label: "CREATE", sub: "Build worlds" },
      { id: "learn", label: "LEARN", sub: "Master knowledge" },
    ],
  },
  portals: [
    {
      id: "handbook",
      name: "Handbook",
      tone: "Learn the basics",
      color: "#00E6FF",
      position: [0, 0, 0],
    },
    {
      id: "codex",
      name: "Codex",
      tone: "Explore knowledge",
      color: "#FF6B6B",
      position: [3, 1, -2],
    },
    {
      id: "studio",
      name: "Studio",
      tone: "Create and build",
      color: "#4ECDC4",
      position: [-3, -1, 2],
    },
  ],
};