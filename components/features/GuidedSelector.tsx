'use client';

import { useState } from 'react';
import { SettingEventOption, PrecursorOption } from '@/types/bip';
import InfoTooltip from '@/components/ui/InfoTooltip';

interface GuidedSelectorProps {
  label: string;
  description: string;
  options: SettingEventOption[] | PrecursorOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function GuidedSelector({
  label,
  description,
  options,
  value,
  onChange,
  placeholder = "Select an option or enter custom text..."
}: GuidedSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [expandedOption, setExpandedOption] = useState<string | null>(null);

  const handleSelectChange = (selectedId: string) => {
    if (selectedId === 'custom') {
      setShowCustom(true);
      onChange('');
    } else if (selectedId === '') {
      setShowCustom(false);
      onChange('');
    } else {
      setShowCustom(false);
      const option = options.find(o => o.id === selectedId);
      onChange(option ? option.label : '');
    }
  };

  const getCurrentSelectedId = () => {
    if (showCustom || !value) return 'custom';
    const option = options.find(o => o.label === value);
    return option ? option.id : 'custom';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <label className="block text-sm font-semibold text-textDark dark:text-dark-text-primary mb-1">
            {label}
          </label>
          <p className="text-xs text-gray-600 dark:text-dark-text-secondary">
            {description}
          </p>
        </div>
        <InfoTooltip
          content={
            <div>
              <p className="font-semibold mb-2">About {label}</p>
              <p className="text-sm mb-2">{description}</p>
              <p className="text-xs">Select a common option or enter your own custom text.</p>
            </div>
          }
        />
      </div>

      {/* Dropdown */}
      <select
        value={getCurrentSelectedId()}
        onChange={(e) => handleSelectChange(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-warm-elevated dark:bg-dark-surface text-textDark dark:text-dark-text-primary border-warm-border dark:border-dark-border"
      >
        <option value="">-- Select {label} --</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
        <option value="custom">✏️ Enter custom text...</option>
      </select>

      {/* Show examples for selected option */}
      {getCurrentSelectedId() !== 'custom' && getCurrentSelectedId() !== '' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
          {(() => {
            const selected = options.find(o => o.id === getCurrentSelectedId());
            if (!selected) return null;

            return (
              <div>
                <button
                  type="button"
                  onClick={() => setExpandedOption(expandedOption === selected.id ? null : selected.id)}
                  className="text-sm font-medium text-blue-800 dark:text-blue-200 hover:underline flex items-center gap-2"
                >
                  {expandedOption === selected.id ? '▼' : '▶'}
                  Examples of "{selected.label}"
                </button>
                {expandedOption === selected.id && (
                  <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300 list-disc pl-5">
                    {selected.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Custom text input */}
      {showCustom && (
        <div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light bg-warm-elevated dark:bg-dark-surface text-textDark dark:text-dark-text-primary border-warm-border dark:border-dark-border"
          />
        </div>
      )}
    </div>
  );
}
