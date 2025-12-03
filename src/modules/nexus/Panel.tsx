// src/modules/nexus/Panel.tsx
import React, { useState } from "react";
import { gatewayData } from "./gatewayData";

export default function Panel() {
  const [stage, setStage] = useState<"veil" | "threshold" | "entered">("veil");

  const handleEnter = () => {
    setStage("threshold");
  };

  const handleCrossThreshold = () => {
    setStage("entered");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* STAGE 1: THE OUTER VEIL */}
      {stage === "veil" && (
        <div className="text-center space-y-8 animate-fade-in pointer-events-auto">
          <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-gold-300 to-gold-600 tracking-widest opacity-90 drop-shadow-glow">
            {gatewayData.outerVeil.text}
          </h1>
          <p className="text-cyan-400/60 text-sm tracking-[0.5em] uppercase">
            {gatewayData.outerVeil.vibe}
          </p>
          <button
            onClick={handleEnter}
            className="mt-12 px-12 py-4 border border-gold-500/30 text-gold-100 hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-700 rounded-full tracking-widest text-xs"
          >
            INITIALIZE SEQUENCE
          </button>
        </div>
      )}

      {/* STAGE 2: THE THRESHOLD */}
      {stage === "threshold" && (
        <div className="max-w-2xl text-center space-y-8 pointer-events-auto animate-fade-in-slow">
          <p className="text-xl md:text-2xl font-light text-slate-300 leading-relaxed">
            "{gatewayData.threshold.welcome}"
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {gatewayData.threshold.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={handleCrossThreshold}
                className="group flex flex-col items-center p-6 border border-slate-700 hover:border-cyan-500/50 bg-slate-900/40 hover:bg-cyan-900/10 transition-all duration-500 rounded-lg backdrop-blur-sm"
              >
                <span className="text-lg text-slate-200 group-hover:text-cyan-300 font-medium">
                  {choice.label}
                </span>
                <span className="text-xs text-slate-500 mt-2 group-hover:text-cyan-400/60">
                  {choice.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 3: ENTERED (UI clears to reveal 3D portals) */}
      {stage === "entered" && (
        <div className="absolute bottom-12 text-center w-full pointer-events-auto animate-fade-in">
          <p className="text-xs text-slate-500 tracking-widest">
            SELECT A PORTAL TO BEGIN
          </p>
        </div>
      )}
    </div>
  );
}