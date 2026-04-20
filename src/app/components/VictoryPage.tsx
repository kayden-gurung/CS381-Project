import { Trophy, BookOpen, ChevronRight, Home } from 'lucide-react';
import { LevelCompletion } from '../types';
import { runeLevels } from '../levelsData';
import { loadProgress } from '../gameStorage';

interface VictoryPageProps {
  completion: LevelCompletion;
  onNavigate: (page: string) => void;
}

export function VictoryPage({ completion, onNavigate }: VictoryPageProps) {
  const progress = loadProgress();
  const allCompleted = progress.completedLevels.length === runeLevels.length;
  const nextLevelUnlocked = progress.unlockedLevels.includes(completion.levelId + 1);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 text-amber-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl w-full">
        <div className="bg-slate-900/70 backdrop-blur border-2 border-amber-700/50 rounded-xl p-8 space-y-6">
          <div className="text-center space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-amber-400 animate-pulse" />

            <h1 className="text-4xl font-bold text-amber-300">
              Rune Discovered!
            </h1>

            <p className="text-xl text-purple-200">
              {completion.levelName}
            </p>
          </div>

          <div className="bg-purple-900/30 border-2 border-purple-500/50 rounded-lg p-6 text-center">
            <div className="text-sm text-purple-300 mb-2">Sacred Rune</div>
            <div className="text-3xl font-bold text-amber-300 tracking-wider">
              {completion.secretRune}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-sm text-slate-400">Attempts</div>
              <div className="text-2xl font-bold text-amber-300">{completion.attempts}</div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-sm text-slate-400">Time</div>
              <div className="text-2xl font-bold text-purple-300">{formatTime(completion.timeSpent)}</div>
            </div>
          </div>

          <div className="bg-indigo-950/50 border border-indigo-700/50 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-semibold">Lesson Learned</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {completion.lesson}
            </p>
          </div>

          {allCompleted && (
            <div className="bg-gradient-to-r from-amber-900/50 to-yellow-900/50 border-2 border-amber-500/50 rounded-lg p-6 text-center space-y-2">
              <h3 className="text-xl font-bold text-amber-300">
                🎉 Quest Complete! 🎉
              </h3>
              <p className="text-slate-200">
                You have discovered all 13 sacred runes and mastered the art of spell persuasion!
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-amber-100 rounded-lg transition-all"
            >
              <Home className="w-4 h-4" />
              Home
            </button>

            {!allCompleted && nextLevelUnlocked && (
              <button
                onClick={() => onNavigate('arena')}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                Next Level
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {allCompleted && (
              <button
                onClick={() => onNavigate('completion')}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                View Achievement
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Progress: {progress.completedLevels.length} / {runeLevels.length} Runes Discovered
          </p>
        </div>
      </div>
    </div>
  );
}
