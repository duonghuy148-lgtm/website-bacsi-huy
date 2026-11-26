// Gửi yêu cầu đặt lịch tới Google Apps Script (xem docs/dat-lich-google-sheets.md).
(function () {
  var form = document.getElementById("bookForm");
  if (!form) return;
  var msg = document.getElementById("bookMsg");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name, phone = form.elements.phone;
    msg.hidden = false;
    if (!name.value.trim() || !phone.value.trim()) {
      msg.textContent = "Vui lòng nhập họ tên và số điện thoại để phòng khám gọi lại.";
      (name.value.trim() ? phone : name).focus();
      return;
    }
    var endpoint = form.dataset.endpoint;
    if (!endpoint) {
      msg.textContent = "Đặt lịch online đang được cài đặt. Vui lòng nhắn Zalo để được hỗ trợ.";
      return;
    }
    var btn = form.querySelector("button");
    btn.disabled = true;
    msg.textContent = "Đang gửi...";
    fetch(endpoint, { method: "POST", mode: "no-cors", body: new FormData(form) })
      .then(function () {
        msg.textContent = "Đã gửi yêu cầu. Phòng khám sẽ gọi lại cho bạn để xác nhận giờ khám.";
        form.reset();
      })
      .catch(function () {
        msg.textContent = "Chưa gửi được, có thể do mạng. Vui lòng thử lại hoặc nhắn Zalo.";
      })
      .finally(function () { btn.disabled = false; });
  });
})();
