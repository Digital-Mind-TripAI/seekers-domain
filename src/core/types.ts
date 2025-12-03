// src/core/types.ts
import type { ComponentType } from "react";

export interface NexusModule {
  id: string;
  route: string;
  label: string;
  Scene: ComponentType;
  Panel: ComponentType;
  onEnter?: () => void;
  onExit?: () => void;
}

export interface Realm {
  id: string;
  route: string;
  label: string;
  Environment: ComponentType;
  Interface: ComponentType;
}
