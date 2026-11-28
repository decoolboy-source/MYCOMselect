/* [MYCOMselect] localStorage dùng chung origin với các PWA khác: mọi khóa của app này có tiền tố "MYCOMselect:". */

// ===================== Build info =====================
const BUILD_VERSION = "2026-11-28.1";

// ===================== i18n: UI strings =====================
const UI = {
  vi: {
    appTitle: "Chọn máy nén MYCOM",
    tagline: "Máy nén trục vít MYCOM (Mayekawa)",
    navLookup: "Tra cứu",
    navReport: "Báo cáo",
    navOil: "Dầu nạp",
    navHandbook: "Sổ tay",
    hbTitle: "Sổ tay máy nén MYCOM",
    hbSub: "Giới hạn vận hành, dầu, lọc, cân chỉnh, lịch bảo dưỡng và checklist — tóm tắt từ tài liệu của hãng.",
    hbSearchPh: "Tìm: lọc tách, áp suất dầu, 62WB…",
    oilTitle: "Lượng dầu nạp máy nén",
    oilSub: "Lượng dầu nạp lần đầu cho một bộ máy theo catalogue MYCOM, có hoặc không có bộ tiết kiệm (economizer).",
    oilCalcTitle: "Tính lượng dầu cần mua",
    oilModel: "Model máy nén",
    oilConfig: "Cấu hình",
    oilNoEco: "Không Eco",
    oilWithEco: "Có Eco",
    oilQty: "Số máy",
    oilMargin: "Dự phòng hao hụt (%)",
    oilTableTitle: "Bảng dầu nạp (lít/bộ)",
    oilNote: "Nguồn: catalogue dầu nạp MYCOM. Mã MCN… và mã series dùng ở phần chọn máy là cùng một máy. Đối chiếu catalogue/hướng dẫn lắp đặt trước khi đặt mua dầu.",
    oilGroup: "Nhóm",
    oilSelCode: "Mã chọn máy",
    oilPerUnit: "Dầu / bộ",
    oilTotal: "Tổng dầu cần mua",
    oilFormula: (u, q, m) => `${u} L × ${q} máy × (1 + ${m}%)`,
    oilNoData: (model, cfg) => `Catalogue chưa có số liệu dầu cho ${model} — cấu hình "${cfg}".`,
    oilBoxTitle: "Dầu nạp (catalogue MYCOM)",
    oilBoxFor: (q) => `cho ${q} máy`,
    oilBoxOpen: "Tính lượng dầu",
    oilBoxNone: "Chưa có số liệu dầu nạp cho model này.",
    litre: "L",
    conditionsTitle: "Điều kiện tra cứu",
    reportTitle: "Báo cáo thiết bị đã chọn",
    exportTitle: "Phiếu yêu cầu báo giá",
    openReport: "Mở báo cáo",
    docCaption: "Bảng 1. Danh mục máy nén yêu cầu báo giá",
    docSpec: "Thông số kỹ thuật",
    docNoteLabel: "Lưu ý",
    docSignHint: "(Ký, ghi rõ họ tên)",
    docFooter: "Phiếu yêu cầu báo giá máy nén",
    docPage: "Trang",
    reportDate: "Ngày lập báo cáo",
    offlineReady: "● Sẵn sàng offline",
    install: "Cài đặt app",
    stepBrand: "Hãng sản xuất",
    chooseBrand: "— Chọn hãng —",
    allBrands: "Tất cả các hãng",
    stepRefrig: "Loại gas lạnh",
    chooseRefrig: "— Chọn gas —",
    stepCond: "Nhiệt độ ngưng tụ",
    chooseCond: "— Chọn nhiệt độ —",
    stepEvap: "Nhiệt độ bay hơi",
    chooseEvap: "— Chọn nhiệt độ —",
    stepMode: "Tra cứu theo",
    modeByModel: "Model máy nén",
    modeByCapacity: "Công suất lạnh",
    stepModel: "Model máy nén",
    chooseModel2: "— Chọn model —",
    stepCapacityInput: "Nhập công suất lạnh cần tìm (kW)",
    findBtn: "Tìm",
    closestMatches: "10 model gần nhất với công suất yêu cầu",
    emptyMain: "Chọn gas → nhiệt độ ngưng tụ → nhiệt độ bay hơi, rồi tra theo model hoặc theo công suất lạnh.",
    emptySub: "Toàn bộ dữ liệu đã được nhúng sẵn trong app — tra cứu không cần mạng.",
    capacity: "Công suất lạnh",
    power: "Công suất hấp thụ",
    condEvap: "Ngưng tụ / Bay hơi",
    footer: "Dữ liệu trích xuất từ catalogue do người dùng cung cấp · Chỉ dùng để tham khảo, đối chiếu với catalogue gốc trước khi chọn máy.",
    stages: { single: "1 cấp nén", two: "2 cấp nén" },
    points: "điểm",
    portLabel: "Cổng",
    warnMismatch: (fn, fe) => `File gốc ghi nhiệt độ bay hơi = ${fe}°C, khác với nhãn ${fn}°C — vui lòng đối chiếu lại với catalogue gốc.`,
    errorMain: "Không tải được dữ liệu máy nén.",
    retry: "Thử lại",
    noResults: "Không có model nào khớp với điều kiện đã chọn.",
    enterCapacity: "Vui lòng nhập công suất lạnh cần tìm.",
    diff: "chênh lệch",
    qtyLabel: "Số lượng",
    addToReport: "Thêm vào báo cáo",
    added: "Đã thêm vào báo cáo",
    backToLookup: "Quay lại tra cứu",
    projectInfoTitle: "Thông tin dự án",
    companyName: "Đơn vị hỏi giá",
    projectName: "Tên dự án / công trình",
    preparerName: "Người lập",
    preparerPhone: "Số điện thoại",
    preparerEmail: "Email",
    installLocation: "Địa điểm lắp đặt",
    quoteDeadline: "Hạn chót nhận báo giá",
    commercialTitle: "Điều kiện thương mại",
    deliveryTerms: "Điều kiện giao hàng",
    installIncluded: "Kèm lắp đặt",
    optNotSpecified: "— Chưa xác định —",
    optYes: "Có",
    optNo: "Không",
    warrantyReq: "Yêu cầu bảo hành",
    cartTitle: "Danh mục thiết bị",
    clearAll: "Xoá tất cả",
    cartEmptyMain: "Chưa có thiết bị nào trong báo cáo.",
    cartEmptySub: "Quay lại tra cứu và bấm \"Thêm vào báo cáo\" ở kết quả bạn muốn đưa vào phiếu.",
    exportCsv: "Xuất file CSV (Excel)",
    dataExport: "Xuất dữ liệu",
    dataImport: "Nhập dữ liệu",
    exportPrint: "In / Lưu PDF",
    exportWord: "Xuất file Word (.doc)",
    wordNote: "File Word xuất ra là HTML định dạng .doc (Word mở/sửa bình thường) — không phải chuẩn .docx.",
    notesPlaceholder: "Yêu cầu tuỳ chọn / phụ kiện (VD: kèm bộ giảm chấn, sơn phủ đặc biệt, động cơ rời...)",
    confirmClearCart: "Xoá toàn bộ danh sách thiết bị trong báo cáo?",
    removeItem: "Xoá",
    conditionsLabel: "Điều kiện thiết kế đã chọn",
    brandCond: "Hãng",
    refrigCond: "Gas",
    condCond: "Nhiệt độ ngưng tụ/môi trường",
    evapCond: "Nhiệt độ bay hơi",
    targetCapCond: "Công suất yêu cầu",
    docTitle: "PHIẾU YÊU CẦU BÁO GIÁ MÁY NÉN",
    docDateLabel: (d,m,y) => `Ngày ${d} tháng ${m} năm ${y}`,
    docNo: "STT",
    docModel: "Model",
    docBrand: "Hãng",
    docQty: "SL",
    docNotes: "Yêu cầu thêm",
    docDisclaimer: "Đề nghị nhà cung cấp xác nhận lại thông số kỹ thuật và báo giá theo đúng điều kiện vận hành thực tế của dự án trước khi chào giá chính thức.",
    docSignature: "Người lập báo cáo",
    printAgain: "In lại",
    closeWindow: "Đóng",
    printPopupBlocked: "Trình duyệt đã chặn cửa sổ xem trước — vui lòng cho phép popup rồi thử lại.",
  },
  en: {
    appTitle: "MYCOM compressor selection",
    tagline: "MYCOM (Mayekawa) screw compressors",
    navLookup: "Lookup",
    navReport: "Report",
    navOil: "Oil charge",
    navHandbook: "Handbook",
    hbTitle: "MYCOM compressor handbook",
    hbSub: "Operating limits, oil, filters, alignment, maintenance schedule and checklists — summarised from maker documents.",
    hbSearchPh: "Search: separator, oil pressure, 62WB…",
    oilTitle: "Compressor oil charge",
    oilSub: "Initial oil charge per unit from the MYCOM catalogue, with or without economizer.",
    oilCalcTitle: "Oil quantity to order",
    oilModel: "Compressor model",
    oilConfig: "Configuration",
    oilNoEco: "Without Eco",
    oilWithEco: "With Eco",
    oilQty: "Units",
    oilMargin: "Spare / losses (%)",
    oilTableTitle: "Oil charge table (L/unit)",
    oilNote: "Source: MYCOM oil charge catalogue. MCN… order codes and the series codes used for selection refer to the same machine. Check the catalogue / installation manual before ordering oil.",
    oilGroup: "Group",
    oilSelCode: "Selection code",
    oilPerUnit: "Oil / unit",
    oilTotal: "Total oil to order",
    oilFormula: (u, q, m) => `${u} L × ${q} units × (1 + ${m}%)`,
    oilNoData: (model, cfg) => `The catalogue has no oil figure for ${model} — "${cfg}".`,
    oilBoxTitle: "Oil charge (MYCOM catalogue)",
    oilBoxFor: (q) => `for ${q} units`,
    oilBoxOpen: "Oil calculator",
    oilBoxNone: "No oil charge figure for this model yet.",
    litre: "L",
    conditionsTitle: "Lookup conditions",
    reportTitle: "Selected equipment report",
    exportTitle: "Quote request",
    openReport: "Open report",
    docCaption: "Table 1. Compressors requested for quotation",
    docSpec: "Technical data",
    docNoteLabel: "Note",
    docSignHint: "(Signature and full name)",
    docFooter: "Compressor quote request",
    docPage: "Page",
    reportDate: "Report date",
    offlineReady: "● Offline ready",
    install: "Install app",
    stepBrand: "Manufacturer",
    chooseBrand: "— Select brand —",
    allBrands: "All brands",
    stepRefrig: "Refrigerant",
    chooseRefrig: "— Select refrigerant —",
    stepCond: "Condensing temperature",
    chooseCond: "— Select temperature —",
    stepEvap: "Evaporating temperature",
    chooseEvap: "— Select temperature —",
    stepMode: "Search by",
    modeByModel: "Compressor model",
    modeByCapacity: "Cooling capacity",
    stepModel: "Compressor model",
    chooseModel2: "— Select model —",
    stepCapacityInput: "Enter target cooling capacity (kW)",
    findBtn: "Search",
    closestMatches: "10 closest matches to the requested capacity",
    emptyMain: "Select refrigerant → condensing temp → evaporating temp, then search by model or by cooling capacity.",
    emptySub: "All data is embedded in the app — lookup works fully offline.",
    capacity: "Cooling Capacity",
    power: "Absorbed Power",
    condEvap: "Condensing / Evaporating",
    footer: "Data extracted from the catalogue provided by the user · For reference only — verify against the original catalogue before selecting a compressor.",
    stages: { single: "1-stage", two: "2-stage" },
    points: "points",
    portLabel: "Port",
    warnMismatch: (fn, fe) => `Source file records evaporating temp = ${fe}°C, differing from the ${fn}°C label — please verify against the original catalogue.`,
    errorMain: "Failed to load compressor data.",
    retry: "Retry",
    noResults: "No models match the selected conditions.",
    enterCapacity: "Please enter the target cooling capacity.",
    diff: "difference",
    qtyLabel: "Quantity",
    addToReport: "Add to report",
    added: "Added to report",
    backToLookup: "Back to lookup",
    projectInfoTitle: "Project information",
    companyName: "Requesting company",
    projectName: "Project name",
    preparerName: "Prepared by",
    preparerPhone: "Phone number",
    preparerEmail: "Email",
    installLocation: "Installation location",
    quoteDeadline: "Quote deadline",
    commercialTitle: "Commercial terms",
    deliveryTerms: "Delivery terms",
    installIncluded: "Installation included",
    optNotSpecified: "— Not specified —",
    optYes: "Yes",
    optNo: "No",
    warrantyReq: "Warranty requirement",
    cartTitle: "Equipment list",
    clearAll: "Clear all",
    cartEmptyMain: "No equipment in the report yet.",
    cartEmptySub: "Go back to lookup and click \"Add to report\" on the result you want to include.",
    exportCsv: "Export CSV (Excel)",
    dataExport: "Export data",
    dataImport: "Import data",
    exportPrint: "Print / Save PDF",
    exportWord: "Export Word (.doc)",
    wordNote: "The exported Word file is HTML saved as .doc (opens/edits normally in Word) — not a native .docx file.",
    notesPlaceholder: "Optional requirements / accessories (e.g. vibration dampers, special coating, separate motor drive...)",
    confirmClearCart: "Remove all equipment from the report?",
    removeItem: "Remove",
    conditionsLabel: "Selected design conditions",
    brandCond: "Brand",
    refrigCond: "Refrigerant",
    condCond: "Condensing/ambient temperature",
    evapCond: "Evaporating temperature",
    targetCapCond: "Requested capacity",
    docTitle: "COMPRESSOR QUOTATION REQUEST",
    docDateLabel: (d,m,y) => `Date: ${d}/${m}/${y}`,
    docNo: "No.",
    docModel: "Model",
    docBrand: "Brand",
    docQty: "Qty",
    docNotes: "Additional requirements",
    docDisclaimer: "Suppliers are requested to reconfirm technical specifications and pricing against the project's actual operating conditions before issuing a formal quotation.",
    docSignature: "Prepared by",
    printAgain: "Print again",
    closeWindow: "Close",
    printPopupBlocked: "The browser blocked the preview window — please allow pop-ups and try again.",
  },
};

