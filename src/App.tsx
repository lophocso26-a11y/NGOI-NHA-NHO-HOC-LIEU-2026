/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { TopNavbar } from './components/layout/TopNavbar';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { JourneyMap } from './components/screens/JourneyMap';
import { Stage1HomeDoor } from './components/stages/Stage1HomeDoor';
import { Stage2FamilyThings } from './components/stages/Stage2FamilyThings';
import { Stage3MagicCare } from './components/stages/Stage3MagicCare';
import { Stage4Detectives } from './components/stages/Stage4Detectives';
import { Stage5SaveThings } from './components/stages/Stage5SaveThings';
import { Stage6MyHome } from './components/stages/Stage6MyHome';
import { Stage7HappyHome } from './components/stages/Stage7HappyHome';
import { TeacherInfoModal } from './components/modals/TeacherInfoModal';
import { GuideModal } from './components/modals/GuideModal';
import { ResetConfirmModal } from './components/modals/ResetConfirmModal';
import { audioManager } from './services/audioManager';

const AppContent: React.FC = () => {
  const { currentScreen, setCurrentScreen, resetProgress, speakingState } = useGame();

  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleStartFromWelcome = () => {
    setCurrentScreen('map');
  };

  const handleSelectStage = (stageId: number) => {
    setCurrentScreen(`stage${stageId}`);
  };

  const handleBackToMap = () => {
    audioManager.playSoundEffect('click');
    setCurrentScreen('map');
  };

  const handleCompleteStageAndNext = (currentStageId: number) => {
    if (currentStageId < 7) {
      setCurrentScreen(`stage${currentStageId + 1}`);
    } else {
      setCurrentScreen('map');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-100/40 text-slate-800 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Navigation */}
      <TopNavbar
        onOpenTeacherModal={() => setTeacherModalOpen(true)}
        onOpenGuideModal={() => setGuideModalOpen(true)}
        onOpenResetModal={() => setResetModalOpen(true)}
      />

      {/* Main Screen Body */}
      <main className="flex-1 w-full pb-12">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStart={handleStartFromWelcome}
            onOpenGuide={() => setGuideModalOpen(true)}
            onOpenTeacherModal={() => setTeacherModalOpen(true)}
          />
        )}

        {currentScreen === 'map' && (
          <JourneyMap
            onSelectStage={handleSelectStage}
            onOpenResetModal={() => setResetModalOpen(true)}
          />
        )}

        {currentScreen === 'stage1' && (
          <Stage1HomeDoor
            onComplete={() => handleCompleteStageAndNext(1)}
            onBackToMap={handleBackToMap}
          />
        )}

        {currentScreen === 'stage2' && (
          <Stage2FamilyThings
            onComplete={() => handleCompleteStageAndNext(2)}
            onBackToMap={handleBackToMap}
          />
        )}

        {currentScreen === 'stage3' && (
          <Stage3MagicCare
            onComplete={() => handleCompleteStageAndNext(3)}
            onBackToMap={handleBackToMap}
          />
        )}

        {currentScreen === 'stage4' && (
          <Stage4Detectives
            onComplete={() => handleCompleteStageAndNext(4)}
            onBackToMap={handleBackToMap}
          />
        )}

        {currentScreen === 'stage5' && (
          <Stage5SaveThings
            onComplete={() => handleCompleteStageAndNext(5)}
            onBackToMap={handleBackToMap}
          />
        )}

        {currentScreen === 'stage6' && (
          <Stage6MyHome
            onComplete={() => handleCompleteStageAndNext(6)}
            onBackToMap={handleBackToMap}
          />
        )}

        {currentScreen === 'stage7' && (
          <Stage7HappyHome
            onBackToMap={handleBackToMap}
            onRestartJourney={() => setResetModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Audio Live Subtitle Indicator (Visible when speech is playing or loading) */}
      {(speakingState.speaking || speakingState.loading) && (
        <aside
          aria-label="Lời đọc trực tiếp"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%] bg-slate-900/95 backdrop-blur-md text-white rounded-2xl px-4 py-2.5 shadow-2xl border border-amber-400/50 flex flex-col gap-1.5 text-xs animate-in slide-in-from-bottom-3"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 truncate">
              <span className="flex h-2.5 w-2.5 shrink-0 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span className="font-bold text-amber-300 shrink-0">
                {speakingState.speaker === 'teacher' ? 'Cô giáo:' : speakingState.speaker === 'minh' ? 'Bạn Minh:' : 'Bạn An:'}
              </span>
              <span className="truncate text-slate-100 font-medium">
                {speakingState.loading ? 'Đang kết nối Gemini AI TTS...' : speakingState.text}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400 border border-slate-700">
                {speakingState.engine === 'gemini_tts'
                  ? '✨ Gemini AI'
                  : speakingState.engine === 'cached_audio'
                  ? '🔊 Bản thu HQ'
                  : '🌐 Giọng dự phòng'}
              </span>
              <button
                onClick={() => audioManager.stopSpeech()}
                className="text-[10px] font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-rose-900 px-2 py-1 rounded-lg cursor-pointer transition-colors"
              >
                Dừng
              </button>
            </div>
          </div>

          {speakingState.errorMessage && (
            <div className="text-[10px] text-amber-300 bg-amber-950/60 rounded-lg px-2 py-1 border border-amber-800">
              ⚠️ {speakingState.errorMessage}
            </div>
          )}
        </aside>
      )}

      {/* Modals */}
      <TeacherInfoModal
        isOpen={teacherModalOpen}
        onClose={() => setTeacherModalOpen(false)}
      />

      <GuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />

      <ResetConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={resetProgress}
      />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}
