/* FILE: src/modules/nexus/Panel.tsx
   DESCRIPTION:
     NexusPanel is a UI wrapper for the NexusScene.
     It can be slotted into the AppShell like any other module panel.
*/

import { NexusScene } from "./Scene";

export function NexusPanel() {
  return (
    <div className="nexus-panel-root">
      <NexusScene />
    </div>
  );
}
