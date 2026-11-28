/* handbook-data.js — Nội dung tab "Sổ tay" của MYCOMselect.
   Engine hiển thị nằm ở handbook.js (dùng chung được cho các app khác: chỉ cần thay file dữ liệu này).

   Quy ước:
   - Chữ song ngữ viết dạng mảng [vi, en]; chuỗi thường (số, mã model) giữ nguyên ở cả hai ngôn ngữ.
   - Mỗi thẻ: { id, group, icon, title, src, blocks }.
       group: khoá trong HB_GROUPS. src: tên tài liệu nguồn (chỉ ghi tên, không kèm file).
   - Khối (blocks):
       { type: "p", text }                      đoạn văn
       { type: "list", items: [...] }           danh sách gạch đầu dòng
       { type: "table", head, rows, note }      bảng; ô có thể là chuỗi hoặc [vi, en]
       { type: "alert", tone: "warn"|"info", text }
       { type: "astm", marks: [4, 6] }          thang màu dầu ASTM 0.5–8.0
       { type: "maint" }                        máy tính mốc bảo trì (dữ liệu HB_MAINT)
       { type: "checklist", id, groups }        danh sách tick, lưu trong localStorage
       { type: "links", items: [{ href, icon, text }] }  nút mở app khác (vd. RefHandbook)
   Kiến thức hệ thống dùng chung (dàn ngưng, nước, NH3 lượng nạp thấp…) nằm ở app RefHandbook.
   Nguồn: tài liệu tiếng Việt của Mayekawa Việt Nam (bảo trì trục vít / piston, cập nhật 2020),
   form ghi thông số vận hành và checklist chạy thử MYCOM. Chỉ tóm tắt số liệu, không chép tài liệu gốc. */

const HB_GROUPS = {
  screw:  ["Trục vít", "Screw"],
  piston: ["Piston", "Piston"],
  common: ["Chung", "General"],
};

const SRC_SCREW  = "Mayekawa VN — Bảo dưỡng máy nén trục vít MYCOM (cập nhật 2020)";
const SRC_PISTON = "Mayekawa VN — Hướng dẫn bảo dưỡng máy nén piston MYCOM (cập nhật 2020)";