let LANG = localStorage.getItem("MYCOMselect:lang") || "vi";

const REFRIG_DISPLAY = {
  "AMMONIA": { vi: "NH3 (Amoniac)", en: "NH3 (Ammonia)" },
  "R134A": { vi: "R134a", en: "R134a" },
  "R404A": { vi: "R404A", en: "R404A" },
  "R717": { vi: "R717 (NH3)", en: "R717 (NH3)" },
  "R744": { vi: "R744 (CO2)", en: "R744 (CO2)" },
  "R22": { vi: "R22", en: "R22" },
  "R407F": { vi: "R407F", en: "R407F" },
  "R448A/R449A": { vi: "R448A / R449A", en: "R448A / R449A" },
};
function refrigDisplay(raw){
  if (!raw) return "—";
  return (REFRIG_DISPLAY[raw] && REFRIG_DISPLAY[raw][LANG]) || raw;
}

const BRAND_COLORS = {
  mycom: "#da001e",
  bitzer: "#0f766e",
  gea: "#7c3aed",
  panasonic: "#2563eb",
  copeland: "#b45309",
};
function brandColor(brandId){ return BRAND_COLORS[brandId] || "#667180"; }
function brandTagHTML(brandId, brandName){
  return `<span class="brand-tag" style="background:${brandColor(brandId)}">${brandName}</span>`;
}

// ===================== i18n: parameter labels =====================
const LABEL_VI = {
  "MODEL": "Model",
  "REFRIGERANT": "Môi chất lạnh",
  "RECOMMENDED PORT": "Cổng khuyến nghị",
  "ROTOR & PORT 1ST": "Rotor & cổng cấp 1",
  "ROTOR & PORT 2ND": "Rotor & cổng cấp 2",
  "COMPRESSION RATIO": "Tỷ số nén",
  "CAPACITY": "Công suất lạnh",
  "ABSORBED POWER": "Công suất hấp thụ (trục)",
  "DRIVE SHAFT SPEED": "Tốc độ trục dẫn động",
  "COMPRESSOR SPEED": "Tốc độ máy nén",
  "INDICATOR POSITION": "Vị trí van tải (indicator)",
  "SWEPT VOLUME RATIO (2ND/1ST)": "Tỷ số thể tích quét (cấp 2/cấp 1)",
  "CONDENSING TEMP.": "Nhiệt độ ngưng tụ",
  "EVAPORATIVE TEMP.": "Nhiệt độ bay hơi",
  "SUCTION SUPERHEAT": "Quá nhiệt hút",
  "INTERMED. SUPERHEAT": "Quá nhiệt trung gian",
  "LIQUID APPROACH TEMP.": "Chênh nhiệt độ tiếp cận lỏng",
  "LIQUID SUBCOOLING": "Quá lạnh lỏng",
  "SUCTION TEMP.": "Nhiệt độ hút",
  "OIL SUPPLY TEMP.": "Nhiệt độ dầu cấp",
  "SUCTION PRESS.": "Áp suất hút",
  "DISCHARGE PRESS.": "Áp suất đẩy",
  "OIL SUPPLY PRESS.": "Áp suất dầu cấp",
  "SUCTION PRES. DROP": "Tổn thất áp suất hút",
  "DISCHARGE PRES. DROP": "Tổn thất áp suất đẩy",
  "SWEPT VOLUME": "Thể tích quét",
  "LOAD(SUCTION VOL. FLOW RATE)": "Tải (lưu lượng thể tích hút)",
  "INTERMED. TEMP.": "Nhiệt độ trung gian",
  "DISCHARGE TEMP.": "Nhiệt độ đẩy",
  "INTERMED. PRESS.": "Áp suất trung gian",
  "REFRIG. FLOW RATE": "Lưu lượng môi chất",
  "REFRIG. FLOW RATE SUC.": "Lưu lượng môi chất (hút)",
  "REFRIG. FLOW RATE DIS.": "Lưu lượng môi chất (đẩy)",
  "REFRIG. FLOW RATE INT.": "Lưu lượng môi chất trung gian",
  "INJECT. OIL FLOW RATE": "Lưu lượng dầu phun",
  "LUB. OIL FLOW RATE": "Lưu lượng dầu bôi trơn",
  "F.SIDE OIL FLOW RATE": "Lưu lượng dầu phía F",
  "TOTAL OIL FLOW RATE": "Tổng lưu lượng dầu",
  "*TOTAL* OIL FLOW RATE": "TỔNG lưu lượng dầu (toàn hệ)",
  "OIL HEAT REJECTION": "Nhiệt thải qua dầu",
  "OIL SPEC HT": "Nhiệt dung riêng dầu",
  "OIL DENSITY": "Khối lượng riêng dầu",
  "COP": "Hệ số hiệu suất (COP)",
  "Elevation": "Cao độ lắp đặt",
  "Atmospheric": "Áp suất khí quyển",
  "HEAT REJECTION": "Nhiệt thải (bộ quá lạnh lỏng)",
  "TOTAL HEAT REJECTION": "Tổng nhiệt thải",
  "APPLICATION": "Chế độ vận hành",
  "POWER INPUT": "Công suất điện đầu vào",
  "CURRENT": "Dòng điện",
};

