import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Volume2, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { RESCUE_QUIZZES, RescueQuiz } from '../../data/lessonData';
import { ItemGraphicSvg } from '../common/IllustrationAssets';
import { TeacherNarration } from '../common/TeacherNarration';
import { CharacterGuide } from '../common/CharacterGuide';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface Stage5Props {
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Stage5SaveThings: React.FC<Stage5Props> = ({ onComplete, onBackToMap }) => {
  const { completeStage } = useGame();

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [rescuedItemIds, setRescuedItemIds] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isCompletedAll, setIsCompletedAll] = useState(false);

  const currentQuiz = RESCUE_QUIZZES[currentQuizIndex];
  const isCurrentRescued = rescuedItemIds.includes(currentQuiz.id);

  const handleReadQuestion = () => {
    audioManager.playSoundEffect('click');
    audioManager.playVietnamese(`${currentQuiz.voicePrompt} Lựa chọn A: ${currentQuiz.optionA}. Lựa chọn B: ${currentQuiz.optionB}.`, 'teacher');
  };

  const handleSelectOption = (choice: 'A' | 'B') => {
    audioManager.playSoundEffect('click');
    const isCorrect = choice === currentQuiz.correctOption;

    if (isCorrect) {
      audioManager.playSoundEffect('correct');
      const updated = Array.from(new Set([...rescuedItemIds, currentQuiz.id]));
      setRescuedItemIds(updated);

      setFeedback({
        isCorrect: true,
        text: `Chính xác! ${currentQuiz.explanation}`
      });

      audioManager.playVietnamese(`Tuyệt vời! ${currentQuiz.explanation}`, 'an');

      // Check if all 5 completed
      if (updated.length === RESCUE_QUIZZES.length) {
        setIsCompletedAll(true);
        audioManager.playSoundEffect('complete');
        // Confetti celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // Guard
        }
        completeStage(5, 3, 50, 'badge_rescuer');
      }
    } else {
      audioManager.playSoundEffect('wrong');
      setFeedback({
        isCorrect: false,
        text: 'Chưa chính xác rồi! Em hãy suy nghĩ xem hành động này có an toàn và giúp bảo quản đồ dùng tốt không, rồi chọn lại nhé!'
      });
      audioManager.playVietnamese('Chưa đúng rồi! Em hãy suy nghĩ và thử lại nhé!', 'minh');
    }
  };

  const handleNextQuiz = () => {
    audioManager.playSoundEffect('click');
    setFeedback(null);
    if (currentQuizIndex < RESCUE_QUIZZES.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              TRẠM 5 · SAVE OUR THINGS!
            </span>
            <span className="text-xs font-bold text-slate-500">
              Đã giải cứu {rescuedItemIds.length}/5 đồ dùng (+{rescuedItemIds.length * 10} điểm)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Cứu Đồ Dùng Gia Đình – Thử Thách Trắc Nghiệm
          </h1>
        </div>

        <button
          onClick={onBackToMap}
          className="text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
        >
          Trở về bản đồ
        </button>
      </div>

      {/* Teacher Narration */}
      <TeacherNarration
        text="Năm đồ dùng quen thuộc đang chờ được giải cứu! Em hãy trả lời đúng các câu hỏi trắc nghiệm để đưa các bạn ấy về vị trí an toàn trong ngôi nhà nhé!"
      />

      {/* 5 Rescued Items Progress Bar */}
      <div className="bg-white/95 rounded-3xl p-4 border border-amber-200/80 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        {RESCUE_QUIZZES.map((q, idx) => {
          const isSaved = rescuedItemIds.includes(q.id);
          const isCurrent = currentQuizIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => {
                audioManager.playSoundEffect('click');
                setCurrentQuizIndex(idx);
                setFeedback(null);
              }}
              className={`flex-1 min-w-[90px] p-2.5 rounded-2xl flex flex-col items-center gap-1.5 border transition-all ${
                isSaved
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : isCurrent
                  ? 'bg-amber-100 border-amber-400 text-amber-950 ring-2 ring-amber-300'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <ItemGraphicSvg
                type={
                  q.id === 1
                    ? 'book'
                    : q.id === 2
                    ? 'toy'
                    : q.id === 3
                    ? 'desk'
                    : q.id === 4
                    ? 'chair'
                    : 'cup'
                }
                status={isSaved ? 'clean' : 'damaged'}
                size={34}
              />
              <span className="text-[11px] font-extrabold truncate w-full text-center">
                {q.itemTitle}
              </span>
              <span className="text-[9px] font-bold">
                {isSaved ? '✓ Đã cứu' : isCurrent ? 'Đang cứu' : 'Chờ cứu'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Question Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border-2 border-amber-200/80 shadow-md space-y-6">
        {/* Top of Card: Subject & Voice Prompt Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-100">
          <div className="flex items-center gap-4">
            <ItemGraphicSvg
              type={
                currentQuiz.id === 1
                  ? 'book'
                  : currentQuiz.id === 2
                  ? 'toy'
                  : currentQuiz.id === 3
                  ? 'desk'
                  : currentQuiz.id === 4
                  ? 'chair'
                  : 'cup'
              }
              status={isCurrentRescued ? 'clean' : 'damaged'}
              size={68}
            />
            <div>
              <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                Câu Hỏi {currentQuiz.id}/5 · Giải Cứu {currentQuiz.itemTitle} ({currentQuiz.itemEn})
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {currentQuiz.question}
              </h3>
            </div>
          </div>

          <button
            onClick={handleReadQuestion}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>Đọc câu hỏi</span>
          </button>
        </div>

        {/* 2 Big Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option A */}
          <button
            onClick={() => handleSelectOption('A')}
            disabled={isCurrentRescued}
            className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between select-none ${
              isCurrentRescued && currentQuiz.correctOption === 'A'
                ? 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                : isCurrentRescued
                ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                : 'bg-gradient-to-b from-amber-50/70 to-white hover:bg-amber-100/60 border-amber-300 hover:border-amber-500 shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-extrabold text-sm flex items-center justify-center">
                A
              </span>
              <span className="text-xs font-bold text-slate-400">Lựa chọn 1</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuiz.optionA}
            </p>
          </button>

          {/* Option B */}
          <button
            onClick={() => handleSelectOption('B')}
            disabled={isCurrentRescued}
            className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between select-none ${
              isCurrentRescued && currentQuiz.correctOption === 'B'
                ? 'bg-emerald-100 border-emerald-400 text-emerald-950 ring-2 ring-emerald-300'
                : isCurrentRescued
                ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                : 'bg-gradient-to-b from-amber-50/70 to-white hover:bg-amber-100/60 border-amber-300 hover:border-amber-500 shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-extrabold text-sm flex items-center justify-center">
                B
              </span>
              <span className="text-xs font-bold text-slate-400">Lựa chọn 2</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuiz.optionB}
            </p>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-in fade-in ${
              feedback.isCorrect
                ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                : 'bg-rose-100 text-rose-950 border border-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${feedback.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`} />
              <span>{feedback.text}</span>
            </div>

            {feedback.isCorrect && currentQuizIndex < RESCUE_QUIZZES.length - 1 && (
              <button
                onClick={handleNextQuiz}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shrink-0 flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Completion Banner */}
      {isCompletedAll && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl p-6 text-white text-center shadow-lg space-y-4 animate-in fade-in">
          <div className="w-14 h-14 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
            🛡️
          </div>
          <h3 className="text-2xl font-extrabold font-display">
            Hoan Hô! Em Đã Giải Cứu Thành Công 5 Đồ Dùng Gia Đình!
          </h3>
          <p className="text-sm font-semibold max-w-xl mx-auto opacity-95">
            Tất cả các đồ dùng đã trở về vị trí ấm áp và an toàn trong căn nhà. Em nhận được huy hiệu <b>Người giải cứu</b>!
          </p>
          <div className="pt-2">
            <button
              onClick={onComplete}
              className="py-3.5 px-8 rounded-2xl bg-white text-emerald-950 hover:bg-amber-50 font-extrabold text-base shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>TIẾP TỤC ĐẾN TRẠM 6 (NGÔI NHÀ CỦA EM)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
