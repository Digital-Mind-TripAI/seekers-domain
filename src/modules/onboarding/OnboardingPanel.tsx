// src/modules/onboarding/OnboardingPanel.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Mode = "choice" | "new" | "returning";

type NewSeekerStep = 1 | 2 | 3 | 4 | 5;

const stones = [
  { id: "ember", label: "Ember Stone", desc: "For seekers of fire, action, and courage." },
  { id: "tide", label: "Tide Stone", desc: "For seekers of depth, feeling, and intuition." },
  { id: "aether", label: "Aether Stone", desc: "For seekers of pattern, insight, and vision." },
  { id: "terra", label: "Terra Stone", desc: "For seekers of grounding, building, and stability." },
];

const OnboardingPanel: React.FC = () => {
  const [mode, setMode] = useState<Mode>("choice");
  const [newStep, setNewStep] = useState<NewSeekerStep>(1);

  const [seekerName, setSeekerName] = useState("");
  const [mbtiType, setMbtiType] = useState("");
  const [seekerStone, setSeekerStone] = useState<string | null>(null);
  const [sealNotes, setSealNotes] = useState("");

  const [returningName, setReturningName] = useState("");

  const navigate = useNavigate();

  const startNewSeeker = () => {
    setMode("new");
    setNewStep(1);
  };

  const startReturningSeeker = () => {
    setMode("returning");
  };

  const handleLeave = () => {
    // We can't actually close the tab programmatically in a friendly way,
    // so we route them to a neutral "outside" space – for now, the Nexus.
    navigate("/nexus");
  };

  const handleNewNext = () => {
    if (mode !== "new") return;

    if (newStep === 1 && seekerName.trim().length === 0) {
      alert("Choose a Seeker Name first.");
      return;
    }

    if (newStep === 2 && mbtiType.trim().length === 0) {
      // optional: allow skipping
      // For now, allow blank but warn
      if (!window.confirm("Skip MBTI for now? You can refine it later.")) {
        return;
      }
    }

    if (newStep === 3 && !seekerStone) {
      alert("Pick a Seeker Stone that feels right to you.");
      return;
    }

    if (newStep < 5) {
      setNewStep((prev) => (prev + 1) as NewSeekerStep);
    } else {
      // Step 5 complete: enter Codex
      persistSeekerProfile({
        seekerName,
        mbtiType,
        seekerStone,
        sealNotes,
      });
      navigate("/codex");
    }
  };

  const handleNewBack = () => {
    if (mode !== "new") return;
    if (newStep > 1) {
      setNewStep((prev) => (prev - 1) as NewSeekerStep);
    } else {
      setMode("choice");
    }
  };

  const handleReturningEnter = () => {
    if (!returningName.trim()) {
      alert("Enter your Seeker Name.");
      return;
    }
    // Later we’ll look up their saved profile.
    // For now, just store the name and go to the Codex.
    persistSeekerProfile({
      seekerName: returningName.trim(),
    });
    navigate("/codex");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at top, #151a2a 0%, #050513 55%, #000000 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#f3f3ff",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "min(720px, 95vw)",
          minHeight: "320px",
          padding: "24px 28px",
          background: "rgba(7, 8, 20, 0.92)",
          borderRadius: "18px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.75)",
          border: "1px solid rgba(120, 240, 255, 0.18)",
        }}
      >
        {mode === "choice" && (
          <ChoiceScreen
            onLeave={handleLeave}
            onNew={startNewSeeker}
            onReturning={startReturningSeeker}
          />
        )}

        {mode === "new" && (
          <NewSeekerFlow
            step={newStep}
            seekerName={seekerName}
            setSeekerName={setSeekerName}
            mbtiType={mbtiType}
            setMbtiType={setMbtiType}
            seekerStone={seekerStone}
            setSeekerStone={setSeekerStone}
            sealNotes={sealNotes}
            setSealNotes={setSealNotes}
            onNext={handleNewNext}
            onBack={handleNewBack}
          />
        )}

        {mode === "returning" && (
          <ReturningFlow
            returningName={returningName}
            setReturningName={setReturningName}
            onBack={() => setMode("choice")}
            onEnter={handleReturningEnter}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingPanel;

// -------------- Choice Screen --------------

interface ChoiceProps {
  onLeave: () => void;
  onNew: () => void;
  onReturning: () => void;
}

const ChoiceScreen: React.FC<ChoiceProps> = ({ onLeave, onNew, onReturning }) => {
  return (
    <>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>You Stand at the Threshold</h1>
      <p
        style={{
          fontSize: "0.95rem",
          opacity: 0.8,
          marginBottom: "1.5rem",
          lineHeight: 1.5,
        }}
      >
        You’ve touched the Door and the HyperVerse has answered. Before you step through,
        choose how you want to enter.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
        }}
      >
        <button
          onClick={onLeave}
          style={choiceButtonStyle("#2a2a35", "rgba(255,255,255,0.2)")}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Leave</div>
          <div style={{ fontSize: "0.8rem", opacity: 0.75 }}>
            Close the Door for now. The HyperVerse will still be here when you return.
          </div>
        </button>

        <button
          onClick={onNew}
          style={choiceButtonStyle("#10303f", "rgba(120, 240, 255, 0.45)")}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Enter as a New Seeker</div>
          <div style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            Choose your Seeker Name, Stone, and Seal. This forges your first imprint in the Codex.
          </div>
        </button>

        <button
          onClick={onReturning}
          style={choiceButtonStyle("#262040", "rgba(200, 180, 255, 0.4)")}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Enter as a Returning Seeker</div>
          <div style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            You&apos;ve been here before. Use your Seeker Name to return to your Codex.
          </div>
        </button>
      </div>
    </>
  );
};

