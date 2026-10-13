import React, { useState } from 'react';
import { Check, X, Volume2, Sparkles, ArrowRight, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { SITUATION_CARDS, SituationCard } from '../../data/lessonData';
import { ItemGraphicSvg } from '../common/IllustrationAssets';
import { TeacherNarration } from '../common/TeacherNarration';
import { CharacterGuide } from '../common/CharacterGuide';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface Stage2Props {
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Stage2FamilyThings: React.FC<Stage2Props> = ({ onComplete, onBackToMap }) => {
  const { completeStage } = useGame();
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [activeFeedback, setActiveFeedback] = useState<{
    cardId: number;
    isCorrect: boolean;
    text: string;
  } | null>(null);
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  const correctAnswersCount = Object.keys(answers).length;

  const handleChoose = (card: SituationCard, userChoiceIsGood: boolean) => {
    audioManager.playSoundEffect('click');
    const isCorrect = userChoiceIsGood === card.isGood;

    if (isCorrect) {
      audioManager.playSoundEffect('correct');
      setAnswers(prev => ({ ...prev, [card.id]: true }));
      setActiveFeedback({
        cardId: card.id,
        isCorrect: true,
        text: card.explanation
      });
      // Voice praise & explanation
      audioManager.playVietnamese(`Chính xác! ${card.explanation}`, 'an');

      // Check if all 4 solved
      if (Object.keys(answers).length + (answers[card.id] ? 0 : 1) === SITUATION_CARDS.length) {
        setIsAllCompleted(true);
        audioManager.playSoundEffect('star');
        completeStage(2, 3, 30, 'badge_care');
      }
    } else {
      audioManager.playSoundEffect('wrong');
      setActiveFeedback({
        cardId: card.id,
        isCorrect: false,
        text: 'Chưa chính xác rồi! Em hãy suy nghĩ xem hành động này có giúp bảo quản đồ dùng tốt không và chọn lại nhé!'
      });
      audioManager.playVietnamese('Chưa đúng rồi! Em hãy suy nghĩ và chọn lại nhé!', 'minh');
    }
  };

  const handlePlayVoice = (card: SituationCard) => {
    audioManager.playSoundEffect('click');
    audioManager.playVietnamese(`${card.title}. ${card.actionText}`, 'teacher');
  };

  const handlePlayEn = (card: SituationCard) => {
    audioManager.playSoundEffect('click');
    audioManager.playEnglish(card.englishVoice);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              TRẠM 2 · OUR FAMILY THINGS
            </span>
            <span className="text-xs font-bold text-slate-500">
              Đã xử lý {correctAnswersCount}/4 tình huống
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Những Người Bạn Trong Nhà – Nên Làm Hay Không Nên Làm?
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
        text="Em hãy quan sát từng tình huống dưới đây và lựa chọn 'NÊN LÀM' hoặc 'KHÔNG NÊN LÀM' để giữ gìn đồ dùng gia đình luôn bền đẹp nhé!"
      />

      {/* 4 Situation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {SITUATION_CARDS.map(card => {
          const isResolved = answers[card.id] === true;
          const isFeedbackActive = activeFeedback?.cardId === card.id;

          return (
            <div
              key={card.id}
              className={`rounded-3xl p-5 border-2 transition-all duration-300 flex flex-col justify-between ${
                isResolved
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-md ring-2 ring-emerald-300/30'
                  : 'bg-white border-amber-200/80 shadow-sm hover:shadow-md'
              }`}
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <ItemGraphicSvg
                      type={
                        card.id === 1
                          ? 'chair'
                          : card.id === 2
                          ? 'book'
                          : card.id === 3
                          ? 'toy'
                          : 'cup'
                      }
                      status={card.isGood ? 'clean' : 'damaged'}
                      size={52}
                    />
                    <div>
                      <span className="text-[11px] font-extrabold uppercase text-amber-700">
                        Tình huống 0{card.id}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  {/* Audio Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePlayVoice(card)}
                      className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
                      title="Nghe câu hỏi tiếng Việt"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePlayEn(card)}
                      className="px-2 py-1.5 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold text-[10px] transition-colors"
                      title="Phát âm tiếng Anh"
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* Situation Description */}
                <div className="bg-amber-50/60 rounded-2xl p-3 border border-amber-100 mb-4">
                  <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                    &ldquo;{card.actionText}&rdquo;
                  </p>
                  <div className="mt-1 text-xs text-amber-800 font-bold flex items-center justify-between">
                    <span>Good or bad? · Take care!</span>
                    <span className="text-[11px] text-slate-500 font-normal">{card.englishPhrase}</span>
                  </div>
                </div>

                {/* Active Feedback Message */}
                {isFeedbackActive && (
                  <div
                    className={`rounded-2xl p-3 text-xs font-bold mb-4 animate-in fade-in ${
                      activeFeedback.isCorrect
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {activeFeedback.isCorrect ? (
                        <Check className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <X className="w-4 h-4 text-rose-700" />
                      )}
                      <span>{activeFeedback.isCorrect ? 'Tuyệt vời!' : 'Thử lại nhé:'}</span>
                    </div>
                    <p className="font-medium">{activeFeedback.text}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons: NÊN LÀM vs KHÔNG NÊN LÀM */}
              {isResolved ? (
                <div className="bg-emerald-100/90 text-emerald-900 font-extrabold text-xs py-3 px-4 rounded-2xl flex items-center justify-between border border-emerald-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>Đã chọn đúng: {card.isGood ? 'NÊN LÀM' : 'KHÔNG NÊN LÀM'}</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">✓ Hoàn thành</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleChoose(card, true)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-sm shadow-xs transition-all cursor-pointer"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>NÊN LÀM</span>
                  </button>

                  <button
                    onClick={() => handleChoose(card, false)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-sm shadow-xs transition-all cursor-pointer"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>KHÔNG NÊN LÀM</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {isAllCompleted && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl p-6 text-white text-center shadow-lg space-y-4 animate-in fade-in slide-in-from-bottom-3">
          <div className="w-14 h-14 bg-white text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
            🌟
          </div>
          <h3 className="text-2xl font-extrabold font-display">
            Hoan Hô! Em Đã Xử Lý Xuất Sắc Cả 4 Tình Huống!
          </h3>
          <p className="text-sm font-semibold max-w-xl mx-auto opacity-95">
            Em đã biết cách phân biệt hành động đúng - sai khi sử dụng đồ dùng trong gia đình. Cùng bước tiếp vào trạm phép thuật nhé!
          </p>
          <div className="pt-2">
            <button
              onClick={onComplete}
              className="py-3.5 px-8 rounded-2xl bg-white text-emerald-900 hover:bg-amber-50 font-extrabold text-base shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>TIẾP TỤC ĐẾN TRẠM 3 (PHÉP THUẬT BẢO VỆ)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
