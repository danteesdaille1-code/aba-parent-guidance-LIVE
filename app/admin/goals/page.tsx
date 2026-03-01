'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';

export default function AdminGoalsPage() {
  const [goalsData, setGoalsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const response = await fetch('/api/goals');
      const data = await response.json();
      setGoalsData(data);
    } catch (error) {
      setMessage('Error loading goals');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goalsData)
      });

      const result = await response.json();
      if (result.success) {
        setMessage('✅ Goals saved successfully!');
      } else {
        setMessage('❌ ' + result.message);
      }
    } catch (error) {
      setMessage('❌ Error saving goals');
    } finally {
      setSaving(false);
    }
  };

  const updateGoal = (goalIndex: number, field: string, value: any) => {
    const updated = { ...goalsData };
    updated.goals[goalIndex][field] = value;
    setGoalsData(updated);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-center text-lg">Loading goals...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <Link href="/admin">
          <Button variant="outline" size="sm" className="mb-4">
            ← Back to Dashboard
          </Button>
        </Link>

        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-textDark mb-2">
              Edit Goal Library
            </h1>
            <p className="text-gray-600">
              Manage goals and teaching procedures
            </p>
          </div>

          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? 'Saving...' : '💾 Save Changes'}
          </Button>
        </div>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {goalsData?.goals.map((goal: any, goalIndex: number) => (
          <Card key={goal.id} className="cursor-pointer" onClick={() => setExpandedGoal(expandedGoal === goal.id ? null : goal.id)}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-textDark mb-2">
                  {goal.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {goal.category} • {goal.priority} priority • ID: {goal.id}
                </p>
              </div>
              <span className="text-2xl">
                {expandedGoal === goal.id ? '▼' : '▶'}
              </span>
            </div>

            {expandedGoal === goal.id && (
              <div className="mt-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                <Input
                  label="Title"
                  value={goal.title}
                  onChange={(e) => updateGoal(goalIndex, 'title', e.target.value)}
                />

                <Textarea
                  label="Description"
                  value={goal.description}
                  onChange={(e) => updateGoal(goalIndex, 'description', e.target.value)}
                />

                <Textarea
                  label="Target Behavior"
                  value={goal.targetBehavior}
                  onChange={(e) => updateGoal(goalIndex, 'targetBehavior', e.target.value)}
                  rows={2}
                />

                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={goal.priority}
                    onChange={(e) => updateGoal(goalIndex, 'priority', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Teaching Procedures: {goal.teachingProcedures.length}</p>
                  <p className="font-medium mb-1">Parent Tips: {goal.parentTips.length}</p>
                  <p className="font-medium mb-1">Materials: {goal.materials.length}</p>
                  <p className="text-xs italic mt-2">
                    For advanced editing (teaching steps, tips, materials), edit the JSON file directly
                  </p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? 'Saving...' : '💾 Save All Changes'}
        </Button>
      </div>
    </div>
  );
}
