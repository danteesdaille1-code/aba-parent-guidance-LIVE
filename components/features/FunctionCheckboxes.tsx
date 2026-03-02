'use client';

import { useState } from 'react';
import InfoTooltip from '@/components/ui/InfoTooltip';

interface FunctionCheckboxesProps {
  values: {
    attention: boolean;
    escape: boolean;
    sensory: boolean;
    tangible: boolean;
  };
  onChange: (values: { attention: boolean; escape: boolean; sensory: boolean; tangible: boolean }) => void;
}

const functionInfo = {
  attention: {
    icon: '👋',
    label: 'Attention',
    description: 'To get someone to look at, talk to, or interact with them',
    examples: ['Gets a reaction (even negative)', 'Gets someone to engage', 'Gets noticed']
  },
  escape: {
    icon: '🚪',
    label: 'Escape',
    description: 'To get away from or avoid something unpleasant',
    examples: ['Avoids a task or demand', 'Gets out of an activity', 'Escapes a situation']
  },
  sensory: {
    icon: '✨',
    label: 'Sensory',
    description: 'Feels good or provides sensory input the body craves',
    examples: ['Provides physical sensation', 'Satisfies a sensory need', 'Self-stimulation']
  },
  tangible: {
    icon: '🎁',
    label: 'Tangible',
    description: 'To get access to an item, activity, or privilege',
    examples: ['Gets a toy or object', 'Gains access to activity', 'Receives desired item']
  }
};

export default function FunctionCheckboxes({ values, onChange }: FunctionCheckboxesProps) {
  const [showGuide, setShowGuide] = useState(false);

  const handleToggle = (key: keyof typeof values) => {
    onChange({
      ...values,
      [key]: !values[key]
    });
  };

  const selectedCount = Object.values(values).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-textDark dark:text-dark-text-primary mb-1">
            Behavior Function(s)
          </h3>
          <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
            Why does this behavior happen? Select all that apply. ({selectedCount} selected)
          </p>
        </div>
        <InfoTooltip
          content={
            <div>
              <p className="font-semibold mb-2">Understanding Behavior Function</p>
              <p className="text-sm">Every behavior serves a purpose. Understanding WHY it happens helps you choose the right strategies.</p>
            </div>
          }
        />
      </div>

      {/* 2x2 Checkbox Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(Object.keys(functionInfo) as Array<keyof typeof functionInfo>).map((key) => {
          const info = functionInfo[key];
          const isSelected = values[key];

          return (
            <div
              key={key}
              onClick={() => handleToggle(key)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-primary dark:border-primary-light bg-primary/5 dark:bg-primary-light/5 shadow-md'
                  : 'border-gray-200 dark:border-dark-border bg-warm-surface dark:bg-dark-card hover:border-primary/50 dark:hover:border-primary-light/50'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-primary dark:bg-primary-light border-primary dark:border-primary-light'
                        : 'bg-warm-surface dark:bg-dark-surface border-gray-300 dark:border-dark-border'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white dark:text-textDark" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{info.icon}</span>
                    <h4 className="font-semibold text-textDark dark:text-dark-text-primary">
                      {info.label}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">
                    {info.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expandable Guide */}
      <button
        type="button"
        onClick={() => setShowGuide(!showGuide)}
        className="text-sm text-primary dark:text-primary-light hover:underline font-medium"
      >
        {showGuide ? '▼' : '▶'} How to determine behavior function
      </button>

      {showGuide && (
        <div className="bg-warm-subtle dark:bg-blue-900/20 border-l-4 border-primary p-4 rounded space-y-3">
          <p className="text-sm font-semibold text-textDark dark:text-dark-text-primary">
            Ask yourself: What does the child get or avoid when they do this behavior?
          </p>
          {(Object.keys(functionInfo) as Array<keyof typeof functionInfo>).map((key) => {
            const info = functionInfo[key];
            return (
              <div key={key} className="text-sm">
                <p className="font-medium text-textDark dark:text-dark-text-primary flex items-center gap-2">
                  <span>{info.icon}</span> {info.label}:
                </p>
                <ul className="list-disc pl-8 mt-1 space-y-1 text-gray-700 dark:text-dark-text-secondary">
                  {info.examples.map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}

      {selectedCount === 0 && (
        <p className="text-sm text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded p-3">
          ⚠️ Please select at least one behavior function to continue.
        </p>
      )}
    </div>
  );
}
