import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Volume2, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Check, X } from 'lucide-react';
import { PLEDGE_OPTIONS, PledgeOption } from '../../data/lessonData';
import { BadgeSvg } from '../common/IllustrationAssets';
import { TeacherNarration } from '../common/TeacherNarration';
import { CharacterGuide } from '../common/CharacterGuide';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface Stage6Props {
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Stage6MyHome: React.FC<Stage6Props> = ({ onComplete, onBackToMap }) => {
  const { completeStage } = useGame();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ isGood: boolean; text: string } | null>(null);
  const [isPledged, setIsPledged] = useState(false);

  const correctPledges = PLEDGE_OPTIONS.filter(p => p.isPositive && selectedIds.includes(p.id));
  const isAllThreeSelected = correctPledges.length === 3;

  const handleToggleOption = (opt: PledgeOption) => {
    audioManager.playSoundEffect('click');

    if (selectedIds.includes(opt.id)) {
      setSelectedIds(selectedIds.filter(id => id !== opt.id));
      setFeedback(null);
      return;
    }

    if (!opt.isPositive) {
      audioManager.playSoundEffect('wrong');
      setFeedback({
        isGood: false,
        text: opt.explanation
      });
      audioManager.playVietnamese(`Chưa phù hợp rồi! ${opt.explanation}`, 'an');
      return;
    }

    // Is positive
    if (correctPledges.length >= 3) {
      audioManager.playVietnamese('Em đã chọn đủ 3 hành động tốt rồi! Hãy nhấn "EM HỨA SẼ THỰC HIỆN" nhé!', 'minh');
      return;
    }

    audioManager.playSoundEffect('correct');
    const updated = [...selectedIds, opt.id];
    setSelectedIds(updated);
    setFeedback({
      isGood: true,
      text: opt.explanation
    });
    audioManager.playVietnamese(opt.explanation, 'teacher');
  };

  const handleCommitPledge = () => {
    audioManager.playSoundEffect('badge');
    setIsPledged(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Guard
    }
    completeStage(6, 3, 30, 'badge_promise');
    audioManager.playVietnamese(
      'Cô rất tự hào về em! Em hãy luôn giữ lời hứa và bảo quản thật tốt đồ dùng gia đình mình nhé!',
      'teacher'
    );
  };

  const handlePlayEn = () => {
    audioManager.playSoundEffect('click');
    audioManager.playEnglish('I take care of my things.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              TRẠM 6 · VẬN DỤNG THỰC TẾ · MY HOME
            </span>
            <span className="text-xs font-bold text-slate-500">
              Đã chọn {correctPledges.length}/3 việc tốt
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Ngôi Nhà Của Em – Lời Hứa Giữ Gìn Đồ Dùng
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
        text="Bây giờ, em hãy chọn ba việc tốt mà em sẽ thực hiện để bảo quản đồ dùng trong gia đình nhé!"
      />

      {/* Bilingual Slogan Card */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 rounded-3xl p-4 sm:p-5 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase text-amber-800 tracking-wider block mb-0.5">
            Thông điệp ý nghĩa · Core Message
          </span>
          <div className="text-lg sm:text-xl font-black text-amber-950 font-display">
            &ldquo;Em biết giữ gìn đồ dùng của mình · I take care of my things&rdquo;
          </div>
        </div>
        <button
          onClick={handlePlayEn}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
          <span>English: I take care of my things</span>
        </button>
      </div>

      {/* Feedback Note if any */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-in fade-in ${
            feedback.isGood
              ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
              : 'bg-rose-100 text-rose-950 border border-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.isGood ? (
              <Check className="w-5 h-5 text-emerald-700" />
            ) : (
              <X className="w-5 h-5 text-rose-700" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs px-2 py-1 rounded-lg bg-white/60 hover:bg-white text-slate-700"
          >
            Đóng
          </button>
        </div>
      )}

      {/* 6 Actions Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLEDGE_OPTIONS.map(opt => {
          const isSelected = selectedIds.includes(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => handleToggleOption(opt)}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-md ring-4 ring-emerald-300/30 scale-[1.02]'
                  : 'bg-white hover:bg-amber-50/60 border-slate-200 hover:border-amber-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center justify-center">
                    0{opt.id}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? 'bg-emerald-500 text-white'
                        : 'border-2 border-slate-300 text-transparent'
                    }`}
                  >
                    ✓
                  </div>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base leading-snug mb-1">
                  {opt.textVi}
                </h4>
                <div className="text-xs font-semibold text-amber-800">
                  {opt.textEn}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                <span className={isSelected ? 'text-emerald-700' : 'text-slate-400'}>
                  {isSelected ? '✓ Đã chọn cam kết' : 'Nhấn để chọn việc tốt'}
                </span>
                <span className="text-amber-600">Chọn</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Commit Card when 3 positive actions selected */}
      {isAllThreeSelected && !isPledged && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white text-center shadow-xl space-y-4 animate-in fade-in">
          <div className="w-12 h-12 bg-white text-amber-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-md">
            ✋
          </div>
          <h3 className="text-2xl font-extrabold font-display">
            Em Đã Chọn Đủ 3 Hành Động Tốt!
          </h3>
          <div className="max-w-lg mx-auto bg-white/20 backdrop-blur-xs rounded-2xl p-4 text-left space-y-2 text-xs sm:text-sm font-semibold">
            {correctPledges.map((p, idx) => (
              <div key={p.id} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white text-amber-800 text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span>{p.textVi}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleCommitPledge}
            className="py-4 px-10 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-black text-lg shadow-lg active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer font-display"
          >
            <Heart className="w-5 h-5 text-rose-600 fill-rose-500" />
            <span>EM HỨA SẼ THỰC HIỆN!</span>
          </button>
        </div>
      )}

      {/* After Pledged Banner */}
      {isPledged && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-4 shadow-md animate-in fade-in">
          <BadgeSvg title="Em biết giữ gìn" isUnlocked={true} size={90} />
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block">
              HUY HIỆU ĐÃ NHẬN
            </span>
            <h4 className="text-2xl font-black text-emerald-950 font-display">
              EM BIẾT GIỮ GÌN · I TAKE CARE OF MY THINGS
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-emerald-900 font-semibold max-w-lg mx-auto">
            Chúc mừng em! Giờ đây em đã sẵn sàng thắp sáng toàn bộ ngôi nhà ở trạm cuối cùng!
          </p>
          <button
            onClick={onComplete}
            className="py-3.5 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>TIẾP TỤC ĐẾN TRẠM 7 (NGÔI NHÀ YÊU THƯƠNG)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
