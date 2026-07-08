/* АВТОРИЗАЦИЯ (Фаза 3, §7) — вход по email + пароль (Supabase).
   Проект Supabase переиспользуется от «Карты поляка» (polski-trener):
   там включён вход по паролю, регистрация закрыта — значит аккаунт у тебя уже есть,
   входишь тем же email/паролем. Прогресс тренажёра хранится в ОТДЕЛЬНОЙ таблице
   trainer_progress, чтобы не пересекаться с данными того проекта.

   - config.js пустой → облако выключено, приложение работает локально.
   - config.js заполнен → грузим supabase-js с CDN, показываем форму входа /
     профиль; после входа стартует CloudSync. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var card = $("cloudCard");
  if (!card) return;

  var cfg = window.POLSKI_CONFIG || {};
  var enabled = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY);

  function setStatus(t) { var el = $("cloudStatus"); if (el) el.textContent = t; }
  function setDesc(h) { var el = $("cloudDesc"); if (el) el.innerHTML = h; }
  function body(html) { var b = $("cloudBtns"); if (b) b.innerHTML = html; }

  if (!enabled) {
    setStatus("не настроена");
    setDesc("Прогресс хранится на этом устройстве (плюс кнопка ⬇ экспорт в шапке). " +
      "Чтобы синхронизировать iPad и компьютер — настрой облако по инструкции " +
      "<b>SETUP_SUPABASE.md</b> и заполни <b>config.js</b>.");
    body("");
    return;
  }

  setStatus("подключение…");
  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";
  s.onerror = function () {
    setStatus("офлайн");
    setDesc("Не удалось загрузить модуль облака (нет сети?). Приложение работает локально; " +
      "синхронизация включится при следующем запуске с интернетом.");
  };
  s.onload = function () {
    var client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });

    function esc(v) { return (v || "").replace(/"/g, "&quot;"); }

    function renderSignedOut(prefillEmail, err) {
      setStatus("вход не выполнен");
      setDesc("Войди тем же аккаунтом, что и в «Карте поляка» — прогресс тренажёра " +
        "будет синхронизироваться между устройствами.");
      body(
        "<input id='cEmail' class='type' style='margin:0 0 8px' type='email' autocomplete='username' " +
          "placeholder='email' value=\"" + esc(prefillEmail) + "\">" +
        "<input id='cPass' class='type' style='margin:0 0 8px' type='password' autocomplete='current-password' " +
          "placeholder='пароль'>" +
        (err ? "<div class='feedback bad' style='margin:0 0 8px'>" + err + "</div>" : "") +
        "<button id='cLogin' class='btn-primary'>Войти</button>" +
        "<div class='note' style='margin-top:8px'>Регистрация закрыта — используется существующий аккаунт. " +
          "Пароль вводишь ты, приложение отправляет его напрямую в Supabase по HTTPS.</div>"
      );
      $("cLogin").onclick = doLogin;
      $("cPass").addEventListener("keydown", function (e) { if (e.key === "Enter") doLogin(); });
    }

    function doLogin() {
      var email = ($("cEmail").value || "").trim();
      var pass = $("cPass").value || "";
      if (!email || !pass) { renderSignedOut(email, "Введи email и пароль."); return; }
      setStatus("вход…");
      $("cLogin").disabled = true;
      client.auth.signInWithPassword({ email: email, password: pass }).then(function (r) {
        if (r.error) {
          renderSignedOut(email, "Не удалось войти: " + (r.error.message || "проверь email и пароль") + ".");
        }
        // при успехе onAuthStateChange сам перерисует профиль
      });
    }

    function renderSignedIn(user) {
      setDesc("Аккаунт: <b>" + (user.email || user.id) + "</b>. Прогресс автоматически " +
        "уходит в облако через несколько секунд после каждого занятия.");
      body(
        "<button id='cNow' class='btn-ghost smallbtn'>Синхронизировать сейчас</button>" +
        "<button id='cOut' class='btn-ghost smallbtn'>Выйти</button>"
      );
      $("cNow").onclick = function () { CloudSync.now(); };
      $("cOut").onclick = function () {
        if (!confirm("Выйти из аккаунта? Локальный прогресс останется на устройстве.")) return;
        client.auth.signOut();
      };
    }

    var started = false;
    function apply(session) {
      if (session && session.user) {
        renderSignedIn(session.user);
        if (!started) { started = true; CloudSync.start(client, session.user); }
      } else {
        if (started) { started = false; CloudSync.stop(); }
        renderSignedOut("", null);
      }
    }
    client.auth.onAuthStateChange(function (_e, session) { apply(session); });
    client.auth.getSession().then(function (r) { apply(r.data ? r.data.session : null); });
  };
  document.head.appendChild(s);
})();
