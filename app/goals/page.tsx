'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import GoalCard from '@/components/features/GoalCard';
import Input from '@/components/ui/Input';
import { Goal } from '@/types/goals';
import goalsData from '@/data/goals.json';

export default function GoalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-textDark mb-4">
          Goal Library
        </h1>
        <p className="text-lg text-gray-600">
          Browse evidence-based ABA goals with detailed teaching procedures and parent-friendly tips.
        </p>
      </div>

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
                  : 'bg-white text-textDark border-2 border-gray-200 hover:border-primary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedGoals.length} {sortedGoals.length === 1 ? 'goal' : 'goals'}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Goals grid */}
      {sortedGoals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedGoals.map((goal: Goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">
            No goals found matching your criteria.
          </p>
          <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Help section */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold text-textDark mb-3">
          How to Use These Goals
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Click on any goal to see detailed teaching procedures</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Follow the step-by-step instructions with your child</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Use the parent tips for best practices</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">4.</span>
            <span>Track progress using the data collection suggestions</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