const HB_CARDS = [
  // ===================== TRỤC VÍT =====================
  {
    id: "screw-name", group: "screw", icon: "box",
    title: ["Đọc tên model máy nén trục vít", "Reading a screw compressor model code"],
    src: SRC_SCREW,
    blocks: [
      { type: "p", text: ["Mã model in trên nhãn máy (nameplate). Ví dụ máy 2 cấp: N2520LSC-MBM; máy 1 cấp: N200VLD-MSBE.",
                          "The model code is on the nameplate. Two-stage example: N2520LSC-MBM; single-stage: N200VLD-MSBE."] },
      { type: "table",
        head: [["Vị trí", "Pos."], ["Máy 2 cấp (ví dụ N 25 20 L S C M B M)", "Two-stage (e.g. N 25 20 L S C M B M)"]],
        rows: [
          ["(1) N", ["Môi chất: N = Amoniac, F = Freon, P = Propane", "Refrigerant: N = ammonia, F = freon, P = propane"]],
          ["(2) 25", ["Đường kính rotor tầm thấp: 160 / 200 / 250 / 320 mm", "Low-stage rotor diameter: 160 / 200 / 250 / 320 mm"]],
          ["(3) 20", ["Đường kính rotor tầm cao: 125 / 160 / 200 / 250 mm", "High-stage rotor diameter: 125 / 160 / 200 / 250 mm"]],
          ["(4) L",  ["Chiều dài rotor tầm thấp: S / M / L", "Low-stage rotor length: S / M / L"]],
          ["(5) S",  ["Chiều dài rotor tầm cao: S / M / L", "High-stage rotor length: S / M / L"]],
          ["(6) C",  ["Ký hiệu máy nén 2 cấp (compound)", "Two-stage (compound) designation"]],
          ["(7) M",  ["Cổng nén tầm thấp: L / M", "Low-stage discharge port: L / M"]],
          ["(8) B",  ["Booster", "Booster"]],
          ["(9) M",  ["Cổng nén tầm cao: L / M", "High-stage discharge port: L / M"]],
        ] },
      { type: "table",
        head: [["Vị trí", "Pos."], ["Máy 1 cấp (ví dụ N 200 V L D MS B E)", "Single-stage (e.g. N 200 V L D MS B E)"]],
        rows: [
          ["(1) N",   ["Môi chất: N = Amoniac, F = Freon, P = Propane", "Refrigerant: N = ammonia, F = freon, P = propane"]],
          ["(2) 200", ["Đường kính rotor: 125 / 160 / 200 / 250 / 320 mm", "Rotor diameter: 125 / 160 / 200 / 250 / 320 mm"]],
          ["(3) V",   ["Series: SCV, J, I, GH", "Series: SCV, J, I, GH"]],
          ["(4) L",   ["Chiều dài rotor: S / M / L / LL", "Rotor length: S / M / L / LL"]],
          ["(5) D",   ["Vị trí cổng nén: D = mặt bên máy, G = phía dưới máy", "Discharge port position: D = side, G = bottom"]],
          ["(6) MS",  ["Cổng nén: L / M / H / MS / HS", "Discharge port: L / M / H / MS / HS"]],
          ["(7) B",   ["Booster", "Booster"]],
          ["(8) E",   ["E = có cổng economizer; X = economizer + phun dịch (liquid injection)", "E = economizer port; X = economizer + liquid injection"]],
        ] },
      { type: "alert", tone: "info", text: ["Mã đặt hàng MCN… (vd. MCN 200L-L/51) và mã series ở phần chọn máy (vd. N200VLD) là cùng một máy — xem bảng ở tab Dầu nạp.",
                                            "Order codes MCN… (e.g. MCN 200L-L/51) and the series codes used in the selector (e.g. N200VLD) are the same machine — see the Oil charge tab."] },
    ],
  },
  {
    id: "screw-limits", group: "screw", icon: "gauge",
    title: ["Giới hạn vận hành máy trục vít", "Screw compressor operating limits"],
    src: SRC_SCREW,
    blocks: [
      { type: "table",
        head: [["Thông số", "Item"], ["Đơn vị", "Unit"], "N1612C", "N2016C", "N2520C", "SCV", "J"],
        rows: [
          [["Tốc độ tối đa rotor đực", "Max. male rotor speed"], "rpm", "4500", "4000", "3600", ["4500 (*)", "4500 (*)"], "—"],
          [["Tốc độ tối thiểu rotor đực", "Min. male rotor speed"], "rpm", "1450", "1450", "1450", "1450", "1450"],
          [["Áp suất nén tối đa", "Max. discharge pressure"], "MPa", "1.96", "1.96", "1.96", "1.96", "3.2"],
          [["Áp suất hút tối thiểu", "Min. suction pressure"], "MPa", "−0.080", "−0.080", "−0.080", "−0.080", "−0.080"],
          [["Áp suất trung gian tối đa", "Max. intermediate pressure"], "MPa", "0.588", "0.588", "0.588", "—", "—"],
          [["Nhiệt độ hút", "Suction temperature"], "°C", "−60 ~ 85", "−60 ~ 85", "−60 ~ 85", "−60 ~ 85", "−60 ~ 85"],
          [["Nhiệt độ nén tối đa", "Max. discharge temperature"], "°C", "100", "100", "100", "90", "90"],
          [["Nhiệt độ dầu tối đa", "Max. oil temperature"], "°C", "70", "70", "70", "70", "70"],
          [["Nhiệt độ dầu tối thiểu", "Min. oil temperature"], "°C", "30", "30", "30", "30", "20"],
          [["Chênh áp dầu", "Oil differential pressure"], "MPa", "0.12 ~ 0.5", "0.12 ~ 0.5", "0.12 ~ 0.5", "0.12 ~ 0.5", "0.12 ~ 0.5"],
        ],
        note: ["(*) Máy SCV 250VLLD/VLLG và 320VSD/VMD/VLD: tốc độ tối đa 3600 rpm.",
               "(*) SCV 250VLLD/VLLG and 320VSD/VMD/VLD: max. 3600 rpm."] },
      { type: "table",
        head: [["Giới hạn khởi động / dừng", "Start / stop limits"], ["Máy trục vít", "Screw"]],
        rows: [
          [["Số lần khởi động/dừng tối đa", "Max. starts/stops"], ["4 lần / giờ", "4 per hour"]],
          [["Thời gian tối thiểu để chạy lại sau khi dừng", "Min. time before restart"], ["Ít nhất 15 phút", "At least 15 min"]],
        ] },
    ],
  },
  {
    id: "screw-oil", group: "screw", icon: "droplets",
    title: ["Dầu bôi trơn máy trục vít", "Screw compressor lubricating oil"],
    src: SRC_SCREW,
    blocks: [
      { type: "list", items: [
        ["Nạp đến mức dầu khuyến cáo trên kính xem dầu bình tách. Nạp quá mức sẽ gây cuốn dầu theo gas và có thể làm hỏng lọc tách dầu.",
         "Fill to the recommended level on the separator sight glass. Overfilling causes oil carry-over and can damage the oil separator element."],
        ["Nạp dầu qua van nạp ở bình làm mát dầu hoặc bình lọc dầu. Cụm máy có 5 điểm xả dầu (gồm 1 điểm ở bình làm mát dầu).",
         "Charge oil through the charging valve on the oil cooler or oil filter housing. The package has 5 drain points (one on the oil cooler)."],
        ["Van dầu injection: mở từ ¾ vòng đến dưới 2 vòng.", "Oil injection valve: open ¾ turn to less than 2 turns."],
        ["Van hồi dầu: mở khoảng ¾ vòng, hoặc chỉnh theo kính hồi dầu.", "Oil return valve: open about ¾ turn, or adjust by the return sight glass."],
      ] },
      { type: "table",
        head: [["Lịch dầu", "Oil schedule"], ["Thời điểm", "When"]],
        rows: [
          [["Thay dầu mới", "Replace oil"], ["Sau khi chạy thử và sau 100 giờ hoạt động đầu tiên", "After commissioning and after the first 100 h"]],
          [["Phân tích dầu", "Oil analysis"], ["Sau 500 giờ đầu, sau đó mỗi 6 tháng (vận hành bình thường)", "After the first 500 h, then every 6 months"]],
        ] },
      { type: "alert", tone: "warn", text: ["Tài liệu ghi: không dùng dầu POE (Polyester) hoặc PAO (Poly Alpha Olefin) cho hệ NH3. Đọc thêm hướng dẫn của từng loại dầu.",
                                            "The source states: do not use POE (polyester) or PAO (poly-alpha-olefin) oil in NH3 systems. Check each oil maker's guidance."] },
      { type: "p", text: ["Màu dầu theo thang ASTM còn bôi trơn tốt: dầu khoáng và tổng hợp (AB, PAO) ≤ 6; dầu tổng hợp PAG ≤ 4.",
                          "ASTM colour still good for lubrication: mineral and synthetic (AB, PAO) ≤ 6; synthetic PAG ≤ 4."] },
      { type: "astm", marks: [4, 6] },
      { type: "table",
        head: [["Rò dầu qua bộ đệm kín (seal)", "Shaft seal oil leakage"], ["Mức", "Rate"]],
        rows: [
          [["Cho phép", "Acceptable"], "≤ 3 ml/h"],
          [["Cần kiểm tra, thay bộ đệm kín", "Inspect / replace seal"], "≥ 9 ml/h"],
        ] },
    ],
  },
  {
    id: "screw-filters", group: "screw", icon: "layers",
    title: ["Lọc dầu, lọc hút, lọc tách dầu (trục vít)", "Oil, suction and separator filters (screw)"],
    src: SRC_SCREW,
    blocks: [
      { type: "table",
        head: [["Lọc", "Filter"], ["Công việc", "Task"]],
        rows: [
          [["Lọc dầu (bơm dầu)", "Oil filter (oil pump)"], ["Thay lọc giấy bằng lọc inox sau 200–500 giờ đầu; vệ sinh mỗi 3000 giờ hoặc khi áp suất dầu giảm dưới chuẩn (chuẩn 2,5–3 kgf/cm²)",
                                                           "Replace paper element with stainless element after the first 200–500 h; clean every 3000 h or when oil pressure drops below 2.5–3 kgf/cm²"]],
          [["Lọc đường hồi dầu & starting bypass", "Oil return & starting-bypass strainers"], ["Kiểm tra, vệ sinh sau 100 và 500 giờ đầu, sau đó mỗi 3000 giờ", "Check and clean after the first 100 h and 500 h, then every 3000 h"]],
          [["Lọc hút", "Suction strainer"], ["Kiểm tra, vệ sinh sau 100 và 500 giờ đầu, sau đó mỗi 3000 giờ", "Check and clean after the first 100 h and 500 h, then every 3000 h"]],
          [["Lọc tách dầu + roăng", "Oil separator element + gasket"], ["Thay mới mỗi 8000 giờ (không vệ sinh được)", "Replace every 8000 h (cannot be cleaned)"]],
        ],
        note: ["Thời gian trên áp dụng cho hệ thống ở điều kiện tốt.", "Intervals apply to systems in good condition."] },
      { type: "alert", tone: "warn", text: ["Lắp lọc tách dầu bằng cần lực: 27–34 N·m. Siết quá 47 N·m có thể làm hỏng lọc tách.",
                                            "Install the separator element with a torque wrench: 27–34 N·m. Over 47 N·m may damage the element."] },
    ],
  },
  {
    id: "screw-align", group: "screw", icon: "ruler",
    title: ["Cân chỉnh đồng trục (khớp nối trực tiếp)", "Shaft alignment (direct coupling)"],
    src: SRC_SCREW,
    blocks: [
      { type: "table",
        head: [["Tiêu chí", "Criterion"], ["Cho phép", "Allowed"]],
        rows: [
          [["Lệch tâm (offset)", "Offset"], "0.06 mm"],
          [["Lệch góc (angularity)", "Angularity"], ["0.06 mm (tham chiếu Ø100 mm)", "0.06 mm (ref. Ø100 mm)"]],
        ] },
      { type: "list", items: [
        ["Cân chỉnh lại sau khi đại tu hoặc bảo dưỡng máy nén, motor.", "Re-align after overhaul or service of the compressor or motor."],
        ["Định kỳ 12 tháng / lần.", "Periodically every 12 months."],
      ] },
    ],
  },
  {
    id: "screw-daily", group: "screw", icon: "clipboard-check",
    title: ["Theo dõi hằng ngày & nguyên nhân bất thường (trục vít)", "Daily checks & likely causes (screw)"],
    src: SRC_SCREW,
    blocks: [
      { type: "p", text: ["Ghi thông số vận hành hằng ngày để sớm phát hiện bất thường.", "Log operating data daily to catch abnormalities early."] },
      { type: "table",
        head: [["Mục", "Item"], ["Theo dõi", "Watch"], ["Kiểm tra / nguyên nhân", "Check / cause"]],
        rows: [
          [["Số giờ chạy (HM)", "Run hours (HM)"], ["Tổng giờ hoạt động", "Total hours"], ["Đến hạn bảo dưỡng định kỳ chưa", "Is periodic service due"]],
          [["Áp suất hút (SP)", "Suction pressure (SP)"], ["Chênh lệch so với nhiệt độ bay hơi cài đặt", "Deviation from evaporating set point"], ["Ống trao đổi nhiệt bẩn, thiếu gas; nhiệt độ/lưu lượng đối tượng làm lạnh", "Fouled heat-exchanger tubes, low charge; load temperature/flow"]],
          [["Áp suất trung gian (IP)", "Intermediate pressure (IP)"], ["Chênh lệch so với chế độ vận hành", "Deviation from operating mode"], ["Quá cao: kiểm tra tầm cao; quá thấp: kiểm tra tầm thấp", "Too high: check high stage; too low: check low stage"]],
          [["Áp suất nén (DP)", "Discharge pressure (DP)"], ["Chênh lệch với nhiệt độ nước giải nhiệt", "Deviation from cooling-water temperature"], ["Ống dàn ngưng bẩn, lọt khí không ngưng; lượng/nhiệt độ nước giải nhiệt", "Fouled condenser, non-condensables; cooling water flow/temp"]],
          [["Áp suất dầu (OP)", "Oil pressure (OP)"], ["Chênh lệch so với áp suất nén", "Difference from discharge pressure"], ["Chênh áp có giảm không", "Is the differential dropping"]],
          [["Chênh áp qua lọc dầu (dFP)", "Oil filter ΔP (dFP)"], ["Áp dầu trước và sau lọc", "Pressure before/after filter"], ["Dầu bẩn, lọc dầu bẩn, bơm dầu", "Dirty oil or filter, oil pump"]],
          [["Nhiệt độ hút (ST), quá nhiệt hút (SSH)", "Suction temp (ST), suction SH (SSH)"], ["Trong giới hạn cài đặt", "Within set limits"], ["Chỉnh van tiết lưu nhiệt; thiếu gas", "Adjust thermal expansion valve; low charge"]],
          [["Nhiệt độ trung gian (IT)", "Intermediate temp (IT)"], ["Trong giới hạn", "Within limits"], ["Chỉnh van tiết lưu trung gian", "Adjust intermediate expansion valve"]],
          [["Nhiệt độ nén (DT)", "Discharge temp (DT)"], ["Trong giới hạn", "Within limits"], ["Khí không ngưng, nhiệt độ dầu cao, thiếu dầu, máy nén lỗi", "Non-condensables, hot oil, low oil, compressor fault"]],
          [["Nhiệt độ dầu (OT)", "Oil temp (OT)"], ["Trong giới hạn", "Within limits"], ["Bình làm mát dầu bẩn", "Fouled oil cooler"]],
          [["Phần trăm tải", "Load %"], ["Có bình thường không", "Is it normal"], ["Cuộn dây van điện từ hỏng", "Failed solenoid coil"]],
          [["Rò dầu bộ đệm kín", "Seal leakage"], "ml/h", ["Bộ đệm kín hỏng", "Seal damaged"]],
          [["Tiếng ồn, rung", "Noise, vibration"], ["Kiểm tra bằng V-DOC", "Check with V-DOC"], ["Máy nén hư hỏng", "Compressor damage"]],
          [["Dòng motor (MA)", "Motor current (MA)"], ["Cao hơn định mức không", "Above rated?"], ["Máy nén / motor hỏng", "Compressor / motor fault"]],
          [["Mức dầu bình tách", "Separator oil level"], ["Mức dầu", "Level"], ["Kiểm tra lượng dầu", "Check oil quantity"]],
          [["Mức dịch bình thấp áp", "LP receiver liquid level"], ["Mức dịch", "Level"], ["Kiểm tra đầu dò mức dịch", "Check level sensor"]],
          [["Xì gas", "Gas leaks"], ["Có xì không", "Any leaks"], ["Dò xì", "Leak test"]],
        ] },
    ],
  },
  {
    id: "screw-periodic", group: "screw", icon: "calendar",
    title: ["Bảng bảo dưỡng định kỳ máy trục vít (đến 48 tháng)", "Screw periodic maintenance table (to 48 months)"],
    src: SRC_SCREW,
    blocks: [
      { type: "p", text: ["Quy đổi theo tài liệu: 1 năm ≈ 8000 giờ; 4 năm ≈ 30000 giờ.", "Per the source: 1 year ≈ 8000 h; 4 years ≈ 30000 h."] },
      { type: "table",
        head: [["Hạng mục", "Item"], ["12 th", "12 mo"], ["24 th", "24 mo"], ["36 th", "36 mo"], ["48 th", "48 mo"]],
        rows: [
          [["Máy nén — bộ đệm kín", "Comp. — shaft seal"], "C", "C", "C", "S"],
          [["Máy nén — cơ cấu tăng giảm tải", "Comp. — capacity control"], "C", "C", "C", "C"],
          [["Máy nén — bạc đạn", "Comp. — bearings"], "", "", "", "S"],
          [["Máy nén — ổ đỡ", "Comp. — journal bearings"], "", "", "", "B"],
          [["Máy nén — vòng sin / roăng", "Comp. — O-rings / gaskets"], "", "", "", "S"],
          [["Bơm dầu — đệm kín", "Oil pump — seal"], "C", "C", "C", "S"],
          [["Bơm dầu — bạc đạn", "Oil pump — bearings"], "", "", "", "B"],
          [["Bơm dầu — vòng sin / roăng, đầu bơm", "Oil pump — O-rings, pump head"], "", "", "", "S"],
          [["Khớp nối", "Coupling"], "C", "C", "C", "C"],
          [["Cân đồng trục", "Alignment"], "C", "C", "C", "C"],
          [["Van an toàn, rơ-le áp suất", "Safety valve, pressure switches"], "O", "", "", "O"],
          [["Bộ trao đổi nhiệt trung gian", "Intermediate heat exchanger"], "O", "O", "O", "O"],
          [["Lọc tách dầu", "Oil separator element"], "S", "S", "S", "S"],
          [["Van tiết lưu nhiệt", "Thermal expansion valve"], "O", "O", "O", "O"],
          [["Dầu lạnh", "Refrigeration oil"], "C", "C", "C", "S"],
          [["Đường ống, mối nối, mặt bích, xì gas", "Piping, joints, flanges, leaks"], "O", "O", "O", "O"],
          [["Motor — bạc đạn", "Motor — bearings"], "", "", "", "S"],
        ],
        note: ["O = kiểm tra hoạt động · C = kiểm tra, đánh giá, sửa/thay nếu bất thường · B = tháo rời, thay nếu bất thường · S = thay mới. Ngoài ra: nước làm mát kiểm tra mỗi 3 tháng; bơm mỡ motor mỗi 6 tháng.",
               "O = operation check · C = inspect, evaluate, repair/replace if abnormal · B = disassemble, replace if abnormal · S = replace. Also: cooling water every 3 months; motor greasing every 6 months."] },
    ],
  },
  {
    id: "screw-j", group: "screw", icon: "cog",
    title: ["Dòng máy nén J-Series", "J-Series compressors"],
    src: SRC_SCREW,
    blocks: [
      { type: "list", items: [
        ["Máy trục vít 1 cấp, biên dạng rotor mới (J profile), tự điều chỉnh Vi theo điều kiện vận hành.", "Single-stage screw with new J-profile rotors and automatic Vi control."],
        ["Thiết kế áp suất cao đến 3,5 MPa, dùng được nhiều loại gas.", "Designed for up to 3.5 MPa, works with many refrigerants."],
        ["Điều khiển tải liên tục; hiệu suất ít bị ảnh hưởng khi điều kiện vận hành thay đổi.", "Stepless capacity control; efficiency holds as conditions change."],
        ["Giảm lực lên bạc đạn và ổ đỡ, dùng O-ring thay roăng nên chu kỳ đại tu dài hơn.", "Lower bearing loads and O-rings instead of gaskets extend overhaul intervals."],
        ["Series 170J/220J tích hợp van một chiều đường hút và van điện từ điều khiển tải và Vi.", "170J/220J integrate a suction check valve and solenoids for load and Vi control."],
        ["Ít ồn và rung.", "Low noise and vibration."],
      ] },
    ],
  },

  // ===================== PISTON =====================
  {
    id: "piston-limits", group: "piston", icon: "gauge",
    title: ["Giới hạn vận hành máy piston (NH3)", "Piston compressor operating limits (NH3)"],
    src: SRC_PISTON,
    blocks: [
      { type: "table",
        head: [["Thông số", "Item"], ["Đơn vị", "Unit"], "WA/WB", "K", "M", "62M"],
        rows: [
          [["Tốc độ quay", "Speed"], "min⁻¹", ["WA 800–1450; WB 800–1200", "WA 800–1450; WB 800–1200"], "900–1800", "800–1500", "800–1500"],
          [["Áp suất nén tối đa", "Max. discharge pressure"], "MPa", "1.96", "2.26", "2.0", "1.9"],
          [["Áp suất hút tối đa", "Max. suction pressure"], "MPa", "0.35", "0.69", "0.8", "0.14"],
          [["Chênh áp tối đa", "Max. differential"], "MPa", ["1 cấp 1.47; nhiều cấp 1.52", "single 1.47; multi 1.52"], "1.96", "2.0", "2.0"],
          [["Áp suất dầu tối đa", "Max. oil pressure"], "MPa", "Ps + 0.4", "Ps + 0.4", "Ps + 0.4", "Ps + 0.4"],
          [["Áp suất dầu tối thiểu", "Min. oil pressure"], "MPa", "Ps + 0.1", "Ps + 0.1", "Ps + 0.15", "Ps + 0.15"],
          [["Nhiệt độ nén tối đa", "Max. discharge temp."], "°C", "140", "140", "140", "140"],
          [["Nhiệt độ dầu tối đa", "Max. oil temp."], "°C", "50", "50", "60", "60"],
          [["Nhiệt độ dầu tối thiểu", "Min. oil temp."], "°C", "30", "30", "30", "30"],
        ],
        note: ["Ps = áp suất hút.", "Ps = suction pressure."] },
      { type: "table",
        head: [["Khởi động / dừng", "Start / stop"], "WA/WB", "K", "M"],
        rows: [
          [["Số lần khởi động/dừng", "Starts/stops"], ["4 lần/giờ", "4 /h"], ["4 lần/giờ", "4 /h"], ["3 lần/giờ", "3 /h"]],
          [["Thời gian dừng tối thiểu", "Min. stop time"], ["15 phút", "15 min"], ["15 phút", "15 min"], ["5 phút", "5 min"]],
          [["Thời gian chạy tối thiểu", "Min. run time"], ["15 phút", "15 min"], ["15 phút", "15 min"], ["15 phút", "15 min"]],
          [["Số lần giảm tải", "Unloading cycles"], ["≤ 5 lần/giờ", "≤ 5 /h"], ["≤ 5 lần/giờ", "≤ 5 /h"], ["≤ 5 lần/giờ", "≤ 5 /h"]],
          [["Thời gian giảm tải tối thiểu", "Min. unloaded time"], ["≥ 3 phút", "≥ 3 min"], ["≥ 3 phút", "≥ 3 min"], ["≥ 3 phút", "≥ 3 min"]],
        ] },
    ],
  },
  {
    id: "piston-oil", group: "piston", icon: "droplets",
    title: ["Dầu bôi trơn máy piston", "Piston compressor lubricating oil"],
    src: SRC_PISTON,
    blocks: [
      { type: "table",
        head: [["Model", "Model"], ["Dầu nạp ban đầu (lít)", "Initial charge (L)"]],
        rows: [
          ["4WA", "15"], ["6WA", "17"], ["8WA", "22"], ["42WA", "20"], ["62WA", "22"],
          ["4WB", "27"], ["6WB", "32"], ["8WB", "35"], ["42WB", "32"], ["62WB", "35"],
          ["4K", "9"], ["6K", "9"], ["8K", "10"],
          ["4M", "32"], ["6M", "38"], ["8M", "44"], ["62M", "44"],
        ] },
      { type: "list", items: [
        ["Hút chân không máy nén trước khi nạp dầu.", "Evacuate the compressor before charging oil."],
        ["Nạp lần đầu (sau thay dầu, đại tu): nạp qua van trên bộ làm mát dầu cho đầy bộ làm mát và lọc; quay tay máy theo chiều bơm dầu ít nhất 20 vòng.",
         "First charge (after oil change or overhaul): fill via the valve on the oil cooler to fill cooler and filters; turn the compressor by hand in the pump direction at least 20 turns."],
        ["Nạp bổ sung: nạp qua van ở cacte bằng cách hút chân không; không để nước và không khí lẫn vào dầu.", "Top-up: charge via the crankcase valve under vacuum; keep water and air out."],
      ] },
      { type: "table",
        head: [["Cài đặt áp suất dầu", "Oil pressure setting"], ["Giá trị", "Value"]],
        rows: [
          [["W series", "W series"], "(0.2 ~ 0.3 MPa) + Ps"],
          [["M, K series", "M, K series"], "(0.2 ~ 0.3 MPa) + Ps"],
          [["Chênh áp dầu – áp hút tốt nhất", "Best oil–suction differential"], "0.25 MPa"],
          [["Ngắt bảo vệ", "Protection trip"], "0.20 MPa"],
        ] },
      { type: "alert", tone: "info", text: ["Chỉ chỉnh van áp suất dầu khi: máy mới chạy lần đầu; sau khi thay lọc và dầu mới; sau đại tu. Khi chênh áp dầu giảm còn 0,22–0,23 MPa: vệ sinh lọc tinh và thô (W series) hoặc thay lọc tinh, vệ sinh lọc thô (M series).",
                                            "Adjust the oil pressure valve only: at first start; after new filters and oil; after overhaul. When the differential drops to 0.22–0.23 MPa: clean fine and coarse filters (W) or replace the fine filter and clean the coarse one (M)."] },
      { type: "table",
        head: [["Lịch dầu", "Oil schedule"], ["Thời điểm", "When"]],
        rows: [
          [["Thay dầu", "Replace oil"], ["Ngay sau chạy thử, sau 50, 200, 500 giờ, rồi mỗi 2000 giờ", "Right after commissioning, at 50, 200, 500 h, then every 2000 h"]],
          [["Lấy mẫu, so màu dầu", "Sample and compare colour"], ["Sau 500 giờ, sau đó 3 tháng/lần", "After 500 h, then every 3 months"]],
        ] },
      { type: "alert", tone: "warn", text: ["Tài liệu ghi: không dùng dầu POE hoặc PAO cho môi chất NH3.", "The source states: do not use POE or PAO oil with NH3."] },
      { type: "astm", marks: [4, 6] },
    ],
  },
  {
    id: "piston-filters", group: "piston", icon: "layers",
    title: ["Lọc dầu, scale trap, lọc hút (piston)", "Oil filters, scale trap, suction strainer (piston)"],
    src: SRC_PISTON,
    blocks: [
      { type: "table",
        head: [["Lọc", "Filter"], ["Công việc", "Task"]],
        rows: [
          [["Lọc tinh CUNO (W series)", "CUNO fine filter (W)"], ["Kiểm tra, vệ sinh sau 50, 200 giờ và mỗi 2000 giờ; thường xuyên xoay tay vặn để tự làm sạch (ít nhất 5 vòng)", "Check and clean at 50, 200 h and every 2000 h; turn the handle regularly (at least 5 turns)"]],
          [["Lọc tinh (M series)", "Fine filter (M)"], ["Không vệ sinh được — thay sau 50, 200, 500 giờ, rồi mỗi 2000 giờ, hoặc khi tắc / áp dầu giảm", "Not cleanable — replace at 50, 200, 500 h, then every 2000 h, or when clogged / oil pressure drops"]],
          [["Lọc thô (W series)", "Coarse filter (W)"], ["Vệ sinh mỗi lần thay dầu; tháo bulông nắp lọc ngoài cacte. Khi lắp, lỗ dầu hướng về phía bơm dầu", "Clean at every oil change; remove via the cover bolts outside the crankcase. Oil hole faces the oil pump when refitting"]],
          [["Lọc thô (K, M series)", "Coarse filter (K, M)"], ["Vệ sinh mỗi lần thay dầu; mở nắp cacte, tháo bulông giữ lọc bên trong", "Clean at every oil change; open the crankcase cover and remove the retaining bolts"]],
          [["Scale trap", "Scale trap"], ["Kiểm tra, vệ sinh sau 100, 500 giờ, rồi mỗi 3000 giờ. Máy mới có túi vải — tháo bỏ sau 200 giờ", "Check and clean at 100, 500 h, then every 3000 h. New machines have a cloth bag — remove after 200 h"]],
          [["Lọc hút (W, M series)", "Suction strainer (W, M)"], ["Kiểm tra, vệ sinh sau 100, 500 giờ, rồi mỗi 3000 giờ. Máy W mới có túi vải — tháo bỏ sau 200 giờ", "Check and clean at 100, 500 h, then every 3000 h. New W machines have a cloth bag — remove after 200 h"]],
        ],
        note: ["Không có scale trap: M, K, 2WA, 4WA, 4WB, 12WB, 12 4WB (ghi theo tài liệu). Không có lọc hút: 62WA, 42WB, 62WB.",
               "No scale trap on: M, K, 2WA, 4WA, 4WB, 12WB, 12 4WB (as written in source). No suction strainer on: 62WA, 42WB, 62WB."] },
    ],
  },
  {
    id: "piston-drive", group: "piston", icon: "ruler",
    title: ["Dây đai & khớp nối (piston)", "V-belts & coupling (piston)"],
    src: SRC_PISTON,
    blocks: [
      { type: "p", text: ["Căn thẳng hai puly: độ lệch mặt puly L tối đa 1 mm.", "Pulley alignment: face offset L max. 1 mm."] },
      { type: "table",
        head: [["Máy nén", "Compressor"], ["Dây đai", "Belt"], ["Tốc độ (rpm)", "Speed (rpm)"], ["Lực kiểm tra — dây mới (N/dây)", "Check force — new (N/belt)"], ["Căn chỉnh lại (N/dây)", "Re-tension (N/belt)"]],
        rows: [
          ["WA/WB", ["Bản C – đỏ", "C – red"], "800–1200", "40–45", "30–35"],
          ["M", ["Bản 8V – đỏ", "8V – red"], "900", "65–75", "55–65"],
          ["M", ["Bản 8V – đỏ", "8V – red"], "1000–1100", "75–85", "65–75"],
          ["M", ["Bản 8V – đỏ", "8V – red"], "1200", "80–90", "70–80"],
          ["M", ["Bản 8V – đỏ", "8V – red"], "1300", "90–95", "75–85"],
          ["K", ["Bản 5V – đỏ", "5V – red"], "900–1800", "80–90", "65–75"],
        ] },
      { type: "table",
        head: [["Độ võng dây đai (mm) theo khoảng cách nhịp", "Belt deflection (mm) by span"], "1000 (650)", "1100 (700)", "1200 (750)", "1300 (800)", "1400 (850)", "1500 (900)"],
        rows: [
          [["WA/WB — bản C", "WA/WB — C"], "16", "18", "19", "21", "22", "24"],
          [["M — bản 8V", "M — 8V"], "8.6", "9.5", "10.4", "11.3", "12.2", "13"],
          [["K — bản 5V", "K — 5V"], "(10.4)", "(11.2)", "(12)", "(12.8)", "(13.6)", "(14.4)"],
        ],
        note: ["Số trong ngoặc của máy K ứng với khoảng cách nhịp ghi trong ngoặc ở tiêu đề.", "Bracketed K values match the bracketed spans in the header."] },
      { type: "table",
        head: [["Khớp nối trực tiếp", "Direct coupling"], ["Cho phép (Ø100 mm)", "Allowed (Ø100 mm)"]],
        rows: [
          [["Lệch song song", "Parallel offset"], "0.06 mm"],
          [["Lệch góc", "Angular"], "0.03 mm"],
        ] },
    ],
  },
  {
    id: "piston-checks", group: "piston", icon: "clipboard-check",
    title: ["Kiểm tra hằng ngày & định kỳ (piston)", "Daily & periodic checks (piston)"],
    src: SRC_PISTON,
    blocks: [
      { type: "table",
        head: [["Hằng ngày", "Daily"], ["Kiểm tra", "Check"], ["Nguyên nhân / hành động", "Cause / action"]],
        rows: [
          [["Áp suất hút", "Suction pressure"], ["So với nhiệt độ bay hơi", "vs evaporating temp."], ["Độ sạch ống hút; nhiệt độ, lưu lượng môi chất", "Suction line cleanliness; refrigerant temp./flow"]],
          [["Áp suất nén", "Discharge pressure"], ["So với nhiệt độ nước làm mát", "vs cooling water temp."], ["Ống làm mát bẩn; khí không ngưng; lưu lượng nước", "Fouled cooling; non-condensables; water flow"]],
          [["Áp suất dầu", "Oil pressure"], ["Chênh lệch so với áp hút", "Difference to suction"], ["Áp suất giảm; ngập lỏng; phụ tùng mòn", "Pressure drop; flood-back; wear"]],
          [["Nhiệt độ nén", "Discharge temp."], ["Vượt giới hạn?", "Over limit?"], ["Khí không ngưng; nhiệt độ dầu, thiếu dầu; máy nén sự cố", "Non-condensables; oil temp./low oil; fault"]],
          [["Nhiệt độ dầu", "Oil temp."], ["Trong giới hạn?", "Within limits?"], ["Độ sạch đường làm mát dầu", "Oil cooler cleanliness"]],
          [["Mức dầu cacte", "Crankcase oil level"], ["Trong giới hạn?", "Within limits?"], ["Ngập dịch làm mức dầu cao giả", "Liquid in oil shows a false high level"]],
          [["Rò dầu bộ đệm kín", "Seal leakage"], ["WA ≤ 3 · WB ≤ 6 · M ≤ 8 · K ≤ 3 ml/h", "WA ≤ 3 · WB ≤ 6 · M ≤ 8 · K ≤ 3 ml/h"], ["Thay đệm kín khi WA ≥ 9 · WB ≥ 18 · M ≥ 12 · K ≥ 9 ml/h", "Replace seal at WA ≥ 9 · WB ≥ 18 · M ≥ 12 · K ≥ 9 ml/h"]],
          [["Rung, tiếng ồn", "Vibration, noise"], ["Bất thường?", "Abnormal?"], ["Máy nén, motor, dây đai, khớp nối", "Compressor, motor, belts, coupling"]],
          [["Dòng motor", "Motor current"], ["Cao hơn lúc chạy thử?", "Above commissioning value?"], ["Máy nén sự cố", "Compressor fault"]],
          [["Phòng máy, mức dịch, rò môi chất", "Room temp., liquid level, leaks"], ["", ""], ["Nhiệt độ phòng cao hại motor; nạp thêm môi chất; dò xì cả khu sản xuất", "Hot room harms the motor; add refrigerant; leak-check production areas too"]],
        ] },
      { type: "table",
        head: [["Định kỳ", "Periodic"], ["Chu kỳ", "Interval"]],
        rows: [
          [["Độ căng dây đai, bulông puly", "Belt tension, pulley bolts"], ["Hằng tháng", "Monthly"]],
          [["Lọc hút, scale trap", "Suction strainer, scale trap"], ["Sau chạy thử 100 và 500 giờ", "After 100 and 500 h"]],
          [["Đầu dò, đồng hồ áp suất và nhiệt độ; thiết bị bảo vệ, van an toàn; hệ thống nước", "Sensors and gauges; protective devices, safety valves; water system"], ["Hằng năm", "Yearly"]],
          [["Bộ đệm kín, khớp nối", "Shaft seal, coupling"], ["Hằng năm hoặc mỗi 6000 giờ", "Yearly or every 6000 h"]],
          [["Bơm mỡ motor", "Motor greasing"], ["Theo nhà sản xuất motor", "Per motor maker"]],
        ] },
    ],
  },

  // ===================== CHUNG =====================
  {
    id: "maint-calc", group: "common", icon: "calculator",
    title: ["Máy tính mốc bảo trì theo giờ chạy", "Maintenance due calculator (run hours)"],
    src: "Tổng hợp từ 2 tài liệu bảo dưỡng trục vít và piston của Mayekawa VN",
    blocks: [
      { type: "p", text: ["Nhập số giờ chạy (HM) đang hiển thị trên bộ điều khiển. App liệt kê mốc vừa qua và mốc kế tiếp của từng việc.",
                          "Enter the run hours (HM) shown on the controller. The app lists the last and next milestone of each task."] },
      { type: "maint" },
    ],
  },
  {
    id: "mypro-symbols", group: "common", icon: "list",
    title: ["Ký hiệu thông số trên MyPro Touch", "MyPro Touch parameter symbols"],
    src: "Form ghi thông số vận hành máy trục vít (Compressor operating data)",
    blocks: [
      { type: "table",
        head: [["Ký hiệu", "Symbol"], ["Ý nghĩa", "Meaning"], ["Đơn vị", "Unit"]],
        rows: [
          ["SP", ["Áp suất hút", "Suction pressure"], "kgf/cm²G"],
          ["DP", ["Áp suất nén", "Discharge pressure"], "kgf/cm²G"],
          ["OP", ["Áp suất dầu", "Oil pressure"], "kgf/cm²G"],
          ["dOP", ["Chênh áp giữa áp suất dầu và áp suất nén", "Oil-to-discharge differential"], "kgf/cm²G"],
          ["IP", ["Áp suất trung gian", "Intermediate pressure"], "kgf/cm²G"],
          ["dFP", ["Chênh áp qua lọc dầu", "Oil filter differential"], "kgf/cm²G"],
          ["ST", ["Nhiệt độ hút", "Suction temperature"], "°C"],
          ["DT", ["Nhiệt độ nén", "Discharge temperature"], "°C"],
          ["OT", ["Nhiệt độ dầu", "Oil temperature"], "°C"],
          ["IT", ["Nhiệt độ trung gian", "Intermediate temperature"], "°C"],
          ["SSH", ["Độ quá nhiệt hút", "Suction superheat"], "K"],
          ["DSH", ["Độ quá nhiệt nén", "Discharge superheat"], "K"],
          ["ISH", ["Độ quá nhiệt trung gian", "Intermediate superheat"], "K"],
          ["SV", ["Tải (vị trí con trượt)", "Load (slide valve)"], "%"],
          ["LSV", ["Tải tầm thấp", "Low-stage load"], "%"],
          ["HSV", ["Tải tầm cao", "High-stage load"], "%"],
          ["MA", ["Dòng điện motor", "Motor current"], "A"],
          ["HM", ["Tổng số giờ chạy máy", "Total run hours"], "h"],
        ] },
    ],
  },
  {
    id: "commission", group: "common", icon: "list-checks",
    title: ["Checklist chạy thử máy nén trục vít", "Screw compressor commissioning checklist"],
    src: "Commissioning screw compressor checklist (MYCOM)",
    blocks: [
      { type: "p", text: ["Đánh dấu từng mục khi kiểm tra xong. Trạng thái được lưu trên máy này.", "Tick each item when done. Progress is saved on this device."] },
      { type: "checklist", id: "commission", groups: [
        { title: ["Kiểm tra bên ngoài", "Visual check"], items: [
          ["Máy nén: sơn, mối nối, bulông chân, chỉ thị tải", "Compressor: paint, connections, foot bolts, unloader indicator"],
          ["Van: hoạt động, nắp chụp, chiều lắp", "Valves: function, caps, direction"],
          ["Đường ống: sơn, kích thước, mối nối", "Piping: paint, size, connections"],
          ["Khớp nối: đủ phụ tùng, mối nối, kích thước với motor", "Coupling: spare parts, connection, dimension to motor"],
          ["Tủ điều khiển: model, đấu nối, bên ngoài", "Control panel: model, wiring, appearance"],
          ["Bệ máy: kích thước, bulông neo", "Foundation: dimensions, anchor bolts"],
          ["Thiết bị điện điều khiển: cảm biến, điện trở sưởi dầu, van điện từ", "Control devices: sensors, oil heater, solenoid valves"],
          ["Dầu: chủng loại, mức dầu", "Oil: brand, level"],
          ["Motor: đường kính trục, sơn, hộp đấu dây, nhãn, thông tin mỡ", "Motor: shaft diameter, paint, terminals, nameplate, grease info"],
          ["Motor: kích thước, lỗ bulông chân, bệ, cỡ bulông", "Motor: dimensions, foot bolt holes, base, bolt size"],
          ["Motor: chiều quay, tiếng chạy", "Motor: rotation, sound"],
          ["Bơm dầu: model, chiều quay, tiếng chạy", "Oil pump: model, rotation, sound"],
        ] },
        { title: ["Đo đạc", "Measurement"], items: [
          ["Điện áp cấp vào tủ điều khiển", "Supply voltage to control panel"],
          ["Cách điện motor (pha–pha, pha–đất)", "Motor insulation (phase–phase, phase–earth)"],
          ["Dòng bơm dầu, motor (tải 0 %, 100 %, dòng định mức)", "Oil pump and motor current (0 %, 100 % slide valve, rated)"],
        ] },
        { title: ["Điều chỉnh", "Adjustment"], items: [
          ["Độ mở van hồi dầu", "Oil return valve opening"],
          ["Độ mở van dầu injection", "Oil injection valve opening"],
          ["Van điều áp bơm dầu", "Oil pump pressure regulating valve"],
          ["Van chặn cảm biến áp suất", "Pressure sensor stop valves"],
          ["Cân chỉnh đồng trục", "Alignment and centering"],
        ] },
        { title: ["Chức năng thiết bị điện", "Electric device function"], items: [
          ["Van điện từ tăng tải", "Unloader SV — increase"],
          ["Van điện từ giảm tải", "Unloader SV — decrease"],
          ["Van điện từ starting bypass", "Starting bypass SV"],
          ["Van điện từ cấp dịch / phun dịch", "Liquid supply / injection SV"],
        ] },
        { title: ["Cài đặt & chạy máy", "Setting & running"], items: [
          ["Tủ điều khiển: cấu hình, cài đặt, điều khiển", "Control panel: configuration, settings, control"],
          ["Ghi thông số vận hành", "Record operating data"],
          ["Tiếng chạy máy nén", "Compressor sound"],
          ["Độ rung máy nén", "Compressor vibration"],
        ] },
      ] },
    ],
  },
  {
    id: "mypro", group: "common", icon: "cog",
    title: ["Bộ điều khiển MyPro Touch", "MyPro Touch controller"],
    src: "Mayekawa VN — Hướng dẫn sử dụng bộ điều khiển MyPro Touch; Những lợi thế của máy nén MYCOM (2023)",
    blocks: [
      { type: "list", items: [
        ["Tích hợp trên các cụm máy nén trục vít MYCOM; màn hình cảm ứng.", "Fitted to MYCOM screw packages; touch screen."],
        ["Kết nối: USB và thẻ SD, Ethernet, Modbus RTU & ASCII, SCADA.", "Connectivity: USB and SD card, Ethernet, Modbus RTU & ASCII, SCADA."],
        ["Bảo vệ nhiều cấp cho máy nén và motor; mật khẩu; hỗ trợ khắc phục lỗi.", "Multi-level compressor and motor protection; password; troubleshooting help."],
        ["Điều khiển mở rộng: chạy chủ–tớ nhiều máy nén; điều khiển dàn ngưng, chiller, cấp dịch bình thấp áp; biến tần; Vi cho máy J.",
         "Extended control: lead/lag of several compressors; condensers, chillers, LP receiver feed; inverter; Vi for J-series."],
        ["Có biến tần: điều khiển công suất cả tốc độ quay và con trượt (slide valve). Máy 2 cấp đặt được setpoint cho từng cấp.",
         "With an inverter, capacity is controlled by both speed and slide valve. Two-stage machines take a set point per stage."],
        ["Lưu dữ liệu vận hành, biểu đồ xu hướng, xuất file Excel; chụp lưu màn hình.", "Logs operating data, trend charts, Excel export; screenshots."],
        ["Kết nối được với V-DOC (đo rung bạc đạn bằng siêu âm) để theo dõi tình trạng bạc đạn.", "Can link to V-DOC (ultrasonic bearing monitor) for bearing condition."],
      ] },
    ],
  },
  {
    id: "mycom-why", group: "common", icon: "info",
    title: ["Điểm mạnh máy nén MYCOM", "MYCOM compressor strengths"],
    src: "Những lợi thế của máy nén MYCOM (cập nhật 06/04/2023)",
    blocks: [
      { type: "list", items: [
        ["Dải thể tích quét rộng: 100 đến 15.000 m³/h (trục vít 1 cấp, 2 cấp, booster).", "Wide swept volume range: 100 to 15,000 m³/h (single, two-stage, booster)."],
        ["Bình tách dầu nằm ngang, cụm máy gọn, tiết kiệm diện tích phòng máy.", "Horizontal oil separator, compact package, smaller machine room."],
        ["Biên dạng rotor 4-6 hoặc 5-6; giảm tải vô cấp bằng slide valve và biến tần; Vi cố định, thay đổi được hoặc tự điều khiển.",
         "4-6 or 5-6 rotor profiles; stepless slide valve and inverter control; fixed, variable or automatic Vi."],
        ["Dòng máy phát triển liên tục hơn 30 năm; ít ồn, ít rung; dùng được với NH3, Freon…", "Series developed for over 30 years; low noise and vibration; NH3, freons…"],
        ["Tuỳ chọn: giải nhiệt dầu bằng thermosyphon, nước hoặc cấp dịch; motor ABB, Toshiba, Siemens, WEG hoặc khách tự cấp; có/không economizer; chạy booster, tầm cao hoặc cả hai.",
         "Options: thermosyphon, water or liquid-injection oil cooling; ABB, Toshiba, Siemens, WEG or customer motor; with/without economizer; booster, high stage or both."],
        ["Dịch vụ: kỹ sư tại Hà Nội, Cần Thơ, TP.HCM; đại tu 2–3 ngày; đo rung V-DOC, cân chỉnh laser; phụ tùng tiêu chuẩn có sẵn trong nước.",
         "Service: engineers in Hanoi, Can Tho, HCMC; 2–3 day overhauls; V-DOC vibration and laser alignment; standard parts stocked locally."],
      ] },
    ],
  },
  {
    id: "refhandbook", group: "common", icon: "book-open",
    title: ["Kiến thức hệ thống: dàn ngưng, nước, NH3 lượng nạp thấp…", "System knowledge: condensers, water, low-charge NH3…"],
    src: "App RefHandbook — Sổ tay hệ thống lạnh",
    blocks: [
      { type: "p", text: ["Các nội dung dùng chung cho mọi hãng máy nén nằm ở app riêng RefHandbook. Máy tính nhiệt thải ở đó lấy được số từ giỏ chọn của app này.",
                          "Content shared by all compressor brands lives in the separate RefHandbook app. Its heat rejection calculator can read this app's cart."] },
      { type: "links", items: [
        { href: "../RefHandbook/#sys-thr", icon: "wind", text: ["Nhiệt thải và cỡ dàn ngưng", "Heat rejection and condenser size"] },
        { href: "../RefHandbook/#sys-highpc", icon: "gauge", text: ["Áp suất ngưng cao", "High condensing pressure"] },
        { href: "../RefHandbook/#sys-water", icon: "droplets", text: ["Nước dàn ngưng, xả đáy", "Condenser water, bleed-off"] },
        { href: "../RefHandbook/#sys-commission", icon: "list-checks", text: ["Checklist chạy thử dàn ngưng", "Condenser start-up checklist"] },
        { href: "../RefHandbook/#sys-lowcharge", icon: "snowflake", text: ["NH3 lượng nạp thấp", "Low-charge NH3"] },
        { href: "../RefHandbook/#sys-phe", icon: "layers", text: ["Trao đổi nhiệt tấm quanh máy nén", "Plate heat exchangers"] },
        { href: "../RefHandbook/", icon: "book-open", text: ["Mở RefHandbook", "Open RefHandbook"] },
      ] },
    ],
  },
];