const LABEL_EN = {
  "MODEL": "Model",
  "REFRIGERANT": "Refrigerant",
  "RECOMMENDED PORT": "Recommended Port",
  "ROTOR & PORT 1ST": "Rotor & Port — Stage 1",
  "ROTOR & PORT 2ND": "Rotor & Port — Stage 2",
  "COMPRESSION RATIO": "Compression Ratio",
  "CAPACITY": "Cooling Capacity",
  "ABSORBED POWER": "Absorbed Power (Shaft)",
  "DRIVE SHAFT SPEED": "Drive Shaft Speed",
  "COMPRESSOR SPEED": "Compressor Speed",
  "INDICATOR POSITION": "Indicator (Slide Valve) Position",
  "SWEPT VOLUME RATIO (2ND/1ST)": "Swept Volume Ratio (Stage 2 / Stage 1)",
  "CONDENSING TEMP.": "Condensing Temperature",
  "EVAPORATIVE TEMP.": "Evaporating Temperature",
  "SUCTION SUPERHEAT": "Suction Superheat",
  "INTERMED. SUPERHEAT": "Intermediate Superheat",
  "LIQUID APPROACH TEMP.": "Liquid Approach Temperature",
  "LIQUID SUBCOOLING": "Liquid Subcooling",
  "SUCTION TEMP.": "Suction Temperature",
  "OIL SUPPLY TEMP.": "Oil Supply Temperature",
  "SUCTION PRESS.": "Suction Pressure",
  "DISCHARGE PRESS.": "Discharge Pressure",
  "OIL SUPPLY PRESS.": "Oil Supply Pressure",
  "SUCTION PRES. DROP": "Suction Pressure Drop",
  "DISCHARGE PRES. DROP": "Discharge Pressure Drop",
  "SWEPT VOLUME": "Swept Volume",
  "LOAD(SUCTION VOL. FLOW RATE)": "Load (Suction Vol. Flow Rate)",
  "INTERMED. TEMP.": "Intermediate Temperature",
  "DISCHARGE TEMP.": "Discharge Temperature",
  "INTERMED. PRESS.": "Intermediate Pressure",
  "REFRIG. FLOW RATE": "Refrigerant Flow Rate",
  "REFRIG. FLOW RATE SUC.": "Refrigerant Flow Rate (Suction)",
  "REFRIG. FLOW RATE DIS.": "Refrigerant Flow Rate (Discharge)",
  "REFRIG. FLOW RATE INT.": "Refrigerant Flow Rate (Intermediate)",
  "INJECT. OIL FLOW RATE": "Injection Oil Flow Rate",
  "LUB. OIL FLOW RATE": "Lubricating Oil Flow Rate",
  "F.SIDE OIL FLOW RATE": "F-Side Oil Flow Rate",
  "TOTAL OIL FLOW RATE": "Total Oil Flow Rate",
  "*TOTAL* OIL FLOW RATE": "TOTAL Oil Flow Rate (System)",
  "OIL HEAT REJECTION": "Oil Heat Rejection",
  "OIL SPEC HT": "Oil Specific Heat",
  "OIL DENSITY": "Oil Density",
  "COP": "Coefficient of Performance (COP)",
  "Elevation": "Elevation",
  "Atmospheric": "Atmospheric Pressure",
  "HEAT REJECTION": "Heat Rejection (Subcooler)",
  "TOTAL HEAT REJECTION": "Total Heat Rejection",
  "APPLICATION": "Operation Mode",
  "POWER INPUT": "Power Input",
  "CURRENT": "Current",
};

function labelDict(){ return LANG === "vi" ? LABEL_VI : LABEL_EN; }

function translateLabel(label){
  const dict = labelDict();
  if (dict[label]) return dict[label];
  const m = label.match(/^(.*)\s(1ST|2ND)$/);
  if (m && dict[m[1].trim()]) {
    const stageSuffix = LANG === "vi"
      ? (m[2] === "1ST" ? " — Cấp 1" : " — Cấp 2")
      : (m[2] === "1ST" ? " — Stage 1" : " — Stage 2");
    return dict[m[1].trim()] + stageSuffix;
  }
  return label;
}

const HERO_KEYS = new Set(["CAPACITY", "ABSORBED POWER", "POWER INPUT", "COP", "CONDENSING TEMP.", "EVAPORATIVE TEMP."]);
const IDENTITY_KEYS = new Set(["MODEL", "REFRIGERANT", "RECOMMENDED PORT", "ROTOR & PORT 1ST", "ROTOR & PORT 2ND"]);

const CATEGORY_NAMES = {
  vi: { operating: "Điều kiện vận hành", pressure: "Áp suất", flow: "Lưu lượng & thể tích", oil: "Dầu bôi trơn", performance: "Công suất & hiệu suất", other: "Khác" },
  en: { operating: "Operating Conditions", pressure: "Pressures", flow: "Flow & Volume", oil: "Lubricating Oil", performance: "Capacity & Performance", other: "Other" },
};
const CATEGORY_TESTS = [
  { key: "operating", test: l => /CONDENSING TEMP|EVAPORATIVE TEMP|SUPERHEAT|SUBCOOLING|APPROACH TEMP|SUCTION TEMP|OIL SUPPLY TEMP|SHAFT SPEED|COMPRESSOR SPEED|INDICATOR POSITION|COMPRESSION RATIO|SWEPT VOLUME RATIO|^APPLICATION$/.test(l) },
  { key: "performance", test: l => /^CAPACITY$|ABSORBED POWER|POWER INPUT|^CURRENT$|^COP$|HEAT REJECTION/.test(l) },
  { key: "pressure", test: l => /PRESS\.|PRES\. DROP/.test(l) },
  { key: "flow", test: l => /^SWEPT VOLUME( [12](ST|ND))?$|LOAD\(|REFRIG\. FLOW RATE|INTERMED\. TEMP|DISCHARGE TEMP/.test(l) },
  { key: "oil", test: l => /OIL/.test(l) },
  { key: "other", test: () => true },
];
const CATEGORY_ICONS = { operating: "thermometer", pressure: "gauge", flow: "waves", oil: "droplets", performance: "zap", other: "list" };
function categorize(label){
  for (const c of CATEGORY_TESTS) if (c.test(label)) return c.key;
  return "other";
}

function fmtNum(v){
  if (v === null || v === undefined) return "—";
  if (typeof v === "number") {
    if (Number.isInteger(v)) return String(v);
    return String(Math.round(v * 1000) / 1000);
  }
  return String(v);
}
function unitDisplay(u){
  if (!u) return "";
  return u.replace("degC", "°C").replace(/[\[\]]/g, "");
}
function getParam(entries, label, unit){
  for (const [l, u, v] of entries) {
    if (l === label && (unit === undefined || u === unit)) return v;
  }
  return null;
}

// ===================== Data flattening =====================
let DATA = null;
let FLAT = []; // every (brand, series, port, evap) record, flattened for filtering

function buildFlatRecords(){
  FLAT = [];
  for (const brand of DATA.brands) {
    for (const s of brand.series) {
      for (const p of s.ports) {
        for (const rec of p.records) {
          const refrigerant = getParam(rec.params, "REFRIGERANT");
          const cond = getParam(rec.params, "CONDENSING TEMP.");
          FLAT.push({
            key: `${brand.id}::${s.id}::${p.port}::${cond}::${rec.evap}`,
            brandId: brand.id,
            brandName: brand.name,
            seriesId: s.id,
            stage: s.stage,
            port: p.port,
            evap: rec.evap,
            evap_field: rec.evap_field,
            cond,
            warn: rec.warn,
            params: rec.params,
            refrigerant,
          });
        }
      }
    }
  }
}

function findFlat(key){ return FLAT.find(r => r.key === key); }

// ===================== State =====================
let selBrand = "";      // "" = not chosen, "__all__" = all brands, else brand id
let selRefrig = "";
let selCond = "";        // stored as string of the number
let selEvap = "";
let mode = "model";      // "model" | "capacity"
let currentRenderedRec = null;

const brandSelect = document.getElementById("brandSelect");
const refrigSelect = document.getElementById("refrigSelect");
const condSelect = document.getElementById("condSelect");
const evapSelect = document.getElementById("evapSelect");
const modelSelect = document.getElementById("modelSelect");
const capacityInput = document.getElementById("capacityInput");
const capacitySearchBtn = document.getElementById("capacitySearchBtn");
const modeModelBtn = document.getElementById("modeModelBtn");
const modeCapBtn = document.getElementById("modeCapBtn");
const modelPickField = document.getElementById("modelPickField");
const capacityPickField = document.getElementById("capacityPickField");

const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");
const errorDetail = document.getElementById("errorDetail");
const resultEl = document.getElementById("result");
const rankedListEl = document.getElementById("rankedList");
const rankedItemsEl = document.getElementById("rankedItems");

async function loadData(){
  errorState.hidden = true;
  emptyState.hidden = false;
  try {
    const res = await fetch("data.json?_=" + Date.now());
    if (!res.ok) throw new Error("HTTP " + res.status);
    DATA = await res.json();
    if (!DATA || !Array.isArray(DATA.brands) || DATA.brands.length === 0) {
      throw new Error("empty or malformed data.json");
    }
    buildFlatRecords();
    populateBrands();
    // App chỉ có một hãng (MYCOM): tự chọn hãng, ô chọn hãng được ẩn trong index.html.
    selBrand = DATA.brands[0].id;
    brandSelect.value = selBrand;
    populateRefrigs();
  } catch (err) {
    console.error("Failed to load data.json:", err);
    emptyState.hidden = true;
    errorState.hidden = false;
    errorDetail.textContent = String(err && err.message ? err.message : err);
  }
}

function seriesLabel(s){
  return `${s.id} (${UI[LANG].stages[s.stage === "two" ? "two" : "single"]})`;
}

function applyStaticText(){
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (UI[LANG][key] !== undefined) el.textContent = UI[LANG][key];
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (UI[LANG][key] !== undefined) el.placeholder = UI[LANG][key];
  });
  document.getElementById("langLabel").textContent = LANG === "vi" ? "EN" : "VI";
  document.title = UI[LANG].appTitle;
}

