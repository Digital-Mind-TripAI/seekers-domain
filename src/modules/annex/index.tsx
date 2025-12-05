// src/modules/annex/index.tsx
import type { RealmModule } from "../../core/moduleRegistry";
import { AnnexPanel } from "./AnnexPanel";

export const annexRealm: RealmModule = {
  id: "annex",
  label: "The Annex",
  route: "/annex",
  Panel: AnnexPanel,
};

export default annexRealm;