/* Máy tính mốc bảo trì.
   at: các mốc riêng lần đầu (giờ); every: chu kỳ lặp (giờ) tính từ 0. Chu kỳ theo tháng được quy đổi
   theo tài liệu (1 năm ≈ 8000 giờ) và ghi rõ trong note. */
const HB_MAINT = {
  screw: {
    label: ["Máy trục vít", "Screw"],
    tasks: [
      { name: ["Thay dầu", "Replace oil"], at: [100], every: null, note: ["Sau chạy thử và 100 h đầu; sau đó theo kết quả phân tích dầu", "After commissioning and first 100 h; then by oil analysis"] },
      { name: ["Phân tích dầu", "Oil analysis"], at: [500], every: 4000, note: ["Mỗi 6 tháng (≈ 4000 h)", "Every 6 months (≈ 4000 h)"] },
      { name: ["Lọc dầu bơm dầu", "Oil pump filter"], at: [500], every: 3000, note: ["Thay lọc giấy bằng inox ở 200–500 h; vệ sinh mỗi 3000 h", "Paper → stainless at 200–500 h; clean every 3000 h"] },
      { name: ["Lọc hồi dầu & starting bypass", "Oil return & bypass strainers"], at: [100, 500], every: 3000, note: ["Vệ sinh", "Clean"] },
      { name: ["Lọc hút", "Suction strainer"], at: [100, 500], every: 3000, note: ["Vệ sinh", "Clean"] },
      { name: ["Lọc tách dầu + roăng", "Separator element + gasket"], at: [], every: 8000, note: ["Thay mới, siết 27–34 N·m", "Replace, torque 27–34 N·m"] },
      { name: ["Cân đồng trục, kiểm tra định kỳ năm", "Alignment, yearly inspection"], at: [], every: 8000, note: ["12 tháng (≈ 8000 h)", "12 months (≈ 8000 h)"] },
      { name: ["Thay bộ đệm kín, bạc đạn, roăng (mốc 48 tháng)", "Seal, bearings, gaskets (48-month)"], at: [], every: 30000, note: ["Theo bảng định kỳ (≈ 30000 h)", "Per periodic table (≈ 30000 h)"] },
    ],
  },
  piston: {
    label: ["Máy piston", "Piston"],
    tasks: [
      { name: ["Thay dầu + vệ sinh lọc thô", "Oil change + clean coarse filter"], at: [50, 200, 500], every: 2000, note: ["", ""] },
      { name: ["Phân tích, so màu dầu", "Oil analysis"], at: [500], every: 2000, note: ["3 tháng/lần (≈ 2000 h)", "Every 3 months (≈ 2000 h)"] },
      { name: ["Lọc tinh CUNO (W) — vệ sinh", "CUNO fine filter (W) — clean"], at: [50, 200], every: 2000, note: ["", ""] },
      { name: ["Lọc tinh (M) — thay", "Fine filter (M) — replace"], at: [50, 200, 500], every: 2000, note: ["", ""] },
      { name: ["Tháo túi vải lọc hút / scale trap", "Remove cloth bag (strainer/scale trap)"], at: [200], every: null, note: ["Chỉ máy mới", "New machines only"] },
      { name: ["Lọc hút, scale trap — vệ sinh", "Suction strainer, scale trap — clean"], at: [100, 500], every: 3000, note: ["", ""] },
      { name: ["Bộ đệm kín, khớp nối — kiểm tra", "Shaft seal, coupling — check"], at: [], every: 6000, note: ["Hoặc hằng năm", "Or yearly"] },
    ],
  },
};
