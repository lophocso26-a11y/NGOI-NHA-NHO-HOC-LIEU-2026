import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Map, BookOpen, RotateCcw, Award, Star } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { TEACHER_INFO } from '../../data/lessonData';
import { audioManager } from '../../services/audioManager';

interface TopNavbarProps {
  onOpenTeacherModal: () => void;
  onOpenGuideModal: () => void;
  onOpenResetModal: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenTeacherModal,
  onOpenGuideModal,
  onOpenResetModal
}) => {
  const { currentScreen, setCurrentScreen, isMuted, toggleMute, isBgmActive, toggleBgm, score, progress } = useGame();
  const [audioMenuOpen, setAudioMenuOpen] = useState(false);

  const completedCount = progress.completedStages.length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs px-4 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Title (One Line Wordmark) */}
        <button
          onClick={() => {
            audioManager.playSoundEffect('click');
            setCurrentScreen('welcome');
          }}
          className="flex items-center gap-2.5 text-left group hover:opacity-95 transition-opacity shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xs font-bold text-lg">
            🏠
          </div>
          <div className="whitespace-nowrap">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-amber-950 font-display block leading-tight">
              NGÔI NHÀ NHỎ <span className="text-amber-600 font-normal hidden sm:inline">| OUR FAMILY HOME</span>
            </span>
            <span className="text-xs text-amber-800/80 font-medium block">
              Đạo đức 2 · {TEACHER_INFO.className}
            </span>
          </div>
        </button>

        {/* Zone 2: Concise Nav Links (Single-Line Prose Links) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => {
              audioManager.playSoundEffect('click');
              setCurrentScreen('map');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap hover:text-amber-700 ${
              currentScreen === 'map' ? 'text-amber-700 border-b-2 border-amber-500' : ''
            }`}
          >
            <Map className="w-4 h-4 text-amber-500" />
            Bản đồ hành trình ({completedCount}/7)
          </button>

          <button
            onClick={() => {
              audioManager.playSoundEffect('click');
              onOpenTeacherModal();
            }}
            className="flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap hover:text-amber-700 text-slate-600"
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            Thông tin bài học
          </button>

          <button
            onClick={() => {
              audioManager.playSoundEffect('click');
              onOpenGuideModal();
            }}
            className="flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap hover:text-amber-700 text-slate-600"
          >
            <Award className="w-4 h-4 text-indigo-500" />
            Hướng dẫn khám phá
          </button>
        </nav>

        {/* Zone 3: Primary Action & Status (Stars, Score & Audio Controls) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Stats: Stars & Score */}
          <div className="hidden sm:flex items-center gap-2 bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-amber-900 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{completedCount * 3}</span>
            </div>
            <span className="text-amber-300">·</span>
            <span className="text-slate-700 font-bold tabular-nums">{score} đ</span>
          </div>

          {/* Quick Map Icon for small screens */}
          {currentScreen !== 'map' && currentScreen !== 'welcome' && (
            <button
              onClick={() => {
                audioManager.playSoundEffect('click');
                setCurrentScreen('map');
              }}
              className="lg:hidden p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
              title="Xem bản đồ"
            >
              <Map className="w-4 h-4" />
            </button>
          )}

          {/* Audio Controls Toggle */}
          <div className="relative">
            <button
              onClick={() => setAudioMenuOpen(!audioMenuOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs border ${
                isMuted
                  ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                  : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
              }`}
              title="Cài đặt âm thanh & giọng đọc"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
              <span className="hidden sm:inline whitespace-nowrap">{isMuted ? 'Đã tắt tiếng' : 'Âm thanh'}</span>
            </button>

            {/* Dropdown Menu */}
            {audioMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-amber-200 p-3 z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setAudioMenuOpen(false)}
              >
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
                  Điều khiển âm thanh
                </div>
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      toggleMute();
                      audioManager.playSoundEffect('click');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isMuted ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
                      Giọng đọc & Hiệu ứng
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">{isMuted ? 'Tắt' : 'Bật'}</span>
                  </button>

                  <button
                    onClick={() => {
                      toggleBgm();
                      audioManager.playSoundEffect('click');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isBgmActive ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-amber-600" />
                      Nhạc êm dịu
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">{isBgmActive ? 'Bật' : 'Tắt'}</span>
                  </button>

                  <div className="pt-1.5 border-t border-slate-100">
                    <button
                      onClick={() => {
                        audioManager.playSoundEffect('click');
                        setAudioMenuOpen(false);
                        audioManager.speakVietnamese(
                          'Chào mừng các em đến với Ngôi nhà nhỏ – Kho báu yêu thương! Hôm nay, cô và các em sẽ cùng khám phá cách giữ gìn đồ dùng trong gia đình nhé!',
                          'teacher'
                        );
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-xs cursor-pointer transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Thử giọng cô giáo</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reset Journey Button with confirmation dialog */}
          <button
            onClick={() => {
              audioManager.playSoundEffect('click');
              onOpenResetModal();
            }}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Bắt đầu lại hành trình"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
