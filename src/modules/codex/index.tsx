// src/modules/codex/index.tsx
import type { RealmModule } from "../../core/moduleRegistry";
import { CodexInterface } from "./CodexInterface";
import CodexEnvironment from "./CodexEnvironment";

export const codexRealm: RealmModule = {
  id: "codex",
  label: "The Codex",
  route: "/codex",
  Panel: CodexInterface,
  Scene: CodexEnvironment,
  navWeight: 2,
};

export default codexRealm;
