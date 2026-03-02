import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-textDark dark:text-dark-text-secondary mb-2">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent transition-colors bg-warm-elevated dark:bg-dark-surface text-textDark dark:text-dark-text-primary ${
          error ? 'border-red-500 dark:border-red-400' : 'border-warm-border dark:border-dark-border'
        } ${className}`}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
