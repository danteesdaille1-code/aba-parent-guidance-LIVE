import { useState } from 'react';
import { BehaviorSelection, BehaviorOption } from '@/types/bip';
import FunctionBadge from '@/components/ui/FunctionBadge';

interface BehaviorFunctionGuideProps {
  targetBehaviors: BehaviorSelection[];
  behaviorOptions: BehaviorOption[];
  onFunctionAssign: (behaviorId: string, functionType: 'attention' | 'escape' | 'sensory' | 'tangible') => void;
}

const functionDetails = {
  attention: {
    icon: '👋',
    title: 'Attention',
    description: 'The behavior occurs to GET attention from parents, teachers, or peers - even negative attention.',
    examples: ['Screaming when mom is on the phone', 'Hitting sibling to get parent to intervene', 'Showing off during class'],
    questions: [
      'Does the behavior happen more when others are around?',
      'Does the behavior stop when you give attention?',
      'Does the child look at you during or after the behavior?',
      'Does the behavior happen less when the child is alone?'
    ]
  },
  escape: {
    icon: '🚪',
    title: 'Escape/Avoidance',
    description: 'The behavior occurs to AVOID or ESCAPE from demands, tasks, or activities that are difficult, boring, or unpleasant.',
    examples: ['Tantrums during homework', 'Running away when asked to clean up', 'Crying during transitions'],
    questions: [
      'Does the behavior happen during or right before a demand/task?',
      'Does the behavior stop when you remove the demand?',
      'Does the behavior happen less during preferred activities?',
      'Does the child seem relieved when allowed to escape?'
    ]
  },
  sensory: {
    icon: '✨',
    title: 'Sensory',
    description: 'The behavior occurs to GET sensory input that feels good OR to AVOID sensory input that is uncomfortable. This function is internal - the behavior serves a physical/sensory need.',
    examples: ['Hand-flapping', 'Rocking', 'Spinning', 'Covering ears in loud spaces', 'Seeking deep pressure'],
    questions: [
      'Does the behavior happen even when the child is alone?',
      'Does the behavior seem automatic or rhythmic?',
      'Does the behavior provide physical sensation (movement, touch, sound)?',
      'Does the behavior happen more in certain sensory environments?'
    ]
  },
  tangible: {
    icon: '🎁',
    title: 'Access/Tangible',
    description: 'The behavior occurs to GET access to desired items, activities, or privileges.',
    examples: ['Grabbing toys from peers', 'Throwing items when told "no dessert"', 'Refusing to leave the playground'],
    questions: [
      'Does the behavior happen when a desired item is unavailable?',
      'Does the behavior stop when the child gets the item/activity?',
      'Does the child reach for or look at the desired item?',
      'Does the behavior happen less when the child already has what they want?'
    ]
  }
};

export default function BehaviorFunctionGuide({
  targetBehaviors,
  behaviorOptions,
  onFunctionAssign
}: BehaviorFunctionGuideProps) {
  const [expandedFunction, setExpandedFunction] = useState<string | null>(null);

  if (targetBehaviors.length === 0) {
    return (
      <div className="text-center py-8 text-warm-text/60 dark:text-white/60">
        Select target behaviors first to determine their functions.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Educational Header */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-warm-text dark:text-white mb-2 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Understanding Functions of Behavior
        </h3>
        <p className="text-sm text-warm-text/80 dark:text-white/80 mb-3">
          All behavior serves a purpose (function). Understanding <strong>why</strong> a behavior happens is more important than just knowing <strong>what</strong> the behavior is. There are four main functions:
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <FunctionBadge functionType="attention" />
          <FunctionBadge functionType="escape" />
          <FunctionBadge functionType="sensory" />
          <FunctionBadge functionType="tangible" />
        </div>
        <p className="text-xs text-warm-text/70 dark:text-white/70 mt-3 italic">
          ⚠️ Important: The same behavior can serve different functions in different situations. Your intervention strategy must match the function!
        </p>
      </div>

      {/* Function Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(functionDetails) as Array<keyof typeof functionDetails>).map(functionKey => {
          const func = functionDetails[functionKey];
          const isExpanded = expandedFunction === functionKey;

          return (
            <div
              key={functionKey}
              className="bg-white dark:bg-warm-card border-2 border-warm-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setExpandedFunction(isExpanded ? null : functionKey)}
                className="w-full p-4 text-left hover:bg-warm-elevated/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{func.icon}</span>
                    <div>
                      <h4 className="font-semibold text-warm-text dark:text-white">
                        {func.title}
                      </h4>
                      <p className="text-xs text-warm-text/60 dark:text-white/60">
                        Click to learn more
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl">
                    {isExpanded ? '−' : '+'}
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-warm-border">
                  <p className="text-sm text-warm-text dark:text-white pt-3">
                    {func.description}
                  </p>

                  <div>
                    <h5 className="text-xs font-semibold text-warm-text/70 dark:text-white/70 uppercase mb-1">
                      Examples:
                    </h5>
                    <ul className="text-sm text-warm-text dark:text-white space-y-1">
                      {func.examples.map((example, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold text-warm-text/70 dark:text-white/70 uppercase mb-2">
                      Assessment Questions:
                    </h5>
                    <ul className="text-sm text-warm-text dark:text-white space-y-1">
                      {func.questions.map((question, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">?</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Behavior Function Assignment */}
      <div className="bg-warm-elevated border-2 border-warm-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-warm-text dark:text-white mb-4">
          Assign Functions to Your Target Behaviors
        </h3>
        <p className="text-sm text-warm-text/70 dark:text-white/70 mb-4">
          Based on the questions above, select the most likely function for each behavior. If you're unsure, that's okay - you can always adjust later or seek help from a BCBA.
        </p>

        <div className="space-y-3">
          {targetBehaviors.map(behavior => {
            const behaviorOption = behaviorOptions.find(b => b.id === behavior.id);
            const behaviorLabel = behaviorOption?.label || behavior.id;

            return (
              <div
                key={behavior.id}
                className="bg-white dark:bg-warm-card border border-warm-border rounded-lg p-3"
              >
                <h4 className="font-medium text-warm-text dark:text-white mb-2">
                  {behaviorLabel}
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {(Object.keys(functionDetails) as Array<keyof typeof functionDetails>).map(functionKey => {
                    const isSelected = behavior.function === functionKey;
                    return (
                      <button
                        key={functionKey}
                        onClick={() => onFunctionAssign(behavior.id, functionKey)}
                        className={`
                          px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
                          ${isSelected
                            ? 'border-primary bg-primary text-white shadow-md'
                            : 'border-warm-border bg-white dark:bg-warm-surface hover:border-primary hover:bg-primary/10'
                          }
                        `}
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span>{functionDetails[functionKey].icon}</span>
                          <span>{functionDetails[functionKey].title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Educational Footer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg p-4">
        <h4 className="font-semibold text-warm-text dark:text-white mb-2">
          💡 Need Help Determining Functions?
        </h4>
        <p className="text-sm text-warm-text/80 dark:text-white/80">
          If you're struggling to identify the function of your child's behavior after careful observation, or if behaviors are dangerous, seek help from a BCBA who can conduct a Functional Behavior Assessment (FBA). Remember: your intervention strategy must match the function to be effective!
        </p>
      </div>
    </div>
  );
}
