// src/core/types.ts
import type React from "react";

export interface Realm {
  id: string;
  route: string;
  label: string;
  Environment: React.ComponentType;
  Interface: React.ComponentType;
  onEnter?: () => void;
  onExit?: () => void;
}

// Minimal placeholder types – we can evolve these with Linq’s schema.
export interface Artifact {
  id: string;
  name: string;
  type: "key" | "card" | "tool" | "other";
}

export interface EmotionEntry {
  id: string;
  peptide: string;       // e.g. "Anger", "Fear"
  intensity?: number;    // 0–1 or 0–100, up to you
  timestamp: Date;
  note?: string;
}

export interface Seeker {
  id: string;
  originDate: Date; // When they woke up
  inventory: Artifact[]; // Keys, Cards, Tools
  peptideLog: EmotionEntry[]; // Patch Panel history
  currentQuest: string | null; // What they are working on
  resonanceLevel: number; // Internal XP / growth metric
}

// Legacy module shape retained for modules/* while migrating to Realm
export interface NexusModule {
  id: string;
  route: string;
  label: string;
  Scene: React.ComponentType;
  Panel: React.ComponentType;
}
