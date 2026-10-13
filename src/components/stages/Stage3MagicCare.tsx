import React, { useState } from 'react';
import { Sparkles, Check, RotateCcw, Volume2, ArrowRight, Wand2, Shield, Heart } from 'lucide-react';
import { CARE_PAIRS, CarePair } from '../../data/lessonData';
import { ItemGraphicSvg, BadgeSvg } from '../common/IllustrationAssets';
import { TeacherNarration } from '../common/TeacherNarration';
import { CharacterGuide } from '../common/CharacterGuide';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface Stage3Props {
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Stage3MagicCare: React.FC<Stage3Props> = ({ onComplete, onBackToMap }) => {
  const { completeStage } = useGame();

  // Matched pairs: map of itemId -> true
  const [matchedPairs, setMatchedPairs] = useState<Record<string, boolean>>({});
  // Selected action card (for tap-to-pair mode on touch devices / tablets)
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  // Feedback popup or message
  const [message, setMessage] = useState<{ isSuccess: boolean; text: string } | null>(null);
  const [isCompletedAll, setIsCompletedAll] = useState(false);

  // Available cards to drag / tap
  const remainingCards = CARE_PAIRS.filter(p => !matchedPairs[p.id]);

  const handleDragStart = (e: React.DragEvent, pairId: string) => {
    e.dataTransfer.setData('text/plain', pairId);
    audioManager.playSoundEffect('click');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetItemId: string) => {
    e.preventDefault();
    const draggedActionId = e.dataTransfer.getData('text/plain');
    evaluatePair(draggedActionId, targetItemId);
  };

  const handleActionTap = (actionId: string) => {
    audioManager.playSoundEffect('click');
    if (selectedActionId === actionId) {
      setSelectedActionId(null);
    } else {
      setSelectedActionId(actionId);
      const action = CARE_PAIRS.find(p => p.id === actionId);
      if (action) {
        audioManager.playVietnamese(action.correctActionText, 'minh');
      }
    }
  };

  const handleTargetItemTap = (targetItemId: string) => {
    if (!selectedActionId) {
      audioManager.playSoundEffect('click');
      const item = CARE_PAIRS.find(p => p.id === targetItemId);
      if (item) {
        audioManager.playVietnamese(item.itemTitle, 'an');
      }
      return;
    }
    evaluatePair(selectedActionId, targetItemId);
    setSelectedActionId(null);
  };

  const evaluatePair = (actionId: string, targetItemId: string) => {
    if (actionId === targetItemId) {
      // Correct Match!
      audioManager.playSoundEffect('magic');
      const pair = CARE_PAIRS.find(p => p.id === targetItemId)!;

      const newMatches = { ...matchedPairs, [targetItemId]: true };
      setMatchedPairs(newMatches);

      setMessage({
        isSuccess: true,
        text: `Phép thuật thành công! ${pair.soundCorrectVi}`
      });

      audioManager.playVietnamese(pair.soundCorrectVi, 'teacher');
      setTimeout(() => {
        audioManager.playEnglish(pair.soundEn);
      }, 2500);

      // Check if all 4 completed
      if (Object.keys(newMatches).length === CARE_PAIRS.length) {
        setIsCompletedAll(true);
        audioManager.playSoundEffect('badge');
        completeStage(3, 3, 40, 'badge_care');
      }
    } else {
      // Wrong Match
      audioManager.playSoundEffect('wrong');
      setMessage({
        isSuccess: false,
        text: 'Chưa đúng rồi! Hành động này chưa phù hợp với đồ vật. Em hãy thử lại nhé!'
      });
      audioManager.playVietnamese('Chưa phù hợp rồi, em hãy thử ghép với đồ vật khác nhé!', 'an');
    }
  };

  const completedCount = Object.keys(matchedPairs).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              TRẠM 3 · HOẠT ĐỘNG TRỌNG TÂM · TAKE CARE!
            </span>
            <span className="text-xs font-bold text-slate-500">
              Đã hồi phục {completedCount}/4 đồ dùng
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Phép Thuật Bảo Vệ – Hồi Phục Đồ Dùng Gia Đình
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
        text="Đây là căn phòng phép thuật! Các đồ dùng đang bị cũ mờ và cần được chăm sóc. Em hãy kéo thẻ hành động (hoặc chạm chọn) vào đúng đồ vật để truyền phép thuật bảo vệ nhé!"
      />

      {/* Status or Toast Message */}
      {message && (
        <div
          className={`rounded-2xl p-4 text-xs sm:text-sm font-bold flex items-center justify-between gap-3 animate-in fade-in ${
            message.isSuccess
              ? 'bg-emerald-100 text-emerald-950 border-2 border-emerald-300'
              : 'bg-rose-100 text-rose-950 border-2 border-rose-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className={`w-5 h-5 ${message.isSuccess ? 'text-emerald-700' : 'text-rose-700'}`} />
            <span>{message.text}</span>
          </div>
          <button
            onClick={() => setMessage(null)}
            className="text-xs px-2.5 py-1 rounded-lg bg-white/60 hover:bg-white text-slate-700"
          >
            Đóng
          </button>
        </div>
      )}

      {/* Main Interactive Stage: Magic Room Target Items (Top/Left) + Action Cards Pool (Bottom/Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Magic Target Items Grid (8 cols) */}
        <div className="lg:col-span-8 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                4 Đồ Vật Cần Được Chăm Sóc
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-700">
              Kéo thả hoặc chạm thẻ rồi chạm đồ vật
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CARE_PAIRS.map(pair => {
              const isHealed = matchedPairs[pair.id] === true;

              return (
                <div
                  key={pair.id}
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, pair.id)}
                  onClick={() => handleTargetItemTap(pair.id)}
                  className={`rounded-3xl p-5 border-2 transition-all duration-500 relative cursor-pointer select-none ${
                    isHealed
                      ? 'bg-gradient-to-br from-amber-50 via-emerald-50 to-white border-emerald-400 shadow-md ring-4 ring-emerald-300/40'
                      : selectedActionId
                      ? 'bg-amber-50/50 border-amber-300 hover:border-amber-500 border-dashed hover:scale-[1.01]'
                      : 'bg-slate-50/80 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {/* Status Aura / Light Effect */}
                  {isHealed && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-300">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                      <span>Đã bảo vệ</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative">
                      <ItemGraphicSvg
                        type={
                          pair.id === 'book'
                            ? 'book'
                            : pair.id === 'toy'
                            ? 'toy'
                            : pair.id === 'furniture'
                            ? 'furniture'
                            : 'cup'
                        }
                        status={isHealed ? 'clean' : 'damaged'}
                        size={64}
                      />
                      {isHealed && (
                        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xs pointer-events-none" />
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-amber-700">
                        {isHealed ? '✨ Tỏa sáng' : 'Cần chăm sóc'}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-lg leading-tight">
                        {pair.itemTitle}
                      </h4>
                      <div className="text-xs font-bold text-amber-800">
                        {pair.itemEn}
                      </div>
                    </div>
                  </div>

                  {/* Drop Target Zone / Matched Info */}
                  <div
                    className={`rounded-2xl p-3 text-xs transition-all ${
                      isHealed
                        ? 'bg-emerald-100/70 border border-emerald-200 text-emerald-950 font-bold'
                        : selectedActionId
                        ? 'bg-amber-100/70 border-2 border-dashed border-amber-400 text-amber-900 font-bold text-center'
                        : 'bg-slate-100/70 border border-slate-200 text-slate-500 font-medium text-center'
                    }`}
                  >
                    {isHealed ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
                          <Check className="w-4 h-4" />
                          <span>{pair.correctActionText}</span>
                        </div>
                        <div className="text-[11px] text-emerald-700 font-normal">
                          {pair.careDetails}
                        </div>
                      </div>
                    ) : selectedActionId ? (
                      <span>Chạm vào đây để ghép thẻ đã chọn!</span>
                    ) : (
                      <span>Thả thẻ hành động bảo vệ vào đây</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Cards Pool (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-3">
              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Thẻ Hành Động Bảo Vệ ({remainingCards.length})
              </h4>
              <span className="text-xs text-amber-700 font-bold">
                Kéo hoặc Chạm
              </span>
            </div>

            {remainingCards.length === 0 ? (
              <div className="text-center py-6 text-emerald-800 font-bold text-xs space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 text-lg">
                  ✓
                </div>
                <p>Tất cả các thẻ hành động đã được ghép chính xác!</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {remainingCards.map(pair => {
                  const isSelected = selectedActionId === pair.id;

                  return (
                    <div
                      key={pair.id}
                      draggable
                      onDragStart={e => handleDragStart(e, pair.id)}
                      onClick={() => handleActionTap(pair.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-grab active:cursor-grabbing transition-all select-none ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-400 scale-[1.02]'
                          : 'bg-amber-50/70 hover:bg-amber-100/80 border-amber-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                          {pair.correctActionText}
                        </p>
                        <span className="shrink-0 text-amber-600 text-xs">
                          {isSelected ? '✓ Đang chọn' : '👉'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-amber-800/80 font-semibold">
                        <span>Chăm sóc {pair.itemTitle}</span>
                        <span className="text-amber-600 font-bold">Kéo / Chạm</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Badge Display Upon Stage Completion */}
          {isCompletedAll && (
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 text-white text-center shadow-xl space-y-3 animate-in fade-in">
              <BadgeSvg title="Người bảo vệ đồ dùng" isUnlocked={true} size={90} />
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-200 block">
                  HUY HIỆU ĐÃ MỞ KHÓA
                </span>
                <h4 className="text-xl font-black font-display">
                  NGƯỜI BẢO VỆ ĐỒ DÙNG
                </h4>
              </div>
              <p className="text-xs text-amber-100 font-semibold leading-relaxed">
                Em đã giải phóng sức mạnh bảo vệ, phục hồi vẻ đẹp cho cả 4 đồ dùng trong ngôi nhà kỳ diệu!
              </p>
              <button
                onClick={onComplete}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TIẾP TỤC ĐẾN TRẠM 4</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
