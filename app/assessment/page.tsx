'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AssessmentQuestion from '@/components/features/AssessmentQuestion';
import ParentGoalsWizard from '@/components/features/ParentGoalsWizard';
import { saveAssessment, loadAssessment } from '@/lib/storage';
import { AssessmentResponses, QuestionsData } from '@/types/assessment';
import questionsData from '@/data/questions.json';

export default function AssessmentPage() {
  const router = useRouter();
  const [responses, setResponses] = useState<AssessmentResponses>({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [parentGoals, setParentGoals] = useState<{ selectedGoals: string[]; endGoal: string } | null>(null);

  const data = questionsData as QuestionsData;
  const currentCategory = data.categories[currentCategoryIndex];
  const currentQuestion = currentCategory?.questions[currentQuestionIndex];

  const totalQuestions = data.categories.reduce((sum, cat) => sum + cat.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  // Load saved responses and check if wizard was completed
  useEffect(() => {
    const saved = loadAssessment();
    if (saved) {
      setResponses(saved);
    }

    // Check if parent goals wizard was completed
    const savedGoals = localStorage.getItem('parent_goals');
    if (savedGoals) {
      setParentGoals(JSON.parse(savedGoals));
      setShowWizard(false);
    } else {
      // Show wizard on first visit
      setShowWizard(true);
    }

    setIsLoading(false);
  }, []);

  const handleWizardComplete = (goals: { selectedGoals: string[]; endGoal: string }) => {
    localStorage.setItem('parent_goals', JSON.stringify(goals));
    setParentGoals(goals);
    setShowWizard(false);
  };

  const handleWizardSkip = () => {
    setShowWizard(false);
  };

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
          <p className="text-lg dark:text-dark-text-primary">Loading assessment...</p>
        </div>
      </div>
    );
  }

  // Show wizard if not completed
  if (showWizard) {
    return <ParentGoalsWizard onComplete={handleWizardComplete} onSkip={handleWizardSkip} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-textDark dark:text-dark-text-primary mb-4">
          Skills Assessment
        </h1>
        <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
          Answer these questions about your child's current skills. This will help us recommend personalized goals and strategies.
        </p>
      </div>

      {/* Tips Section - AT TOP */}
      <Card className="mb-8 bg-gradient-to-r from-gradient-start to-gradient-mid dark:from-dark-surface dark:to-dark-card border-2 border-primary/20">
        <h2 className="text-xl font-bold text-textDark dark:text-dark-text-primary mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Before You Start - Important Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3 p-3 bg-warm-surface/50 dark:bg-dark-card/50 rounded-lg">
            <div className="flex-shrink-0 text-2xl">✓</div>
            <div>
              <h3 className="font-semibold text-textDark dark:text-dark-text-primary mb-1">No Wrong Answers</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Answer honestly - this helps us give you the best recommendations
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-warm-surface/50 dark:bg-dark-card/50 rounded-lg">
            <div className="flex-shrink-0 text-2xl">📅</div>
            <div>
              <h3 className="font-semibold text-textDark dark:text-dark-text-primary mb-1">Think Typical Days</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Not best days or worst days - what does your child usually do?
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-warm-surface/50 dark:bg-dark-card/50 rounded-lg">
            <div className="flex-shrink-0 text-2xl">🤷</div>
            <div>
              <h3 className="font-semibold text-textDark dark:text-dark-text-primary mb-1">Unsure? That's OK</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                If you're not sure, choose "I'm not sure" - that helps us too
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-warm-surface/50 dark:bg-dark-card/50 rounded-lg">
            <div className="flex-shrink-0 text-2xl">⏱️</div>
            <div>
              <h3 className="font-semibold text-textDark dark:text-dark-text-primary mb-1">Takes 5-10 Minutes</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Your progress is auto-saved - take breaks whenever you need
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Progress bar */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
            Progress: {answeredQuestions} of {totalQuestions} questions
          </span>
          <span className="text-sm font-medium text-primary dark:text-primary-light">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-warm-border dark:bg-dark-border rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

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
                  : 'bg-warm-subtle text-gray-600'
              }`}
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* Current category and question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentCategoryIndex}-${currentQuestionIndex}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary dark:text-primary-light mb-2">
                {currentCategory.name}
              </h2>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                {currentCategory.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-2">
                Question {currentQuestionIndex + 1} of {currentCategory.questions.length}
              </p>
            </div>

            <AssessmentQuestion
              questionText={currentQuestion.text}
              value={responses[currentQuestion.id] ?? null}
              onChange={handleAnswer}
            />
          </Card>
        </motion.div>
      </AnimatePresence>

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
      <motion.div
        className="mt-8 p-4 bg-warm-subtle dark:bg-blue-900/20 rounded-lg border border-warm-border dark:border-blue-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
          <strong>Tip:</strong> Answer based on what your child typically does, not what they can do with help.
          Your responses are saved automatically, so you can take breaks and come back later.
        </p>
      </motion.div>
    </div>
  );
}
