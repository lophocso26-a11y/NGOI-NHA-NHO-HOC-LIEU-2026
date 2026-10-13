import React, { createContext, useContext, useState, useEffect } from 'react';
import { audioManager, SpeakingState } from '../services/audioManager';

export interface GameProgress {
  unlockedStages: number[];
  completedStages: number[];
  stageStars: Record<number, number>;
  earnedBadges: string[];
  totalScore: number;
}

const STORAGE_KEY = 'family_home_lesson_progress_v1';

const DEFAULT_PROGRESS: GameProgress = {
  unlockedStages: [1],
  completedStages: [],
  stageStars: {},
  earnedBadges: ['badge_explorer'],
  totalScore: 0
};

interface GameContextType {
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  progress: GameProgress;
  score: number;
  completeStage: (stageId: number, starsEarned: number, scoreAdd: number, badgeId?: string) => void;
  resetProgress: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  isBgmActive: boolean;
  toggleBgm: () => void;
  speakingState: SpeakingState;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<string>('welcome');
  const [progress, setProgress] = useState<GameProgress>(DEFAULT_PROGRESS);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);
  const [speakingState, setSpeakingState] = useState<SpeakingState>(audioManager.getCurrentState());

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.unlockedStages)) {
          setProgress(parsed);
        }
      }
    } catch {
      // LocalStorage error guard
    }

    // Register audio speaking change
    audioManager.registerSpeakingListener((state) => {
      setSpeakingState(state);
    });
  }, []);

  // Save progress changes
  const saveProgress = (newProg: GameProgress) => {
    setProgress(newProg);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProg));
    } catch {
      // LocalStorage error guard
    }
  };

  const completeStage = (stageId: number, starsEarned: number, scoreAdd: number, badgeId?: string) => {
    const updatedCompleted = Array.from(new Set([...progress.completedStages, stageId]));
    const nextStageId = stageId + 1;
    const updatedUnlocked = Array.from(new Set([...progress.unlockedStages, stageId, ...(nextStageId <= 7 ? [nextStageId] : [])]));
    const updatedStars = { ...progress.stageStars, [stageId]: Math.max(progress.stageStars[stageId] || 0, starsEarned) };
    const updatedBadges = badgeId && !progress.earnedBadges.includes(badgeId)
      ? [...progress.earnedBadges, badgeId]
      : progress.earnedBadges;

    const newProg: GameProgress = {
      unlockedStages: updatedUnlocked,
      completedStages: updatedCompleted,
      stageStars: updatedStars,
      earnedBadges: updatedBadges,
      totalScore: progress.totalScore + scoreAdd
    };

    saveProgress(newProg);
  };

  const resetProgress = () => {
    audioManager.stopSpeech();
    saveProgress(DEFAULT_PROGRESS);
    setCurrentScreen('welcome');
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioManager.setMuted(nextMuted);
  };

  const toggleBgm = () => {
    const nextBgm = !isBgmActive;
    setIsBgmActive(nextBgm);
    audioManager.toggleBgm(nextBgm);
  };

  return (
    <GameContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        progress,
        score: progress.totalScore,
        completeStage,
        resetProgress,
        isMuted,
        toggleMute,
        isBgmActive,
        toggleBgm,
        speakingState
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
