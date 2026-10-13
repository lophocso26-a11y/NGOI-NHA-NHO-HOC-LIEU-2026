import React from 'react';
import {
  DoorOpen,
  HeartHandshake,
  Sparkles,
  Search,
  ShieldCheck,
  Home,
  Award,
  CheckCircle2,
  Lock,
  Star,
  Volume2,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { STAGES } from '../../data/lessonData';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../services/audioManager';
import { CharacterGuide } from '../common/CharacterGuide';

interface JourneyMapProps {
  onSelectStage: (stageId: number) => void;
  onOpenResetModal: () => void;
}

export const JourneyMap: React.FC<JourneyMapProps> = ({
  onSelectStage,
  onOpenResetModal
}) => {
  const { progress } = useGame();
  const completedCount = progress.completedStages.length;
  const progressPercent = Math.round((completedCount / 7) * 100);

  const getStageIcon = (iconName: string) => {
    switch (iconName) {
      case 'DoorOpen':
        return <DoorOpen className="w-6 h-6" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Search':
        return <Search className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'Home':
        return <Home className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleStageClick = (stageId: number, isUnlocked: boolean) => {
    if (!isUnlocked) {
      audioManager.playSoundEffect('wrong');
      audioManager.playVietnamese('Trạm này chưa mở khóa. Em hãy hoàn thành trạm trước để khám phá tiếp nhé!', 'an');
      return;
    }
    audioManager.playSoundEffect('click');
    onSelectStage(stageId);
  };

  const mapIntroText =
    completedCount === 7
      ? 'Chúc mừng em! Ngôi nhà kỳ diệu đã được thắp sáng hoàn toàn! Em có thể khám phá lại bất kỳ trạm nào nhé!'
      : `Chào mừng em đến bản đồ thám hiểm! Em đã hoàn thành ${completedCount}/7 trạm thử thách. Hãy tiếp tục tiến bước nhé!`;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner & Progress Header */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                BẢN ĐỒ THÁM HIỂM · JOURNEY MAP
              </span>
              <span className="text-xs text-slate-500 font-bold">
                {completedCount}/7 Trạm
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Hành Trình Khám Phá Ngôi Nhà Kỳ Diệu
            </h1>
          </div>

          {/* Quick Action Button for Next Unlocked Stage */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {completedCount < 7 ? (
              <button
                onClick={() => {
                  const nextId = STAGES.find(s => !progress.completedStages.includes(s.id))?.id || 1;
                  onSelectStage(nextId);
                }}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all"
              >
                <span>VÀO TRẠM TIẾP THEO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onSelectStage(7)}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all"
              >
                <span>XEM TỔNG KẾT & HUY HIỆU</span>
                <Award className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenResetModal}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
              title="Bắt đầu lại hành trình"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-2">
            <span>Tiến độ hành trình: Em đã hoàn thành {completedCount}/7 trạm</span>
            <span className="text-amber-600 font-extrabold">{progressPercent}%</span>
          </div>
          <div className="w-full h-4 bg-amber-100 rounded-full overflow-hidden p-0.5 border border-amber-200">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-emerald-500 rounded-full transition-all duration-700 relative"
              style={{ width: `${Math.max(6, progressPercent)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Minh and An Dialogue Guide */}
      <CharacterGuide
        speaker="both"
        textVi={mapIntroText}
        textEn="Explore each station to care for our home things!"
        pose={completedCount === 7 ? 'cheer' : 'welcome'}
      />

      {/* 7 Stations Grid / Journey Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {STAGES.map((stage, index) => {
          const isUnlocked = progress.unlockedStages.includes(stage.id);
          const isCompleted = progress.completedStages.includes(stage.id);
          const stars = progress.stageStars[stage.id] || (isCompleted ? 3 : 0);

          return (
            <div
              key={stage.id}
              onClick={() => handleStageClick(stage.id, isUnlocked)}
              className={`relative rounded-3xl p-5 border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${
                isCompleted
                  ? 'bg-gradient-to-b from-emerald-50/90 to-white border-emerald-300 shadow-md hover:shadow-lg hover:-translate-y-1'
                  : isUnlocked
                  ? 'bg-gradient-to-b from-amber-50/90 to-white border-amber-400 shadow-md hover:shadow-xl hover:-translate-y-1.5 ring-4 ring-amber-400/20'
                  : 'bg-slate-100/80 border-slate-200 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Header: Station Number & Lock/Check status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isUnlocked
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                        : 'bg-slate-300 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : getStageIcon(stage.icon)}
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                      Trạm {stage.id}
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                      {stage.nameVi}
                    </h3>
                  </div>
                </div>

                {/* Status Indicator Badge */}
                <div>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                      Hoàn thành
                    </span>
                  ) : isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300 animate-pulse">
                      Sẵn sàng
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-200 px-2.5 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> Khóa
                    </span>
                  )}
                </div>
              </div>

              {/* English Subtitle & Description */}
              <div className="space-y-1 mb-4">
                <div className="text-xs font-bold text-amber-700 font-display">
                  {stage.nameEn}
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {stage.shortDesc}
                </p>
              </div>

              {/* Footer: Stars earned & Action button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {/* 3 Stars display */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map(sIdx => (
                    <Star
                      key={sIdx}
                      className={`w-4 h-4 ${
                        sIdx <= stars
                          ? 'fill-amber-400 text-amber-500 drop-shadow-2xs'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Card Button */}
                <span
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all ${
                    isCompleted
                      ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                      : isUnlocked
                      ? 'text-white bg-amber-500 hover:bg-amber-600 shadow-xs'
                      : 'text-slate-400 bg-slate-200'
                  }`}
                >
                  {isCompleted ? 'Chơi lại' : isUnlocked ? 'Khám phá' : 'Chưa mở'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
