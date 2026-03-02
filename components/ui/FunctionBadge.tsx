interface FunctionBadgeProps {
  functionType: 'attention' | 'escape' | 'sensory' | 'tangible';
  size?: 'sm' | 'md' | 'lg';
}

const functionConfig = {
  attention: {
    label: 'Attention',
    icon: '👋',
    colorClass: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700'
  },
  escape: {
    label: 'Escape',
    icon: '🚪',
    colorClass: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700'
  },
  sensory: {
    label: 'Sensory',
    icon: '✨',
    colorClass: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700'
  },
  tangible: {
    label: 'Tangible',
    icon: '🎁',
    colorClass: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700'
  }
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5'
};

export default function FunctionBadge({ functionType, size = 'md' }: FunctionBadgeProps) {
  const config = functionConfig[functionType];
  const sizeClass = sizeClasses[size];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-medium ${config.colorClass} ${sizeClass}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
