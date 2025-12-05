// src/modules/studio/index.tsx
import type { RealmModule } from "../../core/moduleRegistry";
import { StudioPanel } from "./StudioPanel";

export const studioRealm: RealmModule = {
  id: "studio",
  label: "The Studio",
  route: "/studio",
  Panel: StudioPanel,
};

export default studioRealm;
