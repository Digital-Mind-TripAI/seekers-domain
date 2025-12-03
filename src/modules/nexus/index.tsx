/* FILE: src/modules/nexus/index.tsx
   DESCRIPTION:
     Barrel exports for the Nexus module.
     - Scene: 3D experience (currently the OakDoorScene)
     - Panel: UI wrapper that could be used in the app shell
*/

// src/modules/nexus/index.tsx
/* eslint-disable react-refresh/only-export-components */
import Scene from "./Scene";
import Panel from "./Panel";
import type { Realm } from "../../core/types";

export const nexusRealm: Realm = {
  id: "nexus",
  route: "/", // The root path - this is the Home Base
  label: "The Nexus Gateway",
  Environment: Scene,
  Interface: Panel,
};

// Named exports that map to the default components in this folder
export { default as NexusScene } from "./Scene";
export { default as NexusPanel } from "./Panel";
export { default as Scene } from "./Scene";
export { default as Panel } from "./Panel";
