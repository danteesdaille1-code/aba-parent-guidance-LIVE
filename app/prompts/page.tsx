import Card from '@/components/ui/Card';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function PromptsPage() {
  const promptLevels = [
    {
      level: 1,
      name: 'Independent',
      description: 'Child performs the skill without any assistance',
      example: 'Child requests a snack on their own without any reminder or cue',
      whenToUse: 'This is the goal for all skills. Always give the child a chance to respond independently first.',
      color: 'bg-green-100 border-green-300'
    },
    {
      level: 2,
      name: 'Indirect Verbal Prompt',
      description: 'A general question or statement that cues the behavior',
      example: '"What do you want?" or "What do we say?" instead of telling them exactly what to say',
      whenToUse: 'When the child knows the skill but needs a gentle reminder to use it',
      color: 'bg-blue-100 border-blue-300'
    },
    {
      level: 3,
      name: 'Direct Verbal Prompt',
      description: 'A specific instruction telling the child exactly what to do',
      example: '"Say \'I want cookie\'" or "Put the toy in the box"',
      whenToUse: 'When an indirect prompt is not enough, but the child can follow verbal directions',
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      level: 4,
      name: 'Gestural Prompt',
      description: 'Using gestures like pointing, nodding, or demonstrating',
      example: 'Pointing to the cookie while asking "What do you want?"',
      whenToUse: 'For visual learners or when verbal prompts alone are not effective',
      color: 'bg-orange-100 border-orange-300'
    },
    {
      level: 5,
      name: 'Model Prompt',
      description: 'Demonstrating the full behavior for the child to imitate',
      example: 'Saying "Watch me" and then demonstrating how to request a cookie',
      whenToUse: 'When teaching new skills that the child can learn through imitation',
      color: 'bg-purple-100 border-purple-300'
    },
    {
      level: 6,
      name: 'Partial Physical Prompt',
      description: 'Light touch or gentle guidance to start the movement',
      example: 'Lightly touching the child\'s elbow to prompt them to reach for an item',
      whenToUse: 'When the child needs help getting started but can complete the action',
      color: 'bg-pink-100 border-pink-300'
    },
    {
      level: 7,
      name: 'Full Physical Prompt',
      description: 'Hand-over-hand assistance to complete the entire behavior',
      example: 'Gently guiding the child\'s hands to put a toy away',
      whenToUse: 'When teaching brand new motor skills or when all other prompts have not worked',
      color: 'bg-red-100 border-red-300'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-textDark mb-4">
          ABA Prompt Hierarchy
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Prompts are cues that help your child learn and perform new skills. Using the right amount of prompting is key to teaching effectively.
        </p>
        <div className="p-4 bg-warm-subtle rounded-lg border-l-4 border-primary">
          <p className="text-gray-700">
            <strong>Golden Rule:</strong> Always use the <em>least intrusive prompt</em> that will help your child be successful.
            Start with less help and only provide more support if needed.
          </p>
        </div>
      </div>

      {/* Prompt Levels */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-textDark mb-6">
          Prompt Levels (Least to Most Intrusive)
        </h2>
        <div className="space-y-4">
          {promptLevels.map((prompt) => (
            <Card key={prompt.level} className={`${prompt.color} border-2`}>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-400 flex items-center justify-center font-bold text-xl text-textDark">
                    {prompt.level}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-textDark mb-2">
                    {prompt.name}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {prompt.description}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <strong className="text-sm text-gray-600">Example:</strong>
                      <p className="text-gray-700 italic">"{prompt.example}"</p>
                    </div>
                    <div>
                      <strong className="text-sm text-gray-600">When to use:</strong>
                      <p className="text-gray-700">{prompt.whenToUse}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Key Principles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-textDark mb-6">
          Key Principles for Using Prompts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-green-50">
            <h3 className="text-lg font-bold text-textDark mb-3 flex items-center gap-2">
              <span className="text-2xl">✅</span> Do
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Always wait 3-5 seconds for an independent response first</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Use the least intrusive prompt that works</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Fade prompts gradually over time</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Reinforce prompted responses, but celebrate independent ones more</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Be consistent with your prompting approach</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-red-50">
            <h3 className="text-lg font-bold text-textDark mb-3 flex items-center gap-2">
              <span className="text-2xl">❌</span> Don't
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-2">
                <span>•</span>
                <span>Don't jump straight to physical prompts</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Don't keep using the same prompt if it's not working</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Don't provide prompts too quickly - give time to respond</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Don't use prompts forever - work toward independence</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Don't forget to reinforce the behavior after prompting</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Prompt Fading */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-textDark mb-6">
          Fading Prompts (Moving Toward Independence)
        </h2>
        <Card>
          <p className="text-gray-700 mb-4">
            The goal is always for your child to perform skills independently. Here's how to fade prompts over time:
          </p>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="font-bold text-primary text-lg">1.</span>
              <div>
                <strong className="block mb-1">Start with success</strong>
                <p className="text-gray-600">Use whatever prompt level is needed for your child to be successful consistently (80%+)</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary text-lg">2.</span>
              <div>
                <strong className="block mb-1">Reduce gradually</strong>
                <p className="text-gray-600">Once the child is successful, move to a less intrusive prompt (e.g., from full physical to partial physical)</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary text-lg">3.</span>
              <div>
                <strong className="block mb-1">Delay the prompt</strong>
                <p className="text-gray-600">Wait a bit longer before providing the prompt to give more opportunity for independence</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary text-lg">4.</span>
              <div>
                <strong className="block mb-1">Mix it up</strong>
                <p className="text-gray-600">Alternate between prompted and unprompted trials to test and build independence</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary text-lg">5.</span>
              <div>
                <strong className="block mb-1">Celebrate independence!</strong>
                <p className="text-gray-600">Provide extra reinforcement when the child does it without any help</p>
              </div>
            </li>
          </ol>
        </Card>
      </div>

      {/* Example Scenario */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-textDark mb-6">
          Real Example: Teaching Hand Washing
        </h2>
        <Card className="bg-purple-50">
          <div className="space-y-4">
            <div>
              <strong className="text-primary">Week 1 (Full Physical):</strong>
              <p className="text-gray-700">Guide child's hands through entire sequence: turn on water, wet hands, pump soap, rub hands, rinse, dry.</p>
            </div>
            <div>
              <strong className="text-primary">Week 2 (Partial Physical):</strong>
              <p className="text-gray-700">Light touch on elbow to prompt each step, let child complete the movement.</p>
            </div>
            <div>
              <strong className="text-primary">Week 3 (Gestural):</strong>
              <p className="text-gray-700">Point to sink, then soap, then towel. Child performs actions independently.</p>
            </div>
            <div>
              <strong className="text-primary">Week 4 (Direct Verbal):</strong>
              <p className="text-gray-700">"Wash your hands" - child completes entire sequence with just the instruction.</p>
            </div>
            <div>
              <strong className="text-primary">Week 5 (Independent):</strong>
              <p className="text-gray-700">Child sees dirty hands or hears "bathroom time" and washes hands without prompting!</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Related Resources */}
      <div className="p-6 bg-warm-subtle rounded-lg">
        <h2 className="text-xl font-bold text-textDark mb-4">
          Apply This Knowledge
        </h2>
        <p className="text-gray-700 mb-4">
          Every goal in our library includes specific prompt recommendations. Check them out!
        </p>
        <div className="flex gap-4 flex-wrap">
          <Link href="/goals">
            <Button>
              Browse Goals
            </Button>
          </Link>
          <Link href="/assessment">
            <Button variant="outline">
              Take Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
