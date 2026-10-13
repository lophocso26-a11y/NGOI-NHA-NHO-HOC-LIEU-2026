import React from 'react';
import { BookOpen, User, School, CheckCircle2, Heart, X, Award } from 'lucide-react';
import { TEACHER_INFO } from '../../data/lessonData';

interface TeacherInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherInfoModal: React.FC<TeacherInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-6 shadow-2xl border-2 border-amber-300 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md font-bold">
              👩‍🏫
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                THÔNG TIN HỌC LIỆU SỐ
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                {TEACHER_INFO.themeVi}
              </h3>
              <span className="text-xs font-bold text-amber-800">
                {TEACHER_INFO.themeEn}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lesson Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
              <User className="w-4 h-4 text-amber-600" />
              <span>GIÁO VIÊN & LỚP</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm">
              {TEACHER_INFO.teacherName}
            </div>
            <div className="text-xs text-amber-900 font-bold">
              {TEACHER_INFO.className}
            </div>
          </div>

          <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
              <School className="w-4 h-4 text-amber-600" />
              <span>TRƯỜNG HỌC & PHÂN HIỆU</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm">
              {TEACHER_INFO.schoolName}
            </div>
            <div className="text-xs text-amber-900 font-bold">
              {TEACHER_INFO.subCampus}
            </div>
          </div>

          <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>MÔN HỌC & BỘ SÁCH</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm">
              {TEACHER_INFO.subject}
            </div>
            <div className="text-xs text-amber-900 font-bold">
              {TEACHER_INFO.bookSeries}
            </div>
          </div>

          <div className="bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200">
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>TÊN BÀI HỌC</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm">
              {TEACHER_INFO.lessonName}
            </div>
            <div className="text-xs text-amber-900 font-bold">
              Chương trình GDPT 2018
            </div>
          </div>
        </div>

        {/* Learning Objectives (Mục tiêu học tập) */}
        <div className="space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-200">
          <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Mục Tiêu Sau Hành Trình:</span>
          </h4>
          <ul className="text-xs text-slate-700 space-y-2 font-medium">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Nhận biết các đồ dùng quen thuộc trong 4 khu vực gia đình.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Hiểu vì sao cần giữ gìn và bảo quản đồ dùng gia đình.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Phân biệt việc nên làm và không nên làm khi sử dụng đồ dùng.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Biết cách chăm sóc, cất giữ và bảo quản đồ dùng gia đình hằng ngày.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Tích hợp làm quen từ vựng tiếng Anh giao tiếp đơn giản phù hợp lớp 2.</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
        >
          ĐÃ HIỂU
        </button>
      </div>
    </div>
  );
};
