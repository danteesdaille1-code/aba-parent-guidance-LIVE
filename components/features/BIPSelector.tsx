'use client';

import { useState } from 'react';
import InfoTooltip from '@/components/ui/InfoTooltip';
import Textarea from '@/components/ui/Textarea';
import { BehaviorOption, StrategyOption } from '@/types/bip';

interface BIPSelectorProps {
  type: 'behavior' | 'strategy';
  options: BehaviorOption[] | StrategyOption[];
  selectedIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  customNotes?: Record<string, string>;
  onCustomNoteChange?: (id: string, note: string) => void;
  title: string;
  description: string;
  recommended?: string[];  // Array of recommended option IDs
  selectionMode?: 'single' | 'multiple';  // NEW: Support single selection
  selectedId?: string | null;  // NEW: For single selection
  onSingleSelectionChange?: (id: string | null) => void;  // NEW: For single selection
}

export default function BIPSelector({
  type,
  options,
  selectedIds,
  onSelectionChange,
  customNotes = {},
  onCustomNoteChange,
  title,
  description,
  recommended = [],
  selectionMode = 'multiple',
  selectedId = null,
  onSingleSelectionChange,
}: BIPSelectorProps) {
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());

  const selectAllRecommended = () => {
    const newSelections = [...new Set([...selectedIds, ...recommended])];
    onSelectionChange(newSelections);
  };

  const toggleSelection = (id: string) => {
    if (selectionMode === 'single' && onSingleSelectionChange) {
      // Single selection mode - use radio button behavior
      if (selectedId === id) {
        onSingleSelectionChange(null);  // Deselect if clicking same item
      } else {
        onSingleSelectionChange(id);
      }
    } else {
      // Multiple selection mode - use checkbox behavior
      if (selectedIds.includes(id)) {
        onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
        // Clear custom note when deselected
        if (onCustomNoteChange) {
          onCustomNoteChange(id, '');
        }
      } else {
        onSelectionChange([...selectedIds, id]);
      }
    }
  };

  const toggleNoteExpansion = (id: string) => {
    const newExpanded = new Set(expandedNotes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNotes(newExpanded);
  };

  const isBehaviorOption = (option: BehaviorOption | StrategyOption): option is BehaviorOption => {
    return 'seekProfessionalHelp' in option;
  };

  return (
    <div className="mb-8">
      <div className="mb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-2">
              {title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              {description}
            </p>
          </div>
          {recommended.length > 0 && (
            <button
              onClick={selectAllRecommended}
              className="flex-shrink-0 px-4 py-2 bg-primary/10 text-primary border-2 border-primary/30 rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
            >
              ✨ Select All Recommended
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectionMode === 'single'
            ? selectedId === option.id
            : selectedIds.includes(option.id);
          const isRecommended = recommended.includes(option.id);
          const showNote = expandedNotes.has(option.id);
          const isBehavior = isBehaviorOption(option);
          const showWarning = isBehavior ? option.seekProfessionalHelp : 'warning' in option && option.warning;

          return (
            <div key={option.id}>
              <div
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-primary dark:border-primary-light bg-primary/5 dark:bg-primary-light/5 shadow-md'
                    : 'border-gray-200 dark:border-dark-border bg-warm-surface dark:bg-dark-card hover:border-primary/50 dark:hover:border-primary-light/50'
                } ${showWarning ? 'ring-2 ring-yellow-400/50' : ''}`}
                onClick={() => toggleSelection(option.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox or Radio Button */}
                  <div className="flex-shrink-0 mt-1">
                    {selectionMode === 'single' ? (
                      // Radio button for single selection
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-primary dark:bg-primary-light border-primary dark:border-primary-light'
                            : 'bg-warm-surface dark:bg-dark-surface border-gray-300 dark:border-dark-border'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white dark:bg-textDark" />
                        )}
                      </div>
                    ) : (
                      // Checkbox for multiple selection
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
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-textDark dark:text-dark-text-primary">
                          {option.label}
                          {showWarning && (
                            <span className="ml-2 text-xs font-bold text-yellow-700 dark:text-yellow-400">
                              ⚠️ Caution
                            </span>
                          )}
                        </h3>
                        {isRecommended && !isSelected && (
                          <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                            ✨ Recommended
                          </span>
                        )}
                      </div>
                      <InfoTooltip
                        content={
                          <div>
                            <p className="font-semibold mb-1">Why this helps:</p>
                            <p>{option.educationalNote}</p>
                            {!isBehavior && 'warning' in option && option.warning && (
                              <p className="mt-2 font-semibold text-yellow-700 dark:text-yellow-400">
                                {option.warning}
                              </p>
                            )}
                          </div>
                        }
                        warning={!!showWarning}
                      />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-dark-text-secondary mt-1">
                      {option.description}
                    </p>

                    {/* Warning for dangerous behaviors */}
                    {isBehavior && option.seekProfessionalHelp && (
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded text-xs text-yellow-800 dark:text-yellow-200">
                        <strong>⚠️ Important:</strong> This behavior may require immediate professional consultation with a BCBA.
                      </div>
                    )}

                    {/* Custom note field */}
                    {isSelected && onCustomNoteChange && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNoteExpansion(option.id);
                          }}
                          className="text-xs text-primary dark:text-primary-light hover:underline"
                        >
                          {showNote ? '- Hide' : '+ Add'} custom notes
                        </button>
                        {showNote && (
                          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                            <Textarea
                              value={customNotes[option.id] || ''}
                              onChange={(e) => onCustomNoteChange(option.id, e.target.value)}
                              placeholder="Add your own notes or specific details..."
                              className="text-sm"
                              rows={2}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectionMode === 'multiple' && selectedIds.length === 0 && (
        <p className="mt-4 text-sm text-gray-500 dark:text-dark-text-muted italic text-center">
          No items selected yet. Click on the cards above to select options.
        </p>
      )}
      {selectionMode === 'single' && !selectedId && (
        <p className="mt-4 text-sm text-gray-500 dark:text-dark-text-muted italic text-center">
          No item selected yet. Click on a card above to select one option.
        </p>
      )}
    </div>
  );
}
