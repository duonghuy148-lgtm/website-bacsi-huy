# Nhận form đặt lịch vào Google Sheets (miễn phí)

1. Tạo một Google Sheet mới, đặt tên "Đặt lịch khám". Hàng 1 gõ: `Thời gian | Họ tên | Điện thoại | Nhu cầu | Ngày mong muốn | Ghi chú`.
2. Vào **Tiện ích mở rộng → Apps Script**, xoá hết code cũ, dán đoạn dưới đây, sửa email ở dòng `EMAIL`.
3. Bấm **Triển khai → Tùy chọn triển khai mới → Ứng dụng web**. "Thực thi với tư cách": *Tôi*. "Người có quyền truy cập": *Bất kỳ ai*. Bấm Triển khai và cấp quyền.
4. Sao chép đường link kết thúc bằng `/exec`, dán vào ô **Link nhận form đặt lịch** trong trang quản trị (hoặc mục `bookingEndpoint` trong `src/_data/site.json`).

```javascript
const EMAIL = "email-cua-bac-si@gmail.com";

function doPost(e) {
  const p = e.parameter;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([new Date(), p.name, "'" + p.phone, p.service, p.date, p.note]);
  MailApp.sendEmail(EMAIL, "Lịch khám mới: " + p.name,
    `Họ tên: ${p.name}\nĐiện thoại: ${p.phone}\nNhu cầu: ${p.service}\nNgày mong muốn: ${p.date}\nGhi chú: ${p.note}`);
  return ContentService.createTextOutput("ok");
}
```

Thông tin bệnh nhân là dữ liệu cá nhân nhạy cảm: chỉ chia sẻ Sheet này với người cần xem.
