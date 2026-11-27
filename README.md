# MYCOMselect — Chọn máy nén MYCOM (PWA)

Ứng dụng web (PWA) chọn máy nén trục vít **MYCOM (Mayekawa)** theo điều kiện
vận hành, chạy **offline** sau lần mở đầu tiên. Song ngữ Việt/Anh. Có giỏ chọn
thiết bị và xuất phiếu yêu cầu báo giá (CSV / PDF / Word).

Tách từ [MCselect](https://decoolboy-source.github.io/MCselect/) (tra cứu đa hãng):
cùng giao diện và tính năng, chỉ giữ dữ liệu MYCOM, bỏ bước chọn hãng.

- Địa chỉ: https://decoolboy-source.github.io/MYCOMselect/
- Dữ liệu: 10 series (2016LSC, 2520LSC, N160VLD, N200VLD, N200VMD, N200VSD,
  N250VLD, N250VLLD, N250VMD, N250VSD), 280 điểm vận hành, môi chất NH3 (R717).

## Cấu trúc thư mục

```
index.html      Giao diện (bộ lọc + kết quả + trang Báo cáo)
nasa-ui.css     Giao diện CHUNG các app chọn thiết bị (giống hệt ECselect/EEselect/MCselect)
icons.js        Bộ icon CHUNG (trích từ Lucide, chạy offline)
data-io.js      Xuất/Nhập dữ liệu JSON (chuẩn chung)
oil.js          Bảng dầu nạp máy nén (lít/bộ, Không Eco / Có Eco)
handbook.js     Engine tab Sổ tay (thẻ, tìm kiếm, máy tính mốc bảo trì, checklist) — dùng lại được cho app khác
handbook-data.js Nội dung Sổ tay của MYCOM (song ngữ) — sửa/thêm thẻ ở đây
style.css       Phần riêng của app
app.js          Logic lọc, hiển thị, song ngữ, giỏ chọn, xuất phiếu
data.json       Dữ liệu máy nén MYCOM (cùng cấu trúc với MCselect, chỉ 1 hãng)
manifest.json   Khai báo PWA
sw.js           Service Worker — cache offline
icon-*.png      Icon app
```

## Chạy thử trên máy

App là file tĩnh, không cần cài gói. Mở bằng một web server bất kỳ, ví dụ:

```
python -m http.server 8080
```

rồi vào http://localhost:8080/. (Không mở trực tiếp bằng `file://` vì
`fetch("data.json")` và Service Worker không chạy.)

## Triển khai

Repo GitHub `decoolboy-source/MYCOMselect`, bật GitHub Pages từ nhánh `main`
(thư mục gốc). App chạy tại `/MYCOMselect/` trên cùng origin với site chính và
các PWA khác.

Quy ước chung origin:

- Service worker đăng ký tương đối: `register('./sw.js', { scope: './' })`.
- Cache tên `MYCOMselect-v<số>`; khi kích hoạt chỉ xoá cache có tiền tố này.
- Khoá localStorage có tiền tố `MYCOMselect:` (`lang`, `cart`, `projectInfo`,
  `commercialTerms`). Không dùng chung khoá với MCselect.
- File xuất dữ liệu: `MYCOMselect_YYYYMMDD.json` (`app: "MYCOMselect"`,
  `schemaVersion: 1`). File xuất từ MCselect **không** nhập được vào đây (khác `app`).

Cập nhật bản mới: tăng `CACHE_NAME` trong `sw.js` và `BUILD_VERSION` trong
`app.js`, push lên `main`. Người dùng đóng hẳn app rồi mở lại; dòng "build ..."
cuối trang phải khớp bản mới.

## Luồng sử dụng

1. Loại gas lạnh
2. Nhiệt độ ngưng tụ
3. Nhiệt độ bay hơi
4. Tra theo **Model** hoặc theo **Công suất lạnh (kW)** — theo công suất sẽ
   hiện 10 model gần nhất, bấm để xem chi tiết
5. Kết quả có ô **Dầu nạp** (lít/bộ, Không Eco / Có Eco) lấy từ bảng dầu theo series.
6. Nhập số lượng → "Thêm vào báo cáo" → trang Báo cáo: thông tin dự án, điều
   kiện thương mại, xuất CSV / In-PDF / Word (.doc là HTML có namespace `mso`,
   không phải `.docx`).

