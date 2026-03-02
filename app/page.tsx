'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Warm Gradient */}
      <section className="relative min-h-screen bg-hero-sunset dark:bg-hero-sunset flex flex-col">
        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-5xl"
          >
            Support Your Child's Development at Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 max-w-3xl"
          >
            By combining advanced ABA strategies with expert clinician insights,
            we provide an accessible pathway to supporting your child's development.
          </motion.p>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 text-white/80 text-sm mb-8"
          >
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white" />
            </div>
            <span>⭐ Evidence-Based Strategies</span>
          </motion.div>
        </div>

        {/* Get Started Button */}
        <motion.div
          className="flex justify-center my-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Link href="/assessment">
            <Button
              size="lg"
              className="bg-gradient-pastel hover:opacity-90 text-white text-xl px-12 py-6 shadow-lg"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>

        {/* Card Tabs at Bottom - Adapted to App Features */}
        <div className="px-4 pb-8 sm:pb-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Assessment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/assessment">
                <Card className="bg-warm-surface/95 backdrop-blur-sm hover:bg-warm-surface cursor-pointer px-4 py-3 text-center group hero-button">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
                    Assessment
                  </h3>
                  <div className="mt-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Card 2: Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/goals">
                <Card className="bg-warm-surface/95 backdrop-blur-sm hover:bg-warm-surface cursor-pointer px-4 py-3 text-center group hero-button">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
                    Teaching Goals
                  </h3>
                  <div className="mt-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Card 3: Behavior Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link href="/bip">
                <Card className="bg-warm-surface/95 backdrop-blur-sm hover:bg-warm-surface cursor-pointer px-4 py-3 text-center group hero-button">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
                    Behavior Plan
                  </h3>
                  <div className="mt-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Card 4: Learn ABA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/learn">
                <Card className="bg-warm-surface/95 backdrop-blur-sm hover:bg-warm-surface cursor-pointer px-4 py-3 text-center group hero-button">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
                    Learn ABA
                  </h3>
                  <div className="mt-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
