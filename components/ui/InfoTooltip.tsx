'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoTooltipProps {
  content: string | React.ReactNode;
  warning?: boolean;
  className?: string;
}

export default function InfoTooltip({ content, warning = false, className = '' }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold transition-colors ${
          warning
            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50'
            : 'bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary-light/20'
        }`}
        aria-label="More information"
      >
        {warning ? '!' : 'i'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 w-72 p-3 rounded-lg shadow-lg border ${
              warning
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
                : 'bg-warm-surface dark:bg-dark-card border-gray-200 dark:border-dark-border'
            } bottom-full left-1/2 transform -translate-x-1/2 mb-2`}
          >
            <div className={`text-sm ${
              warning
                ? 'text-yellow-900 dark:text-yellow-200'
                : 'text-gray-700 dark:text-dark-text-secondary'
            }`}>
              {content}
            </div>
            {/* Tooltip arrow */}
            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 -mt-px ${
                warning
                  ? 'text-yellow-50 dark:text-yellow-900/20'
                  : 'text-white dark:text-dark-card'
              }`}
            >
              <svg width="16" height="8" viewBox="0 0 16 8">
                <path d="M8 8L0 0h16z" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
