'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import activitiesData from '@/data/activities.json';

export default function ToysPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Toys', icon: '🎯' },
    { id: 'oral_sensory', name: 'For Biting/Chewing', icon: '🦷' },
    { id: 'tactile', name: 'Tactile/Touch', icon: '✋' },
    { id: 'proprioceptive', name: 'Deep Pressure', icon: '💪' },
    { id: 'auditory', name: 'Sound Sensitivity', icon: '🔇' }
  ];

  const filteredToys = selectedCategory === 'all'
    ? activitiesData.replacementToys
    : activitiesData.replacementToys.filter(toy => toy.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <Link href="/resources">
          <Button variant="outline" size="sm">← Back to Resources</Button>
        </Link>
      </div>

      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-textDark dark:text-dark-text-primary mb-4">
          🧸 Replacement Toys & Sensory Tools
        </h1>
        <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
          Safe alternatives for children who need sensory input through biting, touching, or movement
        </p>
      </motion.div>

      <div className="mb-8 flex gap-3 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-primary dark:bg-primary-light text-white dark:text-textDark shadow-md'
                : 'bg-warm-surface dark:bg-dark-card text-textDark dark:text-dark-text-secondary border-2 border-warm-border dark:border-dark-border hover:border-primary dark:hover:border-primary-light'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredToys.map((toy, index) => (
          <motion.div
            key={toy.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-surface dark:to-dark-border rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl">🧸</span>
              </div>

              <h3 className="text-xl font-bold text-textDark dark:text-dark-text-primary mb-2">
                {toy.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4">
                {toy.description}
              </p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-dark-text-muted mb-2">
                  AGE RANGE: {toy.ageRange}
                </p>
                <p className="text-sm font-semibold text-primary dark:text-primary-light mb-2">
                  Benefits:
                </p>
                <ul className="text-sm space-y-1">
                  {toy.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-2 text-gray-700 dark:text-dark-text-secondary">
                      <span className="text-success">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={toy.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-4 py-2 bg-primary dark:bg-primary-light text-white dark:text-textDark font-semibold rounded-lg hover:bg-primary-dark dark:hover:bg-primary transition-colors"
              >
                Find on Amazon →
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
