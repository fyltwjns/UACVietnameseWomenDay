# 🌸 UAC Art Club - Kỷ Niệm 20/10 Độc Bản

Trang web kỷ niệm ngày Phụ nữ Việt Nam 20/10 dành riêng cho 39 thành viên nữ UAC Art Club (UED's Art Club).

---

## 📁 Cấu Trúc Thư Mục Chuẩn Vercel (Production Ready)

```text
UACVietnameseWomenDay/
├── index.html                   # Trang chủ trải nghiệm 20/10 (Hero video, Nút mở quà, Video ca nhạc, Thiệp cá nhân)
├── vercel.json                  # Cấu hình tối ưu Vercel (Clean URLs, Caching Headers 1 năm cho video/ảnh/font, Security)
├── .gitignore                   # Loại trừ file rác hệ điều hành (.DS_Store, Thumbs.db,...)
├── README.md                    # Tài liệu dự án & Hướng dẫn triển khai
│
├── dungduavoitao/               # Cổng Quản Trị Viên bí mật
│   └── index.html               # Trang quản trị: Cấp phát pass, copy link gửi riêng, preview thiệp 39 thành viên
│
├── assets/
│   ├── images/
│   │   └── preview_web.png      # Ảnh banner preview khi chia sẻ link lên Facebook, Zalo, Messenger (1917x1077)
│   │
│   ├── css/
│   │   └── styles.css           # Toàn bộ hiệu ứng Liquid Glass, Neo-Brutalism, Confetti, Animations
│   │
│   ├── js/
│   │   ├── app.js               # Logic tương tác, linh vật Bé ê a xu, âm thanh cute, kiểm tra nickname & pass
│   │   ├── data.js              # Cơ sở dữ liệu 39 thành viên & lời chúc độc bản
│   │   └── members.json         # Dữ liệu JSON backup 39 thành viên
│   │
│   ├── fonts/
│   │   └── PlusJakartaSans-Variable.ttf  # Full font 100% tiếng Việt có dấu (loại bỏ phụ thuộc Google CDN)
│   │
│   ├── mascot/                  # Bộ 6 biểu cảm Pixel Mascot "Bé ê a xu"
│   │   ├── be_mam_wave.png      # Chào đón & vẫy tay
│   │   ├── be_mam_rose.png      # Ôm đóa hoa hồng đỏ
│   │   ├── be_mam_heart.png     # Bắn tim yêu thương
│   │   ├── be_mam_slam.png      # Đập mặt vào kính (vồ hụt cánh hoa)
│   │   ├── be_mam_key.png       # Giữ chìa khóa vàng
│   │   └── be_mam_idle.png      # Đứng đáng yêu
│   │
│   ├── photos/                  # 39 ảnh chân dung thành viên chuẩn AI YuNet Face-Centering (tỉ lệ 4:5)
│   │   ├── an.jpg
│   │   ├── ha.jpg
│   │   ├── le.jpg
│   │   └── ... (39 thành viên đầy đủ)
│   │
│   └── video/                   # Video chính chất lượng cao
│       ├── video_hero.mp4       # Video hero cinematic đầu trang (10 MB)
│       ├── video_hat_tang.mp4   # Video các bạn nam hát tặng chị em (58 MB)
│       └── video_hat_tang_poster.jpg # Poster preview cho video hát
│
└── docs/
    └── Prompt_Petal_Chase_20_10_Fixed.pdf # Tài liệu thiết kế gốc
```

---

## 🚀 Hướng Dẫn Deploy Lên Vercel (2 Cách Siêu Nhanh)

### Cách 1: Kéo thả thư mục hoặc đẩy qua GitHub (Khuyên dùng)
1. Đẩy toàn bộ thư mục này lên GitHub (Private repository).
2. Đăng nhập vào [Vercel](https://vercel.com/) $\rightarrow$ Chọn **Add New Project** $\rightarrow$ Chọn repo vừa tạo.
3. Cấu hình cài đặt:
   - **Framework Preset**: `Other` (Tự động nhận diện)
   - **Root Directory**: `./` (để mặc định)
   - **Build Command**: Để trống (None)
   - **Output Directory**: Để trống (None)
4. Bấm **Deploy**. Vercel sẽ tự động build xong trong vòng 15 giây!

### Cách 2: Deploy trực tiếp bằng Vercel CLI
Mở terminal tại thư mục này và chạy:
```bash
npx vercel
```
Làm theo hướng dẫn (chọn `Y` cho các câu hỏi mặc định) $\rightarrow$ Hoàn tất!

---

## 🔗 Các Đường Dẫn Sau Khi Deploy

- **Trang chủ (Dành cho chị em mở quà)**: `https://ten-du-an-cua-ban.vercel.app/`
- **Cổng Quản Trị Viên (Dành cho BTC UAC)**: `https://ten-du-an-cua-ban.vercel.app/dungduavoitao`
  *(File `vercel.json` đã bật `cleanUrls: true`, bạn có thể gõ trực tiếp `/dungduavoitao` mà không cần đuôi `.html`)*
