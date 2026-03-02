// Goal-related types

export interface TeachingStep {
  step: number;
  instruction: string;
  note?: string;
  imageUrl?: string;  // NEW: Step-by-step image
  videoUrl?: string;  // NEW: Step-by-step video
}

export interface Goal {
  id: string;
  category: string;
  title: string;
  description: string;
  targetBehavior: string;
  teachingProcedures: TeachingStep[];
  promptLevels: string[];
  dataTips: string[];
  parentTips: string[];
  materials: string[];
  priority: 'high' | 'medium' | 'low';

  // NEW: Media fields
  videoGuideUrl?: string;  // Overview video for the goal
  thumbnailUrl?: string;   // Thumbnail for goal card
}

export interface GoalsData {
  goals: Goal[];
}
