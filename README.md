# 🍄 Super Mario Game - Trình Duyệt

Game platformer phong cách Super Mario chạy trên trình duyệt web, được xây dựng bằng HTML5 Canvas và JavaScript thuần.

## 🎮 Tính Năng

- **Nhân vật điều khiển được** với vật lý chuyển động mượt mà
- **Hệ thống nền tảng** với nhiều loại platform khác nhau
- **Kẻ thù** có thể tiêu diệt bằng cách nhảy lên đầu
- **Thu thập xu** để tăng điểm
- **Hệ thống mạng** (3 mạng)
- **Camera tự động** theo dõi người chơi
- **Giao diện đẹp mắt** với thiết kế hiện đại

## 🕹️ Cách Chơi

### Điều Khiển
- **← →** (Mũi tên trái/phải) hoặc **A/D**: Di chuyển trái/phải
- **SPACE** hoặc **↑** hoặc **W**: Nhảy
- **R**: Khởi động lại game

### Mục Tiêu
1. Thu thập càng nhiều xu càng tốt để tăng điểm
2. Tiêu diệt kẻ thù bằng cách nhảy lên đầu chúng
3. Tránh va chạm với kẻ thù từ bên cạnh
4. Đến được cờ đích ở cuối màn chơi

### Hệ Thống Điểm
- 🪙 Mỗi xu: **+10 điểm**
- 👾 Tiêu diệt kẻ thù: **+20 điểm**
- 🏁 Hoàn thành màn: **+100 điểm**

## 🚀 Cách Chạy Game

### Phương Pháp 1: Mở Trực Tiếp
1. Mở file `index.html` bằng trình duyệt web (Chrome, Firefox, Safari, Edge)
2. Nhấn bất kỳ phím nào để bắt đầu chơi

### Phương Pháp 2: Chạy Server Local
```bash
# Sử dụng Python 3
python3 -m http.server 8000

# Hoặc sử dụng Python 2
python -m SimpleHTTPServer 8000

# Sau đó mở trình duyệt và truy cập:
# http://localhost:8000
```

### Phương Pháp 3: Sử dụng Live Server (VS Code)
1. Cài đặt extension "Live Server" trong VS Code
2. Click phải vào `index.html` và chọn "Open with Live Server"

## 📁 Cấu Trúc Dự Án

```
mario/
├── index.html      # File HTML chính
├── style.css       # Stylesheet cho game
├── game.js         # Logic game và game engine
└── README.md       # Tài liệu hướng dẫn
```

## 🎨 Công Nghệ Sử Dụng

- **HTML5 Canvas**: Để vẽ đồ họa game
- **JavaScript (ES6+)**: Logic game và tương tác
- **CSS3**: Styling giao diện
- **No external libraries**: Game hoàn toàn tự xây dựng

## 🔧 Tùy Chỉnh Game

### Thay Đổi Độ Khó
Trong file `game.js`, bạn có thể điều chỉnh:

```javascript
// Tốc độ người chơi
this.speed = 5;  // Tăng để di chuyển nhanh hơn

// Sức nhảy
this.jumpPower = 12;  // Tăng để nhảy cao hơn

// Trọng lực
this.gravity = 0.5;  // Tăng để rơi nhanh hơn
```

### Thêm Level Mới
Chỉnh sửa hàm `initLevel()` để thêm:
- Platforms mới
- Kẻ thù mới
- Xu ở vị trí mới

```javascript
// Ví dụ thêm platform
new Platform(x, y, width, height, 'brick')

// Ví dụ thêm kẻ thù
new Enemy(x, y)

// Ví dụ thêm xu
new Coin(x, y)
```

## 🎯 Tính Năng Có Thể Mở Rộng

- [ ] Thêm nhiều level
- [ ] Power-ups (tăng tốc, nhảy cao hơn, bất tử)
- [ ] Âm thanh và nhạc nền
- [ ] Điểm số cao nhất (high score)
- [ ] Nhiều loại kẻ thù khác nhau
- [ ] Hoạt ảnh phức tạp hơn
- [ ] Chế độ nhiều người chơi

## 🐛 Khắc Phục Sự Cố

**Game không chạy?**
- Đảm bảo JavaScript được bật trong trình duyệt
- Kiểm tra Console (F12) để xem lỗi
- Đảm bảo tất cả 3 file cùng thư mục

**Điều khiển không hoạt động?**
- Click vào game canvas trước
- Thử refresh trang (F5)

**Hiệu suất chậm?**
- Đóng các tab khác
- Thử trình duyệt khác (Chrome được khuyến nghị)

## 📝 License

Game này được tạo ra cho mục đích học tập và giải trí. Bạn có thể tự do sử dụng, chỉnh sửa và phân phối.

## 👨‍💻 Đóng Góp

Mọi đóng góp đều được chào đón! Hãy thoải mái:
- Báo cáo lỗi
- Đề xuất tính năng mới
- Gửi pull request
- Chia sẻ game với bạn bè

## 🎉 Chúc Bạn Chơi Game Vui Vẻ!

Hãy thử thách bản thân để đạt điểm cao nhất và hoàn thành level mà không mất mạng!

