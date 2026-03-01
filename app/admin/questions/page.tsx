'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function AdminQuestionsPage() {
  const [questionsData, setQuestionsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      const data = await response.json();
      setQuestionsData(data);
    } catch (error) {
      setMessage('Error loading questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionsData)
      });

      const result = await response.json();
      if (result.success) {
        setMessage('✅ Questions saved successfully!');
      } else {
        setMessage('❌ ' + result.message);
      }
    } catch (error) {
      setMessage('❌ Error saving questions');
    } finally {
      setSaving(false);
    }
  };

  const updateQuestion = (categoryIndex: number, questionIndex: number, field: string, value: string) => {
    const updated = { ...questionsData };
    updated.categories[categoryIndex].questions[questionIndex][field] = value;
    setQuestionsData(updated);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-center text-lg">Loading questions...</p>
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
              Edit Assessment Questions
            </h1>
            <p className="text-gray-600">
              Modify questions for each skill category
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

      <div className="space-y-8">
        {questionsData?.categories.map((category: any, catIndex: number) => (
          <Card key={category.id}>
            <h2 className="text-2xl font-bold text-primary mb-4">
              {category.name}
            </h2>
            <p className="text-gray-600 mb-6">{category.description}</p>

            <div className="space-y-6">
              {category.questions.map((question: any, qIndex: number) => (
                <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-2">
                      Question {qIndex + 1} (ID: {question.id})
                    </label>
                    <Input
                      value={question.text}
                      onChange={(e) => updateQuestion(catIndex, qIndex, 'text', e.target.value)}
                      placeholder="Question text"
                    />
                  </div>
                  <div className="text-xs text-gray-500">
                    Related Goals: {question.relatedGoals.join(', ')}
                  </div>
                </div>
              ))}
            </div>
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
