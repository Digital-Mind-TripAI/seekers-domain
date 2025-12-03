// src/modules/codexInterface.tsx
import type { CSSProperties, FC } from "react";
import { manifestoData } from "./manifestoData"; // Ensure this file exists in the same folder

// --- TYPES ---
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

// --- CONSTANTS ---
const SLIDER_HIGH = 75;
const SLIDER_LOW = 25;
const MBTI_TYPE_LENGTH = 4;
const MOCK_CONFIDENCE = 0.8;
const MOCK_RESONANCE = 7;

// --- STYLES ---
const STYLES: Record<string, CSSProperties> = {
  panel: {
    borderRadius: 16,
    border: "1px solid rgba(148, 255, 148, 0.25)",
    padding: 16,
    background:
      "radial-gradient(circle at top, rgba(78,255,78,0.12), rgba(2,3,15,0.9))",
    boxShadow: "0 0 18px rgba(78,255,78,0.12)",
  },
  card: {
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(148, 255, 148, 0.15)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    transition: "all 0.2s ease",
  },
  icon: {
    fontSize: "24px",
    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
  },
};

// --- MOCK DATA ---
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

// --- HELPER FUNCTIONS ---
function getMbtiSliders(sig: CognitiveSignature | null | undefined) {
  if (!sig || !sig.mbtiType) return null;
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

// --- COMPONENTS ---

// 1. Axis Slider (Cognitive Equalizer)
interface AxisProps {
  labelLeft: string;
  labelRight: string;
  value: number;
}

function AxisSlider({ labelLeft, labelRight, value }: AxisProps) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", opacity: "0.7", marginBottom: "4px" }}>
        <span>{labelLeft}</span>
        <span>{labelRight}</span>
      </div>
      <div style={{ position: "relative", height: "8px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: `${value}%`, borderRadius: "999px", background: "linear-gradient(90deg, rgba(78,255,78,0.2), rgba(78,255,255,0.8))", transition: "width 220ms ease-out" }} />
      </div>
    </div>
  );
}

// 2. Cognitive Signature Panel
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
        <div style={{ fontSize: "13px", opacity: "0.8" }}>No pattern tuned yet.</div>
      ) : (
        <>
          <div style={{ fontSize: "13px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
            <span style={{ padding: "2px 8px", borderRadius: "999px", border: "1px solid rgba(148,255,148,0.5)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {sig.mbtiType}
            </span>
          </div>
          <p style={{ fontSize: "12px", opacity: "0.8", marginBottom: "12px", lineHeight: "1.5" }}>
            This is a lens you hold, not a box you live in.
          </p>
          <AxisSlider labelLeft="Introversion (I)" labelRight="Extraversion (E)" value={sliders.ei} />
          <AxisSlider labelLeft="Sensing (S)" labelRight="Intuition (N)" value={sliders.sn} />
          <AxisSlider labelLeft="Thinking (T)" labelRight="Feeling (F)" value={sliders.tf} />
          <AxisSlider labelLeft="Judging (J)" labelRight="Perceiving (P)" value={sliders.jp} />
        </>
      )}
    </div>
  );
}

// 3. Codex Environment (3D Placeholder)
export const CodexEnvironment: FC = () => {
  return (
    <div style={{ height: "100%", borderRadius: "16px", border: "1px dashed rgba(148,255,148,0.3)", display: "flex", alignItems: "center", justifyContent: "center", opacity: "0.6", fontSize: "14px" }}>
      Codex Environment (3D Placeholder)
    </div>
  );
};

// 4. Main Codex Interface
export const CodexInterface: FC = () => {
  const seeker = mockSeeker;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 340px)", gap: "24px", height: "100%", boxSizing: "border-box" }}>
      
      {/* LEFT COLUMN: MANIFESTO (THE SOUL) */}
      <div style={{ borderRadius: "16px", border: "1px solid rgba(148,255,148,0.18)", padding: "24px", background: "radial-gradient(circle at top left, rgba(78,255,78,0.05), rgba(2,3,15,0.95))", boxShadow: "0 0 40px rgba(0,0,0,0.5)", overflowY: "auto" }}>
        <div style={{ letterSpacing: "0.16em", textTransform: "uppercase", opacity: "0.7", marginBottom: "8px", fontSize: "11px" }}>
          Codex · The Foundation
        </div>
        <h1 style={{ fontSize: "24px", margin: "0", marginBottom: "32px", fontWeight: 600, background: "linear-gradient(to right, #fff, #8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          The Seeker&apos;s Manifesto
        </h1>

        {/* Dynamic Manifesto Rendering */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {manifestoData.map((entry) => (
            <div key={entry.id} style={STYLES.card}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                <span style={STYLES.icon}>{entry.icon}</span>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 500, color: "#e0ffe0" }}>
                  {entry.title}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.7", opacity: "0.85", color: "#d0d0d0" }}>
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: TOOLS (THE MIND) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%", boxSizing: "border-box" }}>
        <CognitiveSignaturePanel seeker={seeker} />
        
        <div style={STYLES.panel}>
          <div style={{ fontSize: "11px", opacity: "0.7", marginBottom: "4px" }}>STATUS</div>
          <div style={{ fontSize: "13px", lineHeight: "1.5" }}>
            <strong>Quest:</strong> <span style={{opacity:0.8}}>{seeker.currentQuest}</span><br/>
            <strong>Resonance:</strong> <span style={{opacity:0.8}}>{seeker.resonanceLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};