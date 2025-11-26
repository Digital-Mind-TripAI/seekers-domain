// src/layout/AppShell.tsx
import React, { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import type { EmotionEntry, Artifact } from "../core/types";
import { realms } from "../core/moduleRegistry";

interface AppShellProps {
  children: ReactNode;
}

// Helper: create an EmotionEntry outside of the component so we don't
// call impure APIs during render (satisfies react-hooks/purity).
function createEmotionEntry(peptide: string): EmotionEntry {
  return {
    id: `${Date.now()}-${peptide}`,
    peptide,
    intensity: Math.random(),
    timestamp: new Date(),
    note: undefined,
  };
}

export function AppShell({ children }: AppShellProps) {
  // Patch Panel state
  const [currentPeptide, setCurrentPeptide] = useState<string | null>("Calm");
  const [peptideLog, setPeptideLog] = useState<EmotionEntry[]>([]);

  // Bookshelf inventory (placeholder artifacts for now)
  const [artifacts] = useState<Artifact[]>([
    { id: "key-aurora", name: "Aurora Key", type: "key" },
    { id: "card-ethos", name: "Ethos Sigil", type: "card" },
    { id: "tool-lantern", name: "Lantern of Recall", type: "tool" },
    { id: "tool-glyph-pen", name: "Glyph Scribe", type: "tool" },
  ]);

  // Conscious Screen overlay
  const [isConsciousOpen, setIsConsciousOpen] = useState(false);

  // Waterfall notification seed
  const [activeSeed, setActiveSeed] = useState<string | null>(null);

  const recordPeptide = (peptide: string) => {
    const entry = createEmotionEntry(peptide);

    setCurrentPeptide(peptide);
    setPeptideLog((prev) => [entry, ...prev].slice(0, 10));
    setActiveSeed(`Signal received: ${peptide}`);
  };

  const closeSeed = () => setActiveSeed(null);

  const openConsciousScreen = () => setIsConsciousOpen(true);
  const closeConsciousScreen = () => setIsConsciousOpen(false);

  return (
    <div
      style={{
        height: "100vh",
        background: "#02030f",
        color: "#e4ffe4",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        display: "grid",
        gridTemplateRows: "64px 1fr",
        position: "relative",
      }}
    >
      {/* HEADER + WATERFALL NAV */}
      <header
        style={{
          gridRow: "1 / 2",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid #1a1f3a",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#4eff4e",
            fontSize: 14,
          }}
        >
          SEEKER’S DOMAIN
        </div>

        {/* Navigation mapped from Realms */}
        <nav
          style={{
            display: "flex",
            gap: 8,
            flex: 1,
            justifyContent: "center",
          }}
        >
          {realms.map((realm) => (
            <NavItem key={realm.id} to={realm.route} label={realm.label} />
          ))}
        </nav>

        <div style={{ fontSize: 12, opacity: 0.7 }}>Prototype Frame · v0.2</div>

        {/* WATERFALL: notification seeds */}
        {activeSeed && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "100%",
              transform: "translate(-50%, -50%)",
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(148, 163, 184, 0.8)",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 8,
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "999px",
                background:
                  "radial-gradient(circle at center, #4eff4e, #22c55e 60%, transparent 100%)",
              }}
            />
            <span>{activeSeed}</span>
            <button
              onClick={closeSeed}
              style={{
                border: "none",
                background: "transparent",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: 11,
                padding: 0,
              }}
            >
              ✕
            </button>
          </div>
        )}
      </header>

      {/* MAIN TRI-FOLD LAYOUT */}
      <div
        style={{
          gridRow: "2 / 3",
          display: "grid",
          gridTemplateColumns: "260px 1fr 260px",
          height: "100%",
        }}
      >
        {/* LEFT: PATCH PANEL (Emotional Diagnostics) */}
        <section
          style={{
            borderRight: "1px solid #1a1f3a",
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background:
              "radial-gradient(circle at top left, #020617 0, #02030f 50%, #000 100%)",
          }}
        >
          <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>
            PATCH PANEL
          </div>

          <div
            style={{
              padding: 10,
              borderRadius: 10,
              border: "1px solid rgba(148, 163, 184, 0.35)",
              background: "rgba(15,23,42,0.85)",
              fontSize: 12,
            }}
          >
            <div style={{ opacity: 0.8, marginBottom: 4 }}>Current Peptide</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>
              {currentPeptide ?? "Unknown"}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginTop: 4,
            }}
          >
            {["Calm", "Curious", "Joy", "Fear", "Anger", "Grief"].map(
              (peptide) => (
                <button
                  key={peptide}
                  onClick={() => recordPeptide(peptide)}
                  style={{
                    fontSize: 11,
                    padding: "4px 8px",
                    borderRadius: 999,
                    border: "1px solid rgba(148, 163, 184, 0.5)",
                    background:
                      currentPeptide === peptide
                        ? "rgba(74, 222, 128, 0.15)"
                        : "transparent",
                    color:
                      currentPeptide === peptide ? "#bbf7d0" : "#cbd5f5",
                    cursor: "pointer",
                  }}
                >
                  {peptide}
                </button>
              )
            )}
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 11,
              opacity: 0.7,
            }}
          >
            Recent Signals
          </div>
          <div
            style={{
              flex: 1,
              overflow: "auto",
              borderRadius: 8,
              border: "1px solid rgba(30, 64, 175, 0.6)",
              background: "rgba(15,23,42,0.8)",
              padding: 8,
              fontSize: 11,
            }}
          >
            {peptideLog.length === 0 ? (
              <div style={{ opacity: 0.6 }}>No signals logged yet.</div>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {peptideLog.map((entry) => (
                  <li
                    key={entry.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      opacity: 0.85,
                    }}
                  >
                    <span>{entry.peptide}</span>
                    <span style={{ opacity: 0.6 }}>
                      {entry.timestamp.toLocaleTimeString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={openConsciousScreen}
            style={{
              marginTop: 8,
              padding: "6px 10px",
              borderRadius: 8,
              border: "1px solid rgba(74, 222, 128, 0.8)",
              background:
                "radial-gradient(circle at top, rgba(34,197,94,0.3), transparent)",
              fontSize: 12,
              cursor: "pointer",
              color: "#bbf7d0",
            }}
          >
            Open Conscious Screen
          </button>
        </section>

        {/* CENTER: ENVIRONMENT (3D / Content) */}
        <main
          style={{
            padding: "24px 32px",
            overflow: "auto",
            position: "relative",
          }}
        >
          {children}
        </main>

        {/* RIGHT: BOOKSHELF (Artifacts / Inventory) */}
        <section
          style={{
            borderLeft: "1px solid #1a1f3a",
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            background:
              "radial-gradient(circle at top right, #020617 0, #02030f 50%, #000 100%)",
          }}
        >
          <div style={{ fontSize: 11, opacity: 0.7 }}>BOOKSHELF</div>

          <div
            style={{
              fontSize: 11,
              opacity: 0.7,
              marginBottom: 6,
            }}
          >
            Artifacts in orbit
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 8,
              overflow: "auto",
            }}
          >
            {artifacts.map((artifact) => (
              <div
                key={artifact.id}
                style={{
                  borderRadius: 10,
                  border: "1px solid rgba(148, 163, 184, 0.4)",
                  background: "rgba(15,23,42,0.9)",
                  padding: 10,
                  fontSize: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.6,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 4,
                  }}
                >
                  {artifact.type}
                </div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>
                  {artifact.name}
                </div>
                <div style={{ fontSize: 11, opacity: 0.65 }}>
                  ID: {artifact.id}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* CONSCIOUS SCREEN OVERLAY */}
      {isConsciousOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2, 6, 23, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "min(720px, 90vw)",
              height: "min(420px, 70vh)",
              borderRadius: 24,
              border: "1px solid rgba(74, 222, 128, 0.7)",
              background:
                "radial-gradient(circle at top, rgba(34,197,94,0.18), #020617 60%, #02030f 100%)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.8)",
              padding: 20,
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <button
              onClick={closeConsciousScreen}
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                border: "none",
                background: "transparent",
                color: "#e5e7eb",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              ✕
            </button>

            <div
              style={{
                fontSize: 12,
                opacity: 0.8,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Conscious Screen
            </div>

            <div
              style={{
                flex: 1,
                borderRadius: 16,
                border: "1px solid rgba(15, 23, 42, 0.9)",
                background:
                  "radial-gradient(circle at center, #020617 0, #02030f 40%, #000 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                opacity: 0.85,
                textAlign: "center",
                padding: 16,
              }}
            >
              This is the Conscious Screen — the central window where Codex
              videos, guided journeys, and mind-maps will play.
              <br />
              <br />
              (For now, it’s a placeholder viewport wired to the cockpit
              physics.)
            </div>
          </div>
        </div>
      )}
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
        padding: "6px 12px",
        borderRadius: 999,
        textDecoration: "none",
        fontSize: 12,
        color: isActive ? "#020617" : "#c5f7c5",
        background: isActive ? "#4eff4e" : "transparent",
        fontWeight: isActive ? 600 : 400,
        border: isActive
          ? "1px solid rgba(74, 222, 128, 0.9)"
          : "1px solid rgba(51,65,85,0.9)",
        transition:
          "background 120ms ease, color 120ms ease, transform 80ms ease, border 120ms ease",
      })}
    >
      {label}
    </NavLink>
  );
}