const choiceButtonStyle = (bg: string, border: string): React.CSSProperties => ({
  background: bg,
  borderRadius: "14px",
  padding: "12px 14px",
  textAlign: "left",
  cursor: "pointer",
  border: `1px solid ${border}`,
  color: "#f3f3ff",
  outline: "none",
});

// -------------- New Seeker Flow --------------

interface NewSeekerFlowProps {
  step: NewSeekerStep;
  seekerName: string;
  setSeekerName: (v: string) => void;
  mbtiType: string;
  setMbtiType: (v: string) => void;
  seekerStone: string | null;
  setSeekerStone: (v: string | null) => void;
  sealNotes: string;
  setSealNotes: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const NewSeekerFlow: React.FC<NewSeekerFlowProps> = ({
  step,
  seekerName,
  setSeekerName,
  mbtiType,
  setMbtiType,
  seekerStone,
  setSeekerStone,
  sealNotes,
  setSealNotes,
  onNext,
  onBack,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.75rem",
          fontSize: "0.8rem",
          opacity: 0.8,
        }}
      >
        <span>New Seeker Onboarding</span>
        <span>
          Step {step} / 5
        </span>
      </div>

      {step === 1 && (
        <>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Choose Your Seeker Name</h2>
          <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.75rem" }}>
            This is the name you&apos;ll travel under in the HyperVerse. It can be a real name,
            a codename, or a word that feels like <em>you</em>.
          </p>
          <input
            value={seekerName}
            onChange={(e) => setSeekerName(e.target.value)}
            placeholder="Type your Seeker Name..."
            style={textInputStyle}
          />
          <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.5rem" }}>
            Later, we&apos;ll add an AI helper to riff on names with you.
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>MBTI Snapshot</h2>
          <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.75rem" }}>
            This is a rough orientation, not a label. If you already know your type, enter it.
            If not, leave it blank and we&apos;ll refine it later.
          </p>
          <input
            value={mbtiType}
            onChange={(e) => setMbtiType(e.target.value.toUpperCase())}
            placeholder="e.g. INFP, INTJ, ENTP..."
            style={textInputStyle}
            maxLength={4}
          />
          <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.5rem" }}>
            Later this will be replaced by an integrated MBTI-like evaluation flow.
          </p>
        </>
      )}

