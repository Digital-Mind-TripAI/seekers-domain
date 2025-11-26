// src/core/moduleRegistry.ts
import type { Realm } from "./types";
import { handbookRealm } from "../modules/handbook";

export const realms: Realm[] = [
  handbookRealm,
  // nexusRealm,
  // annexRealm,
  // profileRealm,
  // questsRealm,
  // communityRealm,
];
