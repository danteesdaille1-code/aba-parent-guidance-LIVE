'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AssessmentQuestion from '@/components/features/AssessmentQuestion';
import { saveAssessment, loadAssessment } from '@/lib/storage';
import { AssessmentResponses, QuestionsData } from '@/types/assessment';
import questionsData from '@/data/questions.json';

export default function AssessmentPage() {
  const router = useRouter();
  const [responses, setResponses] = useState<AssessmentResponses>({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const data = questionsData as QuestionsData;
  const currentCategory = data.categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  const totalQuestions = data.categories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  // Load saved responses on mount
  useEffect(() => {
    const saved = loadAssessment();
    if (saved) {
      setResponses(saved);
    }
    setIsLoading(false);
  }, []);

  // Auto-save responses
  useEffect(() => {
    if (!isLoading && Object.keys(responses).length > 0) {
      saveAssessment(responses);
    }
  }, [responses, isLoading]);

  const handleAnswer = (value: number) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const goToNext = () => {
    if (currentQuestionIndex < currentCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < data.categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
      const prevCategory = data.categories[currentCategoryIndex - 1];
      setCurrentQuestionIndex(prevCategory.questions.length - 1);
    }
  };

  const handleSubmit = () => {
    saveAssessment(responses);
    router.push('/assessment/results');
  };

  const isLastQuestion =
    currentCategoryIndex === data.categories.length - 1 &&
    currentQuestionIndex === currentCategory.questions.length - 1;

  const canGoNext = responses[currentQuestion?.id] !== undefined;
  const canGoBack = currentCategoryIndex > 0 || currentQuestionIndex > 0;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-lg">Loading assessment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-textDark mb-4">
          Skills Assessment
        </h1>
        <p className="text-lg text-gray-600">
          Answer these questions about your child's current skills. This will help us recommend personalized goals and strategies.
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progress: {answeredQuestions} of {totalQuestions} questions
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Category indicator */}
      <div className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((cat, index) => (
            <span
              key={cat.id}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                index === currentCategoryIndex
                  ? 'bg-primary text-white'
                  : index < currentCategoryIndex
                  ? 'bg-success text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Current category and question */}
      <Card className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            {currentCategory.name}
          </h2>
          <p className="text-gray-600">
            {currentCategory.description}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Question {currentQuestionIndex + 1} of {currentCategory.questions.length}
          </p>
        </div>

        <AssessmentQuestion
          questionText={currentQuestion.text}
          value={responses[currentQuestion.id] ?? null}
          onChange={handleAnswer}
        />
      </Card>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={goToPrevious}
          disabled={!canGoBack}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!canGoNext}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            See My Results →
          </Button>
        ) : (
          <Button
            onClick={goToNext}
            disabled={!canGoNext}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </Button>
        )}
      </div>

      {/* Help text */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Tip:</strong> Answer based on what your child typically does, not what they can do with help.
          Your responses are saved automatically, so you can take breaks and come back later.
        </p>
      </div>
    </div>
  );
}
