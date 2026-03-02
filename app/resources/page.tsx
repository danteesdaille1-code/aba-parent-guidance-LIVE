'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';

export default function ResourcesPage() {
  const resources = [
    {
      title: 'Replacement Toys',
      description: 'Safe alternatives for children who bite, seek tactile input, or need sensory support',
      icon: '🧸',
      href: '/resources/toys',
      color: 'from-pink-100 to-purple-200 dark:from-pink-900/30 dark:to-purple-800/30',
      features: [
        'Chewy necklaces & tubes',
        'Fidget toys',
        'Weighted items',
        'Sensory tools'
      ]
    },
    {
      title: 'Activity Suggestions',
      description: 'Engaging activities that children on the spectrum typically love, with teaching tips',
      icon: '🎨',
      href: '/resources/activities',
      color: 'from-blue-100 to-cyan-200 dark:from-blue-900/30 dark:to-cyan-800/30',
      features: [
        'Bubbles & sensory play',
        'Shape sorters & puzzles',
        'Pretend play ideas',
        'Gross motor activities'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-textDark dark:text-dark-text-primary mb-4">
          Resources for Parents
        </h1>
        <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto">
          Practical tools, toys, and activities to support your child's development and address sensory needs
        </p>
      </motion.div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {resources.map((resource, index) => (
          <motion.div
            key={resource.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Link href={resource.href}>
              <Card
                hover
                className={`h-full bg-gradient-to-br ${resource.color} border-2 border-transparent hover:border-primary dark:hover:border-primary-light cursor-pointer group`}
              >
                <div className="text-center mb-6">
                  <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {resource.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-textDark dark:text-dark-text-primary mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                    {resource.title}
                  </h2>
                  <p className="text-gray-700 dark:text-dark-text-secondary mb-6">
                    {resource.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-textDark dark:text-dark-text-primary mb-3">
                    What you'll find:
                  </p>
                  <ul className="space-y-2">
                    {resource.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-dark-text-secondary">
                        <span className="text-primary dark:text-primary-light">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-center text-primary dark:text-primary-light font-semibold group-hover:translate-x-2 transition-transform">
                  Explore {resource.title} →
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-warm-subtle dark:bg-blue-900/20 border-l-4 border-primary dark:border-primary-light">
          <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-4">
            💡 How to Use These Resources
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-dark-text-secondary">
            <p>
              <strong>Replacement Toys:</strong> If your child engages in behaviors like biting, hitting, or sensory-seeking, these toys provide safe alternatives that meet the same sensory needs.
            </p>
            <p>
              <strong>Activity Suggestions:</strong> These are activities that many children on the autism spectrum find naturally motivating and engaging. Each includes teaching tips to maximize learning opportunities.
            </p>
            <p className="text-sm italic">
              Note: Every child is unique. What works for one child may not work for another. Use these as starting points and adapt based on your child's individual preferences and needs.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
