import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gridTemplateRows: "64px 1fr",
        height: "100vh",
        background: "#02030f",
        color: "#e4ffe4",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          gridColumn: "1 / span 2",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid #1a1f3a",
        }}
      >
        <div style={{ fontWeight: 700, letterSpacing: "0.08em", color: "#4eff4e" }}>
          SEEKER’S DOMAIN
        </div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>Prototype Frame · v0.1</div>
      </header>

      {/* Sidebar */}
      <aside
        style={{
          borderRight: "1px solid #1a1f3a",
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>NAVIGATOR</div>

        <NavItem to="/handbook" label="Seeker’s Handbook" />
        <NavItem to="/studio" label="Creator Studio" />
        <NavItem to="/playground" label="Prototype / Playground" />
      </aside>

      {/* Main content */}
      <main
        style={{
          padding: "24px 32px",
          overflow: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}

interface NavItemProps {
  to: string;
  label: string;
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "block",
        padding: "8px 10px",
        borderRadius: 8,
        textDecoration: "none",
        fontSize: 14,
        color: isActive ? "#121716" : "#c5f7c5",
        background: isActive ? "#4eff4e" : "transparent",
        fontWeight: isActive ? 600 : 400,
        transition: "background 120ms ease, color 120ms ease, transform 80ms ease",
      })}
    >
      {label}
    </NavLink>
  );
}
