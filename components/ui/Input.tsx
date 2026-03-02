import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-textDark dark:text-dark-text-secondary mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 min-h-[44px] border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-colors bg-warm-elevated dark:bg-dark-surface text-textDark dark:text-dark-text-primary ${
          error ? 'border-red-500 dark:border-red-400' : 'border-warm-border dark:border-dark-border'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