function resetDownstreamFrom(level){
  // level: "brand" | "refrig" | "cond" | "evap"
  if (level === "brand") { selRefrig = ""; }
  if (level === "brand" || level === "refrig") { selCond = ""; }
  if (level === "brand" || level === "refrig" || level === "cond") { selEvap = ""; }
  resultEl.hidden = true;
  rankedListEl.hidden = true;
  emptyState.hidden = false;
}

function candidatesByBrand(){
  if (!selBrand || selBrand === "__all__") return FLAT;
  return FLAT.filter(r => r.brandId === selBrand);
}
function candidatesByRefrig(){
  const base = candidatesByBrand();
  if (!selRefrig) return base;
  return base.filter(r => r.refrigerant === selRefrig);
}
function candidatesByCond(){
  const base = candidatesByRefrig();
  if (selCond === "") return base;
  return base.filter(r => String(r.cond) === selCond);
}
function candidatesByEvap(){
  const base = candidatesByCond();
  if (selEvap === "") return base;
  return base.filter(r => String(r.evap) === selEvap);
}

function populateBrands(){
  brandSelect.innerHTML = `<option value="">${UI[LANG].chooseBrand}</option>`;
  const opt = document.createElement("option");
  opt.value = "__all__";
  opt.textContent = UI[LANG].allBrands;
  brandSelect.appendChild(opt);
  for (const b of DATA.brands) {
    const o = document.createElement("option");
    o.value = b.id;
    o.textContent = b.name;
    brandSelect.appendChild(o);
  }
  brandSelect.disabled = false;
}

function populateRefrigs(){
  refrigSelect.innerHTML = `<option value="">${UI[LANG].chooseRefrig}</option>`;
  condSelect.innerHTML = `<option value="">${UI[LANG].chooseCond}</option>`;
  evapSelect.innerHTML = `<option value="">${UI[LANG].chooseEvap}</option>`;
  condSelect.disabled = true;
  evapSelect.disabled = true;
  disableStep5();

  if (!selBrand) { refrigSelect.disabled = true; return; }
  const set = new Set(candidatesByBrand().map(r => r.refrigerant));
  refrigSelect.disabled = false;
  for (const r of [...set].sort()) {
    const o = document.createElement("option");
    o.value = r;
    o.textContent = refrigDisplay(r);
    refrigSelect.appendChild(o);
  }
}

function populateConds(){
  condSelect.innerHTML = `<option value="">${UI[LANG].chooseCond}</option>`;
  evapSelect.innerHTML = `<option value="">${UI[LANG].chooseEvap}</option>`;
  evapSelect.disabled = true;
  disableStep5();

  if (!selRefrig) { condSelect.disabled = true; return; }
  const set = new Set(candidatesByRefrig().map(r => r.cond));
  condSelect.disabled = false;
  for (const c of [...set].sort((a, b) => b - a)) {
    const o = document.createElement("option");
    o.value = String(c);
    o.textContent = `${fmtNum(c)}°C`;
    condSelect.appendChild(o);
  }
}

function populateEvaps(){
  evapSelect.innerHTML = `<option value="">${UI[LANG].chooseEvap}</option>`;
  disableStep5();

  if (selCond === "") { evapSelect.disabled = true; return; }
  const set = new Set(candidatesByCond().map(r => r.evap));
  evapSelect.disabled = false;
  for (const e of [...set].sort((a, b) => a - b)) {
    const o = document.createElement("option");
    o.value = String(e);
    o.textContent = `${fmtNum(e)}°C`;
    evapSelect.appendChild(o);
  }
}

function disableStep5(){
  modelSelect.innerHTML = `<option value="">${UI[LANG].chooseModel2}</option>`;
  modelSelect.disabled = true;
  capacityInput.disabled = true;
  capacitySearchBtn.disabled = true;
  resultEl.hidden = true;
  rankedListEl.hidden = true;
  emptyState.hidden = false;
}

function enableStep5(){
  const candidates = candidatesByEvap();
  if (mode === "model") {
    modelSelect.innerHTML = `<option value="">${UI[LANG].chooseModel2}</option>`;
    modelSelect.disabled = candidates.length === 0;
    for (const rec of candidates) {
      const o = document.createElement("option");
      o.value = rec.key;
      o.textContent = modelOptionLabel(rec, candidates);
      modelSelect.appendChild(o);
    }
  } else {
    capacityInput.disabled = candidates.length === 0;
    capacitySearchBtn.disabled = candidates.length === 0;
  }
}

function modelOptionLabel(rec, candidatesPool){
  const modelField = getParam(rec.params, "MODEL");
  const modelLabel = (modelField && modelField.length > 2) ? modelField : `${rec.seriesId}-${rec.port}`;
  const showBrand = candidatesPool.some(r => r.brandId !== rec.brandId);
  const portSuffix = rec.port === "STD" ? "" : ` (${rec.port})`;
  return showBrand ? `${rec.brandName} · ${modelLabel}${portSuffix}` : `${modelLabel}${portSuffix}`;
}

// ===================== Event wiring: cascading filters =====================
brandSelect.addEventListener("change", () => {
  selBrand = brandSelect.value;
  resetDownstreamFrom("brand");
  populateRefrigs();
});
refrigSelect.addEventListener("change", () => {
  selRefrig = refrigSelect.value;
  resetDownstreamFrom("refrig");
  populateConds();
});
condSelect.addEventListener("change", () => {
  selCond = condSelect.value;
  resetDownstreamFrom("cond");
  populateEvaps();
});
evapSelect.addEventListener("change", () => {
  selEvap = evapSelect.value;
  resultEl.hidden = true;
  rankedListEl.hidden = true;
  emptyState.hidden = false;
  enableStep5();
});

modeModelBtn.addEventListener("click", () => setMode("model"));
modeCapBtn.addEventListener("click", () => setMode("capacity"));

function setMode(m){
  mode = m;
  modeModelBtn.classList.toggle("active", m === "model");
  modeCapBtn.classList.toggle("active", m === "capacity");
  modelPickField.hidden = m !== "model";
  capacityPickField.hidden = m !== "capacity";
  resultEl.hidden = true;
  rankedListEl.hidden = true;
  emptyState.hidden = false;
  if (selEvap !== "") enableStep5();
}

modelSelect.addEventListener("change", () => {
  if (!modelSelect.value) return;
  const rec = findFlat(modelSelect.value);
  if (rec) renderResult(rec);
});

capacitySearchBtn.addEventListener("click", () => {
  const target = parseFloat(capacityInput.value);
  rankedListEl.hidden = true;
  resultEl.hidden = true;
  if (isNaN(target)) {
    emptyState.hidden = false;
    emptyState.querySelector("p").textContent = UI[LANG].enterCapacity;
    return;
  }
  const candidates = candidatesByEvap();
  const withCap = candidates
    .map(rec => ({ rec, cap: getParam(rec.params, "CAPACITY", "[kW]") }))
    .filter(x => typeof x.cap === "number");
  if (withCap.length === 0) {
    emptyState.hidden = false;
    emptyState.querySelector("p").textContent = UI[LANG].noResults;
    return;
  }
  withCap.sort((a, b) => Math.abs(a.cap - target) - Math.abs(b.cap - target));
  renderRankedList(withCap.slice(0, 10), target);
});

// ===================== Rendering =====================
function renderRankedList(items, target){
  emptyState.hidden = true;
  rankedItemsEl.innerHTML = "";
  const showBrandCol = items.some(x => x.rec.brandId !== items[0].rec.brandId);
  items.forEach((x, i) => {
    const modelField = getParam(x.rec.params, "MODEL");
    const modelLabel = (modelField && modelField.length > 2) ? modelField : `${x.rec.seriesId}-${x.rec.port}`;
    const diff = x.cap - target;
    const diffStr = (diff >= 0 ? "+" : "") + fmtNum(Math.round(diff * 10) / 10);
    const row = document.createElement("div");
    row.className = "ranked-item";
    const portSuffix = x.rec.port === "STD" ? "" : ` (${x.rec.port})`;
    row.innerHTML = `
      <span class="ranked-rank">${i + 1}</span>
      <div class="ranked-main">
        <div class="ranked-model">${modelLabel}${portSuffix}</div>
        <div class="ranked-sub">${showBrandCol ? brandTagHTML(x.rec.brandId, x.rec.brandName) : ""}<span>${refrigDisplay(x.rec.refrigerant)}</span></div>
      </div>
      <div class="ranked-cap">
        <div class="ranked-cap-value">${fmtNum(x.cap)} kW</div>
        <div class="ranked-cap-diff">${diffStr} kW ${UI[LANG].diff}</div>
      </div>
      <button type="button" class="ui-btn ui-btn-sm ui-btn-icon ranked-item-add" aria-label="${UI[LANG].addToReport}" title="${UI[LANG].addToReport}">${uiIcon("plus")}</button>
    `;
    row.querySelector(".ranked-item-add").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(x.rec, 1);
      const b = e.currentTarget;
      b.innerHTML = uiIcon("circle-check");
      setTimeout(() => { b.innerHTML = uiIcon("plus"); }, 1400);
    });
    row.addEventListener("click", () => renderResult(x.rec));
    rankedItemsEl.appendChild(row);
  });
  rankedListEl.hidden = false;
}

