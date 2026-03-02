import { BehaviorPlan, BehaviorOption, ReplacementBehaviorOption, StrategyOption } from '@/types/bip';

interface BIPChartProps {
  plan: BehaviorPlan;
  options: {
    targetBehaviors: BehaviorOption[];
    replacementBehaviors: ReplacementBehaviorOption[];
    antecedentStrategies: StrategyOption[];
    teachingStrategies: StrategyOption[];
    consequenceStrategies: StrategyOption[];
  };
}

export default function BIPChart({ plan, options }: BIPChartProps) {
  // Helper to get label by ID
  const getBehaviorLabel = (id: string) => {
    const behavior = options.targetBehaviors.find(b => b.id === id);
    return behavior?.label || id;
  };

  const getReplacementLabel = (id: string, customNote?: string) => {
    // Handle legacy custom notes
    if (id.startsWith('legacy_') && customNote) {
      return customNote;
    }
    const replacement = options.replacementBehaviors.find(r => r.id === id);
    return replacement?.label || customNote || id;
  };

  const getStrategyLabel = (id: string, options: StrategyOption[], customNote?: string) => {
    const strategy = options.find(s => s.id === id);
    return strategy?.label || customNote || id;
  };

  // Build chart data - single row for the target behavior
  const chartData = plan.targetBehavior ? [{
    targetBehavior: getBehaviorLabel(plan.targetBehavior.id),
    function: plan.behaviorFunctions ? Object.entries(plan.behaviorFunctions)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(', ') : '',
    antecedent: plan.antecedentStrategies
      .slice(0, 2)
      .map(s => getStrategyLabel(s.id, options.antecedentStrategies, s.customNote))
      .join(', '),
    replacement: plan.replacementBehaviors.length > 0
      ? plan.replacementBehaviors
          .slice(0, 2)
          .map(r => getReplacementLabel(r.id, r.customNote))
          .join(', ')
      : '',
    consequence: plan.consequenceStrategies
      .slice(0, 2)
      .map(s => getStrategyLabel(s.id, options.consequenceStrategies, s.customNote))
      .join(', ')
  }] : [];

  return (
    <div className="space-y-6">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-warm-elevated border-b-2 border-warm-border">
              <th className="px-4 py-3 text-left font-semibold text-warm-text dark:text-white">
                Target Behavior
              </th>
              <th className="px-4 py-3 text-left font-semibold text-warm-text dark:text-white">
                Function
              </th>
              <th className="px-4 py-3 text-left font-semibold text-warm-text dark:text-white">
                Prevention Strategy
              </th>
              <th className="px-4 py-3 text-left font-semibold text-warm-text dark:text-white">
                Replacement Behavior
              </th>
              <th className="px-4 py-3 text-left font-semibold text-warm-text dark:text-white">
                Response Strategy
              </th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-warm-border hover:bg-warm-elevated/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-warm-text dark:text-white">
                  {row.targetBehavior}
                </td>
                <td className="px-4 py-3">
                  {row.function ? (
                    <span className="text-sm text-warm-text dark:text-white capitalize">
                      {row.function}
                    </span>
                  ) : (
                    <span className="text-sm text-warm-text/50 dark:text-white/50 italic">Not set</span>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-warm-text dark:text-white">
                  {row.antecedent || <span className="text-warm-text/50 dark:text-white/50 italic">None selected</span>}
                </td>
                <td className="px-4 py-3 text-sm text-warm-text dark:text-white">
                  {row.replacement || <span className="text-warm-text/50 dark:text-white/50 italic">None selected</span>}
                </td>
                <td className="px-4 py-3 text-sm text-warm-text dark:text-white">
                  {row.consequence || <span className="text-warm-text/50 dark:text-white/50 italic">None selected</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {chartData.map((row, index) => (
          <div
            key={index}
            className="bg-white dark:bg-warm-card border-2 border-warm-border rounded-lg p-4 space-y-3"
          >
            <div>
              <h4 className="text-xs font-semibold text-warm-text/60 dark:text-white/60 uppercase mb-1">
                Target Behavior
              </h4>
              <p className="font-semibold text-warm-text dark:text-white">
                {row.targetBehavior}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-warm-text/60 dark:text-white/60 uppercase mb-1">
                Function
              </h4>
              {row.function ? (
                <span className="text-sm text-warm-text dark:text-white capitalize">
                  {row.function}
                </span>
              ) : (
                <span className="text-sm text-warm-text/50 dark:text-white/50 italic">Not set</span>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-warm-text/60 dark:text-white/60 uppercase mb-1">
                Prevention Strategy
              </h4>
              <p className="text-sm text-warm-text dark:text-white">
                {row.antecedent || <span className="text-warm-text/50 dark:text-white/50 italic">None selected</span>}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-warm-text/60 dark:text-white/60 uppercase mb-1">
                Replacement Behavior
              </h4>
              <p className="text-sm text-warm-text dark:text-white">
                {row.replacement || <span className="text-warm-text/50 dark:text-white/50 italic">None selected</span>}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-warm-text/60 dark:text-white/60 uppercase mb-1">
                Response Strategy
              </h4>
              <p className="text-sm text-warm-text dark:text-white">
                {row.consequence || <span className="text-warm-text/50 dark:text-white/50 italic">None selected</span>}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .lg\\:block {
            display: block !important;
          }
          .lg\\:hidden {
            display: none !important;
          }
          table {
            page-break-inside: auto;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
          thead {
            display: table-header-group;
          }
        }
      `}</style>
    </div>
  );
}
