// src/modules/nexus/index.tsx
import Scene from "./Scene";
import Panel from "./Panel";
import type { Realm } from "../../core/types";

// NOTE: You will need to create ./Scene.tsx and ./Panel.tsx next.

export const nexusRealm: Realm = {
  id: "nexus",
  route: "/", // The root path - this is the Home Base
  label: "The Nexus Gateway",
  Environment: Scene,
  Interface: Panel,
};