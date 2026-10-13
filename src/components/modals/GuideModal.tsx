import React from 'react';
import { HelpCircle, Star, Volume2, Sparkles, X, MousePointer, Hand } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl border-2 border-amber-300 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              Hướng Dẫn Khám Phá Cùng Minh & An
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions Steps */}
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 font-medium">
          <div className="flex items-start gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <div className="font-extrabold text-slate-900 mb-0.5">Khám phá lần lượt 7 trạm thử thách</div>
              <p>Mỗi trạm hoàn thành sẽ mở khóa trạm tiếp theo và thắp sáng thêm một phần ngôi nhà kỳ diệu.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <div className="font-extrabold text-slate-900 mb-0.5 flex items-center gap-1">
                <span>Nghe cô giáo & bạn đọc tiếng Việt / tiếng Anh</span>
                <Volume2 className="w-4 h-4 text-amber-600" />
              </div>
              <p>Nhấn vào các nút loa màu vàng để nghe giọng cô giáo hướng dẫn và nút màu xanh để nghe phát âm tiếng Anh.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <div className="font-extrabold text-slate-900 mb-0.5 flex items-center gap-1">
                <span>Thao tác kéo thả hoặc chạm chọn tiện lợi</span>
                <Hand className="w-4 h-4 text-emerald-600" />
              </div>
              <p>Ở Trạm 3, em có thể dùng chuột kéo thả thẻ vào đồ vật hoặc chạm chọn thẻ rồi chạm chọn đồ vật trên máy tính bảng.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <div className="font-extrabold text-slate-900 mb-0.5 flex items-center gap-1">
                <span>Nhận ngôi sao & huy hiệu danh dự</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              </div>
              <p>Mỗi khi trả lời đúng, em sẽ nhận được 3 ngôi sao và các huy hiệu thám tử đáng tự hào!</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
        >
          BẮT ĐẦU NGAY
        </button>
      </div>
    </div>
  );
};
