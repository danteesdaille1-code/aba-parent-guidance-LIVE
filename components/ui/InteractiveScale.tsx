'use client';

import { motion } from 'framer-motion';

interface ScaleOption {
  value: number;
  label: string;
  emoji?: string;
  color: string;
}

interface InteractiveScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  options?: ScaleOption[];
}

const defaultOptions: ScaleOption[] = [
  { value: 0, label: 'Not Yet', emoji: '❌', color: 'from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 border-red-300 dark:border-red-700' },
  { value: 1, label: 'Sometimes', emoji: '🔄', color: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-300 dark:border-yellow-700' },
  { value: 2, label: 'Usually', emoji: '✓', color: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-300 dark:border-blue-700' },
  { value: 3, label: 'Always', emoji: '✨', color: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700' },
  { value: -1, label: "I'm Not Sure", emoji: '🤷', color: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 border-purple-300 dark:border-purple-700' },
];

export default function InteractiveScale({
  value,
  onChange,
  options = defaultOptions
}: InteractiveScaleProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isSelected = value === option.value;

        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`w-full min-h-[60px] p-4 rounded-xl border-2 transition-all duration-200 ${
              isSelected
                ? `bg-gradient-to-r ${option.color} shadow-lg scale-[1.02] ring-2 ring-primary dark:ring-primary-light ring-offset-2 dark:ring-offset-dark-bg`
                : `bg-warm-surface dark:bg-dark-card hover:bg-gradient-to-r hover:${option.color} border-gray-200 dark:border-dark-border hover:scale-[1.01] hover:shadow-md`
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {option.emoji && (
                  <span className="text-3xl" role="img" aria-label={option.label}>
                    {option.emoji}
                  </span>
                )}
                <span className={`text-lg font-semibold ${
                  isSelected
                    ? 'text-textDark dark:text-dark-text-primary'
                    : 'text-gray-700 dark:text-dark-text-secondary'
                }`}>
                  {option.label}
                </span>
              </div>

              {/* Selection indicator */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-primary dark:bg-primary-light border-primary dark:border-primary-light'
                  : 'bg-warm-surface dark:bg-dark-surface border-gray-300 dark:border-dark-border'
              }`}>
                {isSelected && (
                  <motion.svg
                    className="w-4 h-4 text-white dark:text-textDark"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
