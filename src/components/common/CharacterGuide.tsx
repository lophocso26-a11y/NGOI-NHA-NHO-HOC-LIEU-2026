import React from 'react';
import { Volume2, RotateCcw, Loader2, StopCircle } from 'lucide-react';
import { MinhCharacterSvg, AnCharacterSvg } from './IllustrationAssets';
import { audioManager, CharacterSpeaker } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface CharacterGuideProps {
  speaker: 'minh' | 'an' | 'both';
  textVi: string;
  textEn?: string;
  pose?: 'welcome' | 'cheer' | 'think';
  className?: string;
  autoPlay?: boolean;
}

export const CharacterGuide: React.FC<CharacterGuideProps> = ({
  speaker,
  textVi,
  textEn,
  pose = 'welcome',
  className = '',
  autoPlay = false
}) => {
  const { speakingState } = useGame();

  const isCurrentSpeaking = speakingState.speaking && speakingState.text === textVi.trim();
  const isCurrentLoading = speakingState.loading && speakingState.text === textVi.trim();

  React.useEffect(() => {
    if (autoPlay) {
      handlePlayVi();
    }
  }, [textVi]);

  const handlePlayVi = () => {
    if (isCurrentSpeaking) {
      audioManager.stopSpeech();
      return;
    }
    audioManager.playSoundEffect('click');
    const role: CharacterSpeaker = speaker === 'both' ? 'teacher' : speaker;
    audioManager.speakVietnamese(textVi, role);
  };

  const handlePlayEn = () => {
    if (!textEn) return;
    audioManager.playSoundEffect('click');
    audioManager.speakEnglish(textEn);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-3xl bg-white/90 border border-amber-200/80 shadow-md ${className}`}>
      {/* Character Avatars */}
      <div className="flex items-center gap-2 shrink-0">
        {(speaker === 'minh' || speaker === 'both') && (
          <div className="relative group cursor-pointer" onClick={handlePlayVi}>
            <MinhCharacterSvg pose={pose} size={90} className="hover:scale-105 transition-transform" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
              Bạn Minh
            </span>
          </div>
        )}
        {(speaker === 'an' || speaker === 'both') && (
          <div className="relative group cursor-pointer" onClick={handlePlayVi}>
            <AnCharacterSvg pose={pose} size={90} className="hover:scale-105 transition-transform" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap">
              Bạn An
            </span>
          </div>
        )}
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 w-full bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200 text-left relative">
        <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">
          {textVi}
        </p>

        {textEn && (
          <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-800">
            <span>{textEn}</span>
            <button
              onClick={handlePlayEn}
              className="flex items-center gap-1 text-[11px] bg-amber-200/70 hover:bg-amber-300 text-amber-900 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              title="Phát âm tiếng Anh"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>English</span>
            </button>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayVi}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer ${
                isCurrentSpeaking ? 'bg-rose-500 hover:bg-rose-600' : 'bg-amber-500 hover:bg-amber-600'
              }`}
            >
              {isCurrentLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isCurrentSpeaking ? (
                <StopCircle className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5" />
              )}
              <span>{isCurrentLoading ? 'Đang tải...' : isCurrentSpeaking ? 'Dừng đọc' : 'Nghe lời dẫn'}</span>
            </button>
            <button
              onClick={() => audioManager.replaySpeech()}
              className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs transition-colors cursor-pointer"
              title="Nghe lại"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {isCurrentSpeaking && (
            <div className="flex items-center gap-1 text-xs text-amber-600 font-bold">
              <span className="w-1.5 h-3 bg-amber-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-4 bg-amber-600 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-2 bg-amber-400 rounded-full animate-bounce delay-150"></span>
              <span className="text-[11px] ml-1">Đang nói...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
