# 🚀 Hướng Dẫn Deploy Game Lên GitHub Pages

## Bước 1: Push code lên GitHub

```bash
# Tạo repository mới trên GitHub (ví dụ: mario-game)

# Trong thư mục mario, chạy:
git init
git add .
git commit -m "Initial commit - Mario game"
git branch -M main
git remote add origin https://github.com/USERNAME/mario-game.git
git push -u origin main
```

## Bước 2: Bật GitHub Pages

1. Vào repository trên GitHub
2. Click **Settings** (⚙️)
3. Click **Pages** (bên trái)
4. Trong **Source**, chọn **main** branch
5. Folder chọn **/ (root)**
6. Click **Save**

## Bước 3: Chờ 1-2 phút

GitHub sẽ build và deploy tự động!

## Bước 4: Lấy link và chia sẻ

Link sẽ có dạng:
```
https://USERNAME.github.io/mario-game/
```

**🎉 XOng! Giờ ai có link đều chơi được!**

---

## ✅ Ưu điểm GitHub Pages:

- ✅ **MIỄN PHÍ** 100%
- ✅ **Không giới hạn** người chơi
- ✅ **Tự động deploy** khi bạn push code mới
- ✅ **HTTPS** tự động (bảo mật)
- ✅ **Tốc độ nhanh** (CDN toàn cầu)

---

## 🔄 Cập nhật game sau này:

```bash
# Chỉnh sửa code
# Sau đó:
git add .
git commit -m "Update game"
git push

# GitHub Pages tự động update sau 1-2 phút!
```

---

## 🌍 Các cách deploy khác (Cũng miễn phí):

### Netlify (Drag & Drop - Siêu đơn giản!)
1. Vào [netlify.com](https://netlify.com)
2. Kéo thả folder `mario` vào
3. Xong! Link: `https://random-name.netlify.app`

### Vercel
```bash
npm i -g vercel
cd mario
vercel
```

### GitHub Pages với Custom Domain
Nếu có tên miền riêng (ví dụ: mariogame.com):
1. Settings → Pages → Custom domain
2. Nhập domain
3. Cấu hình DNS

---

## ⚡ Quick Start với GitHub Pages:

```bash
# Nếu đã có GitHub repo:
git add .
git commit -m "Add Mario game"
git push

# Bật Pages trong Settings → Pages → Source: main
```

**Link game của bạn sẽ là:**
```
https://YOUR-USERNAME.github.io/mario/
```

## 🎮 Chia sẻ game:

1. Copy link
2. Gửi cho bạn bè qua:
   - Facebook, Zalo, Messenger
   - QR Code
   - Email
3. Họ mở link → Chơi ngay!

**Không cần cài đặt gì, chỉ cần trình duyệt!**

---

## 📊 Theo dõi lượt chơi (Optional):

Thêm Google Analytics:
```html
<!-- Thêm vào <head> của index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## 🐛 Troubleshooting:

**Lỗi 404?**
- Đảm bảo file là `index.html` (chữ thường)
- Check branch là `main` trong Pages settings

**Game không load?**
- Mở Developer Console (F12) xem lỗi
- Đảm bảo paths đúng (tương đối, không tuyệt đối)

**Muốn đổi URL?**
- Đổi tên repository → URL tự đổi theo

---

## 🎉 Hoàn Thành!

Giờ game của bạn đã online, ai cũng chơi được!
Chia sẻ link và thách bạn bè phá kỷ lục! 🚀

