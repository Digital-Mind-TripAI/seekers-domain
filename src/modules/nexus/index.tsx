// src/modules/nexus/index.tsx
import Scene from "./Scene";
import Panel from "./Panel";
import type { Realm } from "../../core/types";

export const nexusRealm: Realm = {
  id: "nexus",
  route: "/", // The root path - this is the Home Base
  label: "The Nexus",
  Environment: Scene,
  Interface: Panel,
};