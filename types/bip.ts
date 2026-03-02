// Behavior Intervention Plan types

export interface BehaviorSelection {
  id: string;
  customNote?: string;
  function?: 'attention' | 'escape' | 'sensory' | 'tangible';
}

export interface BehaviorFunction {
  function: 'attention' | 'escape' | 'sensory' | 'tangible';
  confidence: 'high' | 'medium' | 'low';
  notes?: string;
}

export interface StrategySelection {
  id: string;
  customNote?: string;
}

export interface BehaviorPlan {
  childName: string;
  dateCreated: string;
  dateOfBirth: string;  // NEW FIELD
  version: string;  // Update to 'v4'

  // Optional - collected but hidden from PDF
  parentGoals: string[];
  endGoal: string;
  dataCollection: string;

  // CHANGED: Single behavior
  targetBehavior: BehaviorSelection | null;

  // CHANGED: Simple checkbox structure
  behaviorFunctions: {
    attention: boolean;
    escape: boolean;
    sensory: boolean;
    tangible: boolean;
  };

  // NEW fields
  settingEvent: string;
  precursor: string;
  restrictions: string;
  reinforcers: string;

  // Existing multi-select
  replacementBehaviors: BehaviorSelection[];
  antecedentStrategies: StrategySelection[];
  teachingStrategies: StrategySelection[];
  consequenceStrategies: StrategySelection[];

  notes: string;
}

// BIP Options Data Types
export interface BehaviorOption {
  id: string;
  label: string;
  description: string;
  category: string;
  seekProfessionalHelp: boolean;
  educationalNote: string;
}

export interface StrategyOption {
  id: string;
  label: string;
  description: string;
  category: string;
  warning?: string;
  educationalNote: string;
}

export interface ReplacementBehaviorOption {
  id: string;
  label: string;
  description: string;
  category: 'communication' | 'coping' | 'social' | 'sensory';
  educationalNote: string;
}

export interface SettingEventOption {
  id: string;
  label: string;
  description: string;
  examples: string[];
}

export interface PrecursorOption {
  id: string;
  label: string;
  description: string;
  examples: string[];
}

export interface BIPOptions {
  targetBehaviors: BehaviorOption[];
  replacementBehaviors: ReplacementBehaviorOption[];
  antecedentStrategies: StrategyOption[];
  teachingStrategies: StrategyOption[];
  consequenceStrategies: StrategyOption[];
  settingEvents: SettingEventOption[];
  precursors: PrecursorOption[];

  recommendations: {
    behaviorToStrategies: {
      [behaviorId: string]: {
        antecedent: string[];
        teaching: string[];
        consequence: string[];
      };
    };
    behaviorToReplacements: {
      [behaviorId: string]: string[];
    };
  };
}
