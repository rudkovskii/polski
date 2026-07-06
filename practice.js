/* ============================================================
   РЕЖИМЫ ПРАКТИКИ (Фаза 1)
   Экран «Практика»: поверх выбранной колоды (введённые / вся / сложные / день)
   запускаются режимы отработки. Каждый режим — переиспользуемый «виджет»
   window.Modes.*(host, item, opts) — его же используют шаги уроков (build/match/cloze).

   Опирается на глобали из index.html: $, S, VOCAB, speak, norm, stripDia, show, SRS, Store.
   ============================================================ */
(function () {
  const $ = (id) => document.getElementById(id);

  /* ---------- мелкие утилиты ---------- */
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function sample(a, n) { return shuffle(a).slice(0, n); }
  function esc(s) { return (s + "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function words(s) { return (s || "").trim().split(/\s+/).filter(Boolean); }

  /* распознавание речи + оценка похожести (как в движке уроков) */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  function lev(a, b) {
    if (a === b) return 0; const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
    return prev[n];
  }
  function wordsOf(s) { return stripDia(norm(s)).replace(/[^a-z0-9 ]/g, "").split(" ").filter(Boolean); }
  function simScore(said, target) {
    const a = wordsOf(said), b = wordsOf(target); if (!b.length) return 0;
    const used = new Set(); let hit = 0;
    b.forEach(w => { let best = -1; for (let i = 0; i < a.length; i++) { if (used.has(i)) continue; const d = lev(a[i], w), tol = w.length > 4 ? 2 : (w.length > 2 ? 1 : 0); if (d <= tol) { best = i; break; } } if (best >= 0) { used.add(best); hit++; } });
    return hit / b.length;
  }

  /* сравнение ответа с учётом диакритики */
  function matches(input, target) { const a = norm(input), b = norm(target); return a === b || stripDia(a) === stripDia(b); }

  /* блок «правильно/неправильно» + кнопка продолжения */
  function verdict(host, ok, correctHTML, opts) {
    const fb = document.createElement("div");
    fb.className = "feedback " + (ok ? "ok" : "bad");
    fb.innerHTML = ok ? "✓ Верно" : ("✗ " + correctHTML);
    host.appendChild(fb);
    const nb = document.createElement("button");
    nb.className = "btn-primary"; nb.style.marginTop = "16px";
    nb.textContent = (opts && opts.nextLabel) || "Дальше →";
    nb.onclick = () => opts.onDone(ok);
    host.appendChild(nb);
  }

  /* ============================================================
     ВИДЖЕТЫ РЕЖИМОВ — window.Modes
     Каждый рендерит один элемент задания в host и по завершении зовёт opts.onDone(ok).
     ============================================================ */
  const Modes = {};

  /* 4.3 Конструирование фразы из слов (word bank) */
  Modes.build = function (host, item, opts) {
    const target = (item.pl || "").trim();
    const correct = words(target);
    const base = (item.tiles && item.tiles.length) ? item.tiles.slice() : correct.slice();
    const tiles = shuffle(base.concat(item.distractors || []));
    host.innerHTML =
      "<div class='prompt'>Собери фразу по-польски</div>" +
      "<div class='term' style='font-size:20px'>" + esc(item.ru || "") + "</div>" +
      "<div class='wslot' id='wslot'></div>" +
      "<div class='wbank' id='wbank'></div>" +
      "<div class='toolbar'><button class='btn-ghost smallbtn' id='wundo'>← Убрать</button>" +
      "<button class='btn-primary' id='wcheck'>Проверить</button></div>" +
      "<div id='wfb'></div>";
    const bank = $("wbank"), slot = $("wslot"), chosen = [];
    tiles.forEach(w => {
      const b = document.createElement("button"); b.className = "wtile"; b.textContent = w;
      b.onclick = () => {
        if (b.classList.contains("used")) return; b.classList.add("used");
        const s = document.createElement("button"); s.className = "wtile"; s.textContent = w;
        s.onclick = () => { s.remove(); b.classList.remove("used"); const i = chosen.findIndex(x => x.s === s); if (i >= 0) chosen.splice(i, 1); };
        slot.appendChild(s); chosen.push({ w, s, src: b });
      };
      bank.appendChild(b);
    });
    $("wundo").onclick = () => { const last = chosen.pop(); if (last) { last.s.remove(); last.src.classList.remove("used"); } };
    $("wcheck").onclick = () => {
      const built = chosen.map(x => x.w).join(" ");
      const ok = matches(built, target);
      $("wcheck").disabled = true; $("wundo").disabled = true;
      [...slot.children].forEach((el, i) => { el.classList.add(norm(el.textContent) === norm(correct[i] || "") ? "ok" : "bad"); });
      const fb = $("wfb");
      fb.innerHTML = "<div class='ex' style='margin-top:8px'>Эталон: «<b>" + esc(target) + "</b>»" + (item.ru ? " — " + esc(item.ru) : "") + "</div>";
      speak(target);
      verdict(fb, ok, "Правильно: <b>" + esc(target) + "</b>", opts);
    };
  };

  /* 4.4 Перевод: dir = 'ru2pl' (ввод) | 'pl2ru' (выбор из 4) */
  Modes.translate = function (host, item, opts) {
    if (item.dir === "pl2ru") return translatePL2RU(host, item, opts);
    return translateRU2PL(host, item, opts);
  };
  function translateRU2PL(host, item, opts) {
    host.innerHTML =
      "<div class='tag'>Перевод · RU → PL</div>" +
      "<div class='prompt'>Напиши по-польски</div>" +
      "<div class='term' style='font-size:24px'>" + esc(item.ru) + "</div>" +
      "<input class='type' id='pinp' autocomplete='off' autocapitalize='off' spellcheck='false' placeholder='напиши по-польски…'>" +
      "<button class='btn-primary' id='pchk' style='margin-top:14px'>Проверить</button><div id='pfb'></div>";
    const inp = $("pinp"); inp.focus();
    const go = () => {
      const ok = matches(inp.value, item.pl);
      inp.disabled = true; $("pchk").style.display = "none";
      const fb = $("pfb");
      fb.innerHTML = (item.hint ? "<div class='hint'>[" + esc(item.hint) + "]</div>" : "") +
        "<button class='speak' id='pspk'>🔊 Послушать</button>";
      $("pspk").onclick = () => speak(item.pl); speak(item.pl);
      verdict(fb, ok, "Правильно: <b>" + esc(item.pl) + "</b>", opts);
    };
    $("pchk").onclick = go;
    inp.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  }
  function translatePL2RU(host, item, opts) {
    const pool = (item.choices || []).length ? item.choices : [item.ru];
    const optsArr = shuffle(pool);
    host.innerHTML =
      "<div class='tag'>Перевод · PL → RU</div>" +
      "<div class='prompt'>Что это значит?</div>" +
      "<div class='term' style='font-size:26px'>" + esc(item.pl) + "</div>" +
      "<button class='speak' id='pspk'>🔊 Послушать</button>" +
      "<div class='opts' id='popts'></div><div id='pfb'></div>";
    $("pspk").onclick = () => speak(item.pl); speak(item.pl);
    const box = $("popts"); let answered = false;
    optsArr.forEach(o => {
      const b = document.createElement("button"); b.className = "opt"; b.textContent = o;
      b.onclick = () => {
        if (answered) return; answered = true;
        const ok = (o === item.ru);
        if (ok) b.classList.add("correct");
        else { b.classList.add("wrong"); [...box.children].forEach(x => { if (x.textContent === item.ru) x.classList.add("correct"); }); }
        [...box.children].forEach(x => x.disabled = true);
        verdict($("pfb"), ok, "Правильно: <b>" + esc(item.ru) + "</b>", opts);
      };
      box.appendChild(b);
    });
  }

  /* 4.5 Аудирование / диктант */
  Modes.dict = function (host, item, opts) {
    host.innerHTML =
      "<div class='tag'>Аудирование</div>" +
      "<div class='step-title'>Слушай и пиши</div>" +
      "<div class='muted' style='font-size:13px'>Жми 🔊 сколько нужно. Диакритика важна!</div>" +
      "<button class='speak' id='dplay' style='margin-top:12px;font-size:16px;padding:10px 18px'>🔊 Прослушать</button>" +
      "<input class='type' id='dinp' autocomplete='off' autocapitalize='off' spellcheck='false' placeholder='что услышал…'>" +
      "<button class='btn-primary' id='dchk' style='margin-top:14px'>Проверить</button><div id='dfb'></div>";
    $("dplay").onclick = () => speak(item.pl); speak(item.pl);
    const inp = $("dinp");
    const go = () => {
      const exact = norm(inp.value) === norm(item.pl), near = matches(inp.value, item.pl);
      inp.disabled = true; $("dchk").style.display = "none";
      const fb = $("dfb");
      fb.innerHTML = (exact ? "" : (near ? "<div class='hint'>Следи за диакритикой</div>" : "")) +
        "<div class='ex'>Было: «<b>" + esc(item.pl) + "</b>»" + (item.ru ? " — " + esc(item.ru) : "") + "</div>";
      verdict(fb, near, "Было: <b>" + esc(item.pl) + "</b>", opts);
    };
    $("dchk").onclick = go;
    inp.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
  };

  /* 4.6 Говорение (ASR + фолбэк самооценки) */
  Modes.speak = function (host, item, opts) {
    host.innerHTML =
      "<div class='tag'>Говорение</div>" +
      "<div class='step-title'>Скажи вслух:</div>" +
      "<div class='term' style='font-size:26px'>" + esc(item.pl) + "</div>" +
      "<div class='hint'>" + esc(item.ru || "") + "</div>" +
      "<button class='speak' id='splay'>🔊 Послушать образец</button>" +
      (SR ? "<button class='micbtn' id='smic'>🎤 Говорить</button>"
        : "<div class='note' style='margin-top:12px'>🎤 Распознавание речи недоступно в этом браузере — произнеси вслух и оцени себя честно.</div>") +
      "<div id='sfb'></div>";
    $("splay").onclick = () => speak(item.pl);
    const selfBlock = () => {
      const fb = $("sfb");
      fb.innerHTML = "<div class='toolbar'><button class='btn-ghost' id='sok'>Получилось ✓</button><button class='btn-ghost' id='sno'>Ещё потренирую</button></div>";
      $("sok").onclick = () => opts.onDone(true);
      $("sno").onclick = () => opts.onDone(false);
    };
    if (!SR) { selfBlock(); return; }
    const mic = $("smic");
    mic.onclick = () => {
      mic.disabled = true; mic.textContent = "🎙 Слушаю…";
      let rec; try { rec = new SR(); } catch (e) { selfBlock(); return; }
      rec.lang = "pl-PL"; rec.interimResults = false; rec.maxAlternatives = 3; let done = false;
      rec.onresult = (e) => {
        done = true; let best = 0, bestTxt = "";
        for (let i = 0; i < e.results[0].length; i++) { const t = e.results[0][i].transcript, sc = simScore(t, item.pl); if (sc >= best) { best = sc; bestTxt = t; } }
        const ok = best >= 0.6;
        const fb = $("sfb");
        fb.innerHTML = "<div class='recres'>Услышал: «" + esc(bestTxt) + "»</div>";
        verdict(fb, ok, "Послушай образец и попробуй ещё. Правильно: <b>" + esc(item.pl) + "</b>", { onDone: opts.onDone, nextLabel: ok ? "Дальше →" : "Дальше (или 🎤 ещё)" });
        mic.disabled = false; mic.textContent = "🎤 Ещё раз";
      };
      rec.onerror = () => { if (done) return; mic.disabled = false; mic.textContent = "🎤 Говорить"; selfBlock(); };
      rec.onend = () => { if (!done && mic.disabled) { mic.disabled = false; mic.textContent = "🎤 Говорить"; } };
      try { rec.start(); } catch (e) { mic.disabled = false; mic.textContent = "🎤 Говорить"; }
    };
  };

  /* 4.8 Cloze — пропуск в фразе (выбор из 4 или ввод) */
  Modes.cloze = function (host, item, opts) {
    const shown = (item.text || "").replace(/_+/g, "<b>___</b>");
    const useChoice = item.opts && item.opts.length;
    host.innerHTML =
      "<div class='tag'>Пропуск</div>" +
      "<div class='step-title' style='font-size:20px;line-height:1.5'>" + shown + "</div>" +
      (item.ru ? "<div class='hint'>" + esc(item.ru) + "</div>" : "") +
      (useChoice
        ? "<div class='opts' id='copts'></div>"
        : "<input class='type' id='cinp' autocomplete='off' autocapitalize='off' spellcheck='false' placeholder='вставь слово…'><button class='btn-primary' id='cchk' style='margin-top:14px'>Проверить</button>") +
      "<div id='cfb'></div>";
    const done = (ok) => {
      const fb = $("cfb");
      const full = (item.text || "").replace(/_+/, item.answer);
      fb.innerHTML = (item.why ? "<div class='ex'>" + esc(item.why) + "</div>" : "") +
        "<button class='speak' id='cspk'>🔊 Фраза целиком</button>";
      $("cspk").onclick = () => speak(full); speak(full);
      verdict(fb, ok, "Правильно: <b>" + esc(item.answer) + "</b>", opts);
    };
    if (useChoice) {
      const box = $("copts"); let answered = false;
      shuffle(item.opts).forEach(o => {
        const b = document.createElement("button"); b.className = "opt"; b.textContent = o;
        b.onclick = () => {
          if (answered) return; answered = true; const ok = matches(o, item.answer);
          if (ok) b.classList.add("correct");
          else { b.classList.add("wrong"); [...box.children].forEach(x => { if (matches(x.textContent, item.answer)) x.classList.add("correct"); }); }
          [...box.children].forEach(x => x.disabled = true); done(ok);
        };
        box.appendChild(b);
      });
    } else {
      const inp = $("cinp"); inp.focus();
      const go = () => { const ok = matches(inp.value, item.answer); inp.disabled = true; $("cchk").style.display = "none"; done(ok); };
      $("cchk").onclick = go; inp.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
    }
  };

  /* 4.7 Сопоставление пар — целый «стол» из pairs=[[pl,ru],…] */
  Modes.match = function (host, pairs, opts) {
    host.innerHTML =
      "<div class='tag'>Пары</div>" +
      "<div class='prompt'>Соедини польское и перевод</div>" +
      "<div class='matchwrap' id='mwrap'></div><div id='mfb'></div>";
    const wrap = $("mwrap");
    const left = shuffle(pairs.map((p, i) => ({ t: p[0], i })));
    const right = shuffle(pairs.map((p, i) => ({ t: p[1], i })));
    const colL = document.createElement("div"), colR = document.createElement("div");
    colL.style.display = colR.style.display = "grid"; colL.style.gap = colR.style.gap = "10px";
    wrap.appendChild(colL); wrap.appendChild(colR);
    let selL = null, misses = 0, doneN = 0;
    function cell(o, side) {
      const el = document.createElement("button"); el.className = "mcell"; el.textContent = o.t; el.dataset.i = o.i;
      el.onclick = () => {
        if (el.classList.contains("done")) return;
        if (side === "L") { colL.querySelectorAll(".mcell").forEach(x => x.classList.remove("sel")); el.classList.add("sel"); selL = el; return; }
        if (!selL) return;
        if (selL.dataset.i === el.dataset.i) {
          selL.classList.add("done"); el.classList.add("done"); selL.classList.remove("sel"); selL = null; doneN++;
          if (doneN === pairs.length) { verdict($("mfb"), misses === 0, "Есть ошибки, но все пары собраны.", { onDone: () => opts.onDone(misses === 0), nextLabel: "Дальше →" }); }
        } else { misses++; el.classList.add("miss"); setTimeout(() => el.classList.remove("miss"), 300); }
      };
      return el;
    }
    left.forEach(o => colL.appendChild(cell(o, "L")));
    right.forEach(o => colR.appendChild(cell(o, "R")));
  };

  window.Modes = Modes;

  /* ============================================================
     ЭКРАН «ПРАКТИКА» — диспетчер выборки и режимов
     ============================================================ */
  let scope = { type: "intro" };
  let dir = "mix"; // для перевода: ru2pl | pl2ru | mix

  function introduced() { return S.cards.filter(c => c.introduced); }
  function poolCards() {
    const intro = introduced();
    let base;
    if (scope.type === "all") base = S.cards.slice();
    else if (scope.type === "hard") base = intro.filter(c => c.hard || (c.reps > 0 && c.interval < 2));
    else if (scope.type === "day") base = S.cards.filter(c => c.day === scope.day);
    else base = intro;
    if (!base.length) base = S.cards.filter(c => c.day === 1); // подстраховка для новичка
    return base;
  }

  /* практика тоже кормит SRS: верно → «Хорошо», неверно → «Снова» */
  function grade(card, ok) {
    if (!card) return;
    if (!card.introduced && !ok) return;      // неувиденное слово не штрафуем
    if (ok && !card.introduced) card.introduced = true;
    SRS.review(card, ok ? 2 : 0);
    Store.save();
  }

  /* --- сборка очереди для каждого режима из пула карточек --- */
  const MAX = { build: 8, translate: 12, dict: 8, speak: 8, cloze: 8, match: 15 };
  const otherWord = (not) => { let c; for (let k = 0; k < 12; k++) { c = VOCAB[Math.floor(Math.random() * VOCAB.length)][1]; if (words(c).length === 1 && c !== not) return c; } return "to"; };

  function buildQueue(mode, cards) {
    const q = [];
    if (mode === "build") {
      cards.filter(c => words(c.ex).length >= 2).slice(0, 40).forEach(c => {
        q.push({ cards: [c], play: (h, next) => Modes.build(h, { ru: c.exru, pl: c.ex, distractors: sample(VOCAB.map(v => v[1]).filter(w => words(w).length === 1 && words(c.ex).indexOf(w) < 0), 2) }, { onDone: ok => { grade(c, ok); next(ok); } }) });
      });
    } else if (mode === "translate") {
      cards.slice(0, 40).forEach((c, idx) => {
        let d = dir; if (d === "mix") d = idx % 2 ? "pl2ru" : "ru2pl";
        const choices = d === "pl2ru" ? [c.ru].concat(sample(cards.filter(x => x !== c).map(x => x.ru), 3)) : null;
        q.push({ cards: [c], play: (h, next) => Modes.translate(h, { pl: c.pl, ru: c.ru, hint: c.hint, dir: d, choices }, { onDone: ok => { grade(c, ok); next(ok); } }) });
      });
    } else if (mode === "dict") {
      cards.slice(0, 40).forEach(c => q.push({ cards: [c], play: (h, next) => Modes.dict(h, { pl: c.pl, ru: c.ru }, { onDone: ok => { grade(c, ok); next(ok); } }) }));
    } else if (mode === "speak") {
      cards.slice(0, 40).forEach(c => q.push({ cards: [c], play: (h, next) => Modes.speak(h, { pl: c.pl, ru: c.ru }, { onDone: ok => { grade(c, ok); next(ok); } }) }));
    } else if (mode === "cloze") {
      cards.forEach(c => {
        const ex = c.ex || "", re = new RegExp("(^|\\s)(" + c.pl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")(\\s|[.!?,]|$)", "i");
        const m = ex.match(re); if (!m) return;
        const answer = m[2]; const text = ex.replace(answer, "____");
        if (norm(text.replace(/_+/g, "").trim()).length < 2) return; // должен остаться контекст
        const opts4 = shuffle([answer].concat(sample(VOCAB.map(v => v[1]).filter(w => w.toLowerCase() !== answer.toLowerCase()), 3)));
        q.push({ cards: [c], play: (h, next) => Modes.cloze(h, { text, answer, ru: c.exru, opts: opts4 }, { onDone: ok => { grade(c, ok); next(ok); } }) });
      });
    } else if (mode === "match") {
      const cs = sample(cards, MAX.match);
      for (let i = 0; i < cs.length; i += 5) {
        const group = cs.slice(i, i + 5); if (group.length < 3) break;
        q.push({ cards: group, play: (h, next) => Modes.match(h, group.map(c => [c.pl, c.ru]), { onDone: ok => { group.forEach(c => grade(c, true)); next(ok); } }) });
      }
      return q;
    }
    return sample(q, MAX[mode] || 10);
  }

  /* доступность режима на текущем пуле (чтобы не запускать пустое) */
  function countFor(mode, cards) {
    if (mode === "build") return cards.filter(c => words(c.ex).length >= 2).length;
    if (mode === "cloze") return cards.filter(c => { const re = new RegExp("(^|\\s)(" + c.pl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")(\\s|[.!?,]|$)", "i"); return re.test(c.ex || ""); }).length;
    if (mode === "match") return cards.length >= 3 ? cards.length : 0;
    return cards.length;
  }

  /* --- бегунок сессии --- */
  let queue = [], qi = 0, res = { ok: 0, total: 0 };
  function runMode(mode) {
    const cards = poolCards();
    queue = buildQueue(mode, cards);
    if (!queue.length) { alert("Для этого режима на выбранной колоде пока мало материала. Выбери «Вся колода» или введи больше слов в тренажёре."); return; }
    qi = 0; res = { ok: 0, total: 0 };
    show("practicePlay"); step();
  }
  function step() {
    if (qi >= queue.length) return finish();
    $("pracBar").style.width = Math.round(qi / queue.length * 100) + "%";
    const item = queue[qi];
    $("pracCard").innerHTML = "";
    const hd = document.createElement("div");
    hd.innerHTML = "<div class='stephead'><span class='muted'>Практика · " + (qi + 1) + "/" + queue.length + "</span>" +
      "<button class='exitbtn' id='pexit'>✕ выйти</button></div>";
    $("pracCard").appendChild(hd);
    $("pexit").onclick = () => { if (confirm("Выйти из практики?")) showPractice(); };
    const body = document.createElement("div"); $("pracCard").appendChild(body);
    item.play(body, (ok) => { res.total++; if (ok) res.ok++; qi++; step(); });
  }
  function finish() {
    $("pracBar").style.width = "100%";
    const pct = res.total ? Math.round(res.ok / res.total * 100) : 100;
    $("pracCard").innerHTML =
      "<div class='center'><div style='font-size:44px'>" + (pct >= 80 ? "🎉" : "💪") + "</div>" +
      "<div class='step-title' style='text-align:center'>Практика завершена</div>" +
      "<div class='muted'>Верно: <b>" + res.ok + "</b> из <b>" + res.total + "</b> (" + pct + "%)</div></div>" +
      "<div class='toolbar'><button class='btn-primary' id='pdone'>К режимам</button></div>";
    $("pdone").onclick = showPractice;
  }

  /* --- хаб: выборка + плитки --- */
  const MODES = [
    { k: "build", i: "🧩", t: "Конструктор фразы", d: "Собери польскую фразу из слов" },
    { k: "translate", i: "🔁", t: "Перевод RU↔PL", d: "В обе стороны, с переключателем" },
    { k: "dict", i: "🎧", t: "Аудирование", d: "Слушай польскую фразу и печатай" },
    { k: "speak", i: "🎤", t: "Говорение", d: "Произнеси вслух, с распознаванием" },
    { k: "match", i: "🔗", t: "Пары", d: "Соедини польское и перевод" },
    { k: "cloze", i: "✏️", t: "Пропуск", d: "Вставь пропущенное слово во фразу" }
  ];
  function renderHub() {
    const cards = poolCards();
    /* выборка */
    const chips = [{ k: "intro", t: "Введённые" }, { k: "all", t: "Вся колода" }, { k: "hard", t: "Сложные" }];
    const introDays = [...new Set(introduced().map(c => c.day))].sort((a, b) => a - b);
    const sc = $("pracScope"); sc.innerHTML = "";
    chips.forEach(ch => {
      const b = document.createElement("button"); b.className = "pchip" + (scope.type === ch.k ? " on" : ""); b.textContent = ch.t;
      b.onclick = () => { scope = { type: ch.k }; renderHub(); }; sc.appendChild(b);
    });
    introDays.forEach(d => {
      const b = document.createElement("button"); b.className = "pchip" + (scope.type === "day" && scope.day === d ? " on" : ""); b.textContent = "День " + d;
      b.onclick = () => { scope = { type: "day", day: d }; renderHub(); }; sc.appendChild(b);
    });
    /* направление перевода */
    const dirRow = "<div class='pdir'><span class='muted' style='align-self:center;font-size:12.5px'>Перевод:</span>" +
      [["ru2pl", "RU→PL"], ["pl2ru", "PL→RU"], ["mix", "Смешанный"]].map(x =>
        "<button class='pchip" + (dir === x[0] ? " on" : "") + "' data-dir='" + x[0] + "'>" + x[1] + "</button>").join("") + "</div>";
    $("pracScopeNote").innerHTML = "В колоде: <b>" + cards.length + "</b> слов. " + dirRow;
    $("pracScopeNote").querySelectorAll("[data-dir]").forEach(b => b.onclick = () => { dir = b.dataset.dir; renderHub(); });
    /* плитки */
    const grid = $("pracModes"); grid.innerHTML = "";
    MODES.forEach(m => {
      const n = countFor(m.k, cards);
      const b = document.createElement("button"); b.className = "ptile"; b.disabled = n < (m.k === "match" ? 3 : 1);
      b.innerHTML = "<div class='pi'>" + m.i + "</div><div class='pt'>" + m.t + "</div><div class='pd'>" + m.d + "</div>";
      b.onclick = () => runMode(m.k); grid.appendChild(b);
    });
  }
  function showPractice() { renderHub(); show("practice"); }

  window.showPractice = showPractice; // на случай вызова из других модулей
  const btn = $("openPracticeBtn"); if (btn) btn.onclick = showPractice;
  const back = $("pracBack"); if (back) back.onclick = () => { show("home"); if (window.renderHome) renderHome(); };
})();
