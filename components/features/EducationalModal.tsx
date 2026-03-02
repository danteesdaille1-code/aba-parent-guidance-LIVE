'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface EducationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  type?: 'info' | 'warning';
}

export default function EducationalModal({
  isOpen,
  onClose,
  title,
  content,
  type = 'info',
}: EducationalModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-warm-surface dark:bg-dark-card rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200 dark:border-dark-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`p-6 border-b border-gray-200 dark:border-dark-border ${
                type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-gradient-to-r from-gradient-start to-gradient-mid dark:from-dark-surface dark:to-dark-card'
              }`}>
                <div className="flex items-start justify-between gap-4">
                  <h2 className={`text-2xl font-bold ${
                    type === 'warning' ? 'text-yellow-900 dark:text-yellow-200' : 'text-textDark dark:text-dark-text-primary'
                  }`}>
                    {type === 'warning' && '⚠️ '}
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 dark:text-dark-text-muted hover:text-gray-700 dark:hover:text-dark-text-secondary transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div className="prose dark:prose-invert max-w-none">
                  {content}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-dark-border bg-warm-subtle dark:bg-dark-surface">
                <Button onClick={onClose} className="w-full">
                  Got it!
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Pre-defined educational content components
export function ExtinctionBurstContent() {
  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-primary dark:text-primary-light">
        Why does behavior get worse before it gets better?
      </p>

      <div className="bg-warm-subtle dark:bg-blue-900/20 p-4 rounded-lg">
        <p className="font-semibold mb-2">Think of it like a vending machine:</p>
        <p>
          If you put money in a vending machine and it doesn't give you your snack, what do you do?
          You probably push the button harder, maybe hit the machine, or try several times before giving up.
        </p>
        <p className="mt-2">
          <strong>This is exactly what happens with behavior.</strong> When something that used to work
          (like screaming to get attention) suddenly stops working, your child will likely try HARDER
          at first - this is called an <strong>extinction burst</strong>.
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-semibold">What to expect:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>The behavior may temporarily increase in frequency (happening more often)</li>
          <li>The behavior may increase in intensity (getting louder, more forceful)</li>
          <li>New problem behaviors may appear briefly</li>
          <li>This typically lasts a few days to a couple weeks</li>
        </ul>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-success">
        <p className="font-semibold mb-2">✓ Why you should stick with the plan:</p>
        <p>
          The extinction burst is actually a <strong>sign that your plan is working!</strong> Your child
          is testing to see if the old behavior will still work. If you give in during the burst, you
          teach them that they just need to try harder to get what they want, making the behavior much
          worse in the long run.
        </p>
        <p className="mt-2 font-semibold">
          Consistency is KEY. The behavior WILL decrease if you stay the course.
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
        <p className="font-semibold mb-2">⚠️ When to seek help:</p>
        <p>
          If behaviors become dangerous during the extinction burst, or if you're struggling to stay
          consistent, reach out to a BCBA for support. They can help you through this challenging phase.
        </p>
      </div>
    </div>
  );
}

export function ConsequencesExplainedContent() {
  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-primary dark:text-primary-light">
        Understanding how attention affects behavior
      </p>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
        <p className="font-semibold mb-2">💡 Critical Concept:</p>
        <p className="text-lg">
          <strong>BOTH positive (praise, hugs) AND negative (yelling, scolding) attention can
          INCREASE behavior.</strong>
        </p>
      </div>

      <div className="space-y-3">
        <p className="font-semibold">Here's why:</p>
        <p>
          In ABA, a "consequence" is simply what happens AFTER a behavior. If the consequence makes
          the behavior more likely to happen again, it's called <strong>reinforcement</strong>.
        </p>

        <div className="bg-warm-subtle dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="font-semibold mb-2">Example:</p>
          <p>
            Your child hits their sibling. You immediately rush over, make eye contact, and say
            "No! We don't hit! That's not nice! How would you feel if someone hit you?"
          </p>
          <p className="mt-2">
            <strong>What your child hears:</strong> "When I hit, Mom/Dad stops what they're doing
            and talks to me for a whole minute. I got their full attention!"
          </p>
          <p className="mt-2 text-sm italic">
            Even though you were scolding, you gave attention - and for some children, ANY attention
            is better than no attention.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-semibold">Types of attention that can reinforce behavior:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Yelling or scolding</li>
          <li>Lecturing or explaining why it's wrong</li>
          <li>Making eye contact</li>
          <li>Physical contact (even if it's to redirect)</li>
          <li>Showing emotion (frustration, anger, sadness)</li>
          <li>Other people reacting (siblings, peers)</li>
        </ul>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-success">
        <p className="font-semibold mb-2">✓ Better approach:</p>
        <div className="space-y-2">
          <p>
            <strong>For attention-seeking behaviors:</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Stay calm and boring (minimal reaction)</li>
            <li>Use few or no words</li>
            <li>Avoid eye contact if safe to do so</li>
            <li>Redirect calmly to appropriate behavior</li>
            <li>Give BIG attention when they DO behave appropriately</li>
          </ol>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <p className="font-semibold mb-2">Remember:</p>
        <p>
          Your child isn't being "bad" - they're communicating the best way they know how. The goal
          is to teach them that appropriate behaviors (asking nicely, using words, gentle touch) get
          BETTER and MORE attention than problem behaviors.
        </p>
      </div>
    </div>
  );
}
