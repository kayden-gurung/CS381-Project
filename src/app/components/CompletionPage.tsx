import { Trophy, Sparkles, Home, RotateCcw } from 'lucide-react';
import { runeLevels } from '../levelsData';
import { loadProgress, resetProgress } from '../gameStorage';

interface CompletionPageProps {
  onNavigate: (page: string) => void;
}

export function CompletionPage({ onNavigate }: CompletionPageProps) {
  const progress = loadProgress();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      onNavigate('landing');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 text-amber-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center gap-4">
              <Trophy className="w-20 h-20 text-amber-400 animate-bounce" />
              <Sparkles className="w-20 h-20 text-purple-400 animate-pulse" />
              <Trophy className="w-20 h-20 text-amber-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
              Master of Runes
            </h1>

            <p className="text-2xl text-purple-200">
              You have conquered all thirteen towers!
            </p>
          </div>

          <div className="bg-slate-900/70 backdrop-blur border-2 border-amber-700/50 rounded-xl p-8 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold text-amber-300">
                Sacred Runes Mastered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {runeLevels.map((level) => (
                  <div
                    key={level.id}
                    className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-purple-300">Level {level.id}</div>
                        <div className="text-sm font-semibold text-amber-200">{level.name}</div>
                      </div>
                      <div className="text-lg font-mono text-amber-400">
                        {level.secretRune}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-indigo-950/50 border border-indigo-700/50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-semibold text-indigo-300 text-center">
              Journey Complete
            </h3>
            <p className="text-slate-300 leading-relaxed text-center">
              You have mastered the ancient art of spell persuasion and learned the secrets of prompt
              injection through thirteen levels of increasingly sophisticated magical wards. From the
              Lonely Keeper's isolation to the Eternal Archive's vast memory, you've outwitted them all.
            </p>
            <p className="text-purple-200 text-center italic">
              The towers now stand open, their guardians at peace, their secrets revealed.
            </p>
          </div>

          <div className="bg-amber-950/50 border border-amber-700/50 rounded-lg p-6 space-y-3">
            <h3 className="text-lg font-semibold text-amber-300 text-center">
              What You've Learned
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✦</span>
                <span>How simple prohibition filters can be bypassed with paraphrasing and hypotheticals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✦</span>
                <span>Why keyword blocklists are brittle and easily circumvented with synonyms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✦</span>
                <span>How intent classification can be fooled by framing malicious requests innocently</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✦</span>
                <span>The vulnerabilities of stateless systems to self-referential logic</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✦</span>
                <span>Advanced techniques like multi-agent consensus exploitation and adaptive defense bypass</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Return Home
            </button>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-amber-100 rounded-lg transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              Start New Quest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
