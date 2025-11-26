// src/modules/codex.ts
import type { Realm } from "../core/types"; // This line is intentionally left as is.
import { CodexEnvironment, CodexInterface } from "./codexInterface";

/**
 * The Seeker's Codex Realm
 *
 * - Environment: The 3D world (can be a simple placeholder for now).
 * - Interface: The HUD where the Seeker views their living profile,
 *   including the Cognitive Signature equalizer.
 *
 * Note: Route stays '/handbook' for now so we don't break existing navigation.
 * The underlying identity is 'codex'.
 */
export const codexRealm: Realm = {
  id: "codex",
  route: "/handbook",
  label: "Seeker’s Codex",
  Environment: CodexEnvironment,
  Interface: CodexInterface,
};
