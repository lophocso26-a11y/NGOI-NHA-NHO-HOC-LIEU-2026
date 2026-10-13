import React, { useState } from 'react';
import { Play, HelpCircle, Volume2, Sparkles, BookOpen, Heart, ArrowRight, Mic, StopCircle, Loader2, AlertCircle } from 'lucide-react';
import { TEACHER_INFO } from '../../data/lessonData';
import { MinhCharacterSvg, AnCharacterSvg, IsometricHouseSvg } from '../common/IllustrationAssets';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface WelcomeScreenProps {
  onStart: () => void;
  onOpenGuide: () => void;
  onOpenTeacherModal: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  onOpenGuide,
  onOpenTeacherModal
}) => {
  const { speakingState } = useGame();

  const teacherTestPhrase =
    'Chào mừng các em đến với Ngôi nhà nhỏ – Kho báu yêu thương! Hôm nay, cô và các em sẽ cùng khám phá cách giữ gìn đồ dùng trong gia đình nhé!';

  const teacherGreeting =
    'Xin chào các em yêu quý! Chào mừng các em đến với Ngôi nhà nhỏ – Kho báu yêu thương! Hôm nay, cô và hai bạn Minh, An sẽ cùng các em khám phá những đồ dùng quen thuộc trong gia đình và học cách giữ gìn chúng thật tốt nhé!';

  const isTestPhraseSpeaking =
    speakingState.speaking && speakingState.text === teacherTestPhrase;
  const isGreetingSpeaking =
    speakingState.speaking && speakingState.text === teacherGreeting;
  const isLoading = speakingState.loading;

  const handleTestVoice = () => {
    if (isTestPhraseSpeaking) {
      audioManager.stopSpeech();
      return;
    }
    audioManager.playSoundEffect('click');
    audioManager.speakVietnamese(teacherTestPhrase, 'teacher');
  };

  const handlePlayGreeting = () => {
    if (isGreetingSpeaking) {
      audioManager.stopSpeech();
      return;
    }
    audioManager.playSoundEffect('click');
    audioManager.speakVietnamese(teacherGreeting, 'teacher');
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-amber-50/60 via-orange-50/40 to-amber-100/50 overflow-hidden">
      {/* Decorative Warm Rays & Sky Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-amber-200/30 via-orange-100/20 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex-1 flex flex-col items-center justify-center">
        {/* Top Badges & Educational Series */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            {TEACHER_INFO.subject} · {TEACHER_INFO.bookSeries}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-200 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
            Bài: {TEACHER_INFO.lessonName}
          </span>
        </div>

        {/* Grand Headline Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-amber-950 font-display tracking-tight leading-tight drop-shadow-xs">
            NGÔI NHÀ NHỎ
          </h1>
          <div className="mt-1 flex items-center justify-center gap-3">
            <div className="h-0.5 w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-500" />
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 bg-clip-text text-transparent font-display tracking-wide">
              KHO BÁU YÊU THƯƠNG
            </h2>
            <div className="h-0.5 w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <p className="mt-2 text-sm sm:text-lg font-bold text-amber-800 tracking-wider font-display uppercase">
            OUR FAMILY HOME
          </p>
        </div>

        {/* Teacher & School Info Banner Card */}
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl border border-amber-200/80 p-3.5 sm:p-4 mb-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl shadow-xs font-bold">
              👩‍🏫
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                Giáo viên: {TEACHER_INFO.teacherName} – {TEACHER_INFO.className}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {TEACHER_INFO.schoolName} – {TEACHER_INFO.subCampus}
              </div>
            </div>
          </div>
          <button
            onClick={onOpenTeacherModal}
            className="text-xs font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            Chi tiết bài học
          </button>
        </div>

        {/* VOICE TEST BANNER: REQUIRED BY YÊU CẦU 5 */}
        <div className="w-full max-w-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-amber-400 p-3.5 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-extrabold text-amber-900 uppercase tracking-wide mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Kiểm Tra Giọng Đọc Cô Giáo</span>
            </div>
            <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
              &ldquo;{teacherTestPhrase}&rdquo;
            </p>
          </div>

          <button
            onClick={handleTestVoice}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-extrabold text-xs shadow-md active:scale-95 transition-all shrink-0 cursor-pointer ${
              isTestPhraseSpeaking
                ? 'bg-rose-500 hover:bg-rose-600 animate-pulse'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 ring-2 ring-amber-300'
            }`}
            title="Thử giọng cô giáo tiếng Việt"
          >
            {isLoading && isTestPhraseSpeaking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isTestPhraseSpeaking ? (
              <StopCircle className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
            <span>{isTestPhraseSpeaking ? 'DỪNG ĐỌC' : 'THỬ GIỌNG CÔ GIÁO'}</span>
          </button>
        </div>

        {/* Central Visual: Cutaway Dollhouse with Minh and An flanking on sides */}
        <div className="w-full relative flex items-center justify-center mb-6">
          {/* Minh on Left */}
          <div className="hidden md:flex flex-col items-center absolute -left-4 lg:left-4 bottom-4 z-20 animate-in fade-in slide-in-from-left duration-700">
            <MinhCharacterSvg pose="welcome" size={170} />
            <div className="bg-white/95 rounded-xl px-3 py-1 shadow-md border border-blue-200 text-xs font-extrabold text-blue-800 mt-[-10px]">
              Chào các bạn! Tớ là Minh 🎒
            </div>
          </div>

          {/* Central 3D Dollhouse Illustration */}
          <div className="w-full max-w-3xl transform transition-transform hover:scale-[1.01]">
            <IsometricHouseSvg activeRoom={null} />
          </div>

          {/* An on Right */}
          <div className="hidden md:flex flex-col items-center absolute -right-4 lg:right-4 bottom-4 z-20 animate-in fade-in slide-in-from-right duration-700">
            <AnCharacterSvg pose="welcome" size={170} />
            <div className="bg-white/95 rounded-xl px-3 py-1 shadow-md border border-amber-200 text-xs font-extrabold text-amber-800 mt-[-10px]">
              Tớ là An! Cùng khám phá nhé 🎀
            </div>
          </div>
        </div>

        {/* Teacher Quote Card */}
        <div className="w-full max-w-3xl bg-amber-50/90 rounded-2xl border-2 border-amber-300 p-4 mb-6 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 text-center sm:text-left">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
              Lời cô giáo dặn dò:
            </span>
            <p className="text-slate-800 text-xs sm:text-sm font-semibold italic leading-relaxed">
              &ldquo;{teacherGreeting}&rdquo;
            </p>
          </div>
          <button
            onClick={handlePlayGreeting}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white font-bold text-xs shadow-xs active:scale-95 transition-all shrink-0 cursor-pointer ${
              isGreetingSpeaking ? 'bg-rose-500 hover:bg-rose-600' : 'bg-amber-500 hover:bg-amber-600'
            }`}
          >
            {isLoading && isGreetingSpeaking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isGreetingSpeaking ? (
              <StopCircle className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
            <span>{isGreetingSpeaking ? 'Dừng đọc' : 'Nghe cô nói'}</span>
          </button>
        </div>

        {/* Primary Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={() => {
              audioManager.playSoundEffect('openDoor');
              onStart();
            }}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-lg shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer font-display"
          >
            <Play className="w-6 h-6 fill-white" />
            <span>BẮT ĐẦU KHÁM PHÁ</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              audioManager.playSoundEffect('click');
              onOpenGuide();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 font-bold text-base shadow-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <span>HƯỚNG DẪN</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center text-xs text-amber-900/60 font-medium">
        Học liệu số hỗ trợ dạy học theo Chương trình GDPT 2018 · Tương thích máy chiếu & màn hình cảm ứng
      </div>
    </div>
  );
};
