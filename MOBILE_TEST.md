# 📱 Test Responsive trên Mobile (Chrome/Safari)

## ✅ Đã Fix

### Các vấn đề đã giải quyết:
1. ✅ **visualViewport API** - Tính chính xác viewport height (trừ browser UI)
2. ✅ **CSS Custom Properties** - Dùng `--vh` thay vì `vh`
3. ✅ **MobileOptimizer** - Tự động update viewport khi browser UI ẩn/hiện
4. ✅ **Aggressive event listeners** - Listen tất cả resize events
5. ✅ **position: fixed** - Ngăn scroll trên mobile
6. ✅ **Safe area insets** - Hỗ trợ iPhone notch
7. ✅ **Debug overlay** - Triple tap để xem info

## 🧪 Cách Test

### **Bước 1: Mở game trên mobile**
```
Mở: index.html
```

### **Bước 2: Xoay ngang điện thoại**
- Game sẽ tự động resize
- Canvas phải vừa màn hình
- Không có scroll bar

### **Bước 3: Kiểm tra Debug Info**
**Tap 3 lần nhanh vào màn hình** → Sẽ hiện debug overlay góc trên bên trái với thông tin:
```
Window: 844x390
Visual: 844x335  ← Real viewport (no browser UI)
Canvas: 640px x 320px
Internal: 800x400
Scale: 80%
Mobile: Yes
Orient: Land
```

### **Bước 4: Kiểm tra Console** (nếu có DevTools)
```javascript
// Desktop browser: F12 → Console
// Mobile Chrome: chrome://inspect

// Hoặc dùng commands:
debugCanvas()      // Log chi tiết
showDebugInfo()   // Hiện overlay
```

## 📊 Kết quả mong đợi

### iPhone 12 Pro (Chrome/Safari)
```
Window: 844 x 390
Visual Viewport: 844 x 335 (khi address bar ẩn)
Canvas Display: ~670 x 335px
Scale: ~84%
✅ Vừa màn hình
```

### Samsung Galaxy S20 (Chrome)
```
Window: 915 x 412  
Visual Viewport: 915 x 360
Canvas Display: ~720 x 360px
Scale: ~90%
✅ Vừa màn hình
```

### Xiaomi/Oppo (các phone nhỏ)
```
Window: 640 x 360
Visual Viewport: 640 x 320
Canvas Display: ~600 x 300px
Scale: ~75%
✅ Vừa màn hình
```

## 🔧 Debug Commands

### Console Commands (Desktop/Mobile Chrome):
```javascript
// Show debug overlay
showDebugInfo()

// Log detailed info
debugCanvas()

// Force resize
window.game.responsiveManager.resize()

// Check viewport
console.log('Inner:', window.innerHeight)
console.log('Visual:', window.visualViewport?.height)
console.log('--vh:', getComputedStyle(document.documentElement).getPropertyValue('--vh'))
```

## ⚡ Features

### MobileOptimizer.js
- ✅ Detect mobile browsers
- ✅ Update `--vh` CSS variable realtime
- ✅ Listen visualViewport changes
- ✅ Handle orientation change
- ✅ Handle address bar hide/show

### ResponsiveManager.js
- ✅ Use MobileOptimizer height
- ✅ Calculate precise available space
- ✅ Account for header + controls height
- ✅ Scale 40%-100% on mobile
- ✅ Force resize with setProperty

### CSS
- ✅ Use `calc(var(--vh) * 100)` instead of `100vh`
- ✅ position: fixed on mobile
- ✅ Safe area insets for iPhone
- ✅ No overflow/scroll

## 🐛 Nếu vẫn chưa fit

1. **Triple tap** để xem debug info
2. Chụp màn hình gửi cho dev
3. Hoặc mở Console và chạy:
   ```javascript
   debugCanvas()
   ```
4. Screenshot console logs

## 📸 Screenshots để compare

Khi test, check:
- ✅ Canvas không bị crop
- ✅ Không có scrollbar
- ✅ Header + canvas + controls vừa màn hình
- ✅ Khi ẩn address bar → canvas tự động to ra
- ✅ Khi hiện address bar → canvas tự động nhỏ lại

## 🎯 Tips

- **Chrome mobile**: Address bar auto-hide khi scroll down
- **Safari iOS**: Address bar luôn hiện ở top
- **Triple tap**: Mở debug overlay bất cứ lúc nào
- **Close button**: Đóng debug overlay
- **Console**: Vẫn log info nền

---
Updated: 2025-01-13
Version: 3.0 - MobileOptimizer + visualViewport + Debug Overlay

