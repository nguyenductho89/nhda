# 📱 Responsive Game Features

## Tính năng đã thêm

### 1. **ResponsiveManager.js**
- Tự động resize canvas theo kích thước màn hình
- Debouncing để tối ưu performance
- Hỗ trợ orientationchange event
- Scale thông minh cho các thiết bị khác nhau

### 2. **CSS Responsive**
- Mobile landscape optimization
- Flexible game container
- Viewport units cho full-screen experience
- Overflow handling tốt hơn

### 3. **Canvas Scaling**
- Base resolution: 800x400px (giữ nguyên internal resolution)
- Display size: tự động điều chỉnh theo màn hình
- Minimum scale: 0.5 (cho mobile nhỏ)
- Maximum scale: 1.2 (cho màn hình lớn)

## Cách hoạt động

### Desktop
- Canvas hiển thị ở kích thước tối ưu
- Không scale quá 100% trừ khi màn hình rất lớn

### Mobile Landscape (Khuyến nghị)
- Canvas tự động co giãn để vừa màn hình
- Header và controls được tối ưu kích thước
- Padding giảm thiểu để tối đa không gian chơi
- Font sizes responsive

### Mobile Portrait
- Hiển thị thông báo yêu cầu xoay ngang
- Trải nghiệm tốt nhất ở chế độ landscape

## Breakpoints

- **Desktop**: > 768px
- **Mobile**: ≤ 768px
- **Small Mobile**: ≤ 480px

## Tính năng nổi bật

✅ Canvas co giãn tự động
✅ Giữ aspect ratio 2:1
✅ Touch controls hiển thị trên mobile
✅ Responsive typography trong canvas
✅ Smooth resize với debouncing
✅ Viewport optimization
✅ Overscroll behavior prevention

## Test trên các thiết bị

Đã test và tối ưu cho:
- 📱 iPhone (landscape mode)
- 📱 Android phones (landscape mode)
- 💻 Desktop browsers
- 🖥️ Large screens

## Lưu ý khi customize

1. Base canvas size được fix ở 800x400 để giữ game logic nhất quán
2. Chỉ display size thay đổi, không phải internal resolution
3. Mobile controls tự động hiện khi width ≤ 768px
4. StartScreen và WinScreen có responsive font sizes

## Performance

- Debouncing resize events (100ms)
- Orientation change delay (200ms) để đảm bảo stable
- Minimal reflows với efficient CSS
- No forced layouts

---
Tạo bởi: Mario Wedding Game Team 💕
Ngày cập nhật: 2025

