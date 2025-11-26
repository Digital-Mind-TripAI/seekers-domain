/* eslint-disable react-refresh/only-export-components */
// src/modules/handbook.tsx
import React from "react";
import type { Realm } from "../core/types";

/**
 * CodexEnvironment
 * - The 3D world or main view for the Seeker's Codex.
 * - For now, this is a simple placeholder. You can replace this
 *   with your actual R3F scene / OakDoorScene, etc.
 */
const CodexEnvironment: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 16,
        border: "1px solid rgba(78, 255, 78, 0.25)",
        padding: 24,
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at top, #020617 0, #02030f 50%, #000 100%)",
        color: "#e4ffe4",
      }}
    >
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>Seeker’s Codex</h1>
      <p style={{ fontSize: 14, opacity: 0.8, maxWidth: 520 }}>
        This is the Codex Realm – the living manual of the Seeker. Here we’ll
        map identity, quests, emotional logs, and spiritual directives into one
        coherent profile.
      </p>
      <p style={{ fontSize: 12, opacity: 0.6, marginTop: 16 }}>
        (Placeholder view – later we’ll wire your real Environment / scenes
        here.)
      </p>
    </div>
  );
};

/**
 * CodexInterface
 * - HUD / overlay elements specific to the Codex.
 */
const CodexInterface: React.FC = () => {
  return (
    <div
      style={{
        padding: 12,
        fontSize: 12,
        background: "rgba(2, 6, 23, 0.9)",
        borderRadius: 12,
        border: "1px solid rgba(148, 163, 184, 0.4)",
      }}
    >
      <div style={{ opacity: 0.8, marginBottom: 4 }}>CODEX INTERFACE</div>
      <div style={{ opacity: 0.6 }}>
        Realm-specific HUD coming soon: identity glyphs, codex sections, and
        quest anchors.
      </div>
    </div>
  );
};

/**
 * handbookRealm
 * - We keep the export name "handbookRealm" so moduleRegistry can import it,
 *   but its true id in the Hyperverse is "codex".
 */
export const handbookRealm: Realm = {
  id: "codex",
  route: "/codex",
  label: "Seeker’s Codex",
  Environment: CodexEnvironment,
  Interface: CodexInterface,
  onEnter: () => {
    console.log("[Realm: codex] Entered Seeker’s Codex.");
  },
  onExit: () => {
    console.log("[Realm: codex] Exited Seeker’s Codex.");
  },
};