      {step === 3 && (
        <>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Choose Your Seeker Stone</h2>
          <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.75rem" }}>
            Each Stone reflects a way of moving through the world. There is no &quot;right&quot;
            choice—only what resonates.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "10px",
            }}
          >
            {stones.map((stone) => {
              const selected = seekerStone === stone.id;
              return (
                <button
                  key={stone.id}
                  onClick={() => setSeekerStone(stone.id)}
                  style={{
                    ...choiceButtonStyle(
                      selected ? "#123a42" : "#151726",
                      selected
                        ? "rgba(120, 240, 255, 0.7)"
                        : "rgba(140, 150, 200, 0.4)"
                    ),
                    borderWidth: selected ? "2px" : "1px",
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{stone.label}</div>
                  <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>{stone.desc}</div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Design Your Seeker Seal</h2>
          <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.75rem" }}>
            Your Seal is your symbol in the HyperVerse. Later, this will connect to living glyphs
            and visual sigils. For now, describe what it feels like or looks like.
          </p>
          <textarea
            value={sealNotes}
            onChange={(e) => setSealNotes(e.target.value)}
            placeholder="Describe shapes, symbols, animals, elements, or feelings that belong in your Seal..."
            rows={5}
            style={{
              ...textInputStyle,
              resize: "vertical",
              paddingTop: "8px",
            }}
          />
          <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.5rem" }}>
            Later we&apos;ll turn this into an actual evolving glyph using the symbol engine.
          </p>
        </>
      )}

      {step === 5 && (
        <>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Ready to Enter Your Codex</h2>
          <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.75rem" }}>
            When you continue, your Seeker profile will be etched into the Codex and you&apos;ll
            arrive in your personal space.
          </p>
          <ul
            style={{
              fontSize: "0.85rem",
              opacity: 0.85,
              listStyle: "none",
              paddingLeft: 0,
              marginBottom: "0.75rem",
            }}
          >
            <li>
              <strong>Name:</strong> {seekerName || "—"}
            </li>
            <li>
              <strong>MBTI:</strong> {mbtiType || "—"}
            </li>
            <li>
              <strong>Stone:</strong>{" "}
              {seekerStone
                ? stones.find((s) => s.id === seekerStone)?.label ?? seekerStone
                : "—"}
            </li>
          </ul>
          <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
            You can always refine this later. This is a starting imprint, not a prison.
          </p>
        </>
      )}

      {/* Navigation buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.2rem",
        }}
      >
        <button onClick={onBack} style={navButtonStyle(false)}>
          Back
        </button>
        <button onClick={onNext} style={navButtonStyle(true)}>
          {step < 5 ? "Next" : "Enter Codex"}
        </button>
      </div>
    </>
  );
};

const textInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "10px",
  border: "1px solid rgba(150, 180, 220, 0.6)",
  backgroundColor: "rgba(5, 8, 18, 0.85)",
  color: "#f3f3ff",
  fontSize: "0.9rem",
  outline: "none",
};

const navButtonStyle = (primary: boolean): React.CSSProperties => ({
  padding: "8px 16px",
  borderRadius: "999px",
  border: primary
    ? "1px solid rgba(120, 240, 255, 0.9)"
    : "1px solid rgba(150, 160, 200, 0.7)",
  background: primary
    ? "linear-gradient(90deg, #11a8b8, #8af8ff)"
    : "rgba(10, 12, 25, 0.9)",
  color: primary ? "#030409" : "#f3f3ff",
  cursor: "pointer",
  fontSize: "0.9rem",
});

// -------------- Returning Flow --------------

interface ReturningFlowProps {
  returningName: string;
  setReturningName: (v: string) => void;
  onBack: () => void;
  onEnter: () => void;
}

const ReturningFlow: React.FC<ReturningFlowProps> = ({
  returningName,
  setReturningName,
  onBack,
  onEnter,
}) => {
  return (
    <>
      <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Welcome Back, Seeker</h2>
      <p style={{ fontSize: "0.9rem", opacity: 0.85, marginBottom: "0.75rem" }}>
        Enter the Seeker Name you used when you first entered the HyperVerse. We&apos;ll use it
        to locate your Codex.
      </p>
      <input
        value={returningName}
        onChange={(e) => setReturningName(e.target.value)}
        placeholder="Your Seeker Name..."
        style={textInputStyle}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1.2rem",
        }}
      >
        <button onClick={onBack} style={navButtonStyle(false)}>
          Back
        </button>
        <button onClick={onEnter} style={navButtonStyle(true)}>
          Enter Codex
        </button>
      </div>
    </>
  );
};

// -------------- Simple profile persistence placeholder --------------

interface SeekerProfile {
  seekerName?: string;
  mbtiType?: string;
  seekerStone?: string | null;
  sealNotes?: string;
}

/**
 * Temporary: store in localStorage.
 * Later we can replace this with a proper profile backend / file system.
 */
function persistSeekerProfile(profile: SeekerProfile) {
  if (typeof window === "undefined") return;
  try {
    const prev = window.localStorage.getItem("hyperverse_seeker_profile");
    const prevObj = prev ? JSON.parse(prev) : {};
    const merged = { ...prevObj, ...profile };
    window.localStorage.setItem(
      "hyperverse_seeker_profile",
      JSON.stringify(merged)
    );
  } catch {
    // ignore for now
  }
}
