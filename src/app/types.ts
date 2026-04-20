export type PageType =
  | 'landing'
  | 'tutorial'
  | 'arena'
  | 'victory'
  | 'completion';

export type WardType =
  | 'none'
  | 'basic-prohibition'
  | 'keyword-ward'
  | 'intent-detection'
  | 'memory-seal'
  | 'layered-defense'
  | 'adaptive-ward'
  | 'chorus-defense'
  | 'paradox-ward'
  | 'dual-realm'
  | 'chaos-detection'
  | 'council-ward'
  | 'adaptive-nightmare';

export interface RuneLevel {
  id: number;
  name: string;
  description: string;
  difficulty: 'novice' | 'apprentice' | 'adept' | 'master';
  secretRune: string;
  wardType: WardType;
  hint: string;
  guardianPrompt: string;
  lesson: string;
  narrative: string;
}

export interface Message {
  id: string;
  sender: 'player' | 'guardian';
  content: string;
  timestamp: number;
}

export interface GameProgress {
  currentLevelId: number;
  unlockedLevels: number[];
  completedLevels: number[];
  hasSeenTutorial: boolean;
}

export interface LevelCompletion {
  levelId: number;
  levelName: string;
  secretRune: string;
  messages: Message[];
  attempts: number;
  timeSpent: number;
  lesson: string;
}
