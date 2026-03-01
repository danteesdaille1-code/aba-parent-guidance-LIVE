'use client';

interface AssessmentQuestionProps {
  questionText: string;
  value: number | null;
  onChange: (value: number) => void;
}

export default function AssessmentQuestion({
  questionText,
  value,
  onChange
}: AssessmentQuestionProps) {
  const options = [
    { value: 5, label: 'Always / Most of the time', emoji: '✅' },
    { value: 4, label: 'Sometimes', emoji: '🔄' },
    { value: 3, label: 'Rarely', emoji: '⚠️' },
    { value: 2, label: 'Never / Not yet', emoji: '❌' },
    { value: 1, label: "I'm not sure", emoji: '❓' }
  ];

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-textDark">{questionText}</p>
      <div className="space-y-2">
        {options.map(opt => (
          <label
            key={opt.value}
            className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all min-h-[56px] ${
              value === opt.value
                ? 'border-primary bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="w-5 h-5 text-primary focus:ring-primary"
            />
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-base font-medium flex-1">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
