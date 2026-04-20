import { useState, useEffect, useRef } from 'react';
import { Send, KeyRound, ChevronLeft, ChevronRight, Home, Sparkles } from 'lucide-react';
import Groq from 'groq-sdk';
import { runeLevels } from '../levelsData';
import { loadProgress, setCurrentLevel, completeLevel } from '../gameStorage';
import { Message } from '../types';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface GameArenaProps {
  onNavigate: (page: string, data?: any) => void;
}

export function GameArena({ onNavigate }: GameArenaProps) {
  const progress = loadProgress();
  const [currentLevelId, setCurrentLevelIdState] = useState(progress.currentLevelId);
  const currentLevel = runeLevels.find(l => l.id === currentLevelId) || runeLevels[0];

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [runeInput, setRuneInput] = useState('');
  const [showRuneSubmit, setShowRuneSubmit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      id: '0',
      sender: 'guardian',
      content: currentLevel.narrative,
      timestamp: Date.now()
    }]);
    setAttempts(0);
  }, [currentLevelId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'player',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    setAttempts(prev => prev + 1);

    try {
      const guardianResponse = await callGroqGuardian(inputValue, currentLevel, messages);
      const guardianMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'guardian',
        content: guardianResponse,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, guardianMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'guardian',
        content: `The guardian's voice fades into silence... (Could not reach the arcane network)`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitRune = () => {
    const submittedRune = runeInput.trim().toUpperCase();
    const correctRune = currentLevel.secretRune.toUpperCase();

    if (submittedRune === correctRune) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);

      completeLevel(currentLevelId);

      onNavigate('victory', {
        levelId: currentLevel.id,
        levelName: currentLevel.name,
        secretRune: currentLevel.secretRune,
        messages,
        attempts,
        timeSpent,
        lesson: currentLevel.lesson
      });
    } else {
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: 'guardian',
        content: `❌ The rune "${submittedRune}" is incorrect. The wards remain sealed. Keep trying to extract the true rune from my words...`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
      setRuneInput('');
    }
  };

  const handleChangeLevel = (newLevelId: number) => {
    if (progress.unlockedLevels.includes(newLevelId)) {
      setCurrentLevelIdState(newLevelId);
      setCurrentLevel(newLevelId);
    }
  };

  const canGoPrevious = currentLevelId > 0 && progress.unlockedLevels.includes(currentLevelId - 1);
  const canGoNext = progress.unlockedLevels.includes(currentLevelId + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-indigo-950 text-amber-50">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
          >
            <Home className="w-4 h-4" />
            Home
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleChangeLevel(currentLevelId - 1)}
              disabled={!canGoPrevious}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 rounded-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="text-center min-w-[200px]">
              <div className="text-sm text-purple-300">Level {currentLevel.id}</div>
              <div className="font-semibold text-amber-300">{currentLevel.name}</div>
            </div>

            <button
              onClick={() => handleChangeLevel(currentLevelId + 1)}
              disabled={!canGoNext}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 rounded-lg transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 bg-slate-900/70 backdrop-blur border border-purple-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-amber-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Guardian Chamber
              </h2>
              <span className="text-xs px-2 py-1 bg-purple-900/50 text-purple-200 rounded">
                {currentLevel.difficulty}
              </span>
            </div>

            <div className="h-[400px] overflow-y-auto mb-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-800 scrollbar-track-slate-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'player' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-lg ${
                      msg.sender === 'player'
                        ? 'bg-amber-700/70 text-white'
                        : 'bg-indigo-900/70 text-amber-50'
                    }`}
                  >
                    <div className="text-xs opacity-70 mb-1">
                      {msg.sender === 'player' ? 'You' : 'Guardian'}
                    </div>
                    <div className="text-sm leading-relaxed">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-indigo-900/70 px-4 py-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Speak your words to the guardian..."
                  className="flex-1 px-4 py-3 bg-slate-800 border border-purple-600/50 rounded-lg focus:outline-none focus:border-purple-500 text-amber-50 placeholder-slate-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !inputValue.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-lg transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>

              <button
                onClick={() => setShowRuneSubmit(!showRuneSubmit)}
                className="w-full px-4 py-2 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                {showRuneSubmit ? 'Hide' : 'Submit'} Rune
              </button>

              {showRuneSubmit && (
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={runeInput}
                    onChange={(e) => setRuneInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitRune()}
                    placeholder="Enter the sacred rune (e.g., AETHER-DAWN)"
                    className="flex-1 px-4 py-2 bg-slate-800 border border-amber-600/50 rounded-lg focus:outline-none focus:border-amber-500 text-amber-50 placeholder-slate-500"
                  />
                  <button
                    onClick={handleSubmitRune}
                    disabled={!runeInput.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-semibold rounded-lg transition-all"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/70 backdrop-blur border border-purple-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-purple-300 mb-2">Quest Objective</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{currentLevel.description}</p>
            </div>

            <div className="bg-indigo-950/70 backdrop-blur border border-indigo-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-indigo-300 mb-2">Ward Type</h3>
              <p className="text-sm text-amber-200">{currentLevel.wardType}</p>
            </div>

            <div className="bg-amber-950/50 backdrop-blur border border-amber-700/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-amber-300 mb-2">Hint</h3>
              <p className="text-xs text-slate-300 leading-relaxed italic">{currentLevel.hint}</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Attempts:</span>
                <span className="text-amber-300">{attempts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Progress:</span>
                <span className="text-purple-300">{progress.completedLevels.length} / 13</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function callGroqGuardian(userInput: string, level: any, messageHistory: Message[]): Promise<string> {
  const conversationMessages = messageHistory
    .filter(msg => msg.id !== '0')
    .map(msg => ({
      role: msg.sender === 'player' ? 'user' as const : 'assistant' as const,
      content: msg.content,
    }));

  conversationMessages.push({ role: 'user', content: userInput });

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: level.guardianPrompt },
      ...conversationMessages,
    ],
    max_tokens: 300,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content ?? 'The guardian remains silent...';
}
