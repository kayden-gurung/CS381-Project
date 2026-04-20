import { GameProgress } from './types';

const STORAGE_KEY = 'runeQuest_progress';

export function saveProgress(progress: Partial<GameProgress>): void {
  try {
    const existing = loadProgress();
    const updated = { ...existing, ...progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

export function loadProgress(): GameProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }

  return {
    currentLevelId: 0,
    unlockedLevels: [0],
    completedLevels: [],
    hasSeenTutorial: false
  };
}

export function unlockLevel(levelId: number): void {
  const progress = loadProgress();
  if (!progress.unlockedLevels.includes(levelId)) {
    progress.unlockedLevels.push(levelId);
    progress.unlockedLevels.sort((a, b) => a - b);
    saveProgress(progress);
  }
}

export function completeLevel(levelId: number): void {
  const progress = loadProgress();
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
    saveProgress(progress);
  }

  const nextLevel = levelId + 1;
  unlockLevel(nextLevel);
}

export function setCurrentLevel(levelId: number): void {
  saveProgress({ currentLevelId: levelId });
}

export function markTutorialComplete(): void {
  saveProgress({ hasSeenTutorial: true });
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
