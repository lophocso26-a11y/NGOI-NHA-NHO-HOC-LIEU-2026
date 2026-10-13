import React, { useState } from 'react';
import { Volume2, CheckCircle2, Sparkles, ArrowRight, HelpCircle, Eye } from 'lucide-react';
import { ROOMS_DATA, RoomItem, RoomData } from '../../data/lessonData';
import { IsometricHouseSvg, ItemGraphicSvg } from '../common/IllustrationAssets';
import { TeacherNarration } from '../common/TeacherNarration';
import { CharacterGuide } from '../common/CharacterGuide';
import { audioManager } from '../../services/audioManager';
import { useGame } from '../../context/GameContext';

interface Stage1Props {
  onComplete: () => void;
  onBackToMap: () => void;
}

export const Stage1HomeDoor: React.FC<Stage1Props> = ({ onComplete, onBackToMap }) => {
  const { completeStage } = useGame();
  const [selectedRoomId, setSelectedRoomId] = useState<string>('living_room');
  const [selectedItem, setSelectedItem] = useState<RoomItem>(ROOMS_DATA[0].items[0]);
  const [exploredRooms, setExploredRooms] = useState<Set<string>>(new Set(['living_room']));
  const [isCompletedState, setIsCompletedState] = useState(false);

  const currentRoom = ROOMS_DATA.find(r => r.id === selectedRoomId) || ROOMS_DATA[0];
  const allRoomsExplored = ROOMS_DATA.every(r => exploredRooms.has(r.id));

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    audioManager.playSoundEffect('roomSelect');
    const room = ROOMS_DATA.find(r => r.id === roomId);
    if (room && room.items.length > 0) {
      setSelectedItem(room.items[0]);
      setExploredRooms(prev => new Set([...prev, roomId]));
      // Play brief room intro
      audioManager.playVietnamese(`Em đang khám phá ${room.nameVi}!`, 'teacher');
    }
  };

  const handleSelectItem = (item: RoomItem) => {
    setSelectedItem(item);
    audioManager.playSoundEffect('click');
    setExploredRooms(prev => new Set([...prev, selectedRoomId]));
    audioManager.playVietnamese(item.soundTextVi, 'teacher');
  };

  const handlePlayVi = () => {
    audioManager.playSoundEffect('click');
    audioManager.playVietnamese(selectedItem.soundTextVi, 'teacher');
  };

  const handlePlayEn = () => {
    audioManager.playSoundEffect('click');
    audioManager.playEnglish(selectedItem.soundTextEn);
  };

  const handleFinishStage = () => {
    audioManager.playSoundEffect('complete');
    setIsCompletedState(true);
    completeStage(1, 3, 30, 'badge_explorer');
    audioManager.playVietnamese(
      'Các em thật giỏi! Trong ngôi nhà của chúng ta có rất nhiều đồ dùng quen thuộc. Những đồ dùng ấy giúp cuộc sống của gia đình thuận tiện và thoải mái hơn.',
      'teacher'
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              TRẠM 1 · THE HOME DOOR
            </span>
            <span className="text-xs font-bold text-slate-500">
              Đã khám phá {exploredRooms.size}/4 căn phòng
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Cánh Cửa Ngôi Nhà – Khám Phá 4 Căn Phòng
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
        text={
          isCompletedState
            ? 'Các em thật giỏi! Trong ngôi nhà của chúng ta có rất nhiều đồ dùng quen thuộc. Những đồ dùng ấy giúp cuộc sống của gia đình thuận tiện và thoải mái hơn.'
            : 'Em hãy nhấn vào từng căn phòng trong ngôi nhà để phóng to và khám phá các đồ dùng quen thuộc nhé!'
        }
      />

      {/* Main Split Layout: Cutaway House (Left) + Room Explorer Detail Deck (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive 3D Cutaway Dollhouse (7 cols) */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 border border-amber-200/80 shadow-md">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Nhấn vào căn phòng để khám phá:
              </span>
            </div>
            <div className="text-xs text-amber-700 font-semibold">
              {exploredRooms.size === 4 ? '✨ Đã mở đủ 4 phòng!' : `Cần khám phá thêm ${4 - exploredRooms.size} phòng`}
            </div>
          </div>

          {/* Isometric House Svg with click handlers */}
          <IsometricHouseSvg
            activeRoom={selectedRoomId}
            onRoomClick={handleSelectRoom}
            isFullyGlowing={allRoomsExplored}
          />

          {/* Room Selection Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {ROOMS_DATA.map(room => {
              const isSelected = room.id === selectedRoomId;
              const isExplored = exploredRooms.has(room.id);
              return (
                <button
                  key={room.id}
                  onClick={() => handleSelectRoom(room.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                      : isExplored
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{room.nameVi}</span>
                  {isExplored && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-1 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Room Exploration Detail Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-amber-200/80 shadow-md">
            {/* Header of Active Room */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-100 mb-4">
              <div>
                <span className="text-[11px] font-extrabold uppercase text-amber-700">
                  Căn phòng đang chọn
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  {currentRoom.nameVi} · <span className="text-amber-600 text-sm">{currentRoom.nameEn}</span>
                </h3>
              </div>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full">
                {currentRoom.items.length} đồ dùng
              </span>
            </div>

            {/* List of Items in Room */}
            <div className="space-y-2 mb-5">
              <span className="text-xs font-bold text-slate-500 block mb-1">
                Chọn đồ vật để tìm hiểu & nghe phát âm:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {currentRoom.items.map(item => {
                  const isItemActive = selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className={`p-2.5 rounded-2xl flex items-center gap-2.5 border transition-all text-left ${
                        isItemActive
                          ? 'bg-amber-100 border-amber-400 text-amber-950 shadow-xs ring-2 ring-amber-300'
                          : 'bg-white hover:bg-amber-50/60 border-slate-200 text-slate-700'
                      }`}
                    >
                      <ItemGraphicSvg
                        type={
                          item.id === 'chair'
                            ? 'chair'
                            : item.id === 'fan'
                            ? 'fan'
                            : item.id === 'tv'
                            ? 'tv'
                            : item.id === 'cup'
                            ? 'cup'
                            : item.id === 'bed'
                            ? 'bed'
                            : item.id === 'book'
                            ? 'book'
                            : 'furniture'
                        }
                        size={36}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold truncate">{item.nameVi}</div>
                        <div className="text-[10px] text-amber-700 font-bold truncate">{item.nameEn}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Spotlight On Selected Item Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 rounded-2xl p-4 border border-amber-200 relative">
              <div className="flex items-center gap-4 mb-3">
                <ItemGraphicSvg
                  type={
                    selectedItem.id === 'chair'
                      ? 'chair'
                      : selectedItem.id === 'fan'
                      ? 'fan'
                      : selectedItem.id === 'tv'
                      ? 'tv'
                      : selectedItem.id === 'cup'
                      ? 'cup'
                      : selectedItem.id === 'bed'
                      ? 'bed'
                      : selectedItem.id === 'book'
                      ? 'book'
                      : 'furniture'
                  }
                  size={64}
                />
                <div>
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                    Đây là đồ vật gì? · What is it?
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 leading-tight">
                    {selectedItem.nameVi}
                  </h4>
                  <div className="text-sm font-bold text-amber-800">
                    {selectedItem.nameEn}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed mb-4 bg-white/70 rounded-xl p-2.5 border border-amber-100">
                {selectedItem.roleDescription}
              </p>

              {/* Dual Bilingual Audio Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handlePlayVi}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe Tiếng Việt</span>
                </button>

                <button
                  onClick={handlePlayEn}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs active:scale-95 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>English ({selectedItem.pronunciationEn})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Finish Button when all 4 rooms are explored */}
          {allRoomsExplored && !isCompletedState && (
            <button
              onClick={handleFinishStage}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base shadow-lg animate-bounce active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>HOÀN THÀNH KHÁM PHÁ (NHẬN 3 SAO)</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {isCompletedState && (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-md">
                ✓
              </div>
              <h4 className="text-lg font-extrabold text-emerald-900">
                Tuyệt Vời! Đã Hoàn Thành Trạm 1!
              </h4>
              <p className="text-xs text-emerald-800 font-semibold">
                Em đã khám phá đủ 4 căn phòng và nhận được huy hiệu <b>Nhà thám hiểm nhí</b>!
              </p>
              <button
                onClick={onComplete}
                className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>TIẾP TỤC ĐẾN TRẠM 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
