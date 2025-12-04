// File: src/types/audio_types.ts

import { AttributeKey } from './hyperverse_types';

export interface AudioTrack {
  id: string;
  title: string;
  file_path: string;
  duration: number; // in seconds
  is_locked: boolean;
  unlock_condition?: string; // e.g., "quest_001_complete"
}

export interface RadioStation {
  station_id: string;
  label: string;
  target_attribute: AttributeKey; // Links directly to the Seeker's Stone stats
  description: string;
  bpm_range: [number, number]; // Min/Max BPM
  visual_theme: string; // Triggers UI changes (e.g., 'desert_scorched')
  tracks: AudioTrack[];
}

export interface AudioPlayerState {
  is_playing: boolean;
  current_station_id: string | null;
  current_track: AudioTrack | null;
  volume: number;
  // The 'Entrainment Factor' - bonus XP earned while listening
  active_bonus_multiplier: number; 
}