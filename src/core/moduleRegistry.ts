// src/core/moduleRegistry.ts
import type { NexusModule, Realm } from "./types";
import { handbookModule } from "../modules/handbook";
import { codexRealm } from "../modules/codex/codex";
import { nexusRealm } from "../modules/nexus/realm";

export const modules: NexusModule[] = [
  handbookModule,
  // studioModule,
  // annexModule,
  // profileModule,
  // questsModule,
  // communityModule,
];

export const realms: Realm[] = [
  nexusRealm,
  codexRealm,
];
