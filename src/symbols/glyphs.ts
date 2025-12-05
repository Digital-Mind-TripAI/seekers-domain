// src/symbols/glyphs.ts

export type Stage = 'SEE' | 'FEEL' | 'UNDERSTAND' | 'AM';
export type Tone = 'CALM' | 'MYSTERY' | 'AWAKEN' | 'PSYCHEDELIC' | 'PRIMORDIAL';

export interface GlyphVisualVariant {
  /** SVG path data for the base "I See" form */
  svgPath: string;
  /** ViewBox for this path; all are 0 0 100 100 for simplicity */
  viewBox: string;
  /** Base stroke width for this glyph at neutral scale */
  strokeWidth: number;
}

/**
 * Shader config is a placeholder for later Three.js/WebGL work.
 * You can wire these into uniforms / params when you build the shader.
 */
export interface GlyphShaderConfig {
  spiralDirection: 'outward' | 'inward' | 'both';
  baseIntensity: number;      // 0–1
  pulseAmplitude: number;     // 0–1
  pulseSpeed: number;         // arbitrary
  fractalStrength: number;    // 0–1
}

export interface GlyphDefinition {
  /** 1–12, resonance number */
  id: number;
  /** Short mythic key, used in code / narrative */
  key: string;
  /** Conceptual name (what this glyph "means") */
  name: string;
  /** Elemental consciousness principle */
  principle: string;
  /** Spiral position 0–1 (0 = center, 1 = outer edge) */
  spiralPosition: number;
  /** Base visual form (I See) */
  base: GlyphVisualVariant;
  /** Default shader parameters for the "I Am" procedural state */
  shader: GlyphShaderConfig;
}

// Helper: make it easy to tweak defaults later
const baseShader = (overrides: Partial<GlyphShaderConfig> = {}): GlyphShaderConfig => ({
  spiralDirection: 'both',
  baseIntensity: 0.6,
  pulseAmplitude: 0.3,
  pulseSpeed: 1.0,
  fractalStrength: 0.4,
  ...overrides,
});

/**
 * NOTE ON COORDINATES:
 * All paths are built for viewBox="0 0 100 100"
 * You can scale/stroke them however you want in the React component.
 */

