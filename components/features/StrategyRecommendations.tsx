import { StrategyOption } from '@/types/bip';

interface StrategyRecommendationsProps {
  title: string;
  recommendations: string[];  // Array of strategy IDs
  allStrategies: StrategyOption[];
  selectedStrategies: string[];
  onSelectStrategy: (strategyId: string) => void;
  category: 'antecedent' | 'teaching' | 'consequence';
}

export default function StrategyRecommendations({
  title,
  recommendations,
  allStrategies,
  selectedStrategies,
  onSelectStrategy,
  category
}: StrategyRecommendationsProps) {
  if (recommendations.length === 0) {
    return null;
  }

  // Get full strategy objects for recommendations
  const recommendedStrategies = recommendations
    .map(id => allStrategies.find(s => s.id === id))
    .filter((s): s is StrategyOption => s !== undefined)
    .slice(0, 7); // Top 7 recommendations

  const categoryColors = {
    antecedent: 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20',
    teaching: 'border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20',
    consequence: 'border-purple-300 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20'
  };

  const categoryIcons = {
    antecedent: '🔮',
    teaching: '📚',
    consequence: '⚡'
  };

  return (
    <div className={`border-2 rounded-lg p-4 mb-6 ${categoryColors[category]}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{categoryIcons[category]}</span>
        <h3 className="text-lg font-semibold text-warm-text dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-sm text-warm-text/70 dark:text-white/70 mb-4">
        Based on your selected target behaviors, we recommend these strategies. Click to add them to your plan.
      </p>
      <div className="grid grid-cols-1 gap-2">
        {recommendedStrategies.map(strategy => {
          const isSelected = selectedStrategies.includes(strategy.id);
          return (
            <button
              key={strategy.id}
              onClick={() => onSelectStrategy(strategy.id)}
              disabled={isSelected}
              className={`
                text-left p-3 rounded-lg border-2 transition-all
                ${isSelected
                  ? 'bg-warm-elevated/50 border-warm-border/30 opacity-60 cursor-not-allowed'
                  : 'bg-white dark:bg-warm-card border-warm-border hover:border-primary hover:shadow-md cursor-pointer'
                }
              `}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {!isSelected && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                        Recommended
                      </span>
                    )}
                    {isSelected && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700">
                        ✓ Added
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium text-warm-text dark:text-white mt-1">
                    {strategy.label}
                  </h4>
                  <p className="text-sm text-warm-text/70 dark:text-white/70 mt-1">
                    {strategy.description}
                  </p>
                </div>
                {!isSelected && (
                  <span className="text-2xl">+</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
