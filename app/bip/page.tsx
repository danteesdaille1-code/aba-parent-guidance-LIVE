'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Card from '@/components/ui/Card';
import BIPSelector from '@/components/features/BIPSelector';
import BIPTemplate from '@/components/features/BIPTemplate';
import GuidedSelector from '@/components/features/GuidedSelector';
import FunctionCheckboxes from '@/components/features/FunctionCheckboxes';
import TwoColumnTextAreas from '@/components/features/TwoColumnTextAreas';
import StrategyRecommendations from '@/components/features/StrategyRecommendations';
import EducationalModal, { ExtinctionBurstContent, ConsequencesExplainedContent } from '@/components/features/EducationalModal';
import { BehaviorPlan, BehaviorSelection, StrategySelection, BIPOptions } from '@/types/bip';
import bipOptionsData from '@/data/bip-options.json';

const bipOptions = bipOptionsData as BIPOptions;

// Migration function to convert old data to new v4 format
function migrateBIPData(saved: any): BehaviorPlan {
  const version = saved?.plan?.version || saved?.version || 'v1';

  if (version !== 'v4') {
    const oldPlan = saved.plan || saved;

    // Handle old string-based replacement behaviors (v1/v2)
    let replacementBehaviors = [];
    if (Array.isArray(oldPlan.replacementBehaviors)) {
      replacementBehaviors = oldPlan.replacementBehaviors
        .filter((item: any) => {
          // If it's a string, include it
          if (typeof item === 'string' && item.trim()) return true;
          // If it's an object with an id, include it
          if (typeof item === 'object' && item.id) return true;
          return false;
        })
        .map((item: any, i: number) => {
          if (typeof item === 'string') {
            return { id: `legacy_${i}_${Date.now()}`, customNote: item };
          }
          return item;
        });
    }

    // Take first behavior from multi-behavior selection
    const firstBehavior = oldPlan.targetBehaviors?.[0] || null;

    return {
      childName: oldPlan.childName || '',
      dateCreated: oldPlan.dateCreated || new Date().toLocaleDateString(),
      dateOfBirth: '',  // New field
      version: 'v4',
      parentGoals: oldPlan.parentGoals || [],
      endGoal: oldPlan.endGoal || '',
      dataCollection: oldPlan.dataCollection || '',
      targetBehavior: firstBehavior,  // Single behavior
      behaviorFunctions: {  // New checkbox structure
        attention: false,
        escape: false,
        sensory: false,
        tangible: false
      },
      settingEvent: '',  // New field
      precursor: '',  // New field
      restrictions: '',  // New field
      reinforcers: '',  // New field
      replacementBehaviors: replacementBehaviors,
      antecedentStrategies: oldPlan.antecedentStrategies || [],
      teachingStrategies: oldPlan.teachingStrategies || [],
      consequenceStrategies: oldPlan.consequenceStrategies || [],
      notes: oldPlan.notes || ''
    };
  }

  return saved.plan || saved;
}

// Helper to convert new format to display format for BIPTemplate
function convertToPDFFormat(plan: BehaviorPlan): any {
  return {
    ...plan,
    targetBehavior: plan.targetBehavior
      ? (() => {
          const option = bipOptions.targetBehaviors.find(o => o.id === plan.targetBehavior?.id);
          return option ? option.label : '';
        })()
      : '',
    replacementBehaviors: plan.replacementBehaviors.map(r => {
      if (r.id.startsWith('legacy_') && r.customNote) {
        return r.customNote;
      }
      const option = bipOptions.replacementBehaviors.find(o => o.id === r.id);
      return option ? `${option.label}${r.customNote ? ` - ${r.customNote}` : ''}` : '';
    }),
    antecedentStrategies: plan.antecedentStrategies.map(s => {
      const option = bipOptions.antecedentStrategies.find(o => o.id === s.id);
      return option ? `${option.label}${s.customNote ? ` - ${s.customNote}` : ''}` : '';
    }),
    teachingStrategies: plan.teachingStrategies.map(s => {
      const option = bipOptions.teachingStrategies.find(o => o.id === s.id);
      return option ? `${option.label}${s.customNote ? ` - ${s.customNote}` : ''}` : '';
    }),
    consequenceStrategies: plan.consequenceStrategies.map(s => {
      const option = bipOptions.consequenceStrategies.find(o => o.id === s.id);
      return option ? `${option.label}${s.customNote ? ` - ${s.customNote}` : ''}` : '';
    }),
  };
}

