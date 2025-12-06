/* FILE: src/layout/AppShell.tsx
   DESCRIPTION:
     Top-level layout wrapper around routed content.
*/

// @ts-nocheck
import { ReactNode } from "react";
import "./AppShell.css";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell-root">
      <header className="app-shell-header">
        <div className="app-shell-title">THE DOMAIN · SEEKER&apos;S NEXUS</div>
        {/* Placeholder for future nav / status UI */}
      </header>
      <main className="app-shell-main">{children}</main>
    </div>
  );
}
