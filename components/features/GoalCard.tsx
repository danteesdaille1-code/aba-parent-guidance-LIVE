'use client';

import { Goal } from '@/types/goals';
import Card from '@/components/ui/Card';
import Link from 'next/link';

interface GoalCardProps {
  goal: Goal;
  showCategory?: boolean;
}

export default function GoalCard({ goal, showCategory = true }: GoalCardProps) {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300'
  };

  const categoryColors: { [key: string]: string } = {
    communication: 'bg-blue-100 text-blue-800',
    social: 'bg-purple-100 text-purple-800',
    daily_living: 'bg-green-100 text-green-800',
    behavior: 'bg-orange-100 text-orange-800'
  };

  const categoryNames: { [key: string]: string } = {
    communication: 'Communication',
    social: 'Social Skills',
    daily_living: 'Daily Living',
    behavior: 'Behavior'
  };

  return (
    <Link href={`/goals/${goal.id}`}>
      <Card hover className="h-full">
        <div className="flex flex-col h-full">
          <div className="flex gap-2 mb-3 flex-wrap">
            {showCategory && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[goal.category]}`}>
                {categoryNames[goal.category]}
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[goal.priority]}`}>
              {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
            </span>
          </div>

          <h3 className="text-xl font-bold text-textDark mb-2">
            {goal.title}
          </h3>

          <p className="text-gray-600 mb-4 flex-1">
            {goal.description}
          </p>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {goal.teachingProcedures.length} teaching steps • {goal.parentTips.length} parent tips
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
