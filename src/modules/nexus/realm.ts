// src/modules/nexus/realm.ts
import type { Realm } from "../../core/types";
import Scene from "./Scene";
import Panel from "./Panel";

// Dedicated export for the Nexus realm to avoid mixing constants with component modules.
export const nexusRealm: Realm = {
  id: "nexus",
  route: "/", // The root path - this is the Home Base
  label: "The Nexus Gateway",
  Environment: Scene,
  Interface: Panel,
};