function renderResult(rec){
  currentRenderedRec = rec;
  document.getElementById("addMsg").innerHTML = "";
  const entries = rec.params;
  const modelField = getParam(entries, "MODEL");
  const modelLabel = (modelField && modelField.length > 2) ? modelField : `${rec.seriesId}-${rec.port}`;

  document.getElementById("rBrand").innerHTML = brandTagHTML(rec.brandId, rec.brandName);
  document.getElementById("rModel").textContent = modelLabel;
  const rPortEl = document.getElementById("rPort");
  if (rec.port === "STD") {
    rPortEl.hidden = true;
  } else {
    rPortEl.hidden = false;
    rPortEl.textContent = `${UI[LANG].portLabel} ${rec.port}`;
  }

  const warnEl = document.getElementById("rWarn");
  if (rec.warn) {
    warnEl.hidden = false;
    warnEl.textContent = UI[LANG].warnMismatch(rec.evap, rec.evap_field);
  } else {
    warnEl.hidden = true;
  }

  document.getElementById("rCapKW").textContent = fmtNum(getParam(entries, "CAPACITY", "[kW]"));
  document.getElementById("rCapTR").textContent = fmtNum(getParam(entries, "CAPACITY", "[TR]"));
  const powerVal = getParam(entries, "ABSORBED POWER", "[kW]") ?? getParam(entries, "POWER INPUT", "[kW]");
  document.getElementById("rPower").textContent = fmtNum(powerVal);
  document.getElementById("rCOP").textContent = fmtNum(getParam(entries, "COP"));
  const cond = getParam(entries, "CONDENSING TEMP.");
  const evap = getParam(entries, "EVAPORATIVE TEMP.");
  document.getElementById("rCondEvap").textContent = `${fmtNum(cond)} / ${fmtNum(evap)}`;

  renderOilBox(rec);

  const groups = {};
  for (const [label, unit, value] of entries) {
    if (HERO_KEYS.has(label) || IDENTITY_KEYS.has(label)) continue;
    const cat = categorize(label);
    groups[cat] = groups[cat] || [];
    groups[cat].push([label, unit, value]);
  }

  const order = ["operating", "pressure", "flow", "oil", "performance", "other"];
  const sectionsEl = document.getElementById("sections");
  sectionsEl.innerHTML = "";
  for (const catKey of order) {
    if (!groups[catKey] || groups[catKey].length === 0) continue;
    const section = document.createElement("div");
    section.className = "ui-panel param-section";
    const head = document.createElement("button");
    head.type = "button";
    head.className = "param-section-head";
    head.innerHTML = `${uiIcon(CATEGORY_ICONS[catKey] || "list")}<span>${CATEGORY_NAMES[LANG][catKey]}</span><span class="ui-count-text" style="margin-left:6px">${groups[catKey].length}</span>${uiIcon("chevron-down", "chev")}`;
    head.addEventListener("click", () => section.classList.toggle("collapsed"));
    const body = document.createElement("div");
    body.className = "param-grid";
    for (const [label, unit, value] of groups[catKey]) {
      const cell = document.createElement("div");
      cell.className = "param";
      cell.innerHTML = `<span class="param-label">${translateLabel(label)}</span>
        <span class="param-value">${fmtNum(value)}<small>${unitDisplay(unit)}</small></span>`;
      body.appendChild(cell);
    }
    section.appendChild(head);
    section.appendChild(body);
    sectionsEl.appendChild(section);
  }

  rankedListEl.hidden = true;
  resultEl.hidden = false;
  emptyState.hidden = true;
}

// ===================== Language toggle =====================
function refreshAllText(){
  applyStaticText();
  if (!DATA) return;

  const keepBrand = selBrand, keepRefrig = selRefrig, keepCond = selCond, keepEvap = selEvap;
  const keepModel = modelSelect.value;

  populateBrands();
  brandSelect.value = keepBrand;
  if (keepBrand) {
    populateRefrigs();
    refrigSelect.value = keepRefrig;
    if (keepRefrig) {
      populateConds();
      condSelect.value = keepCond;
      if (keepCond !== "") {
        populateEvaps();
        evapSelect.value = keepEvap;
        if (keepEvap !== "") {
          enableStep5();
          if (mode === "model") modelSelect.value = keepModel;
        }
      }
    }
  }
  // re-render whatever was visible, in the new language
  renderOilView();
  if (!document.getElementById("reportView").hidden) {
    renderCart();
  }
  if (!resultEl.hidden) {
    const rec = mode === "model" ? findFlat(keepModel) : null;
    if (rec) renderResult(rec);
  }
}

document.getElementById("retryBtn").addEventListener("click", () => { loadData(); });

document.getElementById("langBtn").addEventListener("click", () => {
  LANG = LANG === "vi" ? "en" : "vi";
  localStorage.setItem("MYCOMselect:lang", LANG);
  refreshAllText();
  if (!document.getElementById("hbView").hidden) HB.render(LANG);
});

uiIconsMount();
applyStaticText();
document.getElementById("buildVersion").textContent = BUILD_VERSION;
loadData();

// ===================== Cart / Report system =====================
const CART_KEY = "MYCOMselect:cart";
const PROJECT_KEY = "MYCOMselect:projectInfo";
const COMMERCIAL_KEY = "MYCOMselect:commercialTerms";

let CART = [];

function loadCart(){
  try {
    const raw = localStorage.getItem(CART_KEY);
    CART = raw ? JSON.parse(raw) : [];
  } catch { CART = []; }
}
function saveCart(){
  try { localStorage.setItem(CART_KEY, JSON.stringify(CART)); } catch {}
}
function updateCartBadge(){
  const count = String(CART.reduce((sum, it) => sum + (parseInt(it.qty, 10) || 0), 0));
  ["cartBadge", "quoteCountMobile"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = count;
  });
  const ct = document.getElementById("cartCountText");
  if (ct) ct.textContent = CART.length ? String(CART.length) : "";
}

function currentBoundaryConditions(rec){
  return {
    brand: rec && rec.brandName ? rec.brandName : "",
    refrigerant: selRefrig ? refrigDisplay(selRefrig) : "",
    cond: selCond !== "" ? `${fmtNum(parseFloat(selCond))}°C` : "",
    evap: selEvap !== "" ? `${fmtNum(parseFloat(selEvap))}°C` : "",
    mode: mode,
    targetCapacity: mode === "capacity" && capacityInput.value ? `${capacityInput.value} kW` : "",
  };
}

function addToCart(rec, qty){
  const modelField = getParam(rec.params, "MODEL");
  const modelLabel = (modelField && modelField.length > 2) ? modelField : `${rec.seriesId}-${rec.port}`;
  const item = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    brandId: rec.brandId,
    brandName: rec.brandName,
    model: modelLabel,
    port: rec.port,
    qty: qty || 1,
    notes: "",
    params: rec.params,
    conditions: currentBoundaryConditions(rec),
  };
  CART.push(item);
  saveCart();
  updateCartBadge();
}

function removeCartItem(id){
  CART = CART.filter(it => it.id !== id);
  saveCart();
  updateCartBadge();
  renderCart();
}
function updateCartItemQty(id, qty){
  const it = CART.find(x => x.id === id);
  if (it) { it.qty = Math.max(1, parseInt(qty, 10) || 1); saveCart(); updateCartBadge(); }
}
function updateCartItemNotes(id, notes){
  const it = CART.find(x => x.id === id);
  if (it) { it.notes = notes; saveCart(); }
}
function clearCart(){
  if (CART.length === 0) return;
  if (!confirm(UI[LANG].confirmClearCart)) return;
  CART = [];
  saveCart();
  updateCartBadge();
  renderCart();
}

function conditionsSummaryHTML(cond){
  const parts = [];
  if (cond.brand) parts.push(`${UI[LANG].brandCond}: ${cond.brand}`);
  if (cond.refrigerant) parts.push(`${UI[LANG].refrigCond}: ${cond.refrigerant}`);
  if (cond.cond) parts.push(`${UI[LANG].condCond}: ${cond.cond}`);
  if (cond.evap) parts.push(`${UI[LANG].evapCond}: ${cond.evap}`);
  if (cond.targetCapacity) parts.push(`${UI[LANG].targetCapCond}: ${cond.targetCapacity}`);
  return parts.join(" · ");
}

