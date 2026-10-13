# HƯỚNG DẪN TRIỂN KHAI VERCEL & GITHUB

## HỌC LIỆU SỐ TƯƠNG TÁC: NGÔI NHÀ NHỎ – KHO BÁU YÊU THƯƠNG (OUR FAMILY HOME)
- **Môn học**: Đạo đức – Lớp 2 (Bộ sách Kết nối tri thức với cuộc sống)
- **Bài**: Bảo quản đồ dùng gia đình
- **Giáo viên**: Nguyễn Thị Tuyết – Lớp 2A7 – Trường Tiểu học Đỗ Ngọc Du – Phân hiệu Ngô Thì Nhậm

---

## 1. Cấu Trúc Dự Án
Dự án được xây dựng trên nền tảng **React 19 + TypeScript + Vite + Tailwind CSS v4**, tối ưu hóa cho màn hình 16:9, bảng tương tác thông minh, máy chiếu trường học, máy tính bảng và laptop.

Hệ thống âm thanh tích hợp:
- **Web Audio API Sound Synthesizer**: Tạo âm thanh hiệu ứng (ding, chime, fanfare, wrong tone, magic sparkle) hoàn toàn độc lập, không phụ thuộc file ngoài và hoạt động 100% không lo lỗi 404.
- **Web Speech API Speech Engine**: Giọng đọc cô giáo và học sinh tiếng Việt cùng phát âm tiếng Anh chuẩn.

---

## 2. Triển Khai Nhanh Lên Vercel

### Cách 1: Triển khai qua GitHub (Khuyên dùng)
1. Tải toàn bộ mã nguồn lên kho lưu trữ GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ngôi nhà nhỏ kho báu yêu thương"
   git branch -M main
   git remote add origin https://github.com/<tai-khoan>/<ten-repo>.git
   git push -u origin main
   ```
2. Truy cập [https://vercel.com](https://vercel.com), chọn **Add New...** -> **Project**.
3. Chọn repository GitHub vừa tải lên.
4. Vercel sẽ tự động phát hiện cấu hình từ tệp `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Nhấn **Deploy** và hoàn thành trong vòng 1-2 phút!

---

### Cách 2: Triển khai bằng Vercel CLI
Nếu có Vercel CLI trên máy:
```bash
npm install -g vercel
vercel
```
Làm theo các bước hướng dẫn trên terminal để hoàn tất.

---

## 3. Chạy Thử Trên Máy Tính Cá Nhân (Local Development)

```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Chạy máy chủ phát triển
npm run dev

# 3. Mở trình duyệt tại:
http://localhost:3000

# 4. Kiểm tra biên dịch sản xuất
npm run build
```

---

## 4. Tùy Chỉnh Đường Link Quizizz
Nếu giáo viên muốn tích hợp mã bài tập Quizizz ở Trạm 7:
Mở tệp `src/data/lessonData.ts`, tìm đến dòng `QUIZIZZ_CONFIG`:
```typescript
export const QUIZIZZ_CONFIG = {
  isConfigured: true,
  url: 'https://quizizz.com/join?gc=MA_SO_CUA_CO',
  placeholderNotice: 'Thử thách cuối trên Quizizz'
};
```
Sau đó lưu lại và hệ thống sẽ tự động kích hoạt nút truy cập Quizizz tại màn hình tổng kết!