export default function BIPPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [extinctionBurstModalOpen, setExtinctionBurstModalOpen] = useState(false);
  const [consequencesModalOpen, setConsequencesModalOpen] = useState(false);
  const [showMigrationNotice, setShowMigrationNotice] = useState(false);

  const [plan, setPlan] = useState<BehaviorPlan>({
    childName: '',
    dateCreated: new Date().toLocaleDateString(),
    dateOfBirth: '',
    version: 'v4',
    parentGoals: [],
    endGoal: '',
    dataCollection: '',
    targetBehavior: null,
    behaviorFunctions: {
      attention: false,
      escape: false,
      sensory: false,
      tangible: false
    },
    settingEvent: '',
    precursor: '',
    restrictions: '',
    reinforcers: '',
    replacementBehaviors: [],
    antecedentStrategies: [],
    teachingStrategies: [],
    consequenceStrategies: [],
    notes: ''
  });

  const [customNotes, setCustomNotes] = useState<{
    replacementBehaviors: Record<string, string>;
    antecedent: Record<string, string>;
    teaching: Record<string, string>;
    consequence: Record<string, string>;
  }>({
    replacementBehaviors: {},
    antecedent: {},
    teaching: {},
    consequence: {},
  });

  // Load saved BIP from localStorage with migration
  useEffect(() => {
    // Try v4 first, then fallback to older versions
    const savedV4 = localStorage.getItem('bip_plan_v4');
    const savedV2 = localStorage.getItem('bip_plan_v2');
    const savedV1 = localStorage.getItem('bip_plan_v1');

    const saved = savedV4 || savedV2 || savedV1;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const migratedPlan = migrateBIPData(parsed);

        // Show migration notice if we migrated from an older version
        if (!savedV4 && (savedV2 || savedV1)) {
          setShowMigrationNotice(true);
        }

        setPlan(migratedPlan);
        setCustomNotes(parsed.customNotes || customNotes);
      } catch (e) {
        console.error('Failed to load saved BIP:', e);
      }
    }
  }, []);

  // Auto-save to v4
  useEffect(() => {
    if (plan.childName || plan.targetBehavior) {
      localStorage.setItem('bip_plan_v4', JSON.stringify({ plan, customNotes }));
    }
  }, [plan, customNotes]);

  const handlePrint = () => {
    window.print();
  };

  const updateParentGoal = (value: string) => {
    const goals = value.split('\n').filter(g => g.trim());
    setPlan(prev => ({ ...prev, parentGoals: goals }));
  };

  // Calculate recommendations based on selected behavior
  const recommendations = useMemo(() => {
    if (!plan.targetBehavior) return null;

    const behaviorRecs = bipOptions.recommendations.behaviorToStrategies[plan.targetBehavior.id];
    const replacementRecs = bipOptions.recommendations.behaviorToReplacements[plan.targetBehavior.id];

    return {
      antecedent: behaviorRecs?.antecedent || [],
      teaching: behaviorRecs?.teaching || [],
      consequence: behaviorRecs?.consequence || [],
      replacement: replacementRecs || []
    };
  }, [plan.targetBehavior]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 no-print"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-textDark dark:text-dark-text-primary mb-4">
          Behavior Intervention Plan (BIP) Generator
        </h1>
        <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-4">
          Create a comprehensive, professional behavior plan for one target behavior.
        </p>

        {/* Migration Notice */}
        {showMigrationNotice && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded mb-4">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>ℹ️ Your BIP has been updated:</strong> The BIP now focuses on one behavior at a time for deeper analysis.
              {plan.targetBehavior && ' We kept your first behavior - '}<strong>{plan.targetBehavior && bipOptions.targetBehaviors.find(b => b.id === plan.targetBehavior?.id)?.label}</strong>.
              Please review all fields and add the new information.
            </p>
            <button
              onClick={() => setShowMigrationNotice(false)}
              className="mt-2 text-sm text-blue-700 dark:text-blue-300 hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Important Disclaimer */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-sm text-yellow-900 dark:text-yellow-200">
            <strong>⚠️ Important:</strong> This tool provides <strong>guidance and recommendations</strong> to
            discuss with your Board Certified Behavior Analyst (BCBA). It is <strong>NOT a replacement for
            professional behavior analysis services</strong>. For serious or dangerous behaviors, please consult
            a BCBA immediately.
          </p>
        </div>

        {/* Educational Links */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setExtinctionBurstModalOpen(true)}
            className="text-sm text-primary dark:text-primary-light hover:underline font-medium"
          >
            📚 Why does behavior get worse before better?
          </button>
          <button
            onClick={() => setConsequencesModalOpen(true)}
            className="text-sm text-primary dark:text-primary-light hover:underline font-medium"
          >
            📚 Understanding consequences and attention
          </button>
        </div>
      </motion.div>

      {showPreview ? (
        // Print Preview
        <>
          <div className="no-print mb-6 flex gap-4 items-center">
            <Button onClick={() => setShowPreview(false)} variant="outline">
              ← Edit Plan
            </Button>
            <Button onClick={handlePrint}>
              🖨️ Print Plan
            </Button>
          </div>
          <BIPTemplate plan={convertToPDFFormat(plan)} />
        </>
      ) : (
        // Edit Form
        <div className="space-y-8">
          {/* Basic Info */}
          <Card>
            <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-4">
              Child Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Input
                label="Date of Birth"
                value={plan.dateOfBirth}
                onChange={(e) => setPlan(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                type="date"
              />
            </div>
          </Card>

          {/* Target Behavior - SINGLE SELECTION */}
          <Card>
            <BIPSelector
              type="behavior"
              options={bipOptions.targetBehaviors}
              selectedIds={[]}
              onSelectionChange={() => {}}
              selectionMode="single"
              selectedId={plan.targetBehavior?.id || null}
              onSingleSelectionChange={(id) => {
                setPlan(prev => ({
                  ...prev,
                  targetBehavior: id ? { id } : null
                }));
              }}
              title="Target Behavior to Decrease"
              description="Select ONE behavior to focus on in this plan. For multiple behaviors, create separate plans."
            />
          </Card>

          {/* Behavior Functions - NEW CHECKBOX GRID */}
          {plan.targetBehavior && (
            <Card>
              <FunctionCheckboxes
                values={plan.behaviorFunctions}
                onChange={(values) => setPlan(prev => ({ ...prev, behaviorFunctions: values }))}
              />
            </Card>
          )}

          {/* Setting Event - NEW */}
          {plan.targetBehavior && (
            <Card>
              <GuidedSelector
                label="Setting Event"
                description="What conditions make the behavior more likely? (hunger, lack of sleep, etc.)"
                options={bipOptions.settingEvents}
                value={plan.settingEvent}
                onChange={(value) => setPlan(prev => ({ ...prev, settingEvent: value }))}
              />
            </Card>
          )}

          {/* Precursor - NEW */}
          {plan.targetBehavior && (
            <Card>
              <GuidedSelector
                label="Precursor Behavior"
                description="What warning signs happen just BEFORE the target behavior?"
                options={bipOptions.precursors}
                value={plan.precursor}
                onChange={(value) => setPlan(prev => ({ ...prev, precursor: value }))}
              />
            </Card>
          )}

          {/* Restrictions & Reinforcers - NEW */}
          {plan.targetBehavior && (
            <Card>
              <TwoColumnTextAreas
                restrictionsValue={plan.restrictions}
                reinforcersValue={plan.reinforcers}
                onRestrictionsChange={(value) => setPlan(prev => ({ ...prev, restrictions: value }))}
                onReinforcersChange={(value) => setPlan(prev => ({ ...prev, reinforcers: value }))}
              />
            </Card>
          )}

          {/* Replacement Behaviors */}
          {plan.targetBehavior && recommendations && (
            <>
              <BIPSelector
                type="behavior"
                options={bipOptions.replacementBehaviors}
                selectedIds={plan.replacementBehaviors.map(b => b.id)}
                onSelectionChange={(ids) => {
                  setPlan(prev => ({
                    ...prev,
                    replacementBehaviors: ids.map(id => ({ id, customNote: customNotes.replacementBehaviors[id] || '' }))
                  }));
                }}
                customNotes={customNotes.replacementBehaviors}
                onCustomNoteChange={(id, note) => {
                  setCustomNotes(prev => ({
                    ...prev,
                    replacementBehaviors: { ...prev.replacementBehaviors, [id]: note }
                  }));
                }}
                recommended={recommendations.replacement}
                title="Replacement Behaviors to Teach"
                description="What should your child do INSTEAD of the target behavior?"
              />

              {/* Antecedent Strategies with Recommendations */}
              {recommendations.antecedent.length > 0 && (
                <StrategyRecommendations
                  title="Recommended Prevention Strategies"
                  recommendations={recommendations.antecedent}
                  allStrategies={bipOptions.antecedentStrategies}
                  selectedStrategies={plan.antecedentStrategies.map(s => s.id)}
                  onSelectStrategy={(id) => {
                    if (!plan.antecedentStrategies.find(s => s.id === id)) {
                      setPlan(prev => ({
                        ...prev,
                        antecedentStrategies: [...prev.antecedentStrategies, { id, customNote: '' }]
                      }));
                    }
                  }}
                  category="antecedent"
                />
              )}

              <BIPSelector
                type="strategy"
                options={bipOptions.antecedentStrategies}
                selectedIds={plan.antecedentStrategies.map(s => s.id)}
                onSelectionChange={(ids) => {
                  setPlan(prev => ({
                    ...prev,
                    antecedentStrategies: ids.map(id => ({ id, customNote: customNotes.antecedent[id] || '' }))
                  }));
                }}
                customNotes={customNotes.antecedent}
                onCustomNoteChange={(id, note) => {
                  setCustomNotes(prev => ({
                    ...prev,
                    antecedent: { ...prev.antecedent, [id]: note }
                  }));
                }}
                title="Prevention Strategies (What to do BEFORE behavior)"
                description="Select strategies to prevent the behavior from happening."
              />

              {/* Teaching Strategies with Recommendations */}
              {recommendations.teaching.length > 0 && (
                <StrategyRecommendations
                  title="Recommended Teaching Strategies"
                  recommendations={recommendations.teaching}
                  allStrategies={bipOptions.teachingStrategies}
                  selectedStrategies={plan.teachingStrategies.map(s => s.id)}
                  onSelectStrategy={(id) => {
                    if (!plan.teachingStrategies.find(s => s.id === id)) {
                      setPlan(prev => ({
                        ...prev,
                        teachingStrategies: [...prev.teachingStrategies, { id, customNote: '' }]
                      }));
                    }
                  }}
                  category="teaching"
                />
              )}

              <BIPSelector
                type="strategy"
                options={bipOptions.teachingStrategies}
                selectedIds={plan.teachingStrategies.map(s => s.id)}
                onSelectionChange={(ids) => {
                  setPlan(prev => ({
                    ...prev,
                    teachingStrategies: ids.map(id => ({ id, customNote: customNotes.teaching[id] || '' }))
                  }));
                }}
                customNotes={customNotes.teaching}
                onCustomNoteChange={(id, note) => {
                  setCustomNotes(prev => ({
                    ...prev,
                    teaching: { ...prev.teaching, [id]: note }
                  }));
                }}
                title="Teaching Strategies (How to teach replacement behaviors)"
                description="Select how you'll teach your child the appropriate behaviors."
              />

              {/* Consequence Strategies with Recommendations */}
              {recommendations.consequence.length > 0 && (
                <StrategyRecommendations
                  title="Recommended Response Strategies"
                  recommendations={recommendations.consequence}
                  allStrategies={bipOptions.consequenceStrategies}
                  selectedStrategies={plan.consequenceStrategies.map(s => s.id)}
                  onSelectStrategy={(id) => {
                    if (!plan.consequenceStrategies.find(s => s.id === id)) {
                      setPlan(prev => ({
                        ...prev,
                        consequenceStrategies: [...prev.consequenceStrategies, { id, customNote: '' }]
                      }));
                    }
                  }}
                  category="consequence"
                />
              )}

              <BIPSelector
                type="strategy"
                options={bipOptions.consequenceStrategies}
                selectedIds={plan.consequenceStrategies.map(s => s.id)}
                onSelectionChange={(ids) => {
                  setPlan(prev => ({
                    ...prev,
                    consequenceStrategies: ids.map(id => ({ id, customNote: customNotes.consequence[id] || '' }))
                  }));
                }}
                customNotes={customNotes.consequence}
                onCustomNoteChange={(id, note) => {
                  setCustomNotes(prev => ({
                    ...prev,
                    consequence: { ...prev.consequence, [id]: note }
                  }));
                }}
                title="Response Strategies (What to do AFTER behavior occurs)"
                description="Select how you'll respond when the behavior happens."
              />
            </>
          )}

          {/* Additional Notes */}
          <Card>
            <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-2">
              Additional Notes
            </h2>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
              Any other important information or specific details about your situation
            </p>
            <Textarea
              value={plan.notes}
              onChange={(e) => setPlan(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any other important information..."
            />
          </Card>

          {/* Parent Goals & Data Collection - OPTIONAL, NOT IN PDF */}
          <Card className="border-2 border-dashed border-gray-300 dark:border-dark-border">
            <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-2">
              Optional: Parent Goals & Data Collection
            </h2>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
              <strong>Note:</strong> These fields are for your records only and will NOT appear in the printed PDF.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-textDark dark:text-dark-text-secondary mb-2">
                  Your Goals for Your Child (one per line)
                </label>
                <Textarea
                  value={plan.parentGoals.join('\n')}
                  onChange={(e) => updateParentGoal(e.target.value)}
                  placeholder="E.g.,
- Communicate needs without crying
- Play independently for 10 minutes"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark dark:text-dark-text-secondary mb-2">
                  Main Goal
                </label>
                <select
                  value={plan.endGoal}
                  onChange={(e) => setPlan(prev => ({ ...prev, endGoal: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-warm-elevated dark:bg-dark-surface text-textDark dark:text-dark-text-primary border-warm-border dark:border-dark-border"
                >
                  <option value="">Select your main goal...</option>
                  <option value="school_readiness">Prepare for school</option>
                  <option value="communication">Improve communication</option>
                  <option value="reduce_behaviors">Reduce challenging behaviors</option>
                  <option value="independence">Increase independence</option>
                  <option value="social_skills">Build social skills</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-textDark dark:text-dark-text-secondary mb-2">
                  Data Collection Method
                </label>
                <Textarea
                  value={plan.dataCollection}
                  onChange={(e) => setPlan(prev => ({ ...prev, dataCollection: e.target.value }))}
                  placeholder="How will you track progress? (e.g., 'tally marks for each occurrence')"
                  rows={2}
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => setShowPreview(true)}
              size="lg"
              disabled={!plan.targetBehavior}
            >
              Preview & Print →
            </Button>
          </div>

          {/* Help text */}
          <Card className="bg-warm-subtle dark:bg-blue-900/20 border-l-4 border-primary">
            <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
              <strong>💡 Tips:</strong>
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-dark-text-secondary list-disc pl-5">
              <li>Your plan is saved automatically as you work</li>
              <li>Focus on ONE behavior at a time for best results</li>
              <li>Fill in all sections for a comprehensive plan</li>
              <li>Click the "i" icons to learn why each field matters</li>
              <li>Review this plan with your BCBA or therapist for personalized guidance</li>
            </ul>
          </Card>
        </div>
      )}

      {/* Educational Modals */}
      <EducationalModal
        isOpen={extinctionBurstModalOpen}
        onClose={() => setExtinctionBurstModalOpen(false)}
        title="Extinction Burst: Why Behavior Gets Worse First"
        content={<ExtinctionBurstContent />}
        type="warning"
      />

      <EducationalModal
        isOpen={consequencesModalOpen}
        onClose={() => setConsequencesModalOpen(false)}
        title="Understanding Consequences and Attention"
        content={<ConsequencesExplainedContent />}
      />
    </div>
  );
}
