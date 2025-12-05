// src/modules/nexus/index.tsx
import type { RealmModule } from "../../core/moduleRegistry";
import { NexusPanel } from "./Panel";

export const nexusRealm: RealmModule = {
  id: "nexus",
  label: "The Nexus",
  route: "/nexus",
  Panel: NexusPanel,
};

// Allow both named and default import styles
export default nexusRealm;
