// src/modules/nexus/gatewayData.ts

interface Portal {
  id: string;
  name: string;
  route: string;
  tone: string;
  color: string;
  position: [number, number, number]; // [x, y, z] for 3D placement
}

interface NexusGateway {
  outerVeil: {
    text: string;
    vibe: string;
  };
  threshold: {
    welcome: string;
    choices: Array<{ id: string; label: string; sub: string }>;
  };
  portals: Portal[];
}

export const gatewayData: NexusGateway = {
  // The first screen the Seeker sees
  outerVeil: {
    text: "THE NEXUS",
    vibe: "THE DIGITAL ALCHEMY PROJECT",
  },
  // The second screen, where they choose their initial filter
  threshold: {
    welcome: "You stand at the Threshold. The world you see is a reflection of the lens you choose to look through. Select your initial filter, Seeker.",
    choices: [
      { id: "mind", label: "MIND", sub: "Logic, Analysis, Blueprint" },
      { id: "emotion", label: "EMOTION", sub: "Energy, Resonance, Shadow" },
      { id: "action", label: "ACTION", sub: "Discipline, Will, Manifestation" },
    ],
  },
  
  // The primary navigation portals (3D objects)
  portals: [
    {
      id: "codex",
      name: "The Codex",
      route: "/codex",
      tone: "Your Lived Truth & Signature",
      color: "#00E6FF", // Cyan
      position: [-3.5, 0, -1],
    },
    {
      id: "path",
      name: "The Path",
      route: "/path",
      tone: "Alignment & Purpose",
      color: "#D4AF37", // Gold
      position: [0, 0, -4],
    },
    {
      id: "vault",
      name: "The Vault",
      route: "/vault",
      tone: "Memory & Data Storage",
      color: "#5C3E8A", // Deep Purple
      position: [3.5, 0, -1],
    },
    {
      id: "studio",
      name: "The Studio",
      route: "/studio",
      tone: "Creation & Output",
      color: "#FF4D00", // Bright Orange
      position: [-1.5, 2.5, -3],
    },
    {
      id: "handbook",
      name: "The Handbook",
      route: "/handbook",
      tone: "Core Documentation",
      color: "#4EEB33", // Lime Green
      position: [1.5, 2.5, -3],
    },
  ],
};