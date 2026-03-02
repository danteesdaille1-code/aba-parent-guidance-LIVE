'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GoalCard from '@/components/features/GoalCard';
import { loadAssessment, getAssessmentDate, clearAssessment } from '@/lib/storage';
import {
  calculateCategoryScores,
  recommendGoals,
  getPriorityAreas,
  getCategoryScoreDescription
} from '@/lib/recommendations';
import { AssessmentResponses, CategoryScore } from '@/types/assessment';
import { Goal } from '@/types/goals';
import questionsData from '@/data/questions.json';
import goalsData from '@/data/goals.json';

export default function ResultsPage() {
  const router = useRouter();
  const [responses, setResponses] = useState<AssessmentResponses | null>(null);
  const [categoryScores, setCategoryScores] = useState<CategoryScore[]>([]);
  const [recommendedGoals, setRecommendedGoals] = useState<Goal[]>([]);
  const [assessmentDate, setAssessmentDate] = useState<string>('');

  useEffect(() => {
    const savedResponses = loadAssessment();
    if (!savedResponses) {
      router.push('/assessment');
      return;
    }

    setResponses(savedResponses);

    // Get all questions
    const allQuestions = questionsData.categories.flatMap(cat => cat.questions);

    // Calculate scores
    const scores = calculateCategoryScores(savedResponses, allQuestions);
    setCategoryScores(scores);

    // Get recommendations
    const goals = recommendGoals(savedResponses, allQuestions, goalsData.goals as Goal[]);
    setRecommendedGoals(goals);

    // Get date
    const date = getAssessmentDate();
    if (date) {
      setAssessmentDate(new Date(date).toLocaleDateString());
    }
  }, [router]);

  const handleRetakeAssessment = () => {
    if (confirm('Are you sure you want to retake the assessment? This will clear your current responses.')) {
      clearAssessment();
      router.push('/assessment');
    }
  };

  if (!responses) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading results...</p>
        </div>
      </div>
    );
  }

  const priorityAreas = getPriorityAreas(categoryScores);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-textDark mb-2">
              Your Assessment Results
            </h1>
            {assessmentDate && (
              <p className="text-gray-600">Completed on {assessmentDate}</p>
            )}
          </div>
          <Button variant="outline" onClick={handleRetakeAssessment}>
            Retake Assessment
          </Button>
        </div>
        <p className="text-lg text-gray-600">
          Based on your responses, here are personalized recommendations for supporting your child's development.
        </p>
      </div>

      {/* Category Scores */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-textDark mb-6">Skills Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryScores.map(category => {
            const scoreInfo = getCategoryScoreDescription(category.averageScore);
            return (
              <Card key={category.categoryId}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-textDark">
                    {category.categoryName}
                  </h3>
                  <span className="text-2xl font-bold text-primary">
                    {category.averageScore.toFixed(1)}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="w-full bg-warm-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(category.averageScore / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <p className={`text-sm font-medium ${scoreInfo.color}`}>
                  {scoreInfo.description}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Based on {category.questionCount} questions
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Priority Areas */}
      {priorityAreas.length > 0 && (
        <div className="mb-12">
          <Card className="bg-warm-subtle border-2 border-primary">
            <h2 className="text-2xl font-bold text-textDark mb-4">
              🎯 Priority Areas
            </h2>
            <p className="text-gray-700 mb-4">
              Based on your assessment, these areas would benefit most from focused support:
            </p>
            <div className="flex flex-wrap gap-3">
              {priorityAreas.map(area => (
                <span
                  key={area.categoryId}
                  className="px-4 py-2 bg-warm-surface rounded-lg font-medium text-textDark border-2 border-primary"
                >
                  {area.categoryName}
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Recommended Goals */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-textDark mb-2">
            Recommended Goals for Your Child
          </h2>
          <p className="text-gray-600">
            These goals are tailored to address the areas where your child would benefit from additional support.
            Click any goal to see detailed teaching procedures and tips.
          </p>
        </div>

        {recommendedGoals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedGoals.map(goal => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-center text-gray-600">
              Great job! Your child is showing strong skills across all areas.
              Browse the full goal library to continue supporting their development.
            </p>
            <div className="text-center mt-4">
              <Link href="/goals">
                <Button>Browse All Goals</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>

      {/* Next Steps */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-textDark mb-6">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-lg font-bold mb-2">Explore Goal Details</h3>
            <p className="text-gray-600 text-sm mb-4">
              Click on any goal above to see step-by-step teaching procedures and parent tips.
            </p>
          </Card>

          <Card>
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold mb-2">Create a Behavior Plan</h3>
            <p className="text-gray-600 text-sm mb-4">
              Use our BIP generator to create a printable behavior intervention plan.
            </p>
            <Link href="/bip">
              <Button variant="outline" size="sm">
                Create BIP
              </Button>
            </Link>
          </Card>

          <Card>
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-bold mb-2">Learn About Prompts</h3>
            <p className="text-gray-600 text-sm mb-4">
              Understand the ABA prompt hierarchy to effectively teach new skills.
            </p>
            <Link href="/prompts">
              <Button variant="outline" size="sm">
                View Guide
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
