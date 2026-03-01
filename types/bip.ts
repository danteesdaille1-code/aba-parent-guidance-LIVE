// Behavior Intervention Plan types

export interface BehaviorPlan {
  childName: string;
  dateCreated: string;
  targetBehaviors: string[];
  replacementBehaviors: string[];
  antecedentStrategies: string[];
  teachingStrategies: string[];
  consequenceStrategies: string[];
  dataCollection: string;
  notes: string;
}