export const GLYPHS: GlyphDefinition[] = [
  // 1 — Seed / First Sight
  {
    id: 1,
    key: 'ari',
    name: 'Seed of Seeing',
    principle: 'Emergence of awareness; first noticing.',
    spiralPosition: 0.08,
    base: {
      // small vertical line with a dot above — “seeing a point”
      svgPath: `
        M 50 30
        L 50 65
        M 50 22
        A 3 3 0 1 1 49.9 22
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'outward',
      baseIntensity: 0.4,
      pulseAmplitude: 0.2,
    }),
  },

  // 2 — Split / Duality
  {
    id: 2,
    key: 'nal',
    name: 'Dual Gaze',
    principle: 'Perceiving contrast; self vs world, inner vs outer.',
    spiralPosition: 0.14,
    base: {
      // two diverging lines from a central base
      svgPath: `
        M 50 70
        L 35 35
        M 50 70
        L 65 35
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'outward',
      baseIntensity: 0.45,
      pulseAmplitude: 0.25,
    }),
  },

  // 3 — Horizon
  {
    id: 3,
    key: 'vek',
    name: 'Horizon Line',
    principle: 'Beginning to sense context; above/below, surface/depth.',
    spiralPosition: 0.2,
    base: {
      // horizontal line with a slight arc beneath
      svgPath: `
        M 25 45
        L 75 45
        M 30 55
        Q 50 65 70 55
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'outward',
      baseIntensity: 0.5,
    }),
  },

  // 4 — Wave / Feeling
  {
    id: 4,
    key: 'lua',
    name: 'First Feeling',
    principle: 'Emotion starts to move; sensing currents inside.',
    spiralPosition: 0.26,
    base: {
      // simple sine-like wave
      svgPath: `
        M 15 60
        Q 30 40 45 60
        T 75 60
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'outward',
      baseIntensity: 0.55,
      pulseAmplitude: 0.4,
    }),
  },

  // 5 — Eye / Mirror
  {
    id: 5,
    key: 'mir',
    name: 'Inner Mirror',
    principle: 'Seeing oneself; self-reflection begins.',
    spiralPosition: 0.33,
    base: {
      // eye shape with center
      svgPath: `
        M 20 50
        Q 50 25 80 50
        Q 50 75 20 50
        M 50 50
        A 7 7 0 1 1 49.9 50
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'both',
      baseIntensity: 0.6,
      fractalStrength: 0.5,
    }),
  },

  // 6 — Knot / Pattern
  {
    id: 6,
    key: 'ket',
    name: 'Pattern Knot',
    principle: 'Recognition of repeating inner/outer patterns.',
    spiralPosition: 0.4,
    base: {
      // simple crossing knot
      svgPath: `
        M 30 30
        L 70 70
        M 70 30
        L 30 70
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'both',
      baseIntensity: 0.65,
      fractalStrength: 0.6,
    }),
  },

  // 7 — Path / Corridor
  {
    id: 7,
    key: 'cor',
    name: 'Pathway',
    principle: 'Choosing a direction; walking a corridor.',
    spiralPosition: 0.48,
    base: {
      // converging perspective lines
      svgPath: `
        M 30 80
        L 45 30
        M 70 80
        L 55 30
        M 45 30
        L 55 30
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'outward',
      baseIntensity: 0.7,
      pulseSpeed: 1.3,
    }),
  },

  // 8 — Bridge / Integration
  {
    id: 8,
    key: 'sol',
    name: 'Bridge of Meaning',
    principle: 'Inner and outer begin to integrate.',
    spiralPosition: 0.57,
    base: {
      // two pillars with an arc bridge
      svgPath: `
        M 30 70
        L 30 40
        M 70 70
        L 70 40
        M 30 40
        Q 50 25 70 40
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'both',
      baseIntensity: 0.75,
      fractalStrength: 0.7,
    }),
  },

  // 9 — Spiral Core
  {
    id: 9,
    key: 'tor',
    name: 'Spiral Core',
    principle: 'Realizing the cyclical nature of growth.',
    spiralPosition: 0.67,
    base: {
      // simple spiral approximation
      svgPath: `
        M 50 35
        Q 65 35 65 50
        Q 65 65 50 65
        Q 35 65 35 50
        Q 35 40 45 40
        Q 55 40 55 50
        Q 55 58 48 58
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'both',
      baseIntensity: 0.8,
      pulseAmplitude: 0.5,
      fractalStrength: 0.8,
    }),
  },

  // 10 — Radiance / Emanation
  {
    id: 10,
    key: 'rae',
    name: 'Radiant Field',
    principle: 'Presence begins to emanate outward.',
    spiralPosition: 0.78,
    base: {
      // a central circle with rays
      svgPath: `
        M 50 50
        A 8 8 0 1 1 49.9 50
        M 50 30
        L 50 18
        M 50 70
        L 50 82
        M 30 50
        L 18 50
        M 70 50
        L 82 50
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'outward',
      baseIntensity: 0.9,
      pulseAmplitude: 0.6,
      fractalStrength: 0.9,
    }),
  },

  // 11 — Veil / Threshold
  {
    id: 11,
    key: 'tha',
    name: 'Veil',
    principle: 'The threshold between personal identity and unity.',
    spiralPosition: 0.88,
    base: {
      // vertical line with a soft curve passing through
      svgPath: `
        M 50 20
        L 50 80
        M 30 35
        Q 60 50 30 65
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'inward',
      baseIntensity: 0.85,
      pulseAmplitude: 0.3,
      fractalStrength: 0.7,
    }),
  },

  // 12 — Still Point / Unity
  {
    id: 12,
    key: 'omna',
    name: 'Still Point',
    principle: 'I Am; unity; the quiet center behind all spirals.',
    spiralPosition: 0.97,
    base: {
      // single circle in center
      svgPath: `
        M 50 50
        A 6 6 0 1 1 49.9 50
      `,
      viewBox: '0 0 100 100',
      strokeWidth: 3,
    },
    shader: baseShader({
      spiralDirection: 'inward',
      baseIntensity: 1.0,
      pulseAmplitude: 0.1,
      fractalStrength: 1.0,
    }),
  },
];

export const getGlyphById = (id: number): GlyphDefinition | undefined =>
  GLYPHS.find((g) => g.id === id);

export const getGlyphByKey = (key: string): GlyphDefinition | undefined =>
  GLYPHS.find((g) => g.key === key);
