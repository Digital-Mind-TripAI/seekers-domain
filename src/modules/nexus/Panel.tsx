// src/modules/nexus/Panel.tsx

import { NexusScene } from "./Scene";

export const NexusPanel = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#020617",
        color: "#e5e7eb",
      }}
    >
      <header
        style={{
          padding: "0.75rem 1rem",
          borderBottom: "1px solid rgba(148, 163, 184, 0.3)",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: 0.9,
        }}
      >
        Nexus Playground · Landing Test
      </header>
      <main style={{ flex: 1, minHeight: 0 }}>
        <NexusScene />
      </main>
    </div>
  );
};
