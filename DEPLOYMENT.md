# 🚀 Hướng dẫn Deploy lên GitHub Pages

Hướng dẫn chi tiết từng bước để deploy game Mario lên GitHub Pages.

## 📋 Yêu cầu

- Tài khoản GitHub
- Git đã được cài đặt trên máy
- Code game đã hoàn chỉnh

## 🔧 Bước 1: Chuẩn bị Repository

### 1.1. Tạo Repository mới trên GitHub

1. Đăng nhập vào [GitHub](https://github.com)
2. Click vào nút **+** ở góc trên bên phải
3. Chọn **New repository**
4. Điền thông tin:
   - **Repository name**: `mario-game` (hoặc tên bạn muốn)
   - **Description**: "Simple Mario game built with HTML5 Canvas"
   - Chọn **Public** (bắt buộc cho GitHub Pages miễn phí)
   - **KHÔNG** chọn "Initialize this repository with a README"
5. Click **Create repository**

### 1.2. Copy URL repository

Sau khi tạo xong, copy URL repository. Sẽ có dạng:
```
https://github.com/your-username/mario-game.git
```

## 💻 Bước 2: Push Code lên GitHub

### 2.1. Mở Terminal/Command Prompt

Di chuyển vào thư mục game:
```bash
cd /path/to/mario
```

### 2.2. Khởi tạo Git (nếu chưa có)

```bash
# Kiểm tra xem đã có git chưa
git status

# Nếu chưa có, khởi tạo:
git init
```

### 2.3. Add và Commit code

```bash
# Add tất cả files
git add .

# Commit với message
git commit -m "Initial commit: Super Mario game"
```

### 2.4. Kết nối với GitHub repository

```bash
# Thay your-username và mario-game bằng thông tin của bạn
git remote add origin https://github.com/your-username/mario-game.git

# Kiểm tra remote
git remote -v
```

### 2.5. Push code lên GitHub

```bash
# Đổi tên branch thành main (nếu cần)
git branch -M main

# Push code
git push -u origin main
```

**Lưu ý**: Nếu lần đầu push, bạn sẽ cần đăng nhập GitHub.

## 🌐 Bước 3: Kích hoạt GitHub Pages

### 3.1. Vào Settings của Repository

1. Truy cập repository trên GitHub
2. Click tab **Settings** (Cài đặt)

### 3.2. Cấu hình GitHub Pages

1. Ở sidebar bên trái, scroll xuống tìm phần **Pages**
2. Trong phần **Source**:
   - **Branch**: Chọn `main`
   - **Folder**: Chọn `/ (root)`
3. Click **Save**

### 3.3. Chờ deploy

- GitHub sẽ tự động deploy website
- Quá trình này mất 1-3 phút
- Bạn sẽ thấy thông báo: "Your site is published at..."

### 3.4. Truy cập game

URL của game sẽ có dạng:
```
https://your-username.github.io/mario-game/
```

Ví dụ: `https://johndoe.github.io/mario-game/`

## ✅ Kiểm tra Deploy thành công

### Dấu hiệu thành công:
- ✅ Trang web load được
- ✅ Game canvas hiển thị
- ✅ Có thể di chuyển nhân vật
- ✅ Không có lỗi trong Console (F12)

### Nếu có lỗi:
1. Mở Developer Tools (F12)
2. Check tab Console để xem lỗi
3. Thường gặp:
   - **404 File not found**: Kiểm tra đường dẫn file
   - **CORS error**: Đảm bảo dùng relative paths
   - **Script error**: Kiểm tra thứ tự load scripts trong HTML

## 🔄 Update Code sau khi Deploy

Khi bạn sửa code và muốn update website:

```bash
# Add files đã thay đổi
git add .

# Commit với message mô tả thay đổi
git commit -m "Update: thêm level mới"

# Push lên GitHub
git push origin main
```

GitHub Pages sẽ tự động deploy lại sau vài phút.

## 🎨 Thêm Custom Domain (Tùy chọn)

Nếu bạn có domain riêng:

### 1. Thêm file CNAME

Tạo file `CNAME` (không có extension) ở root:
```
yourdomain.com
```

### 2. Cấu hình DNS

Ở nhà cung cấp domain, thêm DNS records:
```
Type: CNAME
Name: www
Value: your-username.github.io
```

### 3. Cập nhật GitHub Settings

Trong Settings > Pages, nhập custom domain và click Save.

## 📱 Tối ưu cho Mobile

Game đã responsive, nhưng để tốt hơn:

### 1. Thêm meta tags

Đã có sẵn trong `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 2. Thêm touch controls (optional)

Có thể thêm buttons ảo cho mobile trong tương lai.

## 🐛 Troubleshooting

### Lỗi: "failed to push some refs"

```bash
# Pull code mới nhất trước
git pull origin main --rebase

# Sau đó push lại
git push origin main
```

### Lỗi: "Permission denied"

- Kiểm tra đã đăng nhập GitHub chưa
- Có thể cần setup SSH key hoặc Personal Access Token

### Website không update

- Đợi vài phút
- Force refresh browser (Ctrl + F5)
- Clear cache browser
- Check tab Actions trên GitHub để xem deploy status

### Game không chạy trên HTTPS

- GitHub Pages mặc định dùng HTTPS
- Đảm bảo không có mixed content (HTTP resources trên HTTPS page)

## 📊 Theo dõi Traffic

Muốn biết bao nhiêu người chơi game?

1. Tích hợp Google Analytics
2. Thêm tracking code vào `index.html`
3. Xem reports trên Google Analytics dashboard

## 🔒 Bảo mật

- **KHÔNG** commit API keys hoặc secrets
- Sử dụng environment variables nếu cần
- Thêm vào `.gitignore` các file nhạy cảm

## 📝 Checklist Deploy

- [ ] Code đã test kỹ trên local
- [ ] Đã commit tất cả changes
- [ ] Đã push lên GitHub
- [ ] Đã kích hoạt GitHub Pages
- [ ] Website accessible từ URL công khai
- [ ] Game chạy đúng trên production
- [ ] Không có lỗi trong Console
- [ ] Test trên nhiều devices/browsers

## 🎉 Hoàn thành!

Chúc mừng! Game của bạn đã live trên Internet! 

Share link với bạn bè:
```
https://your-username.github.io/mario-game/
```

---

**Cần hỗ trợ?** Tạo issue trên GitHub repository!

