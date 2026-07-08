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
    if (el) { el.textContent = txt; el.style.color = tone === "ok" ? "var(--good)" : (tone === "warn" ? "var(--warn)" : ""); }
  }
  // «таблицы ещё нет» — не сеть виновата, а не выполнен SQL из SETUP_SUPABASE.md
  function isMissingTable(e) {
    return e && (e.code === "PGRST205" || e.code === "42P01" ||
      (e.message && e.message.indexOf("trainer_progress") >= 0));
  }
  function handleErr(e) {
    if (isMissingTable(e)) { status("создай таблицу trainer_progress (см. SETUP_SUPABASE.md)", "warn"); }
    else { dirty = true; status("офлайн — сохраню при появлении сети"); }
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
    }).catch(handleErr);
  }

  /* Дебаунс-отправка после каждого сохранения прогресса. */
  function schedule() {
    if (!client || !user) return;
    dirty = true; status("есть несохранённые изменения…");
    clearTimeout(timer);
    timer = setTimeout(function () {
      push().catch(handleErr);
    }, 5000);
  }

  // Читаем «тетрадку» и «свои карточки» из проекта Карты поляка (таблица docs
  // того же Supabase) — только чтение, ничего там не меняем. Показ — в разделе «Тетрадка».
  function pullKarta() {
    if (!client || !user || !window.Karta) return;
    Promise.all([
      client.from("docs").select("data").eq("user_id", user.id).eq("key", "notebook").maybeSingle(),
      client.from("docs").select("data").eq("user_id", user.id).eq("key", "custom").maybeSingle()
    ]).then(function (res) {
      var nb = res[0] && res[0].data ? res[0].data.data : null;   // строка docs: {data: <jsonb>}
      var cu = res[1] && res[1].data ? res[1].data.data : null;
      Karta.setData({ marks: Array.isArray(nb) ? nb : [], custom: Array.isArray(cu) ? cu : [] });
    }).catch(function () { /* нет доступа/сети — покажем прошлую сохранённую тетрадку */ });
  }

  function start(c, u) {
    client = c; user = u;
    Store.progress.userId = u.id;
    window.Store.onSaved = schedule;                 // хук из store.js
    window.addEventListener("online", function () {
      if (dirty) push().catch(function () {});
    });
    initial();
    pullKarta();
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
    push().catch(handleErr);
  }

  return { start: start, stop: stop, now: now };
})();
