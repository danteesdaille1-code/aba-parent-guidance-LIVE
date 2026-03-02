'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import educationalContent from '@/data/educational-content.json';

export default function LearnPage() {
  const categories = {
    basics: {
      title: 'ABA Basics',
      description: 'Fundamental concepts every parent should understand',
      icon: '📚',
      color: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30'
    },
    techniques: {
      title: 'Teaching Techniques',
      description: 'Proven methods for teaching new skills',
      icon: '🎯',
      color: 'from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30'
    },
    troubleshooting: {
      title: 'Troubleshooting & Problem-Solving',
      description: 'What to do when things get challenging',
      icon: '🔧',
      color: 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30'
    }
  };

  const conceptsByCategory = {
    basics: educationalContent.concepts.filter(c => c.category === 'basics'),
    techniques: educationalContent.concepts.filter(c => c.category === 'techniques'),
    troubleshooting: educationalContent.concepts.filter(c => c.category === 'troubleshooting')
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-textDark dark:text-dark-text-primary mb-4">
          Learn ABA
        </h1>
        <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto">
          Understand the science behind Applied Behavior Analysis and learn practical techniques to support your child's growth
        </p>
      </motion.div>

      {/* Why Learn Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="mb-12 bg-gradient-to-r from-gradient-start/30 to-gradient-mid/30 dark:from-dark-surface dark:to-dark-card border-2 border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">💡</div>
              <h3 className="font-bold text-textDark dark:text-dark-text-primary mb-2">Understand the 'Why'</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Learn why strategies work so you can adapt them to your unique situation
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-bold text-textDark dark:text-dark-text-primary mb-2">Build Confidence</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Feel empowered knowing the science-backed methods you're using
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🤝</div>
              <h3 className="font-bold text-textDark dark:text-dark-text-primary mb-2">Partner with Professionals</h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                Better collaborate with your BCBA when you understand the terminology
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Concept Categories */}
      {Object.entries(categories).map(([catKey, catInfo], catIndex) => {
        const concepts = conceptsByCategory[catKey as keyof typeof conceptsByCategory];

        return (
          <motion.div
            key={catKey}
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + catIndex * 0.1 }}
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-textDark dark:text-dark-text-primary mb-2 flex items-center gap-3">
                <span className="text-4xl">{catInfo.icon}</span>
                {catInfo.title}
              </h2>
              <p className="text-gray-600 dark:text-dark-text-secondary">
                {catInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {concepts.map((concept, index) => (
                <motion.div
                  key={concept.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + catIndex * 0.1 + index * 0.05 }}
                >
                  <Link href={`/learn/${concept.id}`}>
                    <Card
                      hover
                      className={`h-full bg-gradient-to-br ${catInfo.color} border-2 border-transparent hover:border-primary dark:hover:border-primary-light transition-all duration-300 cursor-pointer group`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                          {concept.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-textDark dark:text-dark-text-primary mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                            {concept.title}
                          </h3>
                          <p className="text-sm text-gray-700 dark:text-dark-text-secondary line-clamp-2">
                            {concept.summary}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center text-primary dark:text-primary-light text-sm font-semibold group-hover:translate-x-2 transition-transform">
                        Learn more →
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-primary/10 to-success/10 dark:from-primary-light/10 dark:to-success-light/10 border-2 border-primary/30 dark:border-primary-light/30 text-center">
          <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-3">
            Questions About ABA?
          </h2>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
            These resources are designed to complement professional services, not replace them.
            For personalized guidance, consult with a Board Certified Behavior Analyst (BCBA).
          </p>
          <a
            href="https://www.bacb.com/bcba-registry/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-primary dark:bg-primary-light text-white dark:text-textDark font-semibold rounded-lg hover:bg-primary-dark dark:hover:bg-primary transition-colors"
          >
            Find a BCBA Near You
          </a>
        </Card>
      </motion.div>
    </div>
  );
}
