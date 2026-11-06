# Thiết lập đồng bộ Google Calendar

Mỗi kỹ sư tự kết nối tài khoản Google trong **Hồ sơ cá nhân → Google Calendar**. Khi ca được duyệt, dời lịch, từ chối hoặc hủy, hệ thống cập nhật sự kiện trên lịch chính của tài khoản đã kết nối. Refresh token được mã hóa AES-GCM ở Edge Function; trình duyệt không nhận token hay OAuth secret.

## Cấu hình một lần

1. Trong Google Cloud Console, bật **Google Calendar API**, cấu hình OAuth consent screen và tạo OAuth Client loại **Web application**.
2. Thêm Authorized redirect URI đúng chính xác:
   `https://jygcxjkbcsrjmxvbtvqs.supabase.co/functions/v1/google-calendar`
3. Tạo secret `GOOGLE_TOKEN_ENCRYPTION_KEY` là base64 của 32 byte ngẫu nhiên; `GOOGLE_OAUTH_STATE_SECRET` là chuỗi ngẫu nhiên dài ít nhất 32 byte.
4. Lưu `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_TOKEN_ENCRYPTION_KEY`, `GOOGLE_OAUTH_STATE_SECRET`, `GOOGLE_OAUTH_RETURN_URL` bằng Supabase Edge Function Secrets. `GOOGLE_OAUTH_RETURN_URL` phải là URL ứng dụng được phép, ví dụ `https://vutranpk.github.io/booking/`.
5. Chạy migration `20261106150000_google_calendar_oauth.sql`, sau đó deploy function `google-calendar`.
6. Với ứng dụng OAuth ở chế độ Testing, thêm email các kỹ sư vào danh sách test users. Chuyển app sang Production nếu cần cho người dùng ngoài danh sách đó.
7. Kỹ sư đăng nhập bằng email khớp email đã khai báo trong hồ sơ kỹ sư, mở hồ sơ cá nhân và bấm **Kết nối Google**.

Không đặt OAuth client secret, encryption key, state secret hay refresh token trong file JS, HTML hoặc Git. Thay encryption key sẽ khiến token đã lưu không giải mã được; phải cho từng kỹ sư kết nối lại trước khi đổi key.

## Quyền đã cấp

Ứng dụng xin `openid`, `email`, và `https://www.googleapis.com/auth/calendar.events`. Người dùng có thể ngắt kết nối trong hồ sơ; thao tác này thu hồi quyền Google và xóa token kết nối trong database. Các sự kiện đã tạo trước đó vẫn còn trên lịch Google.




