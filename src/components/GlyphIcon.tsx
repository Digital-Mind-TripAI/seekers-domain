// src/components/GlyphIcon.tsx
import React from 'react';
import type { Stage, Tone } from '../symbols/glyphs';
import { getGlyphById } from '../symbols/glyphs';

export interface GlyphIconProps {
  id: number;
  stage?: Stage;
  tone?: Tone;
  size?: number;      // px
  className?: string; // tailwind etc.
}

const stageStrokeMultiplier: Record<Stage, number> = {
  SEE: 1.0,
  FEEL: 1.1,
  UNDERSTAND: 1.2,
  AM: 1.3,
};

const toneOpacity: Record<Tone, number> = {
  CALM: 0.7,
  MYSTERY: 0.85,
  AWAKEN: 1.0,
  PSYCHEDELIC: 1.0,
  PRIMORDIAL: 0.9,
};

export const GlyphIcon: React.FC<GlyphIconProps> = ({
  id,
  stage = 'SEE',
  tone = 'CALM',
  size = 64,
  className = '',
}) => {
  const glyph = getGlyphById(id);
  if (!glyph) return null;

  const { base } = glyph;
  const strokeWidth = base.strokeWidth * stageStrokeMultiplier[stage];
  const opacity = toneOpacity[tone];

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={base.viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        opacity,
        overflow: 'visible',
      }}
    >
      <path
        d={base.svgPath}
        fill="none"
        stroke="#F7E3B5"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
