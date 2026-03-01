// Assessment-related types

export interface Question {
  id: string;
  text: string;
  category: string;
  relatedGoals: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface QuestionsData {
  categories: Category[];
}

export interface AssessmentResponses {
  [questionId: string]: number; // 1-5 scale
}

export interface CategoryScore {
  categoryId: string;
  categoryName: string;
  averageScore: number;
  questionCount: number;
}

export interface AssessmentResult {
  responses: AssessmentResponses;
  categoryScores: CategoryScore[];
  completedDate: string;
}
