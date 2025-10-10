# 📝 Changelog - Mario Game

## Version 2.0 - PNG Image Support 🎨

### ✨ Tính Năng Mới

#### 1. Hỗ Trợ Ảnh PNG
- ✅ Game giờ có thể sử dụng ảnh PNG cho:
  - Mario (nhân vật chính)
  - Enemies (kẻ thù)
  - Coins (đồng xu)
- ✅ **Fallback tự động**: Nếu không có ảnh, game vẫn hoạt động với hình vẽ mặc định
- ✅ **Flip sprite**: Mario tự động lật ảnh khi đi sang trái
- ✅ **Animation**: Coin xoay khi có ảnh

#### 2. Tool Tạo Sprites
- ✅ File `create-sprites.html` - Tạo sprites nhanh ngay trên trình duyệt
- ✅ Click để vẽ và tải về PNG
- ✅ Không cần phần mềm vẽ chuyên nghiệp

#### 3. Tài Liệu Mới
- ✅ `images/README.md` - Hướng dẫn chi tiết về ảnh
- ✅ `DEPLOY.md` - Hướng dẫn deploy lên GitHub Pages/Netlify/Vercel
- ✅ `CHANGELOG.md` - File này!

### 📂 Cấu Trúc Mới

```
mario/
├── index.html
├── style.css
├── game.js              # ✨ Updated: Hỗ trợ PNG
├── create-sprites.html  # ✨ New: Tool tạo sprites
├── images/              # ✨ New: Thư mục ảnh
│   ├── .gitkeep
│   └── README.md
├── DEPLOY.md           # ✨ New: Hướng dẫn deploy
├── CHANGELOG.md        # ✨ New: File này
└── README.md           # ✨ Updated: Thêm hướng dẫn PNG
```

### 🔧 Thay Đổi Kỹ Thuật

#### game.js
- Thêm image loading system
- Thêm fallback rendering cho từng sprite
- Cập nhật Player.draw() để support PNG + flip
- Cập nhật Enemy.draw() để support PNG
- Cập nhật Coin.draw() để support PNG + rotation

### 📖 Cách Sử Dụng Tính Năng Mới

#### Option 1: Tạo Sprites Tự Động
```bash
1. Mở create-sprites.html trong trình duyệt
2. Click "Vẽ Mario", "Vẽ Enemy", "Vẽ Coin"
3. Click "Tải về PNG" cho mỗi sprite
4. Đổi tên file: mario.png, enemy.png, coin.png
5. Di chuyển vào thư mục images/
6. Refresh game → Xong!
```

#### Option 2: Tự Vẽ/Tải Ảnh
```bash
1. Tạo hoặc tải PNG từ internet
2. Kích thước đề xuất:
   - mario.png: 32x32px
   - enemy.png: 30x30px
   - coin.png: 20x20px
3. Đặt vào images/
4. Refresh game
```

#### Option 3: Không Dùng Ảnh
```bash
- Không cần làm gì!
- Game chạy bình thường với hình vẽ mặc định
```

### 🌐 Deploy với Ảnh

Khi deploy lên GitHub Pages:
1. Commit cả thư mục `images/` cùng ảnh PNG
2. Push lên GitHub
3. Ảnh sẽ tự động có trên web!

### 🎯 Tính Năng Sắp Tới (Roadmap)

- [ ] Sprite animation (nhiều frames)
- [ ] Power-ups với ảnh riêng
- [ ] Background parallax với PNG
- [ ] Particle effects
- [ ] Sound effects
- [ ] Music

---

## Version 1.0 - Initial Release 🎮

### Tính Năng
- ✅ Platformer game style Mario
- ✅ Player movement với physics
- ✅ Jump mechanics
- ✅ 15+ platforms
- ✅ 5 enemies
- ✅ 11 coins to collect
- ✅ Camera follow player
- ✅ Lives system (3 lives)
- ✅ Score system
- ✅ Level completion (finish flag)
- ✅ Responsive UI
- ✅ Vietnamese + English controls

### Công Nghệ
- HTML5 Canvas
- Vanilla JavaScript (ES6+)
- CSS3

---

**Happy Gaming! 🎉**

