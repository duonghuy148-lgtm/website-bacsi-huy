(function () {
  // Menu điện thoại
  var t = document.querySelector(".menu-toggle"), nav = document.getElementById("nav");
  if (t && nav) t.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    t.setAttribute("aria-expanded", open);
  });

  // Nút gọi: chỉ gọi khi đã có số thật
  var call = document.querySelector(".f-call");
  if (call) {
    var tel = (call.dataset.tel || "").replace(/[^\d+]/g, "");
    if (tel.length >= 9) call.href = "tel:" + tel;
  }

  // Trạng thái mở cửa theo giờ Việt Nam
  var st = document.getElementById("openStatus");
  if (st) {
    try {
      var hours = JSON.parse(st.dataset.hours);
      var now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
      var day = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
      var toM = function (s) { var p = s.split(":"); return +p[0] * 60 + +p[1]; };
      var today = hours.find(function (h) { return h.days.indexOf(day) >= 0; });
      var slots = today ? today.slots : [];
      var label = st.querySelector("span");
      var cur = slots.find(function (s) { return mins >= toM(s[0]) && mins < toM(s[1]); });
      var next = slots.find(function (s) { return mins < toM(s[0]); });
      if (cur) label.textContent = "Đang mở cửa đến " + cur[1];
      else { st.classList.add("closed"); label.textContent = next ? "Hôm nay mở cửa lúc " + next[0] : (slots.length ? "Đã hết giờ khám hôm nay" : "Hôm nay nghỉ khám"); }
      document.querySelectorAll("tr[data-days]").forEach(function (tr) {
        if (JSON.parse(tr.dataset.days).indexOf(day) >= 0) tr.classList.add("today");
      });
    } catch (e) {}
  }

  // Mục lục "Xem nhanh" cho bài viết
  var toc = document.getElementById("toc"), prose = document.querySelector(".prose");
  if (toc && prose) {
    var hs = prose.querySelectorAll("h2");
    if (hs.length < 2) { toc.hidden = true; }
    else {
      var ol = toc.querySelector("ol");
      hs.forEach(function (h, i) {
        if (!h.id) h.id = "muc-" + (i + 1);
        var li = document.createElement("li"), a = document.createElement("a");
        a.href = "#" + h.id; a.textContent = h.textContent;
        li.appendChild(a); ol.appendChild(li);
      });
    }
  }

  // Công cụ tính
  function fmt(d) { return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(); }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function parse(v) { if (!v) return null; var p = v.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  var today0 = new Date(); today0.setHours(0, 0, 0, 0);

  var due = document.getElementById("dueForm");
  if (due) due.addEventListener("submit", function (e) {
    e.preventDefault();
    var out = document.getElementById("dueOut");
    var lmp = parse(due.elements.lmp.value), cyc = +due.elements.cycle.value || 28;
    if (!lmp) { out.textContent = "Vui lòng chọn ngày đầu tiên của kỳ kinh cuối."; return; }
    if (lmp > today0) { out.textContent = "Ngày kinh cuối không thể sau hôm nay."; return; }
    var edd = addDays(lmp, 280 + (cyc - 28));
    var ga = Math.floor((today0 - lmp) / 864e5) - (cyc - 28);
    var w = Math.floor(ga / 7), d = ga % 7;
    out.innerHTML = "Ngày dự sinh dự kiến: <b>" + fmt(edd) + "</b>" +
      (ga >= 0 && ga <= 300 ? "<br>Tuổi thai hôm nay: khoảng <b>" + w + " tuần " + d + " ngày</b>" : "") +
      "<br><span class=\"small\">Siêu âm 3 tháng đầu sẽ giúp tính tuổi thai chính xác hơn.</span>";
  });

  var ov = document.getElementById("ovForm");
  if (ov) ov.addEventListener("submit", function (e) {
    e.preventDefault();
    var out = document.getElementById("ovOut");
    var lmp = parse(ov.elements.lmp.value), cyc = +ov.elements.cycle.value || 28;
    if (!lmp) { out.textContent = "Vui lòng chọn ngày đầu tiên của kỳ kinh gần nhất."; return; }
    var next = addDays(lmp, cyc), o = addDays(next, -14);
    out.innerHTML = "Ngày rụng trứng dự kiến: <b>" + fmt(o) + "</b><br>Khoảng dễ thụ thai: <b>" + fmt(addDays(o, -5)) + " – " + fmt(addDays(o, 1)) + "</b><br>Kỳ kinh tiếp theo dự kiến: <b>" + fmt(next) + "</b>" +
      "<br><span class=\"small\">Chỉ ước tính cho chu kỳ đều, không dùng làm biện pháp tránh thai.</span>";
  });
})();
