import React from "react";

import type { CSSProperties } from "react";
/**
 * Local types for the Codex interface.
 * These are intentionally minimal so we don't fight with the existing
 * core/types.ts yet.
 */

interface CognitiveSignature {
  mbtiType: string | null;
  mbtiConfidence?: number;
  mbtiSource?: "self_reported" | "questionnaire" | "ai_inferred";
  cognitiveFunctions?: string[];
  lastUpdated?: Date;
}

interface Seeker {
  id: string;
  originDate?: Date;
  inventory?: unknown[];
  peptideLog?: unknown[];
  currentQuest?: string | null;
  resonanceLevel: number;
  cognitiveSignature?: CognitiveSignature | null;
}

const SLIDER_HIGH = 75;
const SLIDER_LOW = 25;
const MBTI_TYPE_LENGTH = 4;

const MOCK_CONFIDENCE = 0.8;
const MOCK_RESONANCE = 7;

const STYLES: Record<string, CSSProperties> = {
  panel: {
    borderRadius: 16,
    border: "1px solid rgba(148, 255, 148, 0.25)",
    padding: 16,
    background:
      "radial-gradient(circle at top, rgba(78,255,78,0.12), rgba(2,3,15,0.9))",
    boxShadow: "0 0 18px rgba(78,255,78,0.12)",
  },
};

/**
 * TEMP: mock Seeker until we have real state wiring.
 * This is just to visualize the Cognitive Signature panel.
 */
const mockSeeker: Seeker = {
  id: "demo-seeker",
  originDate: new Date("2025-01-01T00:00:00.000Z"),
  inventory: [],
  peptideLog: [],
  currentQuest: "Prototype the Codex Realm",
  resonanceLevel: MOCK_RESONANCE,
  cognitiveSignature: {
    mbtiType: "INFJ",
    mbtiConfidence: MOCK_CONFIDENCE,
    mbtiSource: "self_reported",
    cognitiveFunctions: ["Ni", "Fe", "Ti", "Se"],
    lastUpdated: new Date(),
  },
};

/**
 * Utility: transform an MBTI string into slider values (0–100).
 * We treat this as a "Pattern" the Seeker is currently running,
 * not as an eternal definition.
 */
function getMbtiSliders(sig: CognitiveSignature | null | undefined) {
  if (!sig || !sig.mbtiType) {
    return null;
  }

  const type = sig.mbtiType.toUpperCase();
  if (type.length !== MBTI_TYPE_LENGTH) return null;

  const [a, b, c, d] = type.split("") as [string, string, string, string];

  return {
    ei: a === "E" ? SLIDER_HIGH : SLIDER_LOW,
    sn: b === "S" ? SLIDER_LOW : SLIDER_HIGH,
    tf: c === "T" ? SLIDER_HIGH : SLIDER_LOW,
    jp: d === "J" ? SLIDER_HIGH : SLIDER_LOW,
  };
}

/**
 * Equalizer bar for one MBTI axis.
 */
interface AxisProps {
  labelLeft: string;
  labelRight: string;
  value: number; // 0–100
}

function AxisSlider({ labelLeft, labelRight, value }: AxisProps) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "11px",
          opacity: "0.7",
          marginBottom: "4px",
        }}
      >
        <span>{labelLeft}</span>
        <span>{labelRight}</span>
      </div>
      <div
        style={{
          position: "relative",
          height: "8px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            bottom: "0",
            width: `${value}%`,
            borderRadius: "999px",
            background:
              "linear-gradient(90deg, rgba(78,255,78,0.2), rgba(78,255,255,0.8))",
            transition: "width 220ms ease-out",
          }}
        />
      </div>
    </div>
  );
}

/**
 * Cognitive Signature Panel
 * Visualizes MBTI as a fluid equalizer, not a static badge.
 */
