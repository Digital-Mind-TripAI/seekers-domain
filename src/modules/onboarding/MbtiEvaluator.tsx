// src/modules/onboarding/MbtiEvaluator.tsx
import React, { useState } from "react";
import { mbtiQuestions, MbtiQuestion, MbtiDimension } from "./mbtiQuestions";

// Local fallback for saving seeker profile when the core hook/module is not present.
// This persists a minimal profile object to localStorage and is intentionally small
// and resilient (catches storage errors). Replace with the real core implementation
// when that module is added to the project.
function saveSeekerProfile(profile: { mbtiType?: string; [key: string]: any }): void {
  try {
    const key = "seekerProfile";
    const existing = (() => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    })();
    const merged = { ...existing, ...profile };
    localStorage.setItem(key, JSON.stringify(merged));
  } catch {
    // ignore storage errors (e.g. private mode)
  }
}

interface MbtiEvaluatorProps {
  onComplete: (mbtiType: string) => void;
}

type AnswerMap = Record<string, "a" | "b">;

const DIMENSION_FIRST: Record<MbtiDimension, string> = {
  EI: "E",
  SN: "S",
  TF: "T",
  JP: "J",
};

const DIMENSION_SECOND: Record<MbtiDimension, string> = {
  EI: "I",
  SN: "N",
  TF: "F",
  JP: "P",
};

const MbtiEvaluator: React.FC<MbtiEvaluatorProps> = ({ onComplete }: MbtiEvaluatorProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [result, setResult] = useState<string | null>(null);

  const total = mbtiQuestions.length;
  const current = mbtiQuestions[currentIndex];

  function handleAnswer(choice: "a" | "b") {
    const updated: AnswerMap = { ...answers, [current.id]: choice };
    setAnswers(updated);

    if (currentIndex < total - 1) {
      setCurrentIndex((idx: number) => idx + 1);
    } else {
      const mbti = computeMbti(updated, mbtiQuestions);
      setResult(mbti);
      saveSeekerProfile({ mbtiType: mbti });
      onComplete(mbti);
    }
  }

  function goBack() {
    if (currentIndex === 0) return;
    setCurrentIndex((idx: number) => idx - 1);
  }

  const progressPercent = ((currentIndex + 1) / total) * 100;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "20px 24px",
        boxSizing: "border-box",
        color: "#f7f7ff",
        background:
          "radial-gradient(circle at top, #0f1225 0%, #02030a 55%, #000000 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <header>
        <div
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.75,
            marginBottom: "6px",
          }}
        >
          Orientation • Pattern Equalizer
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: "1.4rem",
            color: "#9bf7ff",
          }}
        >
          How do you move through the world?
        </h1>
        <p
          style={{
            marginTop: "6px",
            fontSize: "0.9rem",
            opacity: 0.8,
            maxWidth: "560px",
          }}
        >
          Tap the option that feels most true <strong>most of the time</strong>,
          not the one you wish were true. There are no right answers, only
          patterns.
        </p>
      </header>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "6px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: "100%",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg, #4dfcff, #47ffb6, #ffe45e, #ff6f91)",
            transition: "width 0.25s ease-out",
          }}
        />
      </div>

      {/* Question card */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: "800px",
        }}
      >
        <div
          style={{
            borderRadius: "16px",
            padding: "20px 18px",
            background: "rgba(8, 10, 26, 0.96)",
            border: "1px solid rgba(120, 230, 255, 0.3)",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.8)",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              opacity: 0.7,
              marginBottom: "4px",
            }}
          >
            Question {currentIndex + 1} / {total}
          </div>
          <div
            style={{
              fontSize: "1.05rem",
              marginBottom: "16px",
              lineHeight: 1.4,
            }}
          >
            {current.prompt}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "10px",
            }}
          >
            <button
              type="button"
              onClick={() => handleAnswer("a")}
              style={choiceButtonStyle("#4dfcff")}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.8,
                  marginRight: "8px",
                }}
              >
                A
              </span>
              <span>{current.optionA}</span>
            </button>

            <button
              type="button"
              onClick={() => handleAnswer("b")}
              style={choiceButtonStyle("#ff6f91")}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.8,
                  marginRight: "8px",
                }}
              >
                B
              </span>
              <span>{current.optionB}</span>
            </button>
          </div>

          <div
            style={{
              marginTop: "14px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              opacity: 0.75,
            }}
          >
            <button
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0}
              style={{
                border: "none",
                background: "transparent",
                color:
                  currentIndex === 0
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(155, 250, 255, 0.9)",
                cursor: currentIndex === 0 ? "default" : "pointer",
                padding: 0,
              }}
            >
              ◀ Back
            </button>
            <span>
              Your pattern will emerge as a four-letter code (like INFP, ESTJ)
              at the end.
            </span>
          </div>
        </div>
      </div>

      {/* Result hint (only shown once we have it) */}
      {result && (
        <div
          style={{
            marginTop: "4px",
            fontSize: "0.9rem",
            opacity: 0.9,
          }}
        >
          Current result: <strong>{result}</strong> — stored in your Codex
          profile.
        </div>
      )}
    </div>
  );
};

export default MbtiEvaluator;

function choiceButtonStyle(glowColor: string): React.CSSProperties {
  return {
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "10px 14px",
    background:
      "linear-gradient(135deg, rgba(18,20,38,0.95), rgba(6,8,24,0.98))",
    color: "#fdfdff",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    fontSize: "0.9rem",
    cursor: "pointer",
    boxShadow: `0 10px 30px ${glowColor}22`,
    transition: "transform 0.08s ease-out, box-shadow 0.12s ease-out",
    outline: "none",
    gap: "4px",
  };
}

function computeMbti(answers: AnswerMap, questions: MbtiQuestion[]): string {
  const scores: Record<MbtiDimension, { first: number; second: number }> = {
    EI: { first: 0, second: 0 },
    SN: { first: 0, second: 0 },
    TF: { first: 0, second: 0 },
    JP: { first: 0, second: 0 },
  };

  for (const q of questions) {
    const choice = answers[q.id];
    if (!choice) continue;

    const isAFirst = q.aIsFirstLetter;
    const pickedFirst =
      (choice === "a" && isAFirst) || (choice === "b" && !isAFirst);

    if (pickedFirst) {
      scores[q.dimension].first += 1;
    } else {
      scores[q.dimension].second += 1;
    }
  }

  let type = "";
  (["EI", "SN", "TF", "JP"] as MbtiDimension[]).forEach((dim) => {
    const s = scores[dim];
    const first = DIMENSION_FIRST[dim];
    const second = DIMENSION_SECOND[dim];
    type += s.first >= s.second ? first : second;
  });

  return type;
}
