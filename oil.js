/* oil.js — Lượng dầu nạp máy nén MYCOM (lít/bộ), chuyển từ công cụ "Lubricant Mycom" của Toolkits.
   Nguồn: Compressor_Lubricant.csv do anh Đệ cung cấp. Cột "Không Eco" / "Có Eco" = lượng dầu nạp
   cho một bộ máy, không có / có bộ tiết kiệm (economizer). null = file gốc ghi "-" (chưa có số liệu).

   Mã đặt hàng MCN… và mã series trong dữ liệu chọn máy (data.json) là cùng một máy:
     MCN 200S-L/51 ↔ N200VSD,  MCN 250LL-L/51 ↔ N250VLLD,  MCN2016LSC-L/51 ↔ 2016LSC …
   Cột `sel` ghi mã series tương ứng trong data.json; null = model chưa có dữ liệu chọn máy. */
const OIL_DB = [
  // UD/G/SCV — 1 cấp
  { group: "UD/G/SCV", model: "MCN 125S-L/51",  sel: null,       noEco: 65,   withEco: 65 },
  { group: "UD/G/SCV", model: "MCN 125L-L/51",  sel: null,       noEco: 65,   withEco: 65 },
  { group: "UD/G/SCV", model: "MCN 160S-L/51",  sel: null,       noEco: 120,  withEco: 120 },
  { group: "UD/G/SCV", model: "MCN 160M-L/51",  sel: null,       noEco: 150,  withEco: 120 },
  { group: "UD/G/SCV", model: "MCN 160L-L/51",  sel: "N160VLD",  noEco: 180,  withEco: 150 },
  { group: "UD/G/SCV", model: "MCN 200S-L/51",  sel: "N200VSD",  noEco: 240,  withEco: 200 },
  { group: "UD/G/SCV", model: "MCN 200M-L/51",  sel: "N200VMD",  noEco: 280,  withEco: 200 },
  { group: "UD/G/SCV", model: "MCN 200L-L/51",  sel: "N200VLD",  noEco: 340,  withEco: 240 },
  { group: "UD/G/SCV", model: "MCN 250S-L/51",  sel: "N250VSD",  noEco: 610,  withEco: 280 },
  { group: "UD/G/SCV", model: "MCN 250M-L/51",  sel: "N250VMD",  noEco: 750,  withEco: 470 },
  { group: "UD/G/SCV", model: "MCN 250L-L/51",  sel: "N250VLD",  noEco: 900,  withEco: 610 },
  { group: "UD/G/SCV", model: "MCN 250LL-L/51", sel: "N250VLLD", noEco: 900,  withEco: 610 },
  { group: "UD/G/SCV", model: "MCN 320S-L/51",  sel: null,       noEco: null, withEco: null },
  { group: "UD/G/SCV", model: "MCN 320M-L/51",  sel: null,       noEco: null, withEco: null },
  { group: "UD/G/SCV", model: "MCN 320L-L/51",  sel: null,       noEco: null, withEco: null },
  // J-Series — nguồn chỉ có cột "Không Eco"
  { group: "J-Series", model: "MCN170J-L/51",   sel: null,       noEco: 170,  withEco: null },
  { group: "J-Series", model: "MCN220J-L/51",   sel: null,       noEco: 220,  withEco: null },
  { group: "J-Series", model: "MCN280J-L/51",   sel: null,       noEco: 280,  withEco: null },
  // 2 cấp — nguồn chỉ có cột "Có Eco" (máy 2 cấp luôn có cổng trung gian)
  { group: "2-stage",  model: "MCN1610LSC-L/51", sel: null,      noEco: null, withEco: 90 },
  { group: "2-stage",  model: "MCN1612LSC-L/51", sel: null,      noEco: null, withEco: 110 },
  { group: "2-stage",  model: "MCN2016LSC-L/51", sel: "2016LSC", noEco: null, withEco: 250 },
  { group: "2-stage",  model: "MCN2520LSC-L/51", sel: "2520LSC", noEco: null, withEco: 450 },
  { group: "2-stage",  model: "MCN3225LSC-L/51", sel: null,      noEco: null, withEco: null },
  { group: "2-stage",  model: "MCN4032LSC-L/51", sel: null,      noEco: null, withEco: null },
];

function oilForSeries(seriesId){ return OIL_DB.find(o => o.sel === seriesId) || null; }
