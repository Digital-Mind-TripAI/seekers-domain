import type { Realm } from "./types";
import { codexRealm } from "../modules/codex";

/**
 * All active Realms in the HyperVerse.
 *
 * Note:
 * - We keep the export name `modules` for now so the rest of the app doesn't break.
 * - Internally, these are now "Realms" instead of "Modules".
 */
export const modules: Realm[] = [
  codexRealm,
  // Future:
  // nexusRealm, // Placeholder for the main Nexus realm
  // annexRealm, // Placeholder for the Annex realm
  // profileRealm, // Placeholder for the Seeker Profile realm
  // questsRealm, // Placeholder for the Quests realm
  // communityRealm, // Placeholder for the Community realm
];
