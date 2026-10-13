import React from 'react';
import { Volume2, RotateCcw, Sparkles, Loader2, StopCircle } from 'lucide-react';
import { TEACHER_INFO } from '../../data/lessonData';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface TeacherNarrationProps {
  text: string;
  className?: string;
  autoPlay?: boolean;
}

export const TeacherNarration: React.FC<TeacherNarrationProps> = ({
  text,
  className = '',
  autoPlay = false
}) => {
  const { speakingState } = useGame();

  const isCurrentSpeaking = speakingState.speaking && speakingState.text === text.trim();
  const isCurrentLoading = speakingState.loading && speakingState.text === text.trim();

  React.useEffect(() => {
    if (autoPlay) {
      handleSpeak();
    }
  }, [text]);

  const handleSpeak = () => {
    if (isCurrentSpeaking) {
      audioManager.stopSpeech();
      return;
    }
    audioManager.playSoundEffect('click');
    audioManager.speakVietnamese(text, 'teacher');
  };

  const handleReplay = () => {
    audioManager.playSoundEffect('click');
    audioManager.replaySpeech();
  };

  return (
    <div
      className={`rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-300/80 p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row items-center gap-3 sm:gap-4 ${className}`}
    >
      {/* Teacher Icon / Avatar */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-amber-500 flex items-center justify-center text-white shadow-md font-bold text-2xl relative">
          👩‍🏫
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        </div>
        <div className="text-left">
          <div className="text-xs font-extrabold text-amber-900 flex items-center gap-1">
            <span>Cô giáo {TEACHER_INFO.teacherName}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-[11px] text-amber-700/80 font-medium">
            {TEACHER_INFO.className} · {TEACHER_INFO.schoolName}
          </div>
        </div>
      </div>

      {/* Spoken Prose Text / Subtitle */}
      <div className="flex-1 text-center sm:text-left">
        <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">
          &ldquo;{text}&rdquo;
        </p>

        {/* Engine status indicator */}
        {isCurrentSpeaking && (
          <div className="mt-1 text-[11px] font-bold text-amber-700 flex items-center gap-1.5 justify-center sm:justify-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {speakingState.engine === 'gemini_tts'
                ? 'Đang phát giọng cô giáo tự nhiên (Gemini AI TTS)'
                : speakingState.engine === 'cached_audio'
                ? 'Đang phát giọng cô giáo (Bản ghi âm chất lượng cao)'
                : 'Đang phát giọng đọc dự phòng'}
            </span>
          </div>
        )}
      </div>

      {/* Interactive Controls */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleSpeak}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white font-bold text-xs shadow-xs transition-all cursor-pointer ${
            isCurrentSpeaking
              ? 'bg-rose-500 hover:bg-rose-600'
              : 'bg-amber-500 hover:bg-amber-600 active:scale-95'
          }`}
          title={isCurrentSpeaking ? 'Dừng đọc' : 'Nghe cô nói'}
        >
          {isCurrentLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isCurrentSpeaking ? (
            <StopCircle className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
          <span>{isCurrentLoading ? 'Đang tải...' : isCurrentSpeaking ? 'Dừng đọc' : 'Nghe cô nói'}</span>
        </button>

        <button
          onClick={handleReplay}
          className="p-2 rounded-xl bg-white hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
          title="Nghe lại"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {isCurrentSpeaking && (
          <div className="flex items-center gap-1 px-2 text-amber-600">
            <span className="w-1 h-3 bg-amber-500 animate-pulse"></span>
            <span className="w-1 h-4 bg-amber-600 animate-pulse delay-75"></span>
            <span className="w-1 h-2 bg-amber-500 animate-pulse delay-150"></span>
          </div>
        )}
      </div>
    </div>
  );
};
