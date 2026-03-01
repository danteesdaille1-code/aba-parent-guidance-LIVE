import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Support Your Child's Development at Home
          </h1>
          <p className="text-xl sm:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Evidence-based ABA strategies and personalized guidance to help your child learn and grow
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/assessment">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Assessment
              </Button>
            </Link>
            <Link href="/goals">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white bg-opacity-10 hover:bg-opacity-20 border-white">
                Browse Goals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-textDark text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                Take the Assessment
              </h3>
              <p className="text-gray-600">
                Answer questions about your child's current skills across communication, social, daily living, and behavior areas
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                Get Personalized Goals
              </h3>
              <p className="text-gray-600">
                Receive tailored recommendations for goals that match your child's needs and developmental level
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-textDark mb-3">
                Follow Step-by-Step Guidance
              </h3>
              <p className="text-gray-600">
                Access detailed teaching procedures, parent tips, and data collection methods for each goal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-textDark text-center mb-12">
            Everything You Need to Teach at Home
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="text-center">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-lg font-bold text-textDark mb-2">
                  Skills Assessment
                </h3>
                <p className="text-gray-600 text-sm">
                  Identify your child's strengths and areas for growth
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-textDark mb-2">
                  Goal Library
                </h3>
                <p className="text-gray-600 text-sm">
                  Browse evidence-based goals with detailed teaching procedures
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-lg font-bold text-textDark mb-2">
                  Prompt Guide
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn the ABA prompt hierarchy for effective teaching
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-textDark mb-2">
                  BIP Generator
                </h3>
                <p className="text-gray-600 text-sm">
                  Create printable behavior intervention plans
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* What is ABA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-blue-50 rounded-lg p-8 border-2 border-primary">
            <h2 className="text-2xl sm:text-3xl font-bold text-textDark mb-4">
              What is ABA?
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Applied Behavior Analysis (ABA)</strong> is a scientific approach to understanding behavior and learning.
              It's one of the most effective, evidence-based interventions for children on the autism spectrum and those with developmental delays.
            </p>
            <p className="text-gray-700 mb-4">
              ABA focuses on:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Breaking skills down into small, teachable steps</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Using positive reinforcement to encourage learning</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Teaching new skills systematically and consistently</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">✓</span>
                <span>Collecting data to track progress and adjust strategies</span>
              </li>
            </ul>
            <p className="text-gray-700">
              This app translates professional ABA strategies into practical, parent-friendly guidance you can use at home.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-success to-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Take the assessment to discover personalized goals and strategies for your child
          </p>
          <Link href="/assessment">
            <Button size="lg" className="bg-white text-success hover:bg-gray-100 text-lg px-8">
              Start Your Assessment
            </Button>
          </Link>
          <p className="mt-6 text-sm opacity-80">
            Takes about 10-15 minutes • Results are saved automatically
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-textDark text-center mb-12">
            Who This App Is For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-green-50 border-2 border-success">
              <h3 className="text-xl font-bold text-textDark mb-3 flex items-center gap-2">
                <span className="text-2xl">✅</span> Perfect For
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Parents of children on the autism spectrum</li>
                <li>• Families with children who have developmental delays</li>
                <li>• Caregivers seeking structured teaching strategies</li>
                <li>• Parents who want to reinforce skills between therapy sessions</li>
                <li>• Anyone looking for evidence-based guidance</li>
              </ul>
            </Card>

            <Card className="bg-yellow-50 border-2 border-yellow-400">
              <h3 className="text-xl font-bold text-textDark mb-3 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Important Note
              </h3>
              <p className="text-gray-700 mb-3">
                This app provides general educational guidance. It is <strong>not</strong> a substitute for:
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Professional evaluation or diagnosis</li>
                <li>• One-on-one ABA therapy with a BCBA</li>
                <li>• Medical or psychological treatment</li>
                <li>• Individualized behavior plans for complex needs</li>
              </ul>
              <p className="text-gray-700 mt-3 text-sm">
                Always consult with qualified professionals for your child's specific needs.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
