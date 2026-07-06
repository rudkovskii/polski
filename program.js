/* ============================================================
   ПРОГРАММА МЕСЯЦА (Фаза 2, §5) + интерактивный мини-диалог (§4.9)
   Экран «Программа месяца»: 4 недели × 7 дней с планом (≈30 мин/день),
   уроки Пн/Ср/Пт, отметки выполнения. Плюс роль-плей мини-диалог.

   Опирается на глобали: $, show, Store, LESSONS, startLessonById,
   showPractice, DAYS, speak, renderHome.
   ============================================================ */
(function () {
  const $ = (id) => document.getElementById(id);

  /* --- данные программы (правь тут, если нужно поменять план) --- */
  const PROGRAM = [
    { week: 1, theme: "Алфавит, приветствия, о себе",
      grammar: "правила чтения; być (jestem/jesteś/jest); pan/pani; числа 0–10",
      dialogDay: 1,
      days: [
        { d: "Пн", task: "Урок 1 (алфавит и чтение) + SRS-разминка + 1 режим практики", lesson: "w1l1" },
        { d: "Вт", task: "SRS-сессия + конструктор фразы + перевод RU→PL" },
        { d: "Ср", task: "Урок 2 (pan/pani) + SRS + 1 режим практики", lesson: "w1l2" },
        { d: "Чт", task: "SRS + аудирование + пары" },
        { d: "Пт", task: "Урок 3 (być, о себе) + SRS + говорение", lesson: "w1l3" },
        { d: "Сб", task: "Аудирование и говорение по фразам недели + мини-диалог", dialog: true },
        { d: "Вс", task: "Ревизия недели: смешанный перевод + пары + мини-экзамен", review: true }
      ] },
    { week: 2, theme: "Быт и деньги: где живёшь, кафе",
      grammar: "спряжение -m/-sz; числа 11–100; заказ и оплата",
      dialogDay: 2,
      days: [
        { d: "Пн", task: "Урок 1 (глаголы -m/-sz) + SRS + 1 режим практики", lesson: "w2l1" },
        { d: "Вт", task: "SRS + конструктор фразы + перевод RU→PL" },
        { d: "Ср", task: "Урок 2 (числа и цены) + SRS + пары", lesson: "w2l2" },
        { d: "Чт", task: "SRS + аудирование чисел + перевод PL→RU" },
        { d: "Пт", task: "Урок 3 (кафе) + SRS + говорение", lesson: "w2l3" },
        { d: "Сб", task: "Мини-диалог «в кафе» + говорение по фразам", dialog: true },
        { d: "Вс", task: "Ревизия недели: смешанный перевод + пары + мини-экзамен", review: true }
      ] },
    { week: 3, theme: "Вещи и покупки",
      grammar: "род и ten/ta/to; винительный как чанк (poproszę kawę); магазин",
      dialogDay: 3,
      days: [
        { d: "Пн", task: "Урок 1 (род, ten/ta/to) + SRS + 1 режим практики", lesson: "w3l1" },
        { d: "Вт", task: "SRS + пропуск (cloze) + перевод RU→PL" },
        { d: "Ср", task: "Урок 2 (poproszę + biernik) + SRS + конструктор", lesson: "w3l2" },
        { d: "Чт", task: "SRS + аудирование + пары" },
        { d: "Пт", task: "Урок 3 (магазин/рынок) + SRS + говорение", lesson: "w3l3" },
        { d: "Сб", task: "Мини-диалог «в магазине» + говорение", dialog: true },
        { d: "Вс", task: "Ревизия недели: смешанный перевод + пары + мини-экзамен", review: true }
      ] },
    { week: 4, theme: "Действия, город, время",
      grammar: "mogę/chcę/muszę + инфинитив; направления; Która godzina?",
      dialogDay: 5,
      days: [
        { d: "Пн", task: "Урок 1 (mogę/chcę/muszę) + SRS + 1 режим практики", lesson: "w4l1" },
        { d: "Вт", task: "SRS + конструктор фразы + перевод RU→PL" },
        { d: "Ср", task: "Урок 2 (город, направления) + SRS + пары", lesson: "w4l2" },
        { d: "Чт", task: "SRS + аудирование + пропуск (cloze)" },
        { d: "Пт", task: "Урок 3 (время, встреча) + SRS + говорение", lesson: "w4l3" },
        { d: "Сб", task: "Мини-диалог «спросить дорогу» + говорение", dialog: true },
        { d: "Вс", task: "Итог месяца: смешанный перевод + пары + мини-экзамен", review: true }
      ] }
  ];
  const TOTAL_DAYS = PROGRAM.reduce((n, w) => n + w.days.length, 0);

  /* --- хранение отметок --- */
  function prog() {
    if (!Store.progress.program) Store.progress.program = { done: {} };
    if (!Store.progress.program.done) Store.progress.program.done = {};
    return Store.progress.program;
  }
  const keyOf = (w, i) => "w" + w + "-" + i;
  function doneCount() { const d = prog().done; return Object.keys(d).filter(k => d[k]).length; }

  function updateHomeStat() { const el = $("progHomeStat"); if (el) el.textContent = doneCount() + "/" + TOTAL_DAYS; }

  /* --- рендер экрана программы --- */
  function renderProgram() {
    const done = prog().done;
    const n = doneCount();
    $("progBar").style.width = Math.round(n / TOTAL_DAYS * 100) + "%";
    $("progStat").textContent = "Выполнено дней: " + n + " из " + TOTAL_DAYS;
    const root = $("programList"); root.innerHTML = "";
    PROGRAM.forEach(w => {
      const doneN = w.days.filter((_, i) => done[keyOf(w.week, i)]).length;
      const card = document.createElement("div"); card.className = "card";
      let html = "<div class='pweek-h'><b style='font-size:16px'>Неделя " + w.week + " · " + w.theme + "</b>" +
        "<span class='muted'>" + doneN + "/" + w.days.length + "</span></div>" +
        "<div class='muted' style='font-size:12.5px;margin:4px 0 8px'>Грамматика: " + w.grammar + "</div>";
      card.innerHTML = html;
      w.days.forEach((day, i) => {
        const k = keyOf(w.week, i), isDone = !!done[k];
        const row = document.createElement("div"); row.className = "pday" + (isDone ? " done" : "");
        row.innerHTML =
          "<button class='pcheck" + (isDone ? " on" : "") + "' title='Отметить выполнено'>" + (isDone ? "✓" : "") + "</button>" +
          "<div style='flex:1'><span class='pdname'>" + day.d + "</span> " +
          "<span class='pdtask'>" + day.task + "</span><div class='pdact'></div></div>";
        const act = row.querySelector(".pdact");
        if (day.lesson) {
          const les = LESSONS.find(l => l.id === day.lesson);
          const b = document.createElement("button"); b.className = "minibtn go";
          b.textContent = "▶ Урок" + (les ? "" : " (скоро)"); b.disabled = !les;
          b.onclick = () => { if (les) startLessonById(day.lesson); };
          act.appendChild(b);
        }
        if (day.dialog) {
          const b = document.createElement("button"); b.className = "minibtn go";
          b.textContent = "💬 Мини-диалог"; b.onclick = () => playDialog(w.dialogDay);
          act.appendChild(b);
        }
        if (!day.lesson) {
          const b = document.createElement("button"); b.className = "minibtn";
          b.textContent = "🎯 Практика"; b.onclick = () => showPractice();
          act.appendChild(b);
        }
        row.querySelector(".pcheck").onclick = () => {
          done[k] = !done[k]; Store.save(); renderProgram(); updateHomeStat();
        };
        card.appendChild(row);
      });
      root.appendChild(card);
    });
  }

  function showProgram() { renderProgram(); show("program"); }
  window.showProgram = showProgram;

  /* ============================================================
     ИНТЕРАКТИВНЫЙ МИНИ-ДИАЛОГ (§4.9)
     Идём по репликам дня: собеседник (роль A) — озвучивается сразу;
     твоя реплика (роль B) — сначала вспомни по русской подсказке, потом раскрой.
     ============================================================ */
  let D = null, di = 0, dDay = 1, revealed = [];
  function playDialog(dayNum) {
    const list = (typeof DAYS !== "undefined") ? DAYS : [];
    const day = list.find(x => x.d === dayNum) || list[0];
    if (!day) return;
    D = day; di = 0; dDay = dayNum; revealed = [];
    show("dialog"); renderDialog();
  }
  function renderDialog() {
    const lines = D.dialog || [];
    $("dlgBar").style.width = Math.round(di / lines.length * 100) + "%";
    const c = $("dlgCard");
    if (di >= lines.length) {
      c.innerHTML =
        "<div class='stephead'><span class='muted'>Мини-диалог · День " + D.d + "</span></div>" +
        "<div class='center'><div style='font-size:40px'>🎬</div>" +
        "<div class='step-title' style='text-align:center'>Диалог пройден</div></div>" +
        "<div class='mission' style='margin-top:8px'><b>🎯 Миссия дня:</b> " + D.mission + "</div>" +
        "<div class='toolbar'><button class='btn-ghost' id='dlgReplay'>↺ Ещё раз</button>" +
        "<button class='btn-primary' id='dlgDone'>Готово</button></div>";
      $("dlgReplay").onclick = () => { di = 0; revealed = []; renderDialog(); };
      $("dlgDone").onclick = () => showProgram();
      return;
    }
    const line = lines[di];              // [role, pl, ru]
    const you = line[0] === "B";
    let html =
      "<div class='stephead'><span class='muted'>Мини-диалог · День " + D.d + " · " + (di + 1) + "/" + lines.length + "</span>" +
      "<button class='exitbtn' id='dlgExit'>✕ выйти</button></div>";
    // уже пройденные реплики
    revealed.forEach(idx => {
      const l = lines[idx];
      html += "<div class='dlgline " + (l[0] === "B" ? "you" : "them") + "'><div class='who'>" + (l[0] === "B" ? "Ты" : "Собеседник") + "</div>" +
        "<div class='pl'>" + l[1] + "</div><div class='ru'>" + l[2] + "</div></div>";
    });
    // текущая реплика
    if (you) {
      html += "<div class='dlgline you'><div class='who'>Твоя реплика</div>" +
        "<div class='ru' style='font-size:15px'>Скажи по-польски: «" + line[2] + "»</div>" +
        "<div id='dlgReveal' style='margin-top:10px'></div></div>";
    } else {
      html += "<div class='dlgline them'><div class='who'>Собеседник</div>" +
        "<div class='pl'>" + line[1] + "</div><div class='ru'>" + line[2] + "</div>" +
        "<button class='speak' id='dlgSpk' style='margin-top:8px'>🔊 Повторить</button></div>" +
        "<button class='btn-primary' id='dlgNext' style='margin-top:6px'>Далее →</button>";
    }
    c.innerHTML = html;
    $("dlgExit").onclick = () => { if (confirm("Выйти из диалога?")) showProgram(); };
    if (you) {
      const rev = $("dlgReveal");
      rev.innerHTML = "<button class='btn-primary' id='dlgShow'>Показать и озвучить</button>";
      $("dlgShow").onclick = () => {
        speak(line[1]);
        rev.innerHTML = "<div class='pl' style='color:var(--text)'>" + line[1] + "</div>" +
          "<button class='speak' id='dlgSpk2' style='margin-top:6px'>🔊 Ещё раз</button>" +
          "<button class='btn-primary' id='dlgNext' style='margin-top:8px'>Далее →</button>";
        $("dlgSpk2").onclick = () => speak(line[1]);
        $("dlgNext").onclick = advance;
      };
    } else {
      speak(line[1]);
      $("dlgSpk").onclick = () => speak(line[1]);
      $("dlgNext").onclick = advance;
    }
  }
  function advance() { revealed.push(di); di++; renderDialog(); }
  window.playDialog = playDialog;

  /* --- кнопки входа --- */
  const ob = $("openProgramBtn"); if (ob) ob.onclick = showProgram;
  const bb = $("progBack"); if (bb) bb.onclick = () => { show("home"); if (window.renderHome) renderHome(); };
  updateHomeStat();
})();