Màn hình **Dầu nạp** (nút trên thanh đầu / thanh dưới): chọn model, cấu hình Eco, số máy,
% dự phòng → tổng lít dầu cần mua; kèm bảng đủ 24 model.

Màn hình **Sổ tay** (nút trên thanh đầu / thanh dưới, link thẳng `index.html#so-tay`): các thẻ
kiến thức thu gọn được, tìm không dấu, lọc theo Trục vít / Piston / Chung:

- Đọc tên model trục vít; giới hạn vận hành trục vít và piston; giới hạn khởi động/dừng.
- Dầu bôi trơn (lịch thay/phân tích, thang màu ASTM, rò đệm kín), lọc, cân đồng trục, dây đai.
- Theo dõi hằng ngày kèm nguyên nhân bất thường; bảng bảo dưỡng định kỳ đến 48 tháng.
- Máy tính mốc bảo trì: nhập số giờ chạy → mốc vừa qua / kế tiếp / còn lại của từng việc.
- Ký hiệu thông số MyPro Touch; checklist chạy thử trục vít (tick lưu trong máy).
- Bộ điều khiển MyPro Touch; điểm mạnh MYCOM.

Nguồn: tài liệu tiếng Việt của Mayekawa Việt Nam (bảo dưỡng trục vít / piston, cập nhật 2020),
form ghi thông số vận hành, checklist chạy thử. App chỉ tóm tắt số liệu, không kèm file gốc.
Khoá localStorage: `MYCOMselect:hbMaint` (loại máy, giờ chạy), `MYCOMselect:hbChecks` (checklist).

## Cập nhật dữ liệu

Bảng dầu nạp nằm trong `oil.js` (nguồn: `Compressor_Lubricant.csv`). Cột `sel` ghép mã đặt
hàng MCN… với mã series trong `data.json` — hai mã là cùng một máy (vd. `MCN 200S-L/51` ↔
`N200VSD`, `MCN2016LSC-L/51` ↔ `2016LSC`). Model chưa có dữ liệu chọn máy để `sel: null`.


`data.json` lấy từ mục `brands[id = "mycom"]` trong `MCselect/data.json`. Khi
dữ liệu MYCOM ở MCselect thay đổi, lọc lại:

```
python -c "import json;d=json.load(open('../MCselect/data.json',encoding='utf-8'));d['brands']=[b for b in d['brands'] if b['id']=='mycom'];b=d['brands'][0];d['meta']={'total_records':sum(len(p['records']) for s in b['series'] for p in s['ports']),'total_series':len(b['series'])};json.dump(d,open('data.json','w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))"
```

## Giới hạn

- Không nội suy — chỉ tra đúng các mức nhiệt độ có trong dữ liệu nguồn.
- Dữ liệu chỉ để **tham khảo sơ bộ**; đối chiếu catalogue/phần mềm chính hãng
  trước khi chọn máy cho dự án thực tế.

## Công nghệ

HTML/CSS/JavaScript thuần, không framework, không thư viện ngoài, không
backend; không gửi dữ liệu đi đâu.

## Lịch sử phiên bản

### 2026-11-27 — `MYCOMselect-v4`, build 2026-11-27.3

Thêm tab **Sổ tay** (handbook.js + handbook-data.js): 18 thẻ kiến thức vận hành – bảo dưỡng máy
trục vít và piston, máy tính mốc bảo trì theo giờ chạy, checklist chạy thử. Thanh dưới thành 4 mục.

### 2026-11-27 — `MYCOMselect-v2`, build 2026-11-27.1

Chuyển công cụ "Lubricant Mycom" từ Toolkits (AppThermoEngine) sang đây: màn hình Dầu nạp và ô
dầu nạp trong kết quả chọn máy. Bỏ chức năng nạp CSV của bản cũ (dữ liệu đã nằm sẵn trong `oil.js`).

### 2026-11-26 — bản đầu `MYCOMselect-v1`

Tách từ MCselect build 2026-11-20.1: chỉ dữ liệu MYCOM, ẩn bước chọn hãng (tự
chọn MYCOM), đánh số lại các bước 1–5, khoá lưu trữ/cache/xuất dữ liệu riêng
tiền tố `MYCOMselect`.
