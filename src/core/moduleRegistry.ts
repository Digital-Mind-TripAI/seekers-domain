// src/core/moduleRegistry.ts
import type { NexusModule } from "./types";
import { handbookModule } from "../modules/handbook";
// import { studioModule } from "../modules/studio";
// import { annexModule } from "../modules/annex";
// import { profileModule } from "../modules/profile";
// import { questsModule } from "../modules/quests";
// import { communityModule } from "../modules/community";
import type { Realm } from "./types";
import { codexRealm } from "../modules/codex";

export const realms: Realm[] = [
  codexRealm,
];
export const modules: NexusModule[] = [
  handbookModule,

  // studioModule,
  // annexModule,
  // profileModule,
  // questsModule,
  // communityModule,
];
