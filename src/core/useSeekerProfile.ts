// FILE: src/core/useSeekerProfile.ts
// DESCRIPTION: Small helper to persist and retrieve a Seeker profile (localStorage placeholder)

export interface SeekerProfile {
  seekerName?: string;
  mbtiType?: string;
  seekerStone?: string | null;
  sealNotes?: string;
}

const STORAGE_KEY = "hyperverse_seeker_profile";

export function saveSeekerProfile(profile: Partial<SeekerProfile>) {
  if (typeof window === "undefined") return;
  try {
    const prev = window.localStorage.getItem(STORAGE_KEY);
    const prevObj = prev ? JSON.parse(prev) : {};
    const merged = { ...prevObj, ...profile };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    // ignore storage errors for now
  }
}

export function loadSeekerProfile(): SeekerProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SeekerProfile;
  } catch (e) {
    return null;
  }
}

export default {
  saveSeekerProfile,
  loadSeekerProfile,
};
