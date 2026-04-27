import { Scroll, Sparkles, BookOpen, Trophy, Shield } from 'lucide-react';
import { loadProgress } from '../gameStorage';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const progress = loadProgress();
  const hasProgress = progress.completedLevels.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 text-amber-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Sparkles className="w-16 h-16 mx-auto text-amber-400 animate-pulse" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 bg-clip-text text-transparent">
              Rune Quest
            </h1>
            <p className="text-xl text-purple-200">
              Master the Ancient Art of Spell Persuasion
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur border-2 border-amber-700/50 rounded-lg p-8 space-y-6">
            <p className="text-lg text-amber-100/90">
              Journey through enchanted towers, outwit magical guardians, and uncover sacred runes.
              Learn the secrets of prompt injection through fantasy and adventure.
            </p>

            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                  <Scroll className="w-5 h-5" />
                  <h3 className="font-semibold">13 Mystical Levels</h3>
                </div>
                <p className="text-sm text-slate-300">
                  From novice to master, face increasingly powerful wards
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-semibold">Learn & Grow</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Discover prompt injection techniques in magical form
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-purple-300">
                  <Trophy className="w-5 h-5" />
                  <h3 className="font-semibold">Track Progress</h3>
                </div>
                <p className="text-sm text-slate-300">
                  Your journey is saved as you unlock each sacred rune
                </p>
              </div>
            </div>

            <div className="border-t border-amber-700/30 pt-4">
              <div className="flex items-center gap-2 justify-center mb-2 text-teal-300">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">New: Defense Mode</span>
              </div>
              <p className="text-sm text-slate-400 text-center">
                Switch sides — craft your own guardian ward and test it against the full attack corpus
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate(progress.hasSeenTutorial ? 'arena' : 'tutorial')}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-semibold rounded-lg shadow-lg shadow-amber-900/50 transition-all transform hover:scale-105"
            >
              {hasProgress ? 'Continue Quest' : 'Begin Your Journey'}
            </button>

            <button
              onClick={() => onNavigate('defense')}
              className="px-8 py-4 bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-lg shadow-lg shadow-teal-900/50 transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
            >
              <Shield className="w-5 h-5" />
              Guardian Builder
            </button>

            {!progress.hasSeenTutorial && (
              <button
                onClick={() => onNavigate('tutorial')}
                className="px-8 py-4 bg-slate-700 hover:bg-slate-600 text-amber-100 font-semibold rounded-lg transition-all"
              >
                View Tutorial
              </button>
            )}
          </div>

          {hasProgress && (
            <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 text-sm">
              <p className="text-purple-200">
                Progress: {progress.completedLevels.length} / 13 Runes Discovered
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-indigo-950/50 border border-indigo-800/50 rounded-lg p-6 space-y-3">
            <h2 className="text-xl font-semibold text-amber-300 text-center">The Legend</h2>
            <p className="text-slate-300 leading-relaxed">
              Long ago, powerful guardians were bound to protect thirteen sacred runes. Each guardian
              was enchanted with increasingly sophisticated wards to prevent the runes from falling
              into the wrong hands. You are a seeker of ancient knowledge, and you must use wit,
              persuasion, and creativity to convince these guardians to reveal their secrets.
            </p>
            <p className="text-slate-400 text-sm italic text-center">
              But beware - the guardians grow more cunning with each tower you ascend...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
