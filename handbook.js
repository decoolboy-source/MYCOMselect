/* handbook.js — Engine tab "Sổ tay" (dùng chung được giữa các app chọn thiết bị).
   Cần có trước: icons.js (uiIcon), handbook-data.js (HB_GROUPS, HB_CARDS, HB_MAINT; tuỳ chọn HB_THR, HB_COC).
   App gọi:  HB.init({ prefix: "MYCOMselect:" })  một lần,  HB.render(lang)  mỗi khi mở tab / đổi ngôn ngữ.
   Trang cần các phần tử: #hbSearch, #hbFilters, #hbCards, #hbCount. */
const HB = (() => {
  const STR = {
    vi: { all: "Tất cả", src: "Nguồn", none: "Không có mục nào khớp.", hours: "Số giờ chạy hiện tại (h)", type: "Loại máy",
          task: "Công việc", last: "Mốc vừa qua", next: "Mốc kế tiếp", left: "Còn lại", due: "Đến hạn", soon: "Sắp đến",
          once: "Đã qua (không lặp)", reset: "Bỏ đánh dấu", done: (a, b) => `Đã xong ${a}/${b}`, cards: (n) => `${n} mục`,
          maintNote: "Chu kỳ theo tháng quy đổi 1 năm ≈ 8000 giờ như bảng định kỳ của tài liệu. Mốc 'sắp đến' = còn ≤ 10 % chu kỳ hoặc ≤ 200 h.",
          thrFrom: "Lấy số từ giỏ chọn", thrManual: "— Nhập tay —", thrAll: (n) => `Cộng cả giỏ (${n} máy tầm cao)`,
          thrQ: "Năng suất lạnh Q₀ (kW)", thrP: "Công suất trục máy nén (kW)", thrOil: "Nhiệt giải nhiệt dầu (kW)",
          thrOilMode: "Cách giải nhiệt dầu", thrIn: "Thermosiphon / phun dịch / nước dàn ngưng", thrOut: "Nước nguồn riêng",
          thrTc: "Nhiệt độ ngưng tụ (°C)", thrWb: "Nhiệt độ bầu ướt (°C)",
          thrTotal: "Nhiệt thải ra dàn ngưng", thrFactor: "Hệ số hiệu chỉnh", thrBase: "Năng suất danh định cần chọn",
          thrRange: (a, b, c, d) => `Ngoài bảng hệ số: nhiệt độ ngưng ${a}–${b} °C, bầu ướt ${c}–${d} °C (ô trống trong bảng = dàn không đạt điều kiện này).`,
          thrBooster: "Máy booster (ngưng ở ~2 °C) xả vào bình trung gian; nhiệt của nó do máy tầm cao mang ra dàn ngưng, nên không cộng vào đây.",
          cocEvap: "Lượng nước bay hơi (m³/h)", cocFromThr: (kw, v) => `Ước tính từ nhiệt thải ${kw} kW ở thẻ trên ≈ ${v} m³/h (≈ 1,5 L/h cho mỗi kW). Nên lấy số chính xác trong datasheet của dàn.`,
          cocParam: "Chỉ tiêu", cocMake: "Nước cấp", cocLimit: "Giới hạn", cocCoc: "Số lần cô đặc",
          cocMin: "Số chu kỳ cô đặc cho phép", cocBleed: "Lượng xả đáy", cocMakeup: "Nước bổ sung",
          cocBad: "Nước cấp đã vượt giới hạn ở chỉ tiêu được tô đậm (số lần cô đặc ≤ 1): phải xử lý nước cấp trước, xả đáy không cứu được.",
          cocNone: "Nhập ít nhất một chỉ tiêu của nước cấp.",
          cocNote: "Xả đáy = bay hơi / (số chu kỳ − 1); nước bổ sung = bay hơi + xả đáy (đã gồm phần nước bị gió cuốn). Ô để trống thì bỏ qua chỉ tiêu đó. Kết quả phân tích thay đổi theo mùa — làm lại khi có kết quả mới.",
          thrNote: "So năng suất danh định này với cột Base heat rejection (kW) của catalogue BAC VXC. Hãng khác có bảng hệ số riêng — tra lại theo catalogue hãng trước khi chốt." },
    en: { all: "All", src: "Source", none: "No matching items.", hours: "Current run hours (h)", type: "Machine type",
          task: "Task", last: "Last milestone", next: "Next milestone", left: "Remaining", due: "Due", soon: "Soon",
          once: "Passed (one-off)", reset: "Clear ticks", done: (a, b) => `Done ${a}/${b}`, cards: (n) => `${n} items`,
          maintNote: "Month-based intervals use 1 year ≈ 8000 h as in the source periodic table. 'Soon' = ≤ 10 % of the interval or ≤ 200 h left.",
          thrFrom: "Take values from the cart", thrManual: "— Manual entry —", thrAll: (n) => `Sum the cart (${n} high-stage units)`,
          thrQ: "Refrigeration capacity Q₀ (kW)", thrP: "Compressor shaft power (kW)", thrOil: "Oil cooling load (kW)",
          thrOilMode: "Oil cooling method", thrIn: "Thermosiphon / liquid injection / condenser water", thrOut: "Separate water source",
          thrTc: "Condensing temperature (°C)", thrWb: "Wet bulb temperature (°C)",
          thrTotal: "Heat rejected to condenser", thrFactor: "Correction factor", thrBase: "Base capacity to select",
          thrRange: (a, b, c, d) => `Outside the factor table: condensing ${a}–${b} °C, wet bulb ${c}–${d} °C (blank cells = condition not reachable).`,
          thrBooster: "Booster units (condensing at ~2 °C) discharge to the intercooler; their heat reaches the condenser through the high stage, so it is not added here.",
          cocEvap: "Evaporation rate (m³/h)", cocFromThr: (kw, v) => `Estimated from the ${kw} kW heat rejection in the card above ≈ ${v} m³/h (≈ 1.5 L/h per kW). Prefer the exact value from the unit datasheet.`,
          cocParam: "Parameter", cocMake: "Make-up", cocLimit: "Limit", cocCoc: "Concentration ratio",
          cocMin: "Allowed cycles of concentration", cocBleed: "Bleed-off", cocMakeup: "Make-up water",
          cocBad: "Make-up water already exceeds the limit for the highlighted parameter (ratio ≤ 1): treat the make-up water first; bleed cannot fix it.",
          cocNone: "Enter at least one make-up water parameter.",
          cocNote: "Bleed = evaporation / (cycles − 1); make-up = evaporation + bleed (drift included). Blank fields are skipped. Analyses vary by season — redo with each new result.",
          thrNote: "Compare this base capacity with the Base heat rejection (kW) column of the BAC VXC catalogue. Other makers use their own factor tables — check the maker's catalogue before finalising." },
  };
  let prefix = "app:";
  let lang = "vi";
  let group = "";
  let query = "";
  const open = new Set();
  let maint = { type: "screw", hours: 0 };
  let ticks = {};
  let thr = { q: 1000, p: 300, oil: 0, oilOut: false, tc: 35, wb: 27, pick: "" };
  let coc = { evap: "", vals: {} };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const tx = (x) => x == null ? "" : Array.isArray(x) ? (lang === "vi" ? x[0] : x[1]) : String(x);
  const fold = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  const fmt = (n) => Math.round(n).toLocaleString(lang === "vi" ? "vi-VN" : "en-US");

  function load(key, def){ try { return Object.assign(def, JSON.parse(localStorage.getItem(prefix + key) || "{}")); } catch { return def; } }
  function save(key, v){ try { localStorage.setItem(prefix + key, JSON.stringify(v)); } catch {} }

  // Toàn bộ chữ của một thẻ (cả 2 ngôn ngữ) để tìm kiếm không dấu.
  function cardText(c){
    const parts = [];
    const walk = (v) => { if (v == null) return; if (Array.isArray(v)) v.forEach(walk); else if (typeof v === "object") Object.values(v).forEach(walk); else parts.push(String(v)); };
    walk([c.title, c.blocks, HB_GROUPS[c.group]]);
    if (c.blocks.some(b => b.type === "maint")) walk(HB_MAINT);
    return fold(parts.join(" "));
  }

  function renderTable(b){
    const head = `<thead><tr>${b.head.map((h, i) => `<th${i > 0 && b.num ? ' class="ui-num"' : ""}>${esc(tx(h))}</th>`).join("")}</tr></thead>`;
    const body = `<tbody>${b.rows.map(r => `<tr>${r.map((c, i) => `<td${i === 0 ? ' class="hb-td-first"' : ""}>${esc(tx(c))}</td>`).join("")}</tr>`).join("")}</tbody>`;
    return `<div class="ui-table-wrap"><table class="ui-table hb-table">${head}${body}</table></div>${b.note ? `<p class="ui-tiny hb-note">${esc(tx(b.note))}</p>` : ""}`;
  }

  function renderAstm(b){
    const cols = ["#fdf7c3","#fde25e","#fbbf3a","#f99b2a","#f07a22","#e2581c","#c83a17","#a81f14","#8c0a0c","#6e0709","#560608","#420506","#300405","#220304","#170203","#0d0102"];
    return `<div class="hb-astm">${cols.map((c, i) => { const v = (i + 1) * 0.5;
      return `<div class="hb-astm-cell${b.marks.includes(v) ? " hb-astm-mark" : ""}"><span style="background:${c}"></span><small>${v.toFixed(1)}</small></div>`; }).join("")}</div>`;
  }

  // Mốc của một việc: các mốc lần đầu + bội số của chu kỳ.
  function milestones(t, upTo){
    const set = new Set(t.at);
    if (t.every) for (let h = t.every; h <= upTo + t.every; h += t.every) set.add(h);
    return [...set].sort((a, b) => a - b);
  }
  function renderMaintRows(){
    const S = STR[lang];
    const cfg = HB_MAINT[maint.type];
    const H = maint.hours;
    return cfg.tasks.map(t => {
      const ms = milestones(t, H);
      // Mốc trùng đúng giờ hiện tại được tính là "kế tiếp" (còn 0 h, đến hạn).
      const last = ms.filter(m => m < H).pop();
      const next = ms.find(m => m >= H && m > 0);
      const interval = t.every || (next != null ? next - (last || 0) : 0);
      let status = "", cls = "";
      if (next == null) { status = S.once; }
      else {
        const left = next - H;
        if (left === 0) { status = S.due; cls = "hb-due"; }
        else if (left <= Math.max(200, interval * 0.1)) { status = S.soon; cls = "hb-soon"; }
      }
      return `<tr class="${cls}"><td class="hb-td-first">${esc(tx(t.name))}${tx(t.note) ? `<div class="ui-tiny">${esc(tx(t.note))}</div>` : ""}</td>
        <td class="ui-num hb-col-last">${last != null ? fmt(last) + " h" : "—"}</td>
        <td class="ui-num">${next != null ? fmt(next) + " h" : "—"}</td>
        <td class="ui-num">${next != null ? fmt(next - H) + " h" : "—"}${status ? `<div class="hb-status">${esc(status)}</div>` : ""}</td></tr>`;
    }).join("");
  }
  function renderMaint(){
    const S = STR[lang];
    const types = Object.keys(HB_MAINT).map(k => `<button type="button" class="mode-btn${maint.type === k ? " active" : ""}" data-hb-mtype="${k}">${esc(tx(HB_MAINT[k].label))}</button>`).join("");
    return `<div class="hb-maint">
      <div class="ui-form-grid">
        <div class="ui-field"><span class="ui-label">${esc(S.type)}</span><div class="mode-toggle" role="group">${types}</div></div>
        <label class="ui-field"><span class="ui-label">${esc(S.hours)}</span>
          <input type="number" class="ui-input" id="hbHours" inputmode="numeric" min="0" step="1" value="${maint.hours}"></label>
      </div>
      <div class="ui-table-wrap"><table class="ui-table hb-table"><thead><tr><th>${esc(S.task)}</th><th class="ui-num hb-col-last">${esc(S.last)}</th><th class="ui-num">${esc(S.next)}</th><th class="ui-num">${esc(S.left)}</th></tr></thead>
        <tbody id="hbMaintBody">${renderMaintRows()}</tbody></table></div>
      <p class="ui-tiny hb-note">${esc(S.maintNote)}</p></div>`;
  }

  // ---------- Máy tính nhiệt thải ra dàn ngưng (bảng hệ số HB_THR) ----------
  const num = (v) => { const x = parseFloat(String(v).replace(",", ".")); return isFinite(x) ? x : 0; };
  const fmt2 = (n) => n.toLocaleString(lang === "vi" ? "vi-VN" : "en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function cartItems(){
    try { const v = JSON.parse(localStorage.getItem(prefix + "cart") || "[]"); return Array.isArray(v) ? v : []; } catch { return []; }
  }
  function par(params, label, unit){ for (const [l, u, v] of params || []) if (l === label && (unit === undefined || u === unit)) return v; return null; }
  // Một dòng trong giỏ → tải nhân với số lượng. Booster: nhiệt độ ngưng < 20 °C (xả vào bình trung gian).
  function itemLoad(it){
    const k = Math.max(1, parseInt(it.qty, 10) || 1);
    const tc = num(par(it.params, "CONDENSING TEMP.", "[degC]"));
    return { q: num(par(it.params, "CAPACITY", "[kW]")) * k, p: num(par(it.params, "ABSORBED POWER", "[kW]")) * k,
             oil: num(par(it.params, "OIL HEAT REJECTION", "[kW]")) * k, tc, booster: tc < 20 };
  }
  // Nội suy song tuyến; null nếu ra ngoài bảng hoặc chạm ô trống.
  function thrFactor(tc, wb){
    const T = HB_THR.tc, W = HB_THR.wb, F = HB_THR.factors;
    if (tc < T[0] || tc > T[T.length - 1] || wb < W[0] || wb > W[W.length - 1]) return null;
    const seg = (arr, x) => { let i = 0; while (i < arr.length - 2 && x > arr[i + 1]) i++; return [i, (x - arr[i]) / (arr[i + 1] - arr[i])]; };
    const [i, a] = seg(T, tc), [j, b] = seg(W, wb);
    const pts = [[F[i][j], (1 - a) * (1 - b)], [F[i][j + 1], (1 - a) * b], [F[i + 1][j], a * (1 - b)], [F[i + 1][j + 1], a * b]];
    let v = 0;
    for (const [f, w] of pts) { if (w < 1e-9) continue; if (f == null) return null; v += f * w; }
    return v;
  }
  function renderThrOut(){
    const S = STR[lang];
    const total = Math.max(0, thr.q + thr.p - (thr.oilOut ? thr.oil : 0));
    const f = thrFactor(thr.tc, thr.wb);
    const T = HB_THR.tc, W = HB_THR.wb;
    const stat = (label, val, icon) => `<div class="ui-stat"><span class="ui-stat-label">${uiIcon(icon)}${esc(label)}</span><span class="ui-stat-value">${val}</span></div>`;
    return `<div class="ui-stats hb-thr-stats">
        ${stat(S.thrTotal, `${fmt(total)} <small>kW</small>`, "zap")}
        ${stat(S.thrFactor, f == null ? "—" : fmt2(f), "thermometer")}
        ${stat(S.thrBase, f == null ? "—" : `${fmt(total * f)} <small>kW</small>`, "wind")}
      </div>
      ${f == null ? `<div class="ui-alert ui-alert-warn">${uiIcon("triangle-alert")}<div class="ui-alert-body">${esc(S.thrRange(T[0], T[T.length - 1], W[0], W[W.length - 1]))}</div></div>` : ""}`;
  }
  function renderThr(){
    const S = STR[lang];
    if (typeof HB_THR === "undefined") return "";
    const items = cartItems();
    const hs = items.filter(it => !itemLoad(it).booster);
    const hasBooster = items.some(it => itemLoad(it).booster);
    const pick = items.length ? `<label class="ui-field hb-thr-pick"><span class="ui-label">${esc(S.thrFrom)}</span>
        <select class="ui-select" id="hbThrPick"><option value="">${esc(S.thrManual)}</option>
        ${hs.length > 1 ? `<option value="all"${thr.pick === "all" ? " selected" : ""}>${esc(S.thrAll(hs.length))}</option>` : ""}
        ${items.map(it => `<option value="${esc(it.id)}"${thr.pick === it.id ? " selected" : ""}>${esc(`${it.qty > 1 ? it.qty + " × " : ""}${it.model}${itemLoad(it).booster ? " (booster)" : ""}`)}</option>`).join("")}
        </select></label>` : "";
    const inp = (key, label, step) => `<label class="ui-field"><span class="ui-label">${esc(label)}</span>
        <input type="number" class="ui-input" data-hb-thr="${key}" inputmode="decimal" step="${step}" value="${thr[key]}"></label>`;
    return `<div class="hb-thr">
      ${pick}
      <div class="ui-form-grid">
        ${inp("q", S.thrQ, "any")}${inp("p", S.thrP, "any")}${inp("oil", S.thrOil, "any")}
        <div class="ui-field"><span class="ui-label">${esc(S.thrOilMode)}</span><div class="mode-toggle" role="group">
          <button type="button" class="mode-btn${thr.oilOut ? "" : " active"}" data-hb-oil="in">${esc(S.thrIn)}</button>
          <button type="button" class="mode-btn${thr.oilOut ? " active" : ""}" data-hb-oil="out">${esc(S.thrOut)}</button></div></div>
        ${inp("tc", S.thrTc, "0.5")}${inp("wb", S.thrWb, "0.5")}
      </div>
      ${hasBooster ? `<div class="ui-alert ui-alert-info">${uiIcon("info")}<div class="ui-alert-body">${esc(S.thrBooster)}</div></div>` : ""}
      <div id="hbThrOut">${renderThrOut()}</div>
      <p class="ui-tiny hb-note">${esc(S.thrNote)}</p></div>`;
  }
  function applyPick(id){
    thr.pick = id;
    const items = cartItems();
    const list = id === "all" ? items.filter(it => !itemLoad(it).booster) : items.filter(it => it.id === id);
    if (list.length) {
      const L = list.map(itemLoad);
      const sum = (k) => Math.round(L.reduce((a, x) => a + x[k], 0) * 10) / 10;
      thr.q = sum("q"); thr.p = sum("p"); thr.oil = sum("oil");
      const tc = L.find(x => !x.booster && x.tc);
      if (tc) thr.tc = tc.tc;
    }
    save("hbThr", thr);
  }

  // ---------- Máy tính chu kỳ cô đặc nước dàn ngưng (dữ liệu HB_COC) ----------
  const thrTotal = () => Math.max(0, thr.q + thr.p - (thr.oilOut ? thr.oil : 0));
  const evapAuto = () => Math.round(thrTotal() * HB_COC.m3hPerKw * 100) / 100;
  const fmtN = (n, d) => n.toLocaleString(lang === "vi" ? "vi-VN" : "en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  function renderCocOut(){
    const S = STR[lang];
    const E = coc.evap === "" ? evapAuto() : num(coc.evap);
    const rows = HB_COC.params.map(pr => {
      const raw = coc.vals[pr.k];
      const v = raw === "" || raw == null ? null : num(raw);
      return { pr, v, r: v && v > 0 ? pr.limit / v : null };
    });
    const used = rows.filter(x => x.r != null);
    if (!used.length) return `<p class="ui-tiny hb-note">${esc(S.cocNone)}</p>`;
    const min = Math.min(...used.map(x => x.r));
    const table = `<div class="ui-table-wrap"><table class="ui-table hb-table"><thead><tr><th>${esc(S.cocParam)}</th><th class="ui-num">${esc(S.cocMake)}</th><th class="ui-num">${esc(S.cocLimit)}</th><th class="ui-num">${esc(S.cocCoc)}</th></tr></thead><tbody>
      ${used.map(x => `<tr class="${x.r === min ? "hb-due" : ""}"><td class="hb-td-first">${esc(tx(x.pr.name))} <span class="ui-tiny">${esc(x.pr.unit)}</span></td>
        <td class="ui-num">${fmtN(x.v, 1)}</td><td class="ui-num">${fmtN(x.pr.limit, 0)}</td><td class="ui-num">${fmtN(x.r, 1)}</td></tr>`).join("")}</tbody></table></div>`;
    if (min <= 1) return `${table}<div class="ui-alert ui-alert-warn">${uiIcon("triangle-alert")}<div class="ui-alert-body">${esc(S.cocBad)}</div></div>`;
    const bleed = E / (min - 1);
    const stat = (label, val, icon) => `<div class="ui-stat"><span class="ui-stat-label">${uiIcon(icon)}${esc(label)}</span><span class="ui-stat-value">${val}</span></div>`;
    return `${table}<div class="ui-stats hb-thr-stats">
        ${stat(S.cocMin, fmtN(min, 1), "layers")}
        ${stat(S.cocBleed, `${fmtN(bleed, 2)} <small>m³/h</small>`, "droplets")}
        ${stat(S.cocMakeup, `${fmtN(E + bleed, 2)} <small>m³/h</small>`, "waves")}
      </div>`;
  }
  function renderCoc(){
    const S = STR[lang];
    if (typeof HB_COC === "undefined") return "";
    const field = (k, label, val, ph) => `<label class="ui-field"><span class="ui-label">${esc(label)}</span>
        <input type="number" class="ui-input" data-hb-coc="${k}" inputmode="decimal" step="any" min="0" value="${esc(val)}"${ph != null ? ` placeholder="${esc(ph)}"` : ""}></label>`;
    return `<div class="hb-thr">
      <div class="ui-form-grid">
        ${field("evap", S.cocEvap, coc.evap, fmtN(evapAuto(), 2))}
        ${HB_COC.params.map(pr => field(pr.k, `${tx(pr.name)} (${pr.unit})`, coc.vals[pr.k] == null ? "" : coc.vals[pr.k])).join("")}
      </div>
      <p class="ui-tiny hb-note" id="hbCocAuto"${coc.evap === "" ? "" : " hidden"}>${esc(S.cocFromThr(fmt(thrTotal()), fmtN(evapAuto(), 2)))}</p>
      <div id="hbCocOut" class="hb-thr">${renderCocOut()}</div>
      <p class="ui-tiny hb-note">${esc(S.cocNote)}</p></div>`;
  }

  function renderChecklist(b){
    const S = STR[lang];
    const st = ticks[b.id] || {};
    let total = 0, done = 0;
    const groups = b.groups.map((g, gi) => `<div class="hb-check-group"><div class="hb-check-title">${esc(tx(g.title))}</div>${g.items.map((it, ii) => {
      const key = `${gi}.${ii}`; total++; if (st[key]) done++;
      return `<label class="hb-check"><input type="checkbox" data-hb-check="${b.id}" data-key="${key}"${st[key] ? " checked" : ""}><span>${esc(tx(it))}</span></label>`;
    }).join("")}</div>`).join("");
    return `<div class="hb-checklist"><div class="hb-check-bar"><span class="ui-chip ui-chip-accent" id="hbDone-${b.id}">${esc(S.done(done, total))}</span>
      <button type="button" class="ui-btn ui-btn-sm" data-hb-reset="${b.id}">${uiIcon("trash-2")}<span>${esc(S.reset)}</span></button></div>${groups}</div>`;
  }

  function renderBlock(b){
    switch (b.type) {
      case "p": return `<p class="hb-p">${esc(tx(b.text))}</p>`;
      case "list": return `<ul class="ui-list hb-list">${b.items.map(i => `<li>${esc(tx(i))}</li>`).join("")}</ul>`;
      case "table": return renderTable(b);
      case "alert": return `<div class="ui-alert ui-alert-${b.tone === "warn" ? "warn" : "info"}">${uiIcon(b.tone === "warn" ? "triangle-alert" : "info")}<div class="ui-alert-body">${esc(tx(b.text))}</div></div>`;
      case "astm": return renderAstm(b);
      case "maint": return renderMaint();
      case "checklist": return renderChecklist(b);
      case "thr": return renderThr();
      case "coc": return renderCoc();
      default: return "";
    }
  }

  function render(newLang){
    if (newLang) lang = newLang;
    const S = STR[lang];
    const search = document.getElementById("hbSearch");
    if (document.activeElement !== search) search.value = query;

    const chips = [["", S.all], ...Object.keys(HB_GROUPS).map(k => [k, tx(HB_GROUPS[k])])];
    document.getElementById("hbFilters").innerHTML = chips.map(([k, l]) =>
      `<button type="button" class="hb-filter${group === k ? " active" : ""}" data-hb-group="${k}">${esc(l)}</button>`).join("");

    const q = fold(query.trim());
    const list = HB_CARDS.filter(c => (!group || c.group === group) && (!q || q.split(/\s+/).every(w => cardText(c).includes(w))));
    document.getElementById("hbCount").textContent = S.cards(list.length);
    const box = document.getElementById("hbCards");
    if (!list.length) { box.innerHTML = `<div class="ui-panel ui-empty"><p>${esc(S.none)}</p></div>`; return; }
    box.innerHTML = list.map(c => `<details class="ui-panel hb-card" data-hb-card="${c.id}"${open.has(c.id) || q ? " open" : ""}>
      <summary class="hb-sum">${uiIcon(c.icon)}<span class="hb-sum-title">${esc(tx(c.title))}</span>
        <span class="ui-chip">${esc(tx(HB_GROUPS[c.group]))}</span>${uiIcon("chevron-down", "hb-chev")}</summary>
      <div class="hb-body">${c.blocks.map(renderBlock).join("")}
        <p class="ui-tiny hb-src">${uiIcon("book-open", "ui-icon-sm")}${esc(S.src)}: ${esc(c.src)}</p></div></details>`).join("");
  }

  // Cập nhật phần kết quả nước (khi đổi số ở thẻ nhiệt thải hoặc ở chính thẻ nước) mà không vẽ lại ô nhập.
  function refreshCoc(){
    const out = document.getElementById("hbCocOut");
    if (!out) return;
    out.innerHTML = renderCocOut();
    const S = STR[lang];
    const ev = document.querySelector('[data-hb-coc="evap"]');
    if (ev) ev.placeholder = fmtN(evapAuto(), 2);
    const note = document.getElementById("hbCocAuto");
    if (note) { note.hidden = coc.evap !== ""; note.textContent = S.cocFromThr(fmt(thrTotal()), fmtN(evapAuto(), 2)); }
  }

  function init(opts){
    prefix = (opts && opts.prefix) || prefix;
    maint = load("hbMaint", maint);
    if (!HB_MAINT[maint.type]) maint.type = Object.keys(HB_MAINT)[0];
    ticks = load("hbChecks", {});
    thr = load("hbThr", thr);
    coc = load("hbCoc", coc);
    if (!coc.vals || typeof coc.vals !== "object") coc.vals = {};
    if (typeof HB_COC !== "undefined" && !Object.keys(coc.vals).length) HB_COC.params.forEach(pr => { if (pr.example != null) coc.vals[pr.k] = String(pr.example); });

    document.getElementById("hbSearch").addEventListener("input", (e) => { query = e.target.value; render(); });
    const root = document.getElementById("hbView");
    root.addEventListener("click", (e) => {
      const g = e.target.closest("[data-hb-group]");
      if (g) { group = g.dataset.hbGroup; render(); return; }
      const mt = e.target.closest("[data-hb-mtype]");
      if (mt) { maint.type = mt.dataset.hbMtype; save("hbMaint", maint); render(); return; }
      const oc = e.target.closest("[data-hb-oil]");
      if (oc) { thr.oilOut = oc.dataset.hbOil === "out"; save("hbThr", thr); render(); return; }
      const rs = e.target.closest("[data-hb-reset]");
      if (rs) { delete ticks[rs.dataset.hbReset]; save("hbChecks", ticks); render(); }
    });
    root.addEventListener("toggle", (e) => {
      const d = e.target.closest && e.target.closest("[data-hb-card]");
      if (d && e.target === d) { if (d.open) open.add(d.dataset.hbCard); else open.delete(d.dataset.hbCard); }
    }, true);
    root.addEventListener("input", (e) => {
      if (e.target.id === "hbHours") {
        maint.hours = Math.max(0, parseInt(e.target.value, 10) || 0); save("hbMaint", maint);
        document.getElementById("hbMaintBody").innerHTML = renderMaintRows();
      }
      const tk = e.target.dataset && e.target.dataset.hbThr;
      if (tk) {
        thr[tk] = num(e.target.value); thr.pick = ""; save("hbThr", thr);
        const pk = document.getElementById("hbThrPick"); if (pk) pk.value = "";
        document.getElementById("hbThrOut").innerHTML = renderThrOut();
        refreshCoc();
      }
      const ck = e.target.dataset && e.target.dataset.hbCoc;
      if (ck) {
        if (ck === "evap") coc.evap = e.target.value.trim(); else coc.vals[ck] = e.target.value.trim();
        save("hbCoc", coc);
        refreshCoc();
      }
    });
    root.addEventListener("change", (e) => {
      if (e.target.id === "hbThrPick") { applyPick(e.target.value); render(); return; }
      const cb = e.target.closest("[data-hb-check]");
      if (!cb) return;
      const id = cb.dataset.hbCheck;
      ticks[id] = ticks[id] || {};
      if (cb.checked) ticks[id][cb.dataset.key] = 1; else delete ticks[id][cb.dataset.key];
      save("hbChecks", ticks);
      const all = root.querySelectorAll(`[data-hb-check="${id}"]`);
      const n = [...all].filter(x => x.checked).length;
      document.getElementById(`hbDone-${id}`).textContent = STR[lang].done(n, all.length);
    });
  }

  return { init, render };
})();