function renderCart(){
  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyEl = document.getElementById("cartEmpty");
  cartItemsEl.innerHTML = "";
  updateCartBadge();
  ["exportPrintBtn", "exportWordBtn", "exportCsvBtn", "clearCartBtn"].forEach(id => {
    document.getElementById(id).disabled = CART.length === 0;
  });
  if (CART.length === 0) {
    cartEmptyEl.hidden = false;
    cartItemsEl.hidden = true;
    return;
  }
  cartEmptyEl.hidden = true;
  cartItemsEl.hidden = false;
  CART.forEach((it, idx) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-item-head">
        <span class="cart-item-no">${idx + 1}</span>
        <div class="cart-item-main">
          <div>${brandTagHTML(it.brandId, it.brandName)}</div>
          <div class="cart-item-title">${it.model}${it.port !== "STD" ? " (" + it.port + ")" : ""}</div>
          <div class="cart-item-conditions">${conditionsSummaryHTML(it.conditions)}</div>
        </div>
        <button type="button" class="ui-btn ui-btn-ghost ui-btn-sm ui-btn-icon cart-item-remove" aria-label="${UI[LANG].removeItem}" title="${UI[LANG].removeItem}">${uiIcon("trash-2")}</button>
      </div>
      <div class="cart-item-fields">
        <label class="ui-field"><span class="ui-label">${UI[LANG].qtyLabel}</span>
          <input type="number" inputmode="numeric" min="1" step="1" value="${it.qty}" class="ui-input cart-qty-input"></label>
        <label class="ui-field"><span class="ui-label">${UI[LANG].docNotes}</span>
          <textarea class="ui-textarea cart-item-notes" rows="2" placeholder="${UI[LANG].notesPlaceholder}">${(it.notes || "").replace(/</g, "&lt;")}</textarea></label>
      </div>
    `;
    div.querySelector(".cart-item-remove").addEventListener("click", () => removeCartItem(it.id));
    div.querySelector(".cart-qty-input").addEventListener("change", (e) => updateCartItemQty(it.id, e.target.value));
    div.querySelector(".cart-item-notes").addEventListener("input", (e) => updateCartItemNotes(it.id, e.target.value));
    cartItemsEl.appendChild(div);
  });
}

// ---- project info / commercial terms persistence ----
const PROJECT_FIELDS = ["pCompany","pProject","pPreparer","pPhone","pEmail","pLocation","pDeadline"];
const COMMERCIAL_FIELDS = ["cDelivery","cInstall","cWarranty"];

function loadInfoPanels(){
  try {
    const proj = JSON.parse(localStorage.getItem(PROJECT_KEY) || "{}");
    for (const f of PROJECT_FIELDS) if (proj[f] !== undefined) document.getElementById(f).value = proj[f];
  } catch {}
  try {
    const comm = JSON.parse(localStorage.getItem(COMMERCIAL_KEY) || "{}");
    for (const f of COMMERCIAL_FIELDS) if (comm[f] !== undefined) document.getElementById(f).value = comm[f];
  } catch {}
}
function saveProjectInfo(){
  const data = {};
  for (const f of PROJECT_FIELDS) data[f] = document.getElementById(f).value;
  localStorage.setItem(PROJECT_KEY, JSON.stringify(data));
}
function saveCommercialTerms(){
  const data = {};
  for (const f of COMMERCIAL_FIELDS) data[f] = document.getElementById(f).value;
  localStorage.setItem(COMMERCIAL_KEY, JSON.stringify(data));
}
function getProjectInfo(){
  const data = {};
  for (const f of PROJECT_FIELDS) data[f] = document.getElementById(f).value || "";
  return data;
}
function getCommercialTerms(){
  const data = {};
  for (const f of COMMERCIAL_FIELDS) data[f] = document.getElementById(f).value || "";
  return data;
}

for (const f of PROJECT_FIELDS) {
  document.getElementById(f).addEventListener("change", saveProjectInfo);
}
for (const f of COMMERCIAL_FIELDS) {
  document.getElementById(f).addEventListener("change", saveCommercialTerms);
}

// ---- view toggling ----
// Bốn màn hình: tra cứu / dầu nạp / sổ tay / báo cáo. Thanh dưới (điện thoại) và nút trên thanh đầu (PC) chuyển qua lại.
function showView(name){
  const views = { lookup: "lookupView", oil: "oilView", hb: "hbView", report: "reportView" };
  const navs = { lookup: "navHome", oil: "navOil", hb: "navHb", report: "navQuote" };
  for (const k of Object.keys(views)) {
    document.getElementById(views[k]).hidden = k !== name;
    const n = document.getElementById(navs[k]);
    if (k === name) n.setAttribute("aria-current", "page"); else n.removeAttribute("aria-current");
  }
  if (name === "report") renderCart();
  if (name === "oil") renderOilView();
  if (name === "hb") HB.render(LANG);
  window.scrollTo(0, 0);
}
document.getElementById("cartBtn").addEventListener("click", () => showView("report"));
document.getElementById("navQuote").addEventListener("click", () => showView("report"));
document.getElementById("oilBtn").addEventListener("click", () => showView("oil"));
document.getElementById("navOil").addEventListener("click", () => showView("oil"));
document.getElementById("navHome").addEventListener("click", () => showView("lookup"));
document.getElementById("homeBrand").addEventListener("click", () => showView("lookup"));
document.getElementById("backToLookupBtn").addEventListener("click", () => showView("lookup"));
document.getElementById("backFromOilBtn").addEventListener("click", () => showView("lookup"));
document.getElementById("hbBtn").addEventListener("click", () => showView("hb"));
document.getElementById("navHb").addEventListener("click", () => showView("hb"));
document.getElementById("backFromHbBtn").addEventListener("click", () => showView("lookup"));
HB.init({ prefix: "MYCOMselect:" });

// ===================== Dầu nạp (dữ liệu ở oil.js) =====================
const OIL_KEY = "MYCOMselect:oilCalc";
let OIL = { idx: 0, eco: false, qty: 1, margin: 10 };
try { OIL = Object.assign(OIL, JSON.parse(localStorage.getItem(OIL_KEY) || "{}")); } catch {}
if (!OIL_DB[OIL.idx]) OIL.idx = 0;
function saveOil(){ localStorage.setItem(OIL_KEY, JSON.stringify(OIL)); }

function oilValue(o, eco){ return eco ? o.withEco : o.noEco; }
function oilModelLabel(o){ return o.sel ? `${o.model} (${o.sel})` : o.model; }
function oilRound(v){ return Math.round(v * 10) / 10; }

// Ô "Dầu nạp" trong kết quả chọn máy: ghép series đang xem với bảng dầu.
function renderOilBox(rec){
  const box = document.getElementById("oilBox");
  const o = oilForSeries(rec.seriesId);
  const T = UI[LANG];
  const qty = Math.max(1, parseInt(document.getElementById("qtyInput").value, 10) || 1);
  const cell = (label, v) => `<div class="oil-box-cell"><span class="readout-label">${label}</span>
    <span class="readout-value readout-value-small">${v == null ? "—" : fmtNum(v)}<small>${v == null ? "" : T.litre}</small></span>
    ${v != null && qty > 1 ? `<span class="ui-tiny">${fmtNum(v * qty)} ${T.litre} ${T.oilBoxFor(qty)}</span>` : ""}</div>`;
  box.innerHTML = `<div class="oil-box-head">${uiIcon("droplets")}<span>${T.oilBoxTitle}</span>
      ${o ? `<span class="ui-tiny ui-mono">${o.model}</span>` : ""}
      <button type="button" class="ui-btn-link oil-box-link" id="oilBoxOpen">${T.oilBoxOpen}${uiIcon("arrow-right", "ui-icon-sm")}</button></div>
    ${o ? `<div class="oil-box-grid">${cell(T.oilNoEco, o.noEco)}${cell(T.oilWithEco, o.withEco)}</div>` : `<p class="ui-small">${T.oilBoxNone}</p>`}`;
  box.hidden = false;
  document.getElementById("oilBoxOpen").addEventListener("click", () => {
    if (o) {
      OIL.idx = OIL_DB.indexOf(o);
      OIL.qty = qty;
      if (oilValue(o, OIL.eco) == null) OIL.eco = !OIL.eco; // máy 2 cấp chỉ có cột "Có Eco"
      saveOil();
    }
    showView("oil");
  });
}

function renderOilView(){
  const T = UI[LANG];
  const sel = document.getElementById("oilModel");
  const groups = [];
  OIL_DB.forEach((o, i) => {
    let g = groups.find(x => x.name === o.group);
    if (!g) groups.push(g = { name: o.group, items: [] });
    g.items.push(`<option value="${i}"${i === OIL.idx ? " selected" : ""}>${oilModelLabel(o)}</option>`);
  });
  sel.innerHTML = groups.map(g => `<optgroup label="${g.name}">${g.items.join("")}</optgroup>`).join("");
  document.getElementById("oilNoEcoBtn").classList.toggle("active", !OIL.eco);
  document.getElementById("oilEcoBtn").classList.toggle("active", OIL.eco);
  const qEl = document.getElementById("oilQty"), mEl = document.getElementById("oilMargin");
  if (document.activeElement !== qEl) qEl.value = OIL.qty;
  if (document.activeElement !== mEl) mEl.value = OIL.margin;

  const o = OIL_DB[OIL.idx];
  const per = oilValue(o, OIL.eco);
  const out = document.getElementById("oilResult");
  if (per == null) {
    out.innerHTML = `<div class="ui-alert ui-alert-warn">${uiIcon("triangle-alert")}<div class="ui-alert-body">${T.oilNoData(o.model, OIL.eco ? T.oilWithEco : T.oilNoEco)}</div></div>`;
  } else {
    const total = oilRound(per * OIL.qty * (1 + OIL.margin / 100));
    out.innerHTML = `<div class="oil-readout">
        <div class="readout-cell"><span class="readout-label">${T.oilPerUnit}</span><span class="readout-value">${fmtNum(per)}<small>${T.litre}</small></span></div>
        <div class="readout-cell readout-cell-hero"><span class="readout-label">${uiIcon("droplets")}${T.oilTotal}</span><span class="readout-value" id="oilTotalValue">${fmtNum(total)}<small>${T.litre}</small></span></div>
      </div>
      <p class="ui-tiny ui-mono" style="margin-top:8px">${T.oilFormula(fmtNum(per), OIL.qty, fmtNum(OIL.margin))}</p>`;
  }

  document.getElementById("oilCount").textContent = String(OIL_DB.length);
  document.getElementById("oilTable").innerHTML = `<thead><tr><th>${T.oilModel}</th><th>${T.oilSelCode}</th><th>${T.oilGroup}</th>
      <th class="ui-num">${T.oilNoEco}</th><th class="ui-num">${T.oilWithEco}</th></tr></thead>
    <tbody>${OIL_DB.map((x, i) => `<tr class="ui-row-link${i === OIL.idx ? " ui-row-hit" : ""}" data-oil-idx="${i}">
      <td class="ui-mono">${x.model}</td><td class="ui-mono">${x.sel || "—"}</td><td>${x.group}</td>
      <td class="ui-num">${fmtNum(x.noEco)}</td><td class="ui-num">${fmtNum(x.withEco)}</td></tr>`).join("")}</tbody>`;
  document.querySelectorAll("#oilTable tr[data-oil-idx]").forEach(tr => tr.addEventListener("click", () => {
    OIL.idx = parseInt(tr.dataset.oilIdx, 10); saveOil(); renderOilView();
  }));
}

document.getElementById("oilModel").addEventListener("change", (e) => { OIL.idx = parseInt(e.target.value, 10) || 0; saveOil(); renderOilView(); });
document.getElementById("oilNoEcoBtn").addEventListener("click", () => { OIL.eco = false; saveOil(); renderOilView(); });
document.getElementById("oilEcoBtn").addEventListener("click", () => { OIL.eco = true; saveOil(); renderOilView(); });
document.getElementById("oilQty").addEventListener("input", (e) => { OIL.qty = Math.max(1, parseInt(e.target.value, 10) || 1); saveOil(); renderOilView(); });
document.getElementById("oilMargin").addEventListener("input", (e) => { OIL.margin = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)); saveOil(); renderOilView(); });
document.getElementById("qtyInput").addEventListener("input", () => { if (currentRenderedRec) renderOilBox(currentRenderedRec); });
// Mở thẳng màn hình Dầu nạp từ link ngoài (vd. Toolkits): index.html#dau-nap
if (location.hash === "#dau-nap") showView("oil");
if (location.hash === "#so-tay") showView("hb");
document.getElementById("clearCartBtn").addEventListener("click", clearCart);

document.getElementById("addToReportBtn").addEventListener("click", () => {
  if (!currentRenderedRec) return;
  const qty = Math.max(1, parseInt(document.getElementById("qtyInput").value, 10) || 1);
  addToCart(currentRenderedRec, qty);
  const msg = document.getElementById("addMsg");
  msg.innerHTML = `<div class="ui-alert ui-alert-ok">${uiIcon("circle-check")}<div class="ui-alert-body">${UI[LANG].added}
    <div><button type="button" class="ui-btn-link" id="goReportBtn">${UI[LANG].openReport}${uiIcon("arrow-right", "ui-icon-sm")}</button></div></div></div>`;
  document.getElementById("goReportBtn").addEventListener("click", () => showView("report"));
});

// ---------------------------------------------------------------------
// Chuẩn trình bày phiếu yêu cầu báo giá (dùng chung cho In/PDF, Word, CSV)
// Giống hệt quy cách ở ECselect / EEselect — theo chuẩn văn bản nhóm A của công ty
// (chữ đen, không dùng màu nhấn của app):
// - Font: Times New Roman (bản tiếng Việt) / Arial (bản tiếng Anh), một file một ngôn ngữ.
// - Cỡ chữ: tên văn bản 14 - mục cấp 1 12 - thân bài 11 - chữ trong bảng 10 -
//   ghi chú dưới bảng 10 nghiêng - chú thích bảng 10 - footer 9.
// - Giãn dòng 1,15; cách sau đoạn 6pt.
// - A4, lề trên 25 / dưới 20 / trái 30 / phải 15 mm; header 8 mm, footer 9 mm.
// - Bảng: viền 0,5pt, tiêu đề đậm nền D9D9D9, lặp tiêu đề khi sang trang,
//   STT căn giữa, số căn phải, dòng không ngắt qua trang.
// - Footer: trái = tên văn bản, phải = "Trang x/y".
// - Ngày dd/mm/yyyy; số: VI 1.250,5 / EN 1,250.5.
// - Tên file: [TenNgan]_[YYYYMMDD], không dấu, không hậu tố Rev.
// ---------------------------------------------------------------------
const DOC_PAGE = { top: "25mm", bottom: "20mm", left: "30mm", right: "15mm", header: "8mm", footer: "9mm" };

function pad2(n){ return String(n).padStart(2, "0"); }
function fmtDate(d){ return `${pad2(d.getDate())}/${pad2(d.getMonth() + 1)}/${d.getFullYear()}`; }
function fmtIsoDate(s){
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || ""));
  return m ? `${m[3]}/${m[2]}/${m[1]}` : (s || "");
}
function reportFileName(ext){
  const d = new Date();
  const base = LANG === "vi" ? "YeuCauBaoGia_MayNen" : "RFQ_Compressor";
  return `${base}_${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}.${ext}`;
}
function docFont(){ return LANG === "vi" ? "'Times New Roman', Times, serif" : "Arial, Helvetica, sans-serif"; }
function docNum(v){
  if (v === null || v === undefined || v === "") return "—";
  if (typeof v === "number") return v.toLocaleString(LANG === "vi" ? "vi-VN" : "en-US", { maximumFractionDigits: 3 });
  return String(v);
}
function docEsc(s){ return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

// ---- tập hợp mọi nhãn thông số có trong giỏ (cho CSV) ----
function allParamLabelsInCart(){
  const seen = new Set();
  const order = [];
  for (const it of CART) {
    for (const [label] of it.params) {
      if (!seen.has(label)) { seen.add(label); order.push(label); }
    }
  }
  return order;
}
function paramValueDisplay(it, label){
  for (const [l, u, v] of it.params) {
    if (l === label) return `${docNum(v)}${unitDisplay(u) ? " " + unitDisplay(u) : ""}`;
  }
  return "";
}
// Các dòng thông số của một thiết bị (bỏ MODEL vì đã có cột Model)
function docParamLines(it){
  return it.params
    .filter(([l]) => l !== "MODEL")
    .map(([l, u, v]) => `${translateLabel(l)}: ${docNum(v)}${unitDisplay(u) ? " " + unitDisplay(u) : ""}`);
}

// ---- CSV export ----
function csvEscape(s){
  s = String(s == null ? "" : s);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
function exportCSV(){
  if (CART.length === 0) return;
  const t = UI[LANG];
  const proj = getProjectInfo();
  const comm = getCommercialTerms();
  const installText = comm.cInstall === "yes" ? t.optYes : (comm.cInstall === "no" ? t.optNo : "");
  const lines = [];
  lines.push(csvEscape(t.docTitle));
  lines.push(csvEscape(`${t.reportDate}: ${fmtDate(new Date())}`));
  [[t.companyName, proj.pCompany], [t.projectName, proj.pProject], [t.preparerName, proj.pPreparer],
   [t.preparerPhone, proj.pPhone], [t.preparerEmail, proj.pEmail], [t.installLocation, proj.pLocation],
   [t.quoteDeadline, fmtIsoDate(proj.pDeadline)], [t.deliveryTerms, comm.cDelivery],
   [t.installIncluded, installText], [t.warrantyReq, comm.cWarranty]]
    .filter(p => p[1]).forEach(p => lines.push(csvEscape(`${p[0]}: ${p[1]}`)));
  lines.push("");
  const labels = allParamLabelsInCart();
  const header = [t.docNo, t.docBrand, t.docModel, t.conditionsLabel, t.qtyLabel, t.docNotes, ...labels.map(translateLabel)];
  lines.push(header.map(csvEscape).join(","));
  CART.forEach((it, i) => {
    const row = [i + 1, it.brandName, it.model + (it.port !== "STD" ? " (" + it.port + ")" : ""), conditionsSummaryHTML(it.conditions), it.qty, it.notes || ""];
    for (const label of labels) row.push(paramValueDisplay(it, label));
    lines.push(row.map(csvEscape).join(","));
  });
  lines.push("");
  lines.push(csvEscape(`${t.docNoteLabel}: ${t.docDisclaimer}`));
  downloadBlob(new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" }), reportFileName("csv"));
}

// ---- nội dung phiếu (dùng chung cho In/PDF và Word) ----
function docStyle(){
  return `
    body { font-family: ${docFont()}; font-size: 11pt; color: #000; line-height: 1.15; }
    p { margin: 0 0 6pt; }
    table.doc-header-row { width: 100%; border-collapse: collapse; margin-bottom: 6pt; }
    table.doc-header-row td { border: none; padding: 0; vertical-align: top; }
    .letterhead-company { font-size: 12pt; font-weight: bold; text-transform: uppercase; }
    .doc-date { font-size: 11pt; font-style: italic; white-space: nowrap; text-align: right; }
    h1.doc-title { font-size: 14pt; font-weight: bold; text-align: center; text-transform: uppercase; margin: 12pt 0 12pt; }
    h2.doc-h1 { font-size: 12pt; font-weight: bold; text-transform: uppercase; margin: 12pt 0 6pt; }
    table.info-columns { width: 100%; border-collapse: collapse; margin-bottom: 6pt; }
    table.info-columns td { border: none; padding: 0; vertical-align: top; }
    table.info-columns table { border-collapse: collapse; }
    table.info-columns table td { padding: 1pt 8pt 1pt 0; font-size: 11pt; }
    .doc-caption { font-size: 10pt; margin: 6pt 0 3pt; }
    table.equip-table { border-collapse: collapse; width: 100%; table-layout: fixed; }
    table.equip-table thead { display: table-header-group; }
    table.equip-table tr { page-break-inside: avoid; break-inside: avoid; }
    table.equip-table th, table.equip-table td { border: 0.5pt solid #000; padding: 3pt 4pt; font-size: 10pt; line-height: 1.15; text-align: left; vertical-align: top; word-wrap: break-word; }
    table.equip-table th { background: #D9D9D9; font-weight: bold; text-align: center; vertical-align: middle; }
    table.equip-table td.c { text-align: center; }
    table.equip-table td.r { text-align: right; }
    .doc-note-under { font-size: 10pt; font-style: italic; margin-top: 3pt; }
    table.signature-block { width: 100%; margin-top: 18pt; border-collapse: collapse; page-break-inside: avoid; }
    table.signature-block td { border: none; text-align: center; font-size: 11pt; vertical-align: top; }
    .signature-role { font-weight: bold; text-transform: uppercase; }
    .signature-hint { font-style: italic; font-size: 10pt; }
    .signature-space { height: 54pt; }
  `;
}

function buildDocumentBodyHTML(){
  const t = UI[LANG];
  const proj = getProjectInfo();
  const comm = getCommercialTerms();
  const installText = comm.cInstall === "yes" ? t.optYes : (comm.cInstall === "no" ? t.optNo : "");
  const d = new Date();

  const pairRows = (pairs) => pairs.filter(p => p[1]).map(p =>
    `<tr><td><strong>${docEsc(p[0])}:</strong></td><td>${docEsc(p[1])}</td></tr>`).join("");
  const leftRows = pairRows([
    [t.companyName, proj.pCompany], [t.projectName, proj.pProject],
    [t.installLocation, proj.pLocation], [t.quoteDeadline, fmtIsoDate(proj.pDeadline)],
  ]);
  const rightRows = pairRows([
    [t.preparerName, proj.pPreparer], [t.preparerPhone, proj.pPhone], [t.preparerEmail, proj.pEmail],
    [t.deliveryTerms, comm.cDelivery], [t.installIncluded, installText], [t.warrantyReq, comm.cWarranty],
  ]);

  const rows = CART.map((it, i) => {
    const cond = conditionsSummaryHTML(it.conditions);
    const spec = (cond ? `<i>${docEsc(t.conditionsLabel)}:</i> ${docEsc(cond)}<br>` : "") + docParamLines(it).map(docEsc).join("<br>");
    return `<tr>
      <td class="c">${i + 1}</td>
      <td>${docEsc(it.brandName)}</td>
      <td>${docEsc(it.model)}${it.port !== "STD" ? " (" + docEsc(it.port) + ")" : ""}</td>
      <td>${spec}</td>
      <td class="r">${docNum(parseInt(it.qty, 10) || it.qty)}</td>
      <td>${docEsc(it.notes || "").replace(/\n/g, "<br>")}</td>
    </tr>`;
  }).join("");

  let sec = 0;
  const h1 = (text) => `<h2 class="doc-h1">${++sec}. ${docEsc(text)}</h2>`;
  return `
    <table class="doc-header-row"><tr>
      <td class="letterhead-company">${docEsc(proj.pCompany) || "&nbsp;"}</td>
      <td class="doc-date">${LANG === "vi" ? `Ngày ${pad2(d.getDate())} tháng ${pad2(d.getMonth() + 1)} năm ${d.getFullYear()}` : `Date: ${fmtDate(d)}`}</td>
    </tr></table>
    <h1 class="doc-title">${t.docTitle}</h1>
    ${(leftRows || rightRows) ? `
    ${h1(t.projectInfoTitle)}
    <table class="info-columns"><tr>
      <td style="width:50%"><table>${leftRows}</table></td>
      <td style="width:50%"><table>${rightRows}</table></td>
    </tr></table>` : ""}
    ${h1(t.cartTitle)}
    <p class="doc-caption">${t.docCaption}</p>
    <table class="equip-table">
      <colgroup>
        <col style="width:7%"><col style="width:12%"><col style="width:14%">
        <col style="width:38%"><col style="width:7%"><col style="width:22%">
      </colgroup>
      <thead><tr><th>${t.docNo}</th><th>${t.docBrand}</th><th>${t.docModel}</th><th>${t.docSpec}</th><th>${t.docQty}</th><th>${t.docNotes}</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="doc-note-under"><strong>${t.docNoteLabel}:</strong> ${t.docDisclaimer}</p>
    <table class="signature-block"><tr>
      <td style="width:50%"></td>
      <td style="width:50%">
        <div class="signature-role">${t.docSignature}</div>
        <div class="signature-hint">${t.docSignHint}</div>
        <div class="signature-space"></div>
        <div><strong>${docEsc(proj.pPreparer)}</strong></div>
      </td>
    </tr></table>`;
}

// ---- In / PDF: cửa sổ xem trước có thanh công cụ (không in ra) ----
function exportPrint(){
  if (CART.length === 0) return;
  const t = UI[LANG];
  const p = DOC_PAGE;
  const win = window.open("", "_blank");
  if (!win) { alert(t.printPopupBlocked); return; }
  win.document.write(`<!DOCTYPE html><html lang="${LANG}"><head><meta charset="UTF-8">
    <title>${reportFileName("pdf").replace(/\.pdf$/, "")}</title>
    <style>
      @page {
        size: A4;
        margin: ${p.top} ${p.right} ${p.bottom} ${p.left};
        @bottom-left { content: "${t.docFooter}"; font-family: ${docFont()}; font-size: 9pt; }
        @bottom-right { content: "${t.docPage} " counter(page) "/" counter(pages); font-family: ${docFont()}; font-size: 9pt; }
      }
      html { background: #e9eaec; }
      body { margin: 0; padding: 0 0 24px; }
      .doc-toolbar { position: sticky; top: 0; z-index: 10; display: flex; gap: 8px; justify-content: flex-end; background: #f6f6f6; border-bottom: 1px solid #ccc; padding: 10px 16px; }
      .doc-toolbar button { font-family: Arial, sans-serif; font-size: 13px; padding: 8px 14px; min-height: 36px; border-radius: 6px; border: 1px solid #999; background: #fff; color: #000; cursor: pointer; }
      .doc-toolbar button.primary { background: #222; color: #fff; border-color: #222; }
      .doc-body { background: #fff; box-sizing: border-box; width: 210mm; max-width: 100%; min-height: 297mm; margin: 16px auto; padding: ${p.top} ${p.right} ${p.bottom} ${p.left}; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
      @media (max-width: 210mm) { .doc-body { padding: 16px; min-height: 0; margin: 0; } }
      @media print {
        html { background: #fff; }
        .doc-toolbar { display: none; }
        .doc-body { width: auto; min-height: 0; margin: 0; padding: 0; box-shadow: none; }
      }
      ${docStyle()}
    </style></head><body>
    <div class="doc-toolbar">
      <button class="primary" onclick="window.print()">${t.printAgain}</button>
      <button onclick="window.close()">${t.closeWindow}</button>
    </div>
    <div class="doc-body">${buildDocumentBodyHTML()}</div>
    <script>window.onload = () => window.print();<\/script>
  </body></html>`);
  win.document.close();
}

// ---- Word export (.doc HTML kèm namespace mso, không cần thư viện ngoài) ----
function exportWord(){
  if (CART.length === 0) return;
  const t = UI[LANG];
  const p = DOC_PAGE;
  const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8">
<title>${t.docTitle}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml><![endif]-->
<style>
  @page WordSection1 {
    size: 21cm 29.7cm;
    margin: ${p.top} ${p.right} ${p.bottom} ${p.left};
    mso-header-margin: ${p.header}; mso-footer-margin: ${p.footer};
    mso-footer: f1;
    mso-page-orientation: portrait;
  }
  div.WordSection1 { page: WordSection1; }
  p.MsoFooter { font-family: ${docFont()}; font-size: 9pt; margin: 0; tab-stops: right 165mm; }
  table#hdrftr { margin: 0 0 0 9in; }
  ${docStyle()}
</style>
</head><body><div class="WordSection1">${buildDocumentBodyHTML()}</div>
<table id="hdrftr" border="0" cellspacing="0" cellpadding="0"><tr><td>
  <div style="mso-element:footer" id="f1">
    <p class="MsoFooter">${t.docFooter}<span style="mso-tab-count:1"></span>${t.docPage} <span style="mso-field-code:' PAGE '">1</span>/<span style="mso-field-code:' NUMPAGES '">1</span></p>
  </div>
</td></tr></table>
</body></html>`;
  downloadBlob(new Blob(["﻿", html], { type: "application/msword" }), reportFileName("doc"));
}

document.getElementById("exportCsvBtn").addEventListener("click", exportCSV);
document.getElementById("dataExportBtn").addEventListener("click", dataExport);
document.getElementById("dataImportBtn").addEventListener("click", dataImport);
document.getElementById("exportPrintBtn").addEventListener("click", exportPrint);
document.getElementById("exportWordBtn").addEventListener("click", exportWord);

loadCart();
updateCartBadge();
loadInfoPanels();

// ===== Service worker registration =====
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {});
  });
}

// ===== Install prompt =====
let deferredPrompt = null;
const installBtn = document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});
window.addEventListener("appinstalled", () => { installBtn.hidden = true; });

// ---------------------------------------------------------------------
// Xuất/Nhập dữ liệu (data-io.js): một phiếu dự án = danh sách thiết bị + thông tin dự án.
// Xử lý hoàn toàn trên trình duyệt, không gửi dữ liệu đi đâu.
// ---------------------------------------------------------------------
const DATA_IO = Object.assign({ app: "MYCOMselect", schemaVersion: 1 }, DataIO.singleProjectAdapter({
  listKey: CART_KEY,
  objKeys: { projectInfo: PROJECT_KEY, commercialTerms: COMMERCIAL_KEY },
  itemId: it => String(it.id)
}));
function dataExport() { DataIO.exportData(DATA_IO); }
function dataImport() { DataIO.importData(DATA_IO); }
