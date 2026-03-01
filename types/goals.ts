// Goal-related types

export interface TeachingStep {
  step: number;
  instruction: string;
  note?: string;
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
}

export interface GoalsData {
  goals: Goal[];
}
