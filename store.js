/* ЕДИНОЕ ХРАНИЛИЩЕ ПРОГРЕССА (Фаза 0)
   Раньше прогресс лежал в четырёх разных ключах localStorage:
     pl_trainer_v2, pl_lessons_v1, pl_sobes_v1, pl_theme_v2.
   Теперь всё в одном объекте `progress` под ключом pl_progress_v3 —
   так проще экспортировать целиком и позже синхронизировать с облаком (Фаза 3).

   Структура (см. §6.2 ТЗ):
     progress = {
       v, userId, updatedAt,
       trainer: {cards, stats},        // слово-карточки
       lessons: { [lessonId]: {...} }, // прогресс уроков
       sobes:   {...},                 // «Собес»
       settings:{ theme, ... }
     }

   Каждый модуль владеет своим разделом (trainer/lessons/sobes) и его схемой.
   store.js занимается только загрузкой/сохранением/миграцией/экспортом. */
(function () {
  var KEY = "pl_progress_v3";
  var OLD = {
    trainer: "pl_trainer_v2",
    lessons: "pl_lessons_v1",
    sobes: "pl_sobes_v1",
    theme: "pl_theme_v2"
  };

  function readJSON(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }

  var progress = readJSON(KEY);

  // Первый запуск на новой версии → собираем progress из старых ключей (миграция).
  if (!progress || progress.v !== 3) {
    var legacyTheme = localStorage.getItem(OLD.theme) || "dark";
    progress = {
      v: 3,
      userId: null,
      updatedAt: 0,
      trainer: readJSON(OLD.trainer) || null,   // старый объект S (cards+stats) либо null
      lessons: readJSON(OLD.lessons) || {},
      sobes: readJSON(OLD.sobes) || null,
      settings: { theme: legacyTheme, dailyGoal: 30 }
    };
  }
  if (!progress.settings) progress.settings = { theme: "dark", dailyGoal: 30 };
  if (!progress.lessons) progress.lessons = {};

  var saveTimer = null;
  function saveNow() {
    progress.updatedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(progress)); } catch (e) {}
  }
  function save() { clearTimeout(saveTimer); saveTimer = setTimeout(saveNow, 400); }

  // Экспорт — полный снимок прогресса (включая уроки, чего раньше не хватало).
  function exportData() { return JSON.parse(JSON.stringify(progress)); }

  // Импорт принимает и новый формат (весь progress), и старый ({trainer, sobes}).
  // Пишем в localStorage и перезагружаем страницу — так все модули увидят новые данные без гонок.
  function importData(obj) {
    if (!obj || typeof obj !== "object") return false;
    var next;
    if (obj.v === 3 && obj.trainer !== undefined) {
      next = obj;
    } else {
      next = exportData();
      if (obj.trainer) next.trainer = obj.trainer;   // старый экспорт: {app, trainer, sobes}
      if (obj.sobes) next.sobes = obj.sobes;
      if (obj.lessons) next.lessons = obj.lessons;
      if (obj.cards) next.trainer = obj;              // совсем старый: голый объект тренажёра
    }
    next.v = 3; next.updatedAt = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch (e) { return false; }
    return true;
  }

  window.Store = {
    progress: progress,
    save: save,
    saveNow: saveNow,
    export: exportData,
    import: importData,
    KEY: KEY
  };
})();
