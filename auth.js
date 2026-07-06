/* АВТОРИЗАЦИЯ (Фаза 3, §7)
   Вход через Google на базе Supabase. Логика:
   - config.js пустой → облако выключено, приложение работает локально,
     карточка на главной объясняет, как включить (SETUP_SUPABASE.md).
   - config.js заполнен → грузим supabase-js с CDN (версия зафиксирована),
     показываем «Войти через Google» / профиль, после входа стартует CloudSync.
   Supabase сам разбирает токен из URL после OAuth-редиректа — сервер не нужен. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var card = $("cloudCard");
  if (!card) return;

  var cfg = window.POLSKI_CONFIG || {};
  var enabled = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);

  function setStatus(t) { var el = $("cloudStatus"); if (el) el.textContent = t; }
  function setDesc(h) { var el = $("cloudDesc"); if (el) el.innerHTML = h; }
  function setBtns(nodes) {
    var box = $("cloudBtns"); if (!box) return;
    box.innerHTML = "";
    nodes.forEach(function (n) { box.appendChild(n); });
  }
  function btn(label, cls, fn) {
    var b = document.createElement("button");
    b.className = cls; b.textContent = label; b.onclick = fn;
    return b;
  }

  /* --- облако не настроено: работаем локально, подсказываем как включить --- */
  if (!enabled) {
    setStatus("не настроена");
    setDesc("Прогресс хранится на этом устройстве (плюс кнопка ⬇ экспорт в шапке). " +
      "Чтобы синхронизировать iPad и компьютер через вход Google — настрой облако " +
      "по инструкции <b>SETUP_SUPABASE.md</b> и заполни <b>config.js</b>.");
    setBtns([]);
    return;
  }

  /* --- облако настроено: грузим supabase-js (зафиксированная версия) --- */
  setStatus("подключение…");
  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";
  s.onerror = function () {
    setStatus("офлайн");
    setDesc("Не удалось загрузить модуль облака (нет сети?). Приложение работает локально; " +
      "синхронизация включится при следующем запуске с интернетом.");
  };
  s.onload = function () {
    var client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

    function renderSignedOut() {
      setStatus("вход не выполнен");
      setDesc("Войди, чтобы прогресс синхронизировался между устройствами. " +
        "Локальный прогресс при первом входе переедет в облако автоматически.");
      setBtns([btn("Войти через Google", "btn-primary", function () {
        // возвращаемся на текущий адрес без query/hash (§7.2: он должен быть в Redirect URLs)
        var back = location.origin + location.pathname;
        client.auth.signInWithOAuth({ provider: "google", options: { redirectTo: back } });
      })]);
    }

    function renderSignedIn(user) {
      setDesc("Аккаунт: <b>" + (user.email || user.id) + "</b>. Прогресс автоматически " +
        "улетает в облако через несколько секунд после каждого занятия.");
      setBtns([
        btn("Синхронизировать сейчас", "btn-ghost smallbtn", function () { CloudSync.now(); }),
        btn("Выйти", "btn-ghost smallbtn", function () {
          if (!confirm("Выйти из аккаунта? Локальный прогресс останется на устройстве.")) return;
          client.auth.signOut();
        })
      ]);
    }

    var started = false;
    function apply(session) {
      if (session && session.user) {
        renderSignedIn(session.user);
        if (!started) { started = true; CloudSync.start(client, session.user); }
      } else {
        if (started) { started = false; CloudSync.stop(); }
        renderSignedOut();
      }
    }

    client.auth.onAuthStateChange(function (_e, session) { apply(session); });
    client.auth.getSession().then(function (r) { apply(r.data ? r.data.session : null); });
  };
  document.head.appendChild(s);
})();
