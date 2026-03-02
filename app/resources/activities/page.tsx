'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import activitiesData from '@/data/activities.json';

export default function ActivitiesPage() {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <Link href="/resources">
          <Button variant="outline" size="sm">← Back to Resources</Button>
        </Link>
      </div>

      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-textDark dark:text-dark-text-primary mb-4">
          🎨 Activity Suggestions
        </h1>
        <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
          Engaging activities that children on the spectrum typically love, with teaching tips included
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activitiesData.preferredActivities.map((activity, index) => {
          const isExpanded = expandedActivity === activity.id;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-surface dark:to-dark-border rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-7xl">🎨</span>
                </div>

                <h3 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-2">
                  {activity.name}
                </h3>
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                  {activity.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-dark-text-muted mb-3">
                    AGE RANGE: {activity.ageRange}
                  </p>

                  <div className="mb-4">
                    <p className="font-semibold text-textDark dark:text-dark-text-primary mb-2">
                      Skills Targeted:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activity.skillsTargeted.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedActivity(isExpanded ? null : activity.id)}
                    className="text-primary dark:text-primary-light font-semibold hover:underline"
                  >
                    {isExpanded ? '- Hide' : '+ Show'} Teaching Tips
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-4"
                    >
                      <div>
                        <p className="font-semibold text-textDark dark:text-dark-text-primary mb-2">
                          Materials Needed:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-dark-text-secondary">
                          {activity.materials.map((material, i) => (
                            <li key={i}>{material}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-semibold text-textDark dark:text-dark-text-primary mb-2">
                          Teaching Tips:
                        </p>
                        <ul className="space-y-2">
                          {activity.teachingTips.map((tip, i) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <span className="text-primary dark:text-primary-light">✓</span>
                              <span className="text-gray-700 dark:text-dark-text-secondary">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-warm-subtle dark:bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                          <strong>Why it works:</strong> {activity.whyItWorks}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
