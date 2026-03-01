'use client';

import { BehaviorPlan } from '@/types/bip';
import { formatDate } from '@/lib/utils';

interface BIPTemplateProps {
  plan: BehaviorPlan;
}

export default function BIPTemplate({ plan }: BIPTemplateProps) {
  return (
    <div className="print-full-width bg-white p-8 space-y-6">
      {/* Header */}
      <div className="border-b-4 border-primary pb-4">
        <h1 className="text-3xl font-bold text-textDark mb-2">
          Behavior Intervention Plan (BIP)
        </h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Child's Name:</strong> {plan.childName || '_________________'}
          </div>
          <div>
            <strong>Date Created:</strong> {plan.dateCreated}
          </div>
        </div>
      </div>

      {/* Target Behaviors */}
      <section>
        <h2 className="text-xl font-bold text-textDark mb-3 bg-gray-100 p-2">
          Target Behaviors to Decrease
        </h2>
        {plan.targetBehaviors.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {plan.targetBehaviors.map((behavior, index) => (
              <li key={index} className="text-gray-700">{behavior}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No target behaviors specified</p>
        )}
      </section>

      {/* Replacement Behaviors */}
      <section>
        <h2 className="text-xl font-bold text-textDark mb-3 bg-gray-100 p-2">
          Replacement Behaviors to Teach
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          (What we want the child to do instead of the target behavior)
        </p>
        {plan.replacementBehaviors.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {plan.replacementBehaviors.map((behavior, index) => (
              <li key={index} className="text-gray-700">{behavior}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No replacement behaviors specified</p>
        )}
      </section>

      {/* Antecedent Strategies */}
      <section>
        <h2 className="text-xl font-bold text-textDark mb-3 bg-gray-100 p-2">
          Antecedent Strategies (Prevention)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          (What to do BEFORE the behavior occurs to prevent it)
        </p>
        {plan.antecedentStrategies.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {plan.antecedentStrategies.map((strategy, index) => (
              <li key={index} className="text-gray-700">{strategy}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No antecedent strategies specified</p>
        )}
      </section>

      {/* Teaching Strategies */}
      <section>
        <h2 className="text-xl font-bold text-textDark mb-3 bg-gray-100 p-2">
          Teaching Strategies
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          (How to teach the replacement behaviors)
        </p>
        {plan.teachingStrategies.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {plan.teachingStrategies.map((strategy, index) => (
              <li key={index} className="text-gray-700">{strategy}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No teaching strategies specified</p>
        )}
      </section>

      {/* Consequence Strategies */}
      <section>
        <h2 className="text-xl font-bold text-textDark mb-3 bg-gray-100 p-2">
          Consequence Strategies (Response)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          (What to do AFTER the behavior occurs)
        </p>
        {plan.consequenceStrategies.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {plan.consequenceStrategies.map((strategy, index) => (
              <li key={index} className="text-gray-700">{strategy}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No consequence strategies specified</p>
        )}
      </section>

      {/* Data Collection */}
      <section>
        <h2 className="text-xl font-bold text-textDark mb-3 bg-gray-100 p-2">
          Data Collection Method
        </h2>
        {plan.dataCollection ? (
          <p className="text-gray-700">{plan.dataCollection}</p>
        ) : (
          <p className="text-gray-500 italic">No data collection method specified</p>
        )}
      </section>

      {/* Additional Notes */}
      <section>
        <h2 className="text-xl font-bold text-textDark mb-3 bg-gray-100 p-2">
          Additional Notes
        </h2>
        {plan.notes ? (
          <p className="text-gray-700 whitespace-pre-wrap">{plan.notes}</p>
        ) : (
          <p className="text-gray-500 italic">No additional notes</p>
        )}
      </section>

      {/* Footer */}
      <div className="border-t-2 border-gray-300 pt-4 mt-8 text-sm text-gray-600">
        <p className="mb-2">
          <strong>Important:</strong> This behavior plan is for educational purposes and parent guidance.
          It is not a substitute for professional behavior analysis by a Board Certified Behavior Analyst (BCBA).
        </p>
        <p>
          For complex or dangerous behaviors, please consult with a qualified professional.
        </p>
      </div>
    </div>
  );
}
