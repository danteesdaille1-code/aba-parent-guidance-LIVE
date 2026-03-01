import { notFound } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Goal } from '@/types/goals';
import goalsData from '@/data/goals.json';

interface GoalPageProps {
  params: Promise<{ id: string }>;
}

export default async function GoalPage({ params }: GoalPageProps) {
  const { id } = await params;
  const goal = (goalsData.goals as Goal[]).find((g) => g.id === id);

  if (!goal) {
    notFound();
  }

  const categoryNames: { [key: string]: string } = {
    communication: 'Communication',
    social: 'Social Skills',
    daily_living: 'Daily Living',
    behavior: 'Behavior'
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/goals">
          <Button variant="outline" size="sm">
            ← Back to Goals
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
            {categoryNames[goal.category]}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[goal.priority]}`}>
            {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)} Priority
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-textDark mb-4">
          {goal.title}
        </h1>
        <p className="text-xl text-gray-600">
          {goal.description}
        </p>
      </div>

      {/* Target Behavior */}
      <Card className="mb-6 bg-blue-50 border-2 border-primary">
        <h2 className="text-xl font-bold text-textDark mb-2">
          🎯 Target Behavior
        </h2>
        <p className="text-lg text-gray-700">
          {goal.targetBehavior}
        </p>
      </Card>

      {/* Teaching Procedures */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-textDark mb-4">
          Teaching Procedures
        </h2>
        <div className="space-y-4">
          {goal.teachingProcedures.map((step) => (
            <Card key={step.step}>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-textDark mb-2">
                    {step.instruction}
                  </p>
                  {step.note && (
                    <p className="text-sm text-gray-600 italic">
                      💡 {step.note}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Prompt Levels */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-textDark mb-4">
          Prompt Hierarchy
        </h2>
        <Card>
          <p className="text-gray-600 mb-4">
            Use these prompts from least to most intrusive. Always start with the least amount of help:
          </p>
          <ol className="space-y-2">
            {goal.promptLevels.map((level, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="font-bold text-primary">{index + 1}.</span>
                <span className="text-gray-700">{level}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-700">
              <Link href="/prompts" className="text-primary hover:underline font-medium">
                Learn more about the ABA prompt hierarchy →
              </Link>
            </p>
          </div>
        </Card>
      </div>

      {/* Parent Tips */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-textDark mb-4">
          Parent Tips
        </h2>
        <Card className="bg-success bg-opacity-10">
          <ul className="space-y-3">
            {goal.parentTips.map((tip, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="text-success text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Data Collection Tips */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-textDark mb-4">
          Data Collection
        </h2>
        <Card>
          <p className="text-gray-600 mb-4">
            Track your child's progress to see what's working:
          </p>
          <ul className="space-y-2">
            {goal.dataTips.map((tip, index) => (
              <li key={index} className="flex gap-3 items-start">
                <span className="text-primary">📊</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Materials Needed */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-textDark mb-4">
          Materials Needed
        </h2>
        <Card>
          <div className="flex flex-wrap gap-2">
            {goal.materials.map((material, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 border border-gray-300"
              >
                {material}
              </span>
            ))}
          </div>
        </Card>
      </div>

      {/* Related Resources */}
      <div className="p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold text-textDark mb-4">
          Next Steps
        </h2>
        <div className="flex gap-4 flex-wrap">
          <Link href="/assessment">
            <Button variant="outline">
              Take Assessment
            </Button>
          </Link>
          <Link href="/bip">
            <Button variant="outline">
              Create Behavior Plan
            </Button>
          </Link>
          <Link href="/goals">
            <Button variant="outline">
              Browse More Goals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
