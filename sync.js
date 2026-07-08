/* СИНХРОНИЗАЦИЯ С ОБЛАКОМ (Фаза 3, §7.4)
   Стратегия: offline-first + last-write-wins по progress.updatedAt.
   - Приложение всегда работает с localStorage (мгновенно, офлайн).
   - При входе: если облако новее — применяем его (и перезагружаемся),
     если локальное новее или облако пустое — заливаем локальное.
   - После каждого сохранения — отложенная (5 c) отправка в облако.
   - Ошибки сети не блокируют обучение: помечаем «не сохранено», дошлём при сети.

   Модуль пассивен: его запускает auth.js вызовом CloudSync.start(client, user). */
window.CloudSync = (function () {
  var client = null, user = null, timer = null, dirty = false;

  function status(txt, tone) {
    var el = document.getElementById("cloudStatus");
    if (el) { el.textContent = txt; el.style.color = tone === "ok" ? "var(--good)" : ""; }
  }
  function hhmm() { var d = new Date(); return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2); }

  function pull() {
    return client.from("trainer_progress").select("data,updated_at")
      .eq("user_id", user.id).maybeSingle()
      .then(function (r) { if (r.error) throw r.error; return r.data; });
  }

  function push() {
    var payload = Store.export();
    payload.userId = user.id;
    return client.from("trainer_progress").upsert({
      user_id: user.id, data: payload, updated_at: new Date().toISOString()
    }).then(function (r) {
      if (r.error) throw r.error;
      dirty = false; status("синхронизировано " + hhmm(), "ok");
    });
  }

  /* Первая сверка после входа: LWW по updatedAt; при равенстве оставляем локальное. */
  function initial() {
    status("синхронизация…");
    return pull().then(function (row) {
      var localTs = Store.progress.updatedAt || 0;
      var cloudTs = (row && row.data && row.data.updatedAt) || 0;
      if (row && cloudTs > localTs) {
        // Облако новее (занимался на другом устройстве) → применяем и перезапускаемся.
        if (Store.import(row.data)) { location.reload(); return; }
      }
      return push(); // локальное новее / облако пустое → заливаем наше
    }).catch(function () { dirty = true; status("офлайн — сохраню при появлении сети"); });
  }

  /* Дебаунс-отправка после каждого сохранения прогресса. */
  function schedule() {
    if (!client || !user) return;
    dirty = true; status("есть несохранённые изменения…");
    clearTimeout(timer);
    timer = setTimeout(function () {
      push().catch(function () { status("офлайн — сохраню при появлении сети"); });
    }, 5000);
  }

  function start(c, u) {
    client = c; user = u;
    Store.progress.userId = u.id;
    window.Store.onSaved = schedule;                 // хук из store.js
    window.addEventListener("online", function () {
      if (dirty) push().catch(function () {});
    });
    initial();
  }

  function stop() {
    client = null; user = null; dirty = false;
    clearTimeout(timer);
    window.Store.onSaved = null;
    status("выключена");
  }

  function now() {
    if (!client || !user) return;
    clearTimeout(timer);
    status("синхронизация…");
    push().catch(function () { status("офлайн — попробуй позже"); });
  }

  return { start: start, stop: stop, now: now };
})();
