// src/core/moduleRegistry.ts
import type React from "react";
import nexusRealm from "../modules/nexus";
import codexRealm from "../modules/codex";
import annexRealm from "../modules/annex";

export interface RealmModule {
  id: string;
  label: string;
  route: string;
  Panel: React.ComponentType;
  Scene?: React.ComponentType;
  navWeight?: number;
}

export const realmModules: RealmModule[] = [
  nexusRealm,
  codexRealm,
  annexRealm,
];
