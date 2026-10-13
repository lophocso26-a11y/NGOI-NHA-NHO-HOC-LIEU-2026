import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  Star,
  RotateCcw,
  Map,
  Volume2,
  Sparkles,
  ExternalLink,
  Shield,
  Heart,
  QrCode
} from 'lucide-react';
import { GOLDEN_RULES, GoldenRule, BADGES, QUIZIZZ_CONFIG, TEACHER_INFO } from '../../data/lessonData';
import { IsometricHouseSvg, MinhCharacterSvg, AnCharacterSvg, BadgeSvg } from '../common/IllustrationAssets';
import { TeacherNarration } from '../common/TeacherNarration';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface Stage7Props {
  onBackToMap: () => void;
  onRestartJourney: () => void;
}

export const Stage7HappyHome: React.FC<Stage7Props> = ({ onBackToMap, onRestartJourney }) => {
  const { progress, completeStage, score } = useGame();
  const [showCelebration, setShowCelebration] = useState(true);

  useEffect(() => {
    // Complete stage 7 if not already
    completeStage(7, 3, 50, 'badge_master');
    audioManager.playSoundEffect('complete');

    // Confetti fanfare
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 120,
          origin: { y: 0.7 }
        });
      }, 1500);
    } catch {
      // Guard
    }

    // Victory voice
    audioManager.playVietnamese(
      'Chúc mừng các em! Các em là Người bảo vệ ngôi nhà xuất sắc! Hãy luôn nhớ ba nguyên tắc vàng để giữ gìn đồ dùng gia đình luôn bền đẹp nhé!',
      'teacher'
    );
  }, []);

  const handlePlayRuleVi = (rule: GoldenRule) => {
    audioManager.playSoundEffect('click');
    audioManager.playVietnamese(`Nguyên tắc ${rule.id}: ${rule.ruleVi}. ${rule.explanationVi}`, 'teacher');
  };

  const handlePlayRuleEn = (rule: GoldenRule) => {
    audioManager.playSoundEffect('click');
    audioManager.playEnglish(rule.voiceEn);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner Celebration */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white text-center shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-amber-100">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>HÀNH TRÌNH HOÀN THÀNH XUẤT SẮC · 7/7 TRẠM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight drop-shadow-md">
            CHÚC MỪNG EM!
          </h1>
          <h2 className="text-xl sm:text-3xl font-extrabold text-amber-100 font-display">
            EM LÀ NGƯỜI BẢO VỆ NGÔI NHÀ!
          </h2>

          <p className="text-sm sm:text-base font-semibold max-w-2xl mx-auto opacity-95">
            Ngôi nhà nhỏ giờ đây đã sáng bừng rực rỡ, mọi đồ dùng đều được chăm sóc, nâng niu và cất giữ đúng nơi quy định!
          </p>
        </div>
      </div>

      {/* Teacher Narration */}
      <TeacherNarration
        text="Chúc mừng các em đã xuất sắc hoàn thành toàn bộ hành trình! Ngôi nhà của chúng ta giờ đây đã sáng bừng và tràn ngập tình yêu thương!"
      />

      {/* Shining Glowing House & Waving Explorers */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md relative">
        <div className="text-center mb-3">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Ngôi Nhà Kỳ Diệu Hoàn Toàn Tỏa Sáng
          </span>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Minh waving on Left */}
          <div className="hidden sm:flex flex-col items-center absolute left-2 lg:left-6 bottom-4 z-20 animate-bounce">
            <MinhCharacterSvg pose="cheer" size={150} />
            <div className="bg-white/95 rounded-xl px-2.5 py-1 shadow-md border border-blue-200 text-[11px] font-extrabold text-blue-800">
              Hoan hô các bạn! 🌟
            </div>
          </div>

          {/* Central Fully Lit House */}
          <div className="w-full max-w-3xl">
            <IsometricHouseSvg activeRoom={null} isFullyGlowing={true} />
          </div>

          {/* An waving on Right */}
          <div className="hidden sm:flex flex-col items-center absolute right-2 lg:right-6 bottom-4 z-20 animate-bounce delay-150">
            <AnCharacterSvg pose="cheer" size={150} />
            <div className="bg-white/95 rounded-xl px-2.5 py-1 shadow-md border border-amber-200 text-[11px] font-extrabold text-amber-800">
              Tuyệt vời quá! 🎉
            </div>
          </div>
        </div>
      </div>

      {/* 3 Golden Rules Section (Ba nguyên tắc vàng) */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border-2 border-amber-300 shadow-md space-y-4">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            THÔNG ĐIỆP XUYÊN SUỐT · TAKE CARE – GIỮ GÌN
          </span>
          <h3 className="text-2xl font-black text-slate-900 font-display mt-2">
            3 Nguyên Tắc Vàng Bảo Quản Đồ Dùng
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {GOLDEN_RULES.map(rule => (
            <div
              key={rule.id}
              className="bg-gradient-to-b from-amber-50/70 to-white rounded-3xl p-5 border-2 border-amber-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-2xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                    {rule.number}
                  </span>
                  <button
                    onClick={() => handlePlayRuleEn(rule)}
                    className="flex items-center gap-1 text-[11px] font-extrabold text-blue-700 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded-lg transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>EN</span>
                  </button>
                </div>

                <h4 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {rule.ruleVi}
                </h4>
                <div className="text-xs font-bold text-amber-700 italic mb-2">
                  {rule.ruleEn}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-white/70 rounded-xl p-2.5 border border-amber-100">
                  {rule.explanationVi}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handlePlayRuleVi(rule)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Nghe nguyên tắc</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Tallies & Badges Collection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Summary Stats & Actions (6 cols) */}
        <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-amber-200/80 shadow-md space-y-4">
          <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Tổng Kết Thành Tích Thám Hiểm</span>
          </h3>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-amber-50 rounded-2xl p-3.5 text-center border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Số trạm</span>
              <span className="text-2xl font-black text-amber-950 font-display">7/7</span>
            </div>
            <div className="bg-amber-50 rounded-2xl p-3.5 text-center border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Tổng sao</span>
              <span className="text-2xl font-black text-amber-950 font-display flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500 inline" />
                21
              </span>
            </div>
            <div className="bg-amber-50 rounded-2xl p-3.5 text-center border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Điểm số</span>
              <span className="text-2xl font-black text-amber-950 font-display">{score} đ</span>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={onBackToMap}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-xs transition-all cursor-pointer"
            >
              <Map className="w-4 h-4" />
              <span>XEM LẠI BẢN ĐỒ 7 TRẠM</span>
            </button>

            <button
              onClick={onRestartJourney}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold text-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>CHƠI LẠI TOÀN BỘ HÀNH TRÌNH</span>
            </button>
          </div>
        </div>

        {/* Right: Badges Showcase (6 cols) */}
        <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-amber-200/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Bộ Sưu Tập Huy Hiệu</span>
            </h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              6/6 Huy hiệu
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {BADGES.map(badge => (
              <div
                key={badge.id}
                className="bg-amber-50/50 rounded-2xl p-2.5 text-center border border-amber-200 flex flex-col items-center justify-between"
              >
                <BadgeSvg title={badge.titleVi} isUnlocked={true} size={54} />
                <div className="mt-1">
                  <div className="text-[11px] font-extrabold text-slate-900 truncate max-w-full">
                    {badge.titleVi}
                  </div>
                  <div className="text-[9px] text-amber-700 font-bold truncate max-w-full">
                    {badge.titleEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CHALLENGE / QUIZIZZ SECTION (Section XIV requirement) */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 rounded-3xl p-6 border-2 border-indigo-200 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
              <QrCode className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-700">
                THỬ THÁCH CUỐI · FINAL CHALLENGE
              </span>
              <h4 className="text-xl font-extrabold text-slate-900">
                Đấu Trường Ôn Tập Quizizz
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {QUIZIZZ_CONFIG.isConfigured
                  ? 'Nhấn vào nút bên dưới để tham gia thử thách Quizizz trên lớp!'
                  : QUIZIZZ_CONFIG.placeholderNotice}
              </p>
            </div>
          </div>

          {QUIZIZZ_CONFIG.isConfigured && QUIZIZZ_CONFIG.url ? (
            <a
              href={QUIZIZZ_CONFIG.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
            >
              <span>VÀO QUIZIZZ</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="text-xs font-bold text-indigo-800 bg-indigo-100 border border-indigo-300 px-4 py-2.5 rounded-2xl shrink-0 text-center">
              Chờ giáo viên cập nhật mã Quizizz
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
