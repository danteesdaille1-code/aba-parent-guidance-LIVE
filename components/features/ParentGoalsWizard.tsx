'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface ParentGoalsWizardProps {
  onComplete: (goals: { selectedGoals: string[]; endGoal: string }) => void;
  onSkip: () => void;
}

const commonGoals = [
  { id: 'communication', label: 'Communicate needs and wants', emoji: '💬' },
  { id: 'independence', label: 'Do things independently', emoji: '🎯' },
  { id: 'social', label: 'Play and interact with others', emoji: '👫' },
  { id: 'following_directions', label: 'Follow directions', emoji: '👂' },
  { id: 'self_care', label: 'Self-care skills (dressing, eating)', emoji: '👕' },
  { id: 'reduce_behaviors', label: 'Reduce challenging behaviors', emoji: '✋' },
  { id: 'emotional_regulation', label: 'Manage emotions', emoji: '😌' },
  { id: 'academic', label: 'Pre-academic/academic skills', emoji: '📚' },
  { id: 'motor_skills', label: 'Fine or gross motor skills', emoji: '✏️' },
  { id: 'waiting', label: 'Wait and take turns', emoji: '⏱️' },
];

const endGoalOptions = [
  { id: 'school_readiness', label: 'Prepare for school', emoji: '🏫', description: 'Get ready for classroom success' },
  { id: 'communication', label: 'Improve communication', emoji: '💬', description: 'Express needs and connect with others' },
  { id: 'reduce_behaviors', label: 'Reduce challenging behaviors', emoji: '✋', description: 'Decrease problem behaviors' },
  { id: 'independence', label: 'Increase independence', emoji: '🎯', description: 'Do more things on their own' },
  { id: 'social_skills', label: 'Build social skills', emoji: '👫', description: 'Make friends and interact better' },
  { id: 'daily_living', label: 'Daily living skills', emoji: '🏠', description: 'Self-care and household routines' },
];

export default function ParentGoalsWizard({ onComplete, onSkip }: ParentGoalsWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [endGoal, setEndGoal] = useState<string>('');

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete({ selectedGoals, endGoal });
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-textDark dark:text-dark-text-primary mb-4">
                Let's Start with Your Goals
              </h1>
              <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
                What would you like your child to work on? Select all that apply.
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-text-muted mt-2">
                This helps us personalize your recommendations
              </p>
            </div>

            <Card className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {commonGoals.map((goal) => {
                  const isSelected = selectedGoals.includes(goal.id);

                  return (
                    <motion.button
                      key={goal.id}
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-primary dark:border-primary-light bg-primary/10 dark:bg-primary-light/10 shadow-md'
                          : 'border-gray-200 dark:border-dark-border bg-warm-surface dark:bg-dark-card hover:border-primary/50 dark:hover:border-primary-light/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{goal.emoji}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-textDark dark:text-dark-text-primary">
                            {goal.label}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-primary dark:bg-primary-light border-primary dark:border-primary-light'
                            : 'border-gray-300 dark:border-dark-border'
                        }`}>
                          {isSelected && (
                            <svg className="w-4 h-4 text-white dark:text-textDark" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>

            <div className="flex justify-between gap-4">
              <Button variant="outline" onClick={onSkip}>
                Skip This Step
              </Button>
              <Button
                onClick={handleContinue}
                disabled={selectedGoals.length === 0}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-textDark dark:text-dark-text-primary mb-4">
                What's Your Main Priority?
              </h1>
              <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
                If you had to pick one primary goal, what would it be?
              </p>
            </div>

            <Card className="mb-8">
              <div className="grid grid-cols-1 gap-3">
                {endGoalOptions.map((option) => {
                  const isSelected = endGoal === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      type="button"
                      onClick={() => setEndGoal(option.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-primary dark:border-primary-light bg-primary/10 dark:bg-primary-light/10 shadow-md'
                          : 'border-gray-200 dark:border-dark-border bg-warm-surface dark:bg-dark-card hover:border-primary/50 dark:hover:border-primary-light/50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{option.emoji}</span>
                        <div className="flex-1">
                          <p className="font-bold text-lg text-textDark dark:text-dark-text-primary mb-1">
                            {option.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                            {option.description}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-primary dark:bg-primary-light border-primary dark:border-primary-light'
                            : 'border-gray-300 dark:border-dark-border'
                        }`}>
                          {isSelected && (
                            <svg className="w-4 h-4 text-white dark:text-textDark" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>

            <div className="flex justify-between gap-4">
              <Button variant="outline" onClick={handleBack}>
                ← Back
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!endGoal}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                Start Assessment →
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
