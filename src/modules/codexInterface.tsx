// src/modules/codexInterface.tsx

import React from "react";
import type { CSSProperties } from "react";
import { manifestoData } from "./manifestoData"; // Import the soul

/**
 * Local types for the Codex interface.
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
  card: {
    background: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    transition: "all 0.2s ease",
  }
};

/**
 * TEMP: mock Seeker until we have real state wiring.
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

export const CodexEnvironment: React.FC = () => {
  return (
    <div style={{ height: "100%", borderRadius: "16px", border: "1px dashed rgba(148,255,148,0.3)", display: "flex", alignItems: "center", justifyContent: "center", opacity: "0.6", fontSize: "14px" }}>
      Codex Environment (3D Placeholder)
    </div>
  );
};

export const CodexInterface: React.FC = () => {
  const seeker = mockSeeker;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 340px)", gap: "24px", height: "100%", boxSizing: "border-box" }}>
      
      {/* LEFT: MANIFESTO / CODEX CONTENT */}
      <div style={{ borderRadius: "16px", border: "1px solid rgba(148,255,148,0.18)", padding: "20px", background: "radial-gradient(circle at top left, rgba(78,255,78,0.12), rgba(2,3,15,0.95))", boxShadow: "0 0 26px rgba(0,0,0,0.7)", overflow: "auto" }}>
        <div style={{ letterSpacing: "0.16em", textTransform: "uppercase", opacity: "0.7", marginBottom: "4px", fontSize: "11px" }}>
          Codex · The Foundation
        </div>
        <h1 style={{ fontSize: "20px", margin: "0", marginBottom: "24px", fontWeight: 600 }}>
          The Seeker&apos;s Manifesto
        </h1>

        {/* Manifesto Data Mapping */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {manifestoData.map((entry) => (
            <div key={entry.id} style={STYLES.card}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <span style={{ fontSize: "20px" }}>{entry.icon}</span>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 500, color: "#e0ffe0" }}>
                  {entry.title}
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.6", opacity: "0.85", color: "#d0d0d0" }}>
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: TOOLS PANEL */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%", boxSizing: "border-box" }}>
        <CognitiveSignaturePanel seeker={seeker} />
        
        {/* Current Status */}
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