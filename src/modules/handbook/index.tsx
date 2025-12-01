import type { NexusModule } from "../../core/types";
import Scene from "./Scene";
import Panel from "./Panel";

export const handbookModule: NexusModule = {
  id: "handbook",
  route: "/handbook",
  label: "Handbook",
  Scene,
  Panel,
};
