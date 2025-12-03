// File: src/types/hyperverse_types.ts

// The 6 "Clean Vessels" Attributes
export type AttributeKey = 
  | 'resonance' 
  | 'integrity' 
  | 'resilience' 
  | 'momentum' 
  | 'focus' 
  | 'clarity';

export interface AttributeData {
  label: string;
  value: number; // 0-100
  max_value: number;
  visual_mapping: {
    property: string;
    description: string;
    min_value?: number;
    max_value?: number;
    min_hex?: string;
    max_hex?: string;
  };
}

// The Seeker's Stone Object
export interface SeekerStone {
  owner_handle: string;
  creation_timestamp: string;
  core_attributes: Record<AttributeKey, AttributeData>;
  inventory: {
    active_artifacts: string[];
    stored_artifacts: string[];
  };
}

// Quest Structure
export interface QuestStage {
  stage_id: number;
  type: 'initiation' | 'verification' | 'action';
  ui_message?: string;
  environment_state?: string; // Triggers UI theme change (e.g., 'desert_scorched')
  mechanism?: 'integrity_lock' | 'sensor_check';
  choices?: QuestChoice[];
}

export interface QuestChoice {
  id: string;
  label: string;
  outcome_text: string;
  integrity_reward?: number;
  attribute_reward?: number;
  reset_timer?: boolean;
}

export interface Quest {
  quest_id: string;
  title: string;
  target_attribute: AttributeKey;
  stages: QuestStage[];
  rewards: {
    artifact?: {
      id: string;
      name: string;
      description: string;
    };
    lore_unlock?: string;
  };
}