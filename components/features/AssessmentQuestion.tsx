'use client';

import { motion } from 'framer-motion';
import InteractiveScale from '@/components/ui/InteractiveScale';

interface AssessmentQuestionProps {
  questionText: string;
  value: number | null;
  onChange: (value: number) => void;
}

export default function AssessmentQuestion({
  questionText,
  value,
  onChange
}: AssessmentQuestionProps) {
  // Map values to match the new 0-3 scale (plus -1 for not sure)
  const handleChange = (newValue: number) => {
    // Convert InteractiveScale values to assessment values
    // -1 = "I'm not sure" -> 1
    // 0 = "Not Yet" -> 2
    // 1 = "Sometimes" -> 4
    // 2 = "Usually" -> 4.5 (rounded to 5 for high)
    // 3 = "Always" -> 5
    const valueMap: Record<number, number> = {
      [-1]: 0, // I'm not sure → stored as 0 (not counted in scores)
      [0]: 1,  // Not Yet / Never
      [1]: 2,  // Sometimes / Rarely
      [2]: 3,  // Usually
      [3]: 5,  // Always / Most of the time
    };
    onChange(valueMap[newValue]);
  };

  // Reverse map for display
  const displayValue = (() => {
    if (value === null) return null;
    const reverseMap: Record<number, number> = {
      0: -1,  // I'm not sure
      1: 0,   // Not Yet
      2: 1,   // Sometimes
      3: 2,   // Usually
      5: 3,   // Always
    };
    return reverseMap[value] ?? null;
  })();

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.p
        className="text-xl font-semibold text-textDark dark:text-dark-text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {questionText}
      </motion.p>

      <InteractiveScale
        value={displayValue}
        onChange={handleChange}
      />
    </motion.div>
  );
}
