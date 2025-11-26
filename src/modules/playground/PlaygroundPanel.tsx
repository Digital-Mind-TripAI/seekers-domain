/* FILE: src/modules/playground/PlaygroundPanel.tsx
   DESCRIPTION:
     Top-level controller for the Playground route:
       - shows OakDoorScene first
       - when door is activated, switches to CorridorScene
   INSERT INTO:
     Replace the entire contents of src/modules/playground/PlaygroundPanel.tsx with this.
*/

import { useState } from "react";
import { OakDoorScene } from "../../scenes/OakDoorScene";
import { CorridorScene } from "../../scenes/CorridorScene";

type Mode = "door" | "corridor";

export function PlaygroundPanel() {
  const [mode, setMode] = useState<Mode>("door");

  if (mode === "door") {
    return (
      <OakDoorScene
        onActivated={() => {
          // later we can add fade/transition – for now, hard swap
          setMode("corridor");
        }}
      />
    );
  }

  // corridor mode
  return <CorridorScene />;
}
