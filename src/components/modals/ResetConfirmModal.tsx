import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border-2 border-rose-300 animate-in zoom-in-95">
        <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 font-display">
          Bắt Đầu Lại Hành Trình?
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          Thao tác này sẽ đặt lại điểm số, số sao và các trạm đã mở khóa về Trạm 1 ban đầu. Em có chắc chắn muốn bắt đầu lại từ đầu không?
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Hủy Bỏ
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            Đồng Ý Bắt Đầu Lại
          </button>
        </div>
      </div>
    </div>
  );
};
