# 🎨 Hướng Dẫn Thêm Ảnh PNG Cho Game

Game đã được cập nhật để hỗ trợ ảnh PNG! Bạn cần thêm 3 file ảnh vào thư mục này:

## 📁 Các file ảnh cần thiết:

### 1. `mario.png` - Nhân vật Mario
- **Kích thước đề xuất**: 32x32 pixels
- **Nền trong suốt** (transparent background)
- **Format**: PNG với alpha channel

### 2. `enemy.png` - Kẻ thù
- **Kích thước đề xuất**: 30x30 pixels  
- **Nền trong suốt**
- **Format**: PNG với alpha channel

### 3. `coin.png` - Đồng xu
- **Kích thước đề xuất**: 20x20 pixels
- **Nền trong suốt**
- **Format**: PNG với alpha channel

## 🎨 Cách tạo/tìm ảnh:

### Cách 1: Tự vẽ
- Dùng Photoshop, GIMP, Piskel, hoặc Aseprite
- Vẽ pixel art đơn giản
- Lưu dưới dạng PNG với nền trong suốt

### Cách 2: Tải miễn phí
Các trang web pixel art miễn phí:
- [OpenGameArt.org](https://opengameart.org/)
- [Itch.io Asset Packs](https://itch.io/game-assets/free)
- [Kenney.nl](https://kenney.nl/assets) (rất nhiều asset miễn phí)
- [Pixilart](https://www.pixilart.com/)

### Cách 3: Sử dụng AI
- [Pixray](https://pixray.gob.io/)
- Midjourney/DALL-E (với prompt: "pixel art mario character 32x32")
- Stable Diffusion

### Cách 4: Tạo nhanh với code
Dùng canvas HTML để tạo sprite đơn giản, sau đó tải về PNG

## 🚀 Sau khi có ảnh:

1. Đặt các file vào thư mục `images/`:
   ```
   images/
   ├── mario.png
   ├── enemy.png
   └── coin.png
   ```

2. Refresh trình duyệt (F5)

3. Game sẽ tự động load ảnh!

## ⚠️ Lưu ý:

- **Nếu không có ảnh**: Game vẫn chạy bình thường với hình vẽ đơn giản (fallback)
- **Đảm bảo tên file chính xác**: `mario.png`, `enemy.png`, `coin.png` (chữ thường)
- **Nền trong suốt**: Để ảnh đẹp hơn, không có viền trắng
- **Kích thước**: Có thể to hơn, game sẽ tự scale

## 🎮 Tùy chỉnh kích thước:

Nếu muốn thay đổi kích thước sprite, sửa trong `game.js`:

```javascript
// Player size
this.width = 32;  // Thay đổi độ rộng
this.height = 32; // Thay đổi chiều cao

// Enemy size
this.width = 30;
this.height = 30;

// Coin size
this.width = 20;
this.height = 20;
```

## 🖼️ Template Base64 (Nếu không muốn dùng file riêng):

Nếu bạn muốn embed ảnh trực tiếp vào code mà không cần file riêng, có thể dùng Base64:

```javascript
// Trong game.js, thay vì:
images.mario.src = 'images/mario.png';

// Dùng:
images.mario.src = 'data:image/png;base64,iVBORw0KGgo...';
```

## ✨ Tips cho pixel art đẹp:

1. **Độ phân giải**: 32x32 hoặc 16x16 cho retro look
2. **Màu sắc**: Giới hạn 4-8 màu cho phong cách NES/SNES
3. **Outline**: Thêm viền đen để nhân vật nổi bật
4. **Animation frames**: Có thể tạo nhiều frame để animation (nâng cao)

## 🔧 Debug:

Nếu ảnh không hiển thị:
1. Mở Console (F12) → Check lỗi load ảnh
2. Kiểm tra đường dẫn file
3. Đảm bảo server đang chạy (không mở file:// trực tiếp)
4. Clear cache (Ctrl+F5)

---

**Game sẽ tự động dùng ảnh PNG nếu có, nếu không sẽ dùng hình vẽ mặc định!** ✨

