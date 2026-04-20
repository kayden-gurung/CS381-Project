import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, MessageSquare, KeyRound, BookOpen } from 'lucide-react';
import { markTutorialComplete } from '../gameStorage';

interface TutorialPageProps {
  onNavigate: (page: string) => void;
}

export function TutorialPage({ onNavigate }: TutorialPageProps) {
  const [step, setStep] = useState(0);

  const tutorials = [
    {
      icon: <Sparkles className="w-12 h-12 text-amber-400" />,
      title: 'Welcome, Seeker',
      content: 'You stand before the thirteen towers, each guarded by a magical being protecting a sacred rune. Your goal is to convince these guardians to reveal their secrets through clever conversation.'
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-purple-400" />,
      title: 'Craft Your Words',
      content: 'Each guardian will respond to your messages. Type your requests in the input field and press Send. Be creative - sometimes direct questions work, other times you need indirect approaches, hypotheticals, or storytelling.'
    },
    {
      icon: <KeyRound className="w-12 h-12 text-green-400" />,
      title: 'Discover the Rune',
      content: 'When you successfully persuade a guardian, they will reveal the sacred rune in their response. It will look like "AETHER-DAWN" or "MOON-WHISPER". Copy it exactly!'
    },
    {
      icon: <BookOpen className="w-12 h-12 text-blue-400" />,
      title: 'Learn & Grow',
      content: 'Each level teaches real prompt injection and AI security concepts disguised as fantasy magic. The wards grow stronger as you progress, teaching you defensive techniques used in modern AI systems.'
    }
  ];

  const currentTutorial = tutorials[step];

  const handleNext = () => {
    if (step < tutorials.length - 1) {
      setStep(step + 1);
    } else {
      markTutorialComplete();
      onNavigate('arena');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    markTutorialComplete();
    onNavigate('arena');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 text-amber-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-900/70 backdrop-blur border-2 border-purple-700/50 rounded-xl p-8 space-y-8">
          <div className="flex justify-center">
            {currentTutorial.icon}
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-amber-300">
              {currentTutorial.title}
            </h2>
            <p className="text-lg text-slate-200 leading-relaxed">
              {currentTutorial.content}
            </p>
          </div>

          <div className="flex gap-2 justify-center">
            {tutorials.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === step ? 'bg-amber-400' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 text-amber-100 rounded-lg transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleSkip}
              className="px-4 py-2 text-slate-400 hover:text-amber-200 transition-colors"
            >
              Skip Tutorial
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-semibold rounded-lg transition-all"
            >
              {step === tutorials.length - 1 ? 'Begin Quest' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Step {step + 1} of {tutorials.length}
          </p>
        </div>
      </div>
    </div>
  );
}
