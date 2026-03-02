'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import GoalCard from '@/components/features/GoalCard';
import Input from '@/components/ui/Input';
import { Goal } from '@/types/goals';
import goalsData from '@/data/goals.json';

export default function GoalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasAssessment, setHasAssessment] = useState(false);

  // Check if user completed assessment
  useEffect(() => {
    const assessment = localStorage.getItem('assessment_responses');
    setHasAssessment(!!assessment);
  }, []);

  const categories = [
    { id: 'all', name: 'All Goals' },
    { id: 'communication', name: 'Communication' },
    { id: 'social', name: 'Social Skills' },
    { id: 'daily_living', name: 'Daily Living' },
    { id: 'behavior', name: 'Behavior' }
  ];

  // Filter goals
  const filteredGoals = (goalsData.goals as Goal[]).filter((goal) => {
    const matchesCategory = selectedCategory === 'all' || goal.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort by priority
  const sortedGoals = [...filteredGoals].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-textDark dark:text-dark-text-primary mb-4">
          Goal Library
        </h1>
        <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
          Browse evidence-based ABA goals with detailed teaching procedures and parent-friendly tips.
        </p>
      </motion.div>

      {/* How to Use Section - MOVED TO TOP */}
      <Card className="mb-8 bg-gradient-to-r from-gradient-start/30 to-gradient-mid/30 dark:from-dark-surface dark:to-dark-card border-2 border-primary/20">
        <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-4 flex items-center gap-2">
          <span className="text-3xl">⭐</span>
          How to Use These Goals
        </h2>

        {hasAssessment && (
          <div className="mb-4 p-3 bg-primary/10 dark:bg-primary-light/10 rounded-lg border-l-4 border-primary dark:border-primary-light">
            <p className="text-sm font-semibold text-primary dark:text-primary-light">
              💡 These goals are prioritized based on your assessment responses
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center text-white dark:text-textDark font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-textDark dark:text-dark-text-primary">Click on any goal</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                See detailed teaching procedures and step-by-step instructions
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center text-white dark:text-textDark font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-textDark dark:text-dark-text-primary">Follow the steps</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Practice with your child using the specific procedures provided
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center text-white dark:text-textDark font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-textDark dark:text-dark-text-primary">Use parent tips</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Apply best practices and common troubleshooting advice
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center text-white dark:text-textDark font-bold">
              4
            </div>
            <div>
              <h3 className="font-semibold text-textDark dark:text-dark-text-primary">Track progress</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Use the data collection suggestions to monitor improvements
              </p>
            </div>
          </div>
        </div>

        {!hasAssessment && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <p className="text-sm text-yellow-900 dark:text-yellow-200">
              <strong>💡 Tip:</strong> Take the <a href="/assessment" className="underline font-semibold">Skills Assessment</a> to get personalized goal recommendations based on your child's needs.
            </p>
          </div>
        )}
      </Card>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search goals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="flex gap-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-warm-surface text-textDark border-2 border-gray-200 hover:border-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600 dark:text-dark-text-secondary">
          Showing {sortedGoals.length} {sortedGoals.length === 1 ? 'goal' : 'goals'}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* Priority legend */}
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-gray-600 dark:text-dark-text-muted">High Priority</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="text-gray-600 dark:text-dark-text-muted">Medium</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-gray-600 dark:text-dark-text-muted">Low</span>
          </span>
        </div>
      </div>

      {/* Goals grid */}
      {sortedGoals.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {sortedGoals.map((goal: Goal, index) => (
            <motion.div
              key={goal.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <GoalCard goal={goal} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-dark-text-secondary mb-4">
            No goals found matching your criteria.
          </p>
          <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
