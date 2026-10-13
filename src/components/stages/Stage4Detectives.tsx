import React, { useState } from 'react';
import { Search, CheckCircle2, AlertTriangle, Sparkles, ArrowRight, Volume2, HelpCircle } from 'lucide-react';
import { DETECTIVE_ACTIONS, DetectiveAction } from '../../data/lessonData';
import { TeacherNarration } from '../common/TeacherNarration';
import { CharacterGuide } from '../common/CharacterGuide';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface Stage4Props {
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Stage4Detectives: React.FC<Stage4Props> = ({ onComplete, onBackToMap }) => {
  const { completeStage } = useGame();

  // Solved actions: map of action id -> boolean
  const [fixedActions, setFixedActions] = useState<Record<number, boolean>>({});
  // Selected action modal for fixing
  const [activeModalAction, setActiveModalAction] = useState<DetectiveAction | null>(null);
  const [praiseGoodAction, setPraiseGoodAction] = useState<boolean>(false);
  const [isCompletedAll, setIsCompletedAll] = useState(false);

  // Total incorrect actions needed to fix = 3
  const fixedCount = Object.keys(fixedActions).length;

  const handleSpotAction = (act: DetectiveAction) => {
    audioManager.playSoundEffect('click');

    if (!act.isIncorrect) {
      // Action 4 is already good (cất sách ngay ngắn)
      audioManager.playSoundEffect('correct');
      setPraiseGoodAction(true);
      audioManager.playVietnamese(
        'Hoan hô bạn nhỏ! Cất sách ngay ngắn là hành động đúng, rất đáng khen và không cần sửa!',
        'teacher'
      );
      return;
    }

    if (fixedActions[act.id]) {
      // Already fixed
      audioManager.playVietnamese('Hành động này đã được sửa thành việc tốt rồi!', 'an');
      return;
    }

    // Open fix modal
    setActiveModalAction(act);
    audioManager.playVietnamese(`Vì sao việc "${act.label}" chưa đúng? Em hãy chọn cách sửa lại nhé!`, 'minh');
  };

  const handleSolveChoice = (isCorrectSolution: boolean) => {
    audioManager.playSoundEffect('click');

    if (isCorrectSolution && activeModalAction) {
      audioManager.playSoundEffect('correct');
      const updatedFixed = { ...fixedActions, [activeModalAction.id]: true };
      setFixedActions(updatedFixed);

      audioManager.playVietnamese(`Chính xác! ${activeModalAction.soundExplanationVi}`, 'teacher');
      setActiveModalAction(null);

      if (Object.keys(updatedFixed).length === 3) {
        setIsCompletedAll(true);
        audioManager.playSoundEffect('badge');
        completeStage(4, 3, 30, 'badge_detective');
      }
    } else {
      audioManager.playSoundEffect('wrong');
      audioManager.playVietnamese('Chưa đúng rồi! Em hãy chọn giải pháp bảo quản đồ dùng tốt hơn nhé!', 'an');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              TRẠM 4 · LITTLE DETECTIVES
            </span>
            <span className="text-xs font-bold text-slate-500">
              Đã tìm thấy {fixedCount}/3 hành động cần sửa
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Thám Tử Đồ Dùng – Truy Tìm & Sửa Lỗi
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
        text="Các thám tử nhí hãy quan sát thật kỹ! Trong ngôi nhà này có những việc làm chưa đúng. Các em hãy dùng kính lúp tìm ra và giúp các bạn sửa lại nhé!"
      />

      {/* Detective Canvas Picture / Interactive Floorplan Scene */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
            <Search className="w-4 h-4 text-amber-600" />
            <span>Kính lúp thám tử: Nhấn vào các khu vực nghi vấn để kiểm tra</span>
          </div>
          <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            {fixedCount}/3 hoàn thành
          </span>
        </div>

        {/* 4 Detective Cards / Zones in Scene */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DETECTIVE_ACTIONS.map(act => {
            const isFixed = fixedActions[act.id] === true;
            const isGoodDefault = !act.isIncorrect;

            return (
              <div
                key={act.id}
                onClick={() => handleSpotAction(act)}
                className={`rounded-3xl p-5 border-2 transition-all cursor-pointer relative select-none ${
                  isFixed
                    ? 'bg-emerald-50/90 border-emerald-400 shadow-md ring-2 ring-emerald-300/30'
                    : isGoodDefault
                    ? 'bg-blue-50/70 border-blue-300 hover:border-blue-400 shadow-xs'
                    : 'bg-amber-50/60 hover:bg-amber-100/70 border-amber-300 hover:border-amber-500 shadow-sm hover:scale-[1.01]'
                }`}
              >
                {/* Spot Indicator Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base shadow-2xs ${
                        isFixed || isGoodDefault
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {isFixed || isGoodDefault ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Search className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-800">
                        Khu vực {act.id}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                        {isFixed ? act.correctSolution : act.label}
                      </h4>
                    </div>
                  </div>

                  <div>
                    {isFixed ? (
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                        Đã sửa tốt
                      </span>
                    ) : isGoodDefault ? (
                      <span className="text-[10px] font-extrabold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full border border-blue-300">
                        Việc làm đúng!
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full border border-rose-300 animate-pulse">
                        Cần sửa
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-700 bg-white/80 rounded-xl p-3 border border-amber-100 leading-relaxed">
                  {isFixed ? (
                    <span className="text-emerald-900 font-semibold">
                      ✓ Đã sửa thành công: {act.correctSolution}
                    </span>
                  ) : (
                    act.wrongDesc
                  )}
                </p>

                {/* Inspect prompt */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-amber-800">
                  <span>{isFixed ? 'Đã an toàn' : 'Nhấn để điều tra với kính lúp'}</span>
                  <span className="text-amber-600">🔍 Khám phá</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Praise Modal when clicking action 4 (Cất sách ngay ngắn) */}
      {praiseGoodAction && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border-2 border-emerald-300 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              👏
            </div>
            <h3 className="text-xl font-extrabold text-emerald-950 font-display">
              Hành Động Rất Khen Ngợi!
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              Bạn nhỏ cất sách ngay ngắn vào giá là một việc làm rất tốt và đúng đắn. Hành động này không cần sửa, em hãy noi gương bạn nhé!
            </p>
            <button
              onClick={() => setPraiseGoodAction(false)}
              className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              Tiếp tục tìm các việc chưa đúng
            </button>
          </div>
        </div>
      )}

      {/* Fix Solution Modal */}
      {activeModalAction && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border-2 border-amber-300 animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-amber-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-amber-700">
                    Thám tử phát hiện lỗi
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                    {activeModalAction.label}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalAction(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                Vì sao việc này chưa đúng?
              </span>
              <p className="text-xs text-slate-700 font-medium">
                {activeModalAction.wrongDesc}
              </p>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-extrabold text-slate-800 block">
                Em hãy chọn cách xử lý đúng để giúp bạn:
              </span>

              {/* Solution A: Correct Solution */}
              <button
                onClick={() => handleSolveChoice(true)}
                className="w-full text-left p-3.5 rounded-2xl border-2 border-emerald-300 hover:border-emerald-500 bg-emerald-50/50 hover:bg-emerald-100/70 transition-all font-bold text-xs sm:text-sm text-emerald-950 flex items-center justify-between gap-2"
              >
                <span>A. {activeModalAction.correctSolution}</span>
                <span className="text-emerald-700 text-xs shrink-0">👉 Chọn</span>
              </button>

              {/* Solution B: Wrong Distractor */}
              <button
                onClick={() => handleSolveChoice(false)}
                className="w-full text-left p-3.5 rounded-2xl border-2 border-slate-200 hover:border-rose-300 bg-slate-50 hover:bg-rose-50 transition-all font-bold text-xs sm:text-sm text-slate-700 flex items-center justify-between gap-2"
              >
                <span>B. {activeModalAction.distractorSolution}</span>
                <span className="text-slate-400 text-xs shrink-0">👉 Chọn</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {isCompletedAll && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 text-white text-center shadow-lg space-y-4 animate-in fade-in">
          <div className="w-14 h-14 bg-white text-blue-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
            🔍
          </div>
          <h3 className="text-2xl font-extrabold font-display">
            Xuất Sắc! Thám Tử Đã Tìm Thấy & Sửa Đủ Cả 3 Hành Động!
          </h3>
          <p className="text-sm font-semibold max-w-xl mx-auto opacity-95">
            Em đã nhận được huy hiệu <b>Thám tử tài ba</b>. Ngôi nhà của chúng ta càng thêm gọn gàng, sạch đẹp và an toàn!
          </p>
          <div className="pt-2">
            <button
              onClick={onComplete}
              className="py-3.5 px-8 rounded-2xl bg-white text-blue-950 hover:bg-amber-50 font-extrabold text-base shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>TIẾP TỤC ĐẾN TRẠM 5 (CỨU ĐỒ DÙNG GIA ĐÌNH)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
