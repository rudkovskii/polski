/* ЕДИНЫЙ SRS (Фаза 0)
   Один алгоритм интервальных повторений для тренажёра слов и «Собеса».
   Раньше он был скопирован в двух местах (review + sReview) — теперь тут.

   Карточка обязана иметь поля: ef (лёгкость), interval (дни), reps (успешные повторы), due (epoch ms).
   grade: 0 = Снова, 1 = Трудно, 2 = Хорошо, 3 = Легко.

   Абстракция намеренно тонкая: позже сюда можно завести FSRS,
   не трогая ни один режим (см. §6.3 / §12 ТЗ). */
(function () {
  var DAY_MS = 86400000;

  // Упрощённый SM-2 (как было исторически в проекте).
  function review(card, grade) {
    var q = [2, 3, 4, 5][grade];
    if (q < 3) { card.reps = 0; card.interval = 0; }
    else {
      if (card.reps === 0) card.interval = 1;
      else if (card.reps === 1) card.interval = 6;
      else card.interval = Math.round(card.interval * card.ef);
      card.reps += 1;
    }
    card.ef = Math.max(1.3, card.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
    card.due = Date.now() + card.interval * DAY_MS;
    return card;
  }

  // Значения по умолчанию для новой карточки.
  function fresh() { return { ef: 2.5, interval: 0, reps: 0, due: 0 }; }

  window.SRS = { review: review, fresh: fresh, DAY_MS: DAY_MS };
})();
