/* ============================================================
   ТЕТРАДКА ИЗ «КАРТЫ ПОЛЯКА» (кросс-проектная фича)
   Показывает в тренажёре вопросы, которые отмечены «в тетрадке» в проекте
   polski-trener (тот же Supabase). Только чтение: тренажёр НЕ пишет в данные
   Карты поляка. Список тетрадки читает sync.js после входа и кладёт сюда.

   Контент вопросов — из data/karta_cards.js (window.KARTA_CARDS), плюс «свои»
   карточки из облака. Опирается на: $, show, Store, speak, renderHome.
   ============================================================ */
window.Karta = (function () {
  var $ = function (id) { return document.getElementById(id); };
  var BANK = window.KARTA_CARDS || {};
  var CAT = {
    ogolne:   ["Общее", "🇵🇱"], historia: ["История", "🏛"], geografia: ["География", "🗺"],
    tradycje: ["Традиции", "🥟"], ludzie: ["Люди", "👤"], wspolczesna: ["Современность", "🏙"],
    osobiste: ["О себе", "🙋"], personal: ["О себе", "🙋"]
  };

  function store() {
    if (!Store.progress.kartaNotebook) Store.progress.kartaNotebook = { marks: [], custom: {}, syncedAt: 0 };
    return Store.progress.kartaNotebook;
  }
  // sync.js вызывает это после чтения облака Карты поляка
  function setData(d) {
    var s = store();
    if (Array.isArray(d.marks)) s.marks = d.marks;
    if (d.custom) { s.custom = {}; (d.custom || []).forEach(function (c) { if (c && c.id) s.custom[c.id] = c; }); }
    s.syncedAt = Date.now();
    Store.save();
    updateHome();
  }
  function resolve(id) {
    var c = BANK[id];
    if (c) return c;
    var cu = store().custom[id];
    if (cu) return { c: cu.category, qru: cu.q_ru, qpl: cu.q_pl || "", apl: cu.a_pl, aru: cu.a_ru, tr: cu.translit || "", mn: cu.mnemonic || "", why: cu.why || "", p: 0 };
    return null;
  }
  // вопросы тетрадки (свежие сверху), только те, что можем показать
  function items() {
    var s = store();
    return (s.marks || []).slice()
      .sort(function (a, b) { return (b.date || 0) - (a.date || 0); })
      .map(function (m) { return { id: m.id, date: m.date, card: resolve(m.id) }; })
      .filter(function (x) { return x.card; });
  }
  function count() { return items().length; }

  function updateHome() {
    var el = $("kartaHomeStat"); if (!el) return;
    var n = count();
    el.textContent = n ? (n + " в тетрадке") : "нет данных";
  }

  function catChip(catId) {
    var c = CAT[catId] || ["", "•"];
    return "<span class='tag' style='margin:0'>" + c[1] + " " + c[0] + "</span>";
  }
  function esc(s) { return (s + "").replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  /* --- экран: список тетрадки --- */
  function render() {
    var s = store();
    var list = items();
    var head =
      "<div class='card'><div class='row'><b style='font-size:18px'>📓 Тетрадка из Карты поляка</b>" +
      "<button class='btn-ghost smallbtn' id='kartaBack'>← Назад</button></div>" +
      "<div class='muted' style='font-size:13px;margin:6px 0'>Вопросы, которые ты отметил «в тетрадку» в проекте «Карта поляка». " +
      "Здесь их можно повторять. Данные только читаются, менять их можно в самой Карте поляка.</div>" +
      (s.syncedAt ? "<div class='note'>Синхронизировано с Картой поляка. Вопросов: <b>" + list.length + "</b></div>"
                  : "<div class='note'>Пока не подтянуто из облака. Войди в аккаунт (карточка «☁️ Синхронизация» на главной) и открой этот экран снова.</div>") +
      (list.length ? "<div class='toolbar'><button class='btn-primary' id='kartaReview'>▶ Повторять подряд</button></div>" : "") +
      "</div>";
    var body = "";
    list.forEach(function (x, i) {
      body +=
        "<div class='card' style='cursor:pointer' data-k='" + i + "'>" +
        "<div style='display:flex;justify-content:space-between;gap:8px;align-items:flex-start'>" +
        "<b style='font-size:15px'>" + esc(x.card.qru) + "</b>" + catChip(x.card.c) + "</div>" +
        "<div class='karta-a' style='display:none;margin-top:10px'>" + answerHTML(x.card) + "</div>" +
        "</div>";
    });
    $("kartaCard").innerHTML = head + (list.length ? body : "");
    $("kartaBack").onclick = function () { show("sobesHome"); if (window.__sobesRefresh) __sobesRefresh(); else { show("home"); renderHome(); } };
    if ($("kartaReview")) $("kartaReview").onclick = function () { startReview(list); };
    // раскрытие ответа по тапу
    document.querySelectorAll("#kartaCard [data-k]").forEach(function (el) {
      el.onclick = function () {
        var a = el.querySelector(".karta-a");
        if (!a) return;
        var open = a.style.display !== "none";
        a.style.display = open ? "none" : "block";
        if (!open) { var c = list[+el.dataset.k].card; speak(c.apl); }
      };
    });
  }

  function answerHTML(c) {
    return "<div class='term' style='font-size:19px;line-height:1.4'>" + esc(c.apl) + "</div>" +
      (c.tr ? "<div class='hint'>[" + esc(c.tr) + "]</div>" : "") +
      "<button class='speak' onclick=\"(window.speak||function(){})('" + c.apl.replace(/'/g, "\\'").replace(/"/g, "&quot;") + "')\">🔊 Послушать</button>" +
      "<div class='ex' style='margin-top:8px'>" + esc(c.aru) + "</div>" +
      (c.mn ? "<div class='note'>🧠 " + esc(c.mn) + "</div>" : "") +
      (c.why ? "<div class='note'>💡 " + esc(c.why) + "</div>" : "");
  }

  /* --- режим «повторять подряд» (флеш-карты) --- */
  var Q = [], qi = 0;
  function startReview(list) { Q = list.slice(); qi = 0; show("kartaPlay"); step(); }
  function step() {
    if (qi >= Q.length) return finish();
    $("kartaBar").style.width = Math.round(qi / Q.length * 100) + "%";
    var c = Q[qi].card;
    $("kartaPlayCard").innerHTML =
      "<div class='stephead'><span class='muted'>Тетрадка · " + (qi + 1) + "/" + Q.length + "</span>" +
      "<button class='exitbtn' id='kExit'>✕ выйти</button></div>" +
      catChip(c.c) +
      "<div class='prompt' style='margin-top:8px'>Вопрос</div>" +
      "<div class='term' style='font-size:20px'>" + esc(c.qru) + "</div>" +
      (c.qpl ? "<div class='hint'>" + esc(c.qpl) + "</div>" : "") +
      "<div id='kReveal'><button class='btn-primary' id='kShow' style='margin-top:16px'>Показать ответ</button></div>";
    $("kExit").onclick = function () { show("karta"); render(); };
    $("kShow").onclick = function () {
      speak(c.apl);
      $("kReveal").innerHTML = answerHTML(c) +
        "<button class='btn-primary' id='kNext' style='margin-top:16px'>" + (qi + 1 >= Q.length ? "Завершить" : "Дальше →") + "</button>";
      $("kNext").onclick = function () { qi++; step(); };
    };
  }
  function finish() {
    $("kartaBar").style.width = "100%";
    $("kartaPlayCard").innerHTML =
      "<div class='center'><div style='font-size:44px'>📓</div>" +
      "<div class='step-title' style='text-align:center'>Тетрадка пройдена</div>" +
      "<div class='muted'>Повторено вопросов: <b>" + Q.length + "</b></div></div>" +
      "<div class='toolbar'><button class='btn-primary' id='kDone'>К списку</button></div>";
    $("kDone").onclick = function () { show("karta"); render(); };
  }

  function open() { render(); show("karta"); }

  var b = $("openKartaBtn"); if (b) b.onclick = open;
  updateHome();
  return { setData: setData, open: open, refresh: updateHome, count: count };
})();
