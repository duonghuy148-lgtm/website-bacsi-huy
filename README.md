# Website Bác sĩ Huy

Website giới thiệu bác sĩ Sản phụ khoa: giới thiệu, dịch vụ, mốc khám thai, bài viết kiến thức, video TikTok và đặt lịch khám.

Làm bằng [Eleventy](https://www.11ty.dev/), đưa lên mạng miễn phí bằng Cloudflare Pages.

## Đưa web lên mạng (làm một lần, miễn phí)

1. Tạo tài khoản tại https://dash.cloudflare.com/sign-up
2. Vào **Workers & Pages → Create → Pages → Connect to Git**, chọn kho `website-bacsi-huy`.
3. Cài đặt build:
   - Framework preset: *Eleventy*
   - Build command: `npm run build`
   - Build output directory: `_site`
4. Bấm **Save and Deploy**. Vài phút sau web chạy ở địa chỉ dạng `ten-du-an.pages.dev`.
5. Sửa `url` trong `src/_data/site.json` cho đúng địa chỉ đó (hoặc tên miền riêng sau này).

Từ đó, mỗi lần nội dung trong kho thay đổi, Cloudflare tự cập nhật web.

## Đăng bài mới

**Cách 1, trên điện thoại hoặc máy tính:** vào https://app.pagescms.org, đăng nhập GitHub, chọn kho `website-bacsi-huy` → **Bài viết → Thêm mới**. Viết bài, bấm Lưu. Khoảng 1–2 phút sau bài hiện trên web.

**Cách 2, nhờ Claude:** gửi kịch bản video TikTok hoặc ý chính, Claude soạn bài và mở yêu cầu thay đổi (pull request) để bác sĩ đọc duyệt. Bác sĩ bấm Merge là bài lên web.

Sửa thông tin phòng khám, số Zalo, giờ khám: Pages CMS → **Thông tin bác sĩ và phòng khám**, hoặc sửa `src/_data/site.json`.

Những chỗ còn để trong ngoặc vuông `[...]` là thông tin giữ chỗ, hiện màu hồng trên web cho dễ nhận ra.

## Nhận form đặt lịch

Xem [docs/dat-lich-google-sheets.md](docs/dat-lich-google-sheets.md).

## Lưu ý nội dung y tế

- Không cam kết, không hứa hẹn hiệu quả điều trị; không dùng hình ảnh "trước – sau".
- Không đăng thông tin hay hình ảnh nhận diện được bệnh nhân khi chưa có đồng ý bằng văn bản.
- Bài mẫu có `sample: true` sẽ hiện dòng cảnh báo cho tới khi bác sĩ duyệt và bỏ đánh dấu.

## Chạy thử trên máy

```bash
npm install
npm start   # mở http://localhost:8080
```
