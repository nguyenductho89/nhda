# 🧪 Hướng Dẫn Test Responsive Canvas

## Cách test game responsive

### 1. Test trên Desktop
1. Mở `index.html` trong browser
2. Mở DevTools Console (F12)
3. Xem log về canvas dimensions
4. Resize cửa sổ browser → Canvas sẽ tự động resize
5. Canvas nên giữ aspect ratio 2:1

### 2. Test trên Mobile (Khuyến nghị)

#### Cách 1: Dùng file test chuyên dụng
1. Mở `test-responsive.html` trên mobile
2. Xoay ngang điện thoại
3. Xem thông tin chi tiết về:
   - Viewport size
   - Container size
   - Canvas display size
   - Canvas internal resolution
   - Scale %
4. Nhấn "Refresh" để update lại
5. Kiểm tra xem canvas có vừa màn hình không

#### Cách 2: Test game thực tế
1. Mở `index.html` trên mobile
2. Xoay ngang điện thoại
3. Mở DevTools (nếu có) hoặc xem Console
4. Canvas sẽ tự động co lại để vừa màn hình
5. Touch controls sẽ hiện ra
6. Thử chơi game để kiểm tra

### 3. Test với Chrome DevTools

1. Mở `index.html` trên desktop
2. F12 → Toggle Device Toolbar (Ctrl+Shift+M)
3. Chọn device:
   - iPhone 12 Pro
   - Samsung Galaxy S20
   - iPad Air
4. Rotate device (icon xoay)
5. Kiểm tra Console để xem log resize
6. Canvas phải tự động co giãn

### 4. Kiểm tra những gì?

✅ **Canvas Display Size**
- Mobile landscape: Nên nhỏ hơn 800px
- Desktop: Có thể = 800px
- Check: `canvas.style.width` và `canvas.style.height`

✅ **Canvas Internal Resolution**
- Luôn luôn phải là: 800x400
- Check: `canvas.width` và `canvas.height`

✅ **Scale**
- Mobile: 40% - 100% (0.4 - 1.0)
- Desktop: 80% - 120% (0.8 - 1.2)
- Check console log

✅ **Responsive Elements**
- Mobile controls hiển thị
- Header thu gọn
- Font sizes nhỏ hơn
- Vừa màn hình không scroll

✅ **Touch Controls**
- Chỉ hiện trên mobile landscape
- Buttons hoạt động tốt
- Không bị lag

## Console Logs để xem

Mở Console sẽ thấy:
```
🎮 Canvas resized: 640x320px (scale: 80%, mobile, landscape)
📐 Available space: 700x350 (header: 80, controls: 80)
```

## Ví dụ kết quả mong đợi

### iPhone 12 Landscape
- Viewport: 844x390
- Canvas Display: ~640x320px
- Scale: 80%
- ✅ Vừa màn hình, không scroll

### iPad Landscape
- Viewport: 1024x768
- Canvas Display: 800x400px
- Scale: 100%
- ✅ Full size

### Samsung Galaxy S20 Landscape
- Viewport: 915x412
- Canvas Display: ~650x325px
- Scale: 81%
- ✅ Vừa màn hình

## Troubleshooting

### ❌ Canvas không resize
1. Check Console có log không?
2. ResponsiveManager có được load không?
3. Try hard refresh: Ctrl+Shift+R

### ❌ Canvas bị blur
- Đây là do browser scaling
- Canvas internal resolution vẫn 800x400
- Có thể giảm scale nếu cần

### ❌ Layout bị vỡ
1. Check CSS media queries
2. Xem element dimensions trong DevTools
3. Kiểm tra overflow properties

## Quick Debug Commands

Paste vào Console:
```javascript
// Check canvas info
const canvas = document.getElementById('gameCanvas');
console.log('Display:', canvas.style.width, canvas.style.height);
console.log('Internal:', canvas.width, canvas.height);
console.log('Scale:', window.game?.responsiveManager?.scale);

// Force resize
window.game?.responsiveManager?.resize();

// Check viewport
console.log('Viewport:', window.innerWidth, window.innerHeight);
console.log('Mobile:', window.innerWidth <= 768);
console.log('Landscape:', window.matchMedia('(orientation: landscape)').matches);
```

---

💡 **Pro Tip**: Dùng `test-responsive.html` để kiểm tra nhanh trước khi test game thực tế!

