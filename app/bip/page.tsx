'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import BIPTemplate from '@/components/features/BIPTemplate';
import { loadAssessment, loadBIP, saveBIP } from '@/lib/storage';
import { BehaviorPlan } from '@/types/bip';
import { Goal } from '@/types/goals';
import { recommendGoals } from '@/lib/recommendations';
import questionsData from '@/data/questions.json';
import goalsData from '@/data/goals.json';

export default function BIPPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [plan, setPlan] = useState<BehaviorPlan>({
    childName: '',
    dateCreated: new Date().toLocaleDateString(),
    targetBehaviors: [''],
    replacementBehaviors: [''],
    antecedentStrategies: [''],
    teachingStrategies: [''],
    consequenceStrategies: [''],
    dataCollection: '',
    notes: ''
  });

  // Load saved BIP or generate from assessment
  useEffect(() => {
    const savedBIP = loadBIP();
    if (savedBIP) {
      setPlan(savedBIP);
      return;
    }

    // Try to pre-fill from assessment
    const assessmentResponses = loadAssessment();
    if (assessmentResponses) {
      const allQuestions = questionsData.categories.flatMap(cat => cat.questions);
      const recommended = recommendGoals(assessmentResponses, allQuestions, goalsData.goals as Goal[]);

      // Extract replacement behaviors from recommended goals
      const replacementBehaviors = recommended.slice(0, 3).map(goal => goal.targetBehavior);

      // Extract teaching strategies from recommended goals
      const teachingStrategies = recommended.slice(0, 2).flatMap(goal =>
        goal.teachingProcedures.slice(0, 2).map(step => step.instruction)
      );

      setPlan(prev => ({
        ...prev,
        replacementBehaviors: replacementBehaviors.length > 0 ? replacementBehaviors : [''],
        teachingStrategies: teachingStrategies.length > 0 ? teachingStrategies : ['']
      }));
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (plan.childName || plan.targetBehaviors[0] || plan.replacementBehaviors[0]) {
      saveBIP(plan);
    }
  }, [plan]);

  const handlePrint = () => {
    window.print();
  };

  const addItem = (field: keyof BehaviorPlan) => {
    if (Array.isArray(plan[field])) {
      setPlan(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), '']
      }));
    }
  };

  const removeItem = (field: keyof BehaviorPlan, index: number) => {
    if (Array.isArray(plan[field])) {
      const items = [...(plan[field] as string[])];
      items.splice(index, 1);
      setPlan(prev => ({
        ...prev,
        [field]: items.length > 0 ? items : ['']
      }));
    }
  };

  const updateItem = (field: keyof BehaviorPlan, index: number, value: string) => {
    if (Array.isArray(plan[field])) {
      const items = [...(plan[field] as string[])];
      items[index] = value;
      setPlan(prev => ({
        ...prev,
        [field]: items
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8 no-print">
        <h1 className="text-3xl sm:text-4xl font-bold text-textDark mb-4">
          Behavior Intervention Plan (BIP) Generator
        </h1>
        <p className="text-lg text-gray-600">
          Create a printable behavior plan to support your child at home and share with caregivers.
        </p>
      </div>

      {showPreview ? (
        // Print Preview
        <>
          <div className="no-print mb-6 flex gap-4">
            <Button onClick={() => setShowPreview(false)} variant="outline">
              ← Edit Plan
            </Button>
            <Button onClick={handlePrint}>
              🖨️ Print Plan
            </Button>
          </div>
          <BIPTemplate plan={plan} />
        </>
      ) : (
        // Edit Form
        <>
          <Card className="mb-6">
            {/* Basic Info */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-textDark mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Child's Name"
                  value={plan.childName}
                  onChange={(e) => setPlan(prev => ({ ...prev, childName: e.target.value }))}
                  placeholder="Enter child's name"
                />
                <Input
                  label="Date Created"
                  value={plan.dateCreated}
                  onChange={(e) => setPlan(prev => ({ ...prev, dateCreated: e.target.value }))}
                  type="date"
                />
              </div>
            </div>

            {/* Target Behaviors */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-textDark mb-2">
                Target Behaviors to Decrease
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Describe specific behaviors you want to reduce (e.g., "hitting others when frustrated", "screaming to get attention")
              </p>
              {plan.targetBehaviors.map((behavior, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <Input
                    value={behavior}
                    onChange={(e) => updateItem('targetBehaviors', index, e.target.value)}
                    placeholder={`Target behavior ${index + 1}`}
                  />
                  {plan.targetBehaviors.length > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => removeItem('targetBehaviors', index)}
                      className="flex-shrink-0"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addItem('targetBehaviors')}>
                + Add Another Behavior
              </Button>
            </div>

            {/* Replacement Behaviors */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-textDark mb-2">
                Replacement Behaviors to Teach
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                What should your child do instead? (e.g., "ask for a break", "use words to express frustration")
              </p>
              {plan.replacementBehaviors.map((behavior, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <Input
                    value={behavior}
                    onChange={(e) => updateItem('replacementBehaviors', index, e.target.value)}
                    placeholder={`Replacement behavior ${index + 1}`}
                  />
                  {plan.replacementBehaviors.length > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => removeItem('replacementBehaviors', index)}
                      className="flex-shrink-0"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addItem('replacementBehaviors')}>
                + Add Another Behavior
              </Button>
            </div>

            {/* Antecedent Strategies */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-textDark mb-2">
                Antecedent Strategies (Prevention)
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                What can you do BEFORE the behavior to prevent it? (e.g., "provide 5-minute warnings", "offer choices")
              </p>
              {plan.antecedentStrategies.map((strategy, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <Input
                    value={strategy}
                    onChange={(e) => updateItem('antecedentStrategies', index, e.target.value)}
                    placeholder={`Prevention strategy ${index + 1}`}
                  />
                  {plan.antecedentStrategies.length > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => removeItem('antecedentStrategies', index)}
                      className="flex-shrink-0"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addItem('antecedentStrategies')}>
                + Add Another Strategy
              </Button>
            </div>

            {/* Teaching Strategies */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-textDark mb-2">
                Teaching Strategies
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                How will you teach the replacement behaviors? (e.g., "model asking for help", "practice during calm times")
              </p>
              {plan.teachingStrategies.map((strategy, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <Input
                    value={strategy}
                    onChange={(e) => updateItem('teachingStrategies', index, e.target.value)}
                    placeholder={`Teaching strategy ${index + 1}`}
                  />
                  {plan.teachingStrategies.length > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => removeItem('teachingStrategies', index)}
                      className="flex-shrink-0"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addItem('teachingStrategies')}>
                + Add Another Strategy
              </Button>
            </div>

            {/* Consequence Strategies */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-textDark mb-2">
                Consequence Strategies (Response)
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                What will you do AFTER the behavior occurs? (e.g., "remain calm, redirect to replacement behavior")
              </p>
              {plan.consequenceStrategies.map((strategy, index) => (
                <div key={index} className="mb-3 flex gap-2">
                  <Input
                    value={strategy}
                    onChange={(e) => updateItem('consequenceStrategies', index, e.target.value)}
                    placeholder={`Response strategy ${index + 1}`}
                  />
                  {plan.consequenceStrategies.length > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => removeItem('consequenceStrategies', index)}
                      className="flex-shrink-0"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => addItem('consequenceStrategies')}>
                + Add Another Strategy
              </Button>
            </div>

            {/* Data Collection */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-textDark mb-2">
                Data Collection Method
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                How will you track progress? (e.g., "tally marks for each occurrence", "rate scale 1-5 daily")
              </p>
              <Textarea
                value={plan.dataCollection}
                onChange={(e) => setPlan(prev => ({ ...prev, dataCollection: e.target.value }))}
                placeholder="Describe how you'll collect data..."
              />
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-textDark mb-2">
                Additional Notes
              </h2>
              <Textarea
                value={plan.notes}
                onChange={(e) => setPlan(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any other important information..."
              />
            </div>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => setShowPreview(true)} size="lg">
              Preview & Print →
            </Button>
          </div>

          {/* Help text */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Your plan is saved automatically. You can return anytime to edit it.
              For serious or dangerous behaviors, please consult with a BCBA or other qualified professional.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
