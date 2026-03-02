'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import educationalContent from '@/data/educational-content.json';

export default function ConceptPage() {
  const params = useParams();
  const conceptId = params.concept as string;

  const concept = educationalContent.concepts.find(c => c.id === conceptId);

  if (!concept) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-textDark dark:text-dark-text-primary mb-4">
          Concept Not Found
        </h1>
        <Link href="/learn">
          <Button>← Back to Learn Hub</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Back button */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link href="/learn">
          <Button variant="outline" size="sm">
            ← Back to Learn Hub
          </Button>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <span className="text-6xl">{concept.icon}</span>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-textDark dark:text-dark-text-primary mb-2">
              {concept.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">
              {concept.summary}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Video Section */}
      {concept.videoUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-8">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-surface dark:to-dark-border rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-600 dark:text-dark-text-secondary mb-2">
                  Video demonstration coming soon
                </p>
                <p className="text-sm text-gray-500 dark:text-dark-text-muted">
                  Placeholder for: {concept.videoUrl}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Key Takeaways */}
      {concept.keyTakeaways && concept.keyTakeaways.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary-light/10 dark:from-primary-light/5 dark:to-primary/5 border-l-4 border-primary dark:border-primary-light">
            <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-4">
              ⚡ Key Takeaways
            </h2>
            <ul className="space-y-3">
              {concept.keyTakeaways.map((takeaway, index) => (
                <motion.li
                  key={index}
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary dark:bg-primary-light flex items-center justify-center text-white dark:text-textDark text-sm font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 dark:text-dark-text-secondary font-medium">
                    {takeaway}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="mb-8">
          <div
            className="prose dark:prose-invert max-w-none prose-headings:text-textDark dark:prose-headings:text-dark-text-primary prose-p:text-gray-700 dark:prose-p:text-dark-text-secondary prose-li:text-gray-700 dark:prose-li:text-dark-text-secondary"
            dangerouslySetInnerHTML={{ __html: concept.content }}
          />

          {/* Examples if available */}
          {('examples' in concept) && (concept as any).examples && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-border">
              <h3 className="text-xl font-bold text-textDark dark:text-dark-text-primary mb-4">
                📝 Examples
              </h3>
              <div className="space-y-4">
                {(concept as any).examples.map((example: any, index: number) => (
                  <div key={index} className="bg-warm-subtle dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-textDark dark:text-dark-text-primary mb-2">
                      {example.title}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-dark-text-secondary">
                      {example.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </motion.div>

      {/* When to Seek Help */}
      {concept.whenToSeekHelp && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500">
            <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-200 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              When to Seek Professional Help
            </h2>
            <p className="text-yellow-900 dark:text-yellow-100">
              {concept.whenToSeekHelp}
            </p>
          </Card>
        </motion.div>
      )}

      {/* Related Concepts */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-textDark dark:text-dark-text-primary mb-6">
          Continue Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {educationalContent.concepts
            .filter(c => c.id !== conceptId && c.category === concept.category)
            .slice(0, 2)
            .map(relatedConcept => (
              <Link key={relatedConcept.id} href={`/learn/${relatedConcept.id}`}>
                <Card hover className="h-full bg-warm-surface dark:bg-dark-card hover:border-primary dark:hover:border-primary-light border-2 border-transparent transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{relatedConcept.icon}</span>
                    <div>
                      <h3 className="font-bold text-textDark dark:text-dark-text-primary mb-1">
                        {relatedConcept.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
                        {relatedConcept.summary}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
