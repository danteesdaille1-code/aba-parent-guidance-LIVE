import { AssessmentResponses, Question, CategoryScore } from '@/types/assessment';
import { Goal } from '@/types/goals';

/**
 * Calculate average scores for each category
 */
export function calculateCategoryScores(
  responses: AssessmentResponses,
  questions: Question[]
): CategoryScore[] {
  // Group questions by category
  const categoriesMap = new Map<string, { name: string; scores: number[] }>();

  questions.forEach(question => {
    const score = responses[question.id];
    // Only include actual ratings (exclude 0 = "I'm not sure")
    if (score !== undefined && score > 0) {
      if (!categoriesMap.has(question.category)) {
        categoriesMap.set(question.category, {
          name: getCategoryName(question.category),
          scores: []
        });
      }
      categoriesMap.get(question.category)!.scores.push(score);
    }
  });

  // Calculate averages
  const categoryScores: CategoryScore[] = [];
  categoriesMap.forEach((data, categoryId) => {
    // Skip categories with no actual ratings (all "I'm not sure")
    if (data.scores.length === 0) return;

    const sum = data.scores.reduce((a, b) => a + b, 0);
    const average = sum / data.scores.length;
    categoryScores.push({
      categoryId,
      categoryName: data.name,
      averageScore: Math.round(average * 10) / 10, // Round to 1 decimal
      questionCount: data.scores.length
    });
  });

  // Sort by average score (lowest first - these need the most help)
  return categoryScores.sort((a, b) => a.averageScore - b.averageScore);
}

/**
 * Get category name from category ID
 */
function getCategoryName(categoryId: string): string {
  const names: { [key: string]: string } = {
    communication: 'Communication',
    social: 'Social Skills',
    daily_living: 'Daily Living',
    behavior: 'Behavior'
  };
  return names[categoryId] || categoryId;
}

/**
 * Recommend goals based on assessment responses
 * Prioritizes goals related to low-scoring questions
 */
export function recommendGoals(
  responses: AssessmentResponses,
  questions: Question[],
  goals: Goal[]
): Goal[] {
  // Find questions with low scores (1-2 on the scale)
  // 5 = Always/Most of the time (doing well)
  // 4 = Sometimes
  // 3 = Rarely
  // 2 = Never/Not yet (needs work)
  // 1 = I'm not sure

  const lowScoringQuestions = questions.filter(q => {
    const score = responses[q.id];
    // Exclude "I'm not sure" (0) and focus on actual low scores (1-3)
    return score !== undefined && score > 0 && score <= 3;
  });

  // Collect related goal IDs
  const goalIdCounts = new Map<string, number>();
  lowScoringQuestions.forEach(question => {
    question.relatedGoals.forEach(goalId => {
      goalIdCounts.set(goalId, (goalIdCounts.get(goalId) || 0) + 1);
    });
  });

  // Get goals and sort by:
  // 1. How many low-scoring questions they address (more = higher priority)
  // 2. Goal priority (high > medium > low)
  // 3. Category order based on average scores

  const categoryScores = calculateCategoryScores(responses, questions);
  const categoryPriority = new Map(
    categoryScores.map((cat, index) => [cat.categoryId, index])
  );

  const recommendedGoals = goals
    .filter(goal => goalIdCounts.has(goal.id))
    .map(goal => ({
      goal,
      relevanceScore: goalIdCounts.get(goal.id) || 0,
      priorityScore: goal.priority === 'high' ? 3 : goal.priority === 'medium' ? 2 : 1,
      categoryScore: categoryPriority.get(goal.category) !== undefined
        ? categoryScores.length - categoryPriority.get(goal.category)!
        : 0
    }))
    .sort((a, b) => {
      // First sort by relevance (how many low-scoring questions this addresses)
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      // Then by category need (based on average scores)
      if (b.categoryScore !== a.categoryScore) {
        return b.categoryScore - a.categoryScore;
      }
      // Finally by goal priority
      return b.priorityScore - a.priorityScore;
    })
    .map(item => item.goal);

  // Return top 5-8 goals
  return recommendedGoals.slice(0, 8);
}

/**
 * Get priority areas based on category scores
 * Returns categories that need the most support
 */
export function getPriorityAreas(categoryScores: CategoryScore[]): CategoryScore[] {
  // Return categories with average score below 3.5 (areas needing support)
  return categoryScores.filter(cat => cat.averageScore < 3.5);
}

/**
 * Get a descriptive message for a category score
 */
export function getCategoryScoreDescription(score: number): {
  level: 'strong' | 'developing' | 'emerging' | 'priority';
  description: string;
  color: string;
} {
  if (score >= 4) {
    return {
      level: 'strong',
      description: 'Strong skills in this area',
      color: 'text-green-600'
    };
  } else if (score >= 3) {
    return {
      level: 'developing',
      description: 'Skills are developing',
      color: 'text-blue-600'
    };
  } else if (score >= 2) {
    return {
      level: 'emerging',
      description: 'Emerging skills - good area to focus on',
      color: 'text-yellow-600'
    };
  } else {
    return {
      level: 'priority',
      description: 'Priority area for intervention',
      color: 'text-red-600'
    };
  }
}
