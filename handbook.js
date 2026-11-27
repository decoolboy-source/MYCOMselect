/* handbook.js — Engine tab "Sổ tay" (dùng chung được giữa các app chọn thiết bị).
   Cần có trước: icons.js (uiIcon), handbook-data.js (HB_GROUPS, HB_CARDS, HB_MAINT).
   App gọi:  HB.init({ prefix: "MYCOMselect:" })  một lần,  HB.render(lang)  mỗi khi mở tab / đổi ngôn ngữ.
   Trang cần các phần tử: #hbSearch, #hbFilters, #hbCards, #hbCount. */
const HB = (() => {
  const STR = {
    vi: { all: "Tất cả", src: "Nguồn", none: "Không có mục nào khớp.", hours: "Số giờ chạy hiện tại (h)", type: "Loại máy",
          task: "Công việc", last: "Mốc vừa qua", next: "Mốc kế tiếp", left: "Còn lại", due: "Đến hạn", soon: "Sắp đến",
          once: "Đã qua (không lặp)", reset: "Bỏ đánh dấu", done: (a, b) => `Đã xong ${a}/${b}`, cards: (n) => `${n} mục`,
          maintNote: "Chu kỳ theo tháng quy đổi 1 năm ≈ 8000 giờ như bảng định kỳ của tài liệu. Mốc 'sắp đến' = còn ≤ 10 % chu kỳ hoặc ≤ 200 h." },
    en: { all: "All", src: "Source", none: "No matching items.", hours: "Current run hours (h)", type: "Machine type",
          task: "Task", last: "Last milestone", next: "Next milestone", left: "Remaining", due: "Due", soon: "Soon",
          once: "Passed (one-off)", reset: "Clear ticks", done: (a, b) => `Done ${a}/${b}`, cards: (n) => `${n} items`,
          maintNote: "Month-based intervals use 1 year ≈ 8000 h as in the source periodic table. 'Soon' = ≤ 10 % of the interval or ≤ 200 h left." },
  };
  let prefix = "app:";
  let lang = "vi";
  let group = "";
  let query = "";
  const open = new Set();
  let maint = { type: "screw", hours: 0 };
  let ticks = {};

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

  function init(opts){
    prefix = (opts && opts.prefix) || prefix;
    maint = load("hbMaint", maint);
    if (!HB_MAINT[maint.type]) maint.type = Object.keys(HB_MAINT)[0];
    ticks = load("hbChecks", {});

    document.getElementById("hbSearch").addEventListener("input", (e) => { query = e.target.value; render(); });
    const root = document.getElementById("hbView");
    root.addEventListener("click", (e) => {
      const g = e.target.closest("[data-hb-group]");
      if (g) { group = g.dataset.hbGroup; render(); return; }
      const mt = e.target.closest("[data-hb-mtype]");
      if (mt) { maint.type = mt.dataset.hbMtype; save("hbMaint", maint); render(); return; }
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
    });
    root.addEventListener("change", (e) => {
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
