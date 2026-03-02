'use client';

import InfoTooltip from '@/components/ui/InfoTooltip';

interface TwoColumnTextAreasProps {
  restrictionsValue: string;
  reinforcersValue: string;
  onRestrictionsChange: (value: string) => void;
  onReinforcersChange: (value: string) => void;
}

export default function TwoColumnTextAreas({
  restrictionsValue,
  reinforcersValue,
  onRestrictionsChange,
  onReinforcersChange
}: TwoColumnTextAreasProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-textDark dark:text-dark-text-primary mb-2">
          Restrictions & Reinforcers
        </h3>
        <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
          Document what should NOT be used and what motivates the child
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Restrictions - Left Column */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <label className="block text-sm font-semibold text-red-700 dark:text-red-400">
              🚫 Restrictions
            </label>
            <InfoTooltip
              content={
                <div>
                  <p className="font-semibold mb-2">Restrictions</p>
                  <p className="text-sm mb-2">
                    List strategies, items, or approaches that should NOT be used with this child.
                  </p>
                  <p className="text-xs">
                    Examples: Physical punishment, certain sensory items that trigger, specific foods, timeout in dark room, etc.
                  </p>
                </div>
              }
              warning={true}
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-dark-text-secondary">
            What should NOT be used or done with this child?
          </p>
          <textarea
            value={restrictionsValue}
            onChange={(e) => onRestrictionsChange(e.target.value)}
            placeholder="Examples:
• No physical restraint unless safety emergency
• Avoid loud noises or bright lights
• Do not withhold meals
• No extended timeouts"
            rows={8}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50 dark:bg-red-900/10 text-textDark dark:text-dark-text-primary border-red-300 dark:border-red-700 placeholder:text-gray-500"
          />
        </div>

        {/* Reinforcers - Right Column */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <label className="block text-sm font-semibold text-green-700 dark:text-green-400">
              ⭐ Reinforcers
            </label>
            <InfoTooltip
              content={
                <div>
                  <p className="font-semibold mb-2">Reinforcers</p>
                  <p className="text-sm mb-2">
                    List what motivates this child - things they work for and enjoy.
                  </p>
                  <p className="text-xs">
                    Examples: Specific toys, activities, foods, praise styles, privileges, sensory items, etc.
                  </p>
                </div>
              }
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-dark-text-secondary">
            What motivates and rewards this child?
          </p>
          <textarea
            value={reinforcersValue}
            onChange={(e) => onReinforcersChange(e.target.value)}
            placeholder="Examples:
• Favorite toys: dinosaurs, trains
• Screen time (10-15 min)
• Verbal praise: 'Great job!'
• Physical: high-fives, tickles
• Snacks: goldfish crackers
• Activities: swinging, jumping"
            rows={8}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 dark:bg-green-900/10 text-textDark dark:text-dark-text-primary border-green-300 dark:border-green-700 placeholder:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}