function CognitiveSignaturePanel({ seeker }: { seeker: Seeker }) {
  const sig = seeker.cognitiveSignature ?? null;
  const sliders = getMbtiSliders(sig);

  return (
    <div style={STYLES.panel}>
      <div style={{ fontSize: "12px", opacity: "0.8", marginBottom: "4px" }}>
        TOOLS · COGNITIVE SIGNATURE
      </div>
      <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>
        Pattern Equalizer
      </div>

      {!sig || !sig.mbtiType || !sliders ? (
        <div style={{ fontSize: "13px", opacity: "0.8" }}>
          You haven&apos;t tuned a pattern yet.
          <br />
          <span style={{ opacity: "0.7" }}>
            When you&apos;re ready, you can run a short reflection to help the
            Navigator adapt to how you process reality.
          </span>
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: "13px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                padding: "2px 8px",
                borderRadius: "999px",
                border: "1px solid rgba(148,255,148,0.5)",
                fontSize: "11px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {sig.mbtiType}
            </span>
            <span style={{ opacity: "0.7", fontSize: "11px" }}>
              Running pattern ·{" "}
              {sig.mbtiSource === "self_reported"
                ? "Chosen by you"
                : sig.mbtiSource === "questionnaire"
                ? "Derived from your answers"
                : "Navigator hint"}
            </span>
          </div>

          <p
            style={{
              fontSize: "12px",
              opacity: "0.8",
              marginBottom: "12px",
              lineHeight: "1.5",
            }}
          >
            This doesn&apos;t define who you are.
            <br />
            It&apos;s a lens you&apos;re currently holding so the HyperVerse
            can speak your language.
          </p>

          <AxisSlider
            labelLeft="Introversion (I)"
            labelRight="Extraversion (E)"
            value={sliders.ei}
          />
          <AxisSlider
            labelLeft="Sensing (S)"
            labelRight="Intuition (N)"
            value={sliders.sn}
          />
          <AxisSlider
            labelLeft="Thinking (T)"
            labelRight="Feeling (F)"
            value={sliders.tf}
          />
          <AxisSlider
            labelLeft="Judging (J)"
            labelRight="Perceiving (P)"
            value={sliders.jp}
          />

          <div
            style={{
              marginTop: "8px",
              fontSize: "11px",
              opacity: "0.75",
              fontStyle: "italic",
            }}
          >
            You can recalibrate this pattern at any time. Evolution is
            expected.
          </div>
        </>
      )}
    </div>
  );
}

/**
 * CodexEnvironment:
 * Placeholder for the 3D environment associated with the Codex.
 * For now this can just be a simple visual stub.
 */
export const CodexEnvironment: React.FC = () => {
  return (
    <div
      style={{
        height: "100%",
        borderRadius: "16px",
        border: "1px dashed rgba(148,255,148,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0.6",
        fontSize: "14px",
      }}
    >
      Codex Environment Placeholder (3D world to be wired with R3F)
    </div>
  );
};

/**
 * CodexInterface:
 * The main HUD for the Seeker's Codex.
 *
 * MBTI appears here as a Tool — not next to name/avatar —
 * to honor the "equipment, not identity" principle.
 */
export const CodexInterface: React.FC = () => {
  const seeker = mockSeeker; // later: pull from global state / context

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 340px)",
        gap: "24px",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Left: Codex content / profile text / sections */}
      <div
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(148,255,148,0.18)",
          padding: "20px",
          background:
            "radial-gradient(circle at top left, rgba(78,255,78,0.12), rgba(2,3,15,0.95))",
          boxShadow: "0 0 26px rgba(0,0,0,0.7)",
          overflow: "auto",
        }}
      >
        <div
          style={{
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: "0.7",
            marginBottom: "4px",
            fontSize: "11px",
          }}
        >
          Codex · Profile
        </div>
        <h1
          style={{
            fontSize: "20px",
            margin: "0",
            marginBottom: "8px",
            fontWeight: 600,
          }}
        >
          Seeker&apos;s Living Codex
        </h1>
        <p
          style={{
            fontSize: "13px",
            opacity: "0.82",
            marginBottom: "16px",
            lineHeight: "1.5",
          }}
        >
          This space is your living manual, not a static record. As you explore
          Realms, your Codex will update with insights, emotional logs, quests,
          and tools you collect along the way.
        </p>

        <div
          style={{
            fontSize: "13px",
            opacity: "0.85",
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid rgba(148,255,148,0.25)",
            background: "rgba(0,0,0,0.35)",
          }}
        >
          <strong>Current Quest:</strong>{" "}
          <span style={{ opacity: 0.9 }}>
            {seeker.currentQuest ?? "None selected"}
          </span>
          <br />
          <strong>Resonance Level:</strong>{" "}
          <span style={{ opacity: 0.9 }}>{seeker.resonanceLevel}</span>
        </div>

        <p
          style={{
            fontSize: "12px",
            opacity: "0.78",
            marginTop: "16px",
            lineHeight: "1.6",
          }}
        >
          Over time, this area will unfold into sections for your story,
          emotional breakthroughs, key decisions, and luminous moments. Nothing
          here is used to judge you. It exists so you can see your own
          evolution with clarity.
        </p>
      </div>

      {/* Right: Tools / Cognitive Signature Equalizer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <CognitiveSignaturePanel seeker={seeker} />

        <div
          style={{
            borderRadius: "16px",
            border: "1px solid rgba(148,255,148,0.18)",
            padding: "14px",
            background: "rgba(2,3,15,0.9)",
            fontSize: "12px",
            opacity: "0.85",
          }}
        >
          <div style={{ fontSize: "11px", opacity: "0.7", marginBottom: "4px" }}>
            TOOL TIP
          </div>
          <div>
            Personality patterns are like interfaces for your consciousness.
            You can swap, refine, or outgrow them. The Navigator will always
            treat them as equipment, not identity.
          </div>
        </div>
      </div>
    </div>
  );
};
