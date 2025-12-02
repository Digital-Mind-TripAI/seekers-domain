// src/core/types.ts
export interface NexusModule {
  id: string;
  route: string;
  label: string;
  Scene: React.ComponentType;
  Panel: React.ComponentType;
  onEnter?: () => void;
  onExit?: () => void;
}

export interface Realm {
  id: string;
  route: string;
  label: string;
  Environment: React.ComponentType;
  Interface: React.ComponentType;
}
