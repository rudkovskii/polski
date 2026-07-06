/* ============================================================
   КОНТЕНТ УРОКОВ — Неделя 1
   Формат шага:
   { t:"ex",   title, html }                     — объяснение (в html {{...}} = озвучиваемый польский)
   { t:"mcq",  q, opts:[...], a:индекс, why }    — выбор ответа
   { t:"type", q, a:"ответ"|[варианты], hint }   — напечатать ответ
   { t:"dict", pl, ru }                          — диктант: слушай и пиши
   { t:"speak", pl, ru }                         — произнеси вслух (распознавание речи)
   ============================================================ */

const WEEKS = [
  { n: 1, title: "Неделя 1 · Старт", desc: "Алфавит и правила чтения → знакомство и вежливость → być и рассказ о себе. Параллельно тренажёр вводит survival-фразы дней 1–7." },
  { n: 2, title: "Неделя 2 · Быт и деньги", desc: "Спряжение обычных глаголов (-m/-sz) → числа 11–100 и цены → заказ в кафе. Уроки Пн/Ср/Пт поверх ежедневного тренажёра." },
  { n: 3, title: "Неделя 3 · Вещи и покупки", desc: "Род существительных и ten/ta/to → «biernik как чанк» (poproszę kawę) → покупки в магазине и на рынке." },
  { n: 4, title: "Неделя 4 · Действия, город, время", desc: "Модальные mogę/chcę/muszę → город и направления (предлоги как чанки) → время и «Która godzina?». Закрытие месяца." }
];

const LESSONS = [

/* ================= УРОК 1 ================= */
{
  id: "w1l1", week: 1, day: "Пн", mins: 18,
  title: "Алфавит и правила чтения",
  goal: "Читать любую польскую вывеску и правильно произносить фразы из тренажёра",
  steps: [
    { t: "ex", title: "Три кита польского произношения",
      html: "<p>Этот урок — ключ ко всему: после него ты сможешь <b>прочитать вслух любое польское слово</b>, включая все фразы из тренажёра.</p>" +
        "<p><b>1. Ударение всегда на предпоследний слог.</b> Без исключений на нашем уровне: War-<b>SZA</b>-wa, dzię-<b>KU</b>-ję, ko-<b>BIE</b>-ta. Русские «плавают» ударением и этим сразу выдают себя.</p>" +
        "<p><b>2. Нет «аканья».</b> Гласные читаются как пишутся: {{okno}} = [окно], а не [акно́]. Каждое o — честное [о].</p>" +
        "<p><b>3. Читается всё и всегда одинаково.</b> Выучил правила — читаешь всё. Правил немного, они на следующих двух экранах.</p>" },

    { t: "ex", title: "Согласные: главные отличия от русского",
      html: "<table><tr><th>Пишется</th><th>Звучит</th><th>Пример</th></tr>" +
        "<tr><td><b>w</b></td><td>[в]</td><td>{{woda}} — вода</td></tr>" +
        "<tr><td><b>ł</b></td><td>[ў] — как англ. w!</td><td>{{masło}} [ма́сўо]</td></tr>" +
        "<tr><td><b>c</b></td><td>[ц]</td><td>{{noc}} [ноц]</td></tr>" +
        "<tr><td><b>cz</b></td><td>[ч] твёрдое</td><td>{{czekolada}}</td></tr>" +
        "<tr><td><b>sz</b></td><td>[ш]</td><td>{{szkoła}}</td></tr>" +
        "<tr><td><b>rz = ż</b></td><td>[ж]</td><td>{{rzeka}}, {{żona}}</td></tr>" +
        "<tr><td><b>ch = h</b></td><td>[х]</td><td>{{chleb}}, {{herbata}}</td></tr>" +
        "<tr><td><b>j</b></td><td>[й]</td><td>{{jajko}}</td></tr>" +
        "<tr><td><b>ś, ć, ź, dź, ń</b></td><td>мягкие [щь, чь, жь, джь, нь]</td><td>{{cześć}}, {{dziękuję}}</td></tr></table>" +
        "<p>Мягкость перед гласной пишется через <b>i</b>: si=[щ], ci=[ч], ni=[нь]: {{siedem}} [щедэм], {{nie}} [не].</p>" +
        "<p>⚠️ Классическая ловушка: <b>cz</b> [ч] ≠ <b>trz</b> [тш]. Сравни: {{czy}} [чы] и {{trzy}} [тшы].</p>" },

    { t: "ex", title: "Носовые ę и ą",
      html: "<p>Двух этих букв нет в русском. Правила чтения по позиции:</p>" +
        "<p><b>ę на конце слова ≈ обычное [э].</b> {{proszę}} = [про́шэ], {{dziękuję}} = [дженьку́е]. Не тяни носом — поляки в конце слова сами так говорят.</p>" +
        "<p><b>Перед b и p:</b> ę=[эм], ą=[ом]: {{ząb}} [зомб], {{zęby}} [зэмбы].</p>" +
        "<p><b>В остальных случаях:</b> ę=[эн], ą=[он] с лёгким носовым оттенком: {{pięć}} [пеньчь], {{mąka}} [монка].</p>" +
        "<p>Резюме для старта: видишь ę в конце — читай [э]; иначе [эн/эм]. Видишь ą — читай [он/ом].</p>" },

    { t: "mcq", q: "Как читается «ł» в słowo, masło?",
      opts: ["Как русское твёрдое [л]", "Как английское w — [ў]", "Как [в]"], a: 1,
      why: "ł = [ў], как английское w: masło [ма́сўо]. Читать его как русское «л» — типичная ошибка." },

    { t: "mcq", q: "«rz» читается как…",
      opts: ["[рз]", "[рж]", "[ж]"], a: 2,
      why: "rz = ż = [ж]: rzeka [жэка]. Двух звуков там нет." },

    { t: "mcq", q: "Где ударение в слове «kobieta» (женщина)?",
      opts: ["KO-bieta", "ko-BIE-ta", "kobie-TA"], a: 1,
      why: "Всегда предпоследний слог: ko-BIE-ta." },

    { t: "mcq", q: "Как звучит ę в конце слова proszę?",
      opts: ["Почти как [э]", "[эн] в нос", "[у]"], a: 0,
      why: "В конце слова ę теряет носовой призвук: proszę = [прошэ]." },

    { t: "dict", pl: "dziękuję", ru: "спасибо" },
    { t: "dict", pl: "przepraszam", ru: "извините" },
    { t: "dict", pl: "cześć", ru: "привет / пока" },
    { t: "dict", pl: "dobrze", ru: "хорошо" },

    { t: "speak", pl: "Dzień dobry!", ru: "Здравствуйте!" },
    { t: "speak", pl: "Dziękuję bardzo.", ru: "Большое спасибо." },
    { t: "speak", pl: "Przepraszam, nie rozumiem.", ru: "Извините, я не понимаю." }
  ],
  srs: [
    ["Proszę powtórzyć", "повторите, пожалуйста"],
    ["Proszę mówić wolniej", "говорите медленнее, пожалуйста"],
    ["czy / trzy", "[чы] ли? / [тшы] три — пара-ловушка"],
    ["ząb — zęby", "зуб — зубы (носовые перед b)"],
    ["masło", "масло (ł = [ў])"]
  ]
},

/* ================= УРОК 2 ================= */
{
  id: "w1l2", week: 1, day: "Ср", mins: 17,
  title: "Знакомство и вежливость: pan / pani",
  goal: "Представиться формально и неформально, не путая регистры",
  steps: [
    { t: "ex", title: "Представиться и спросить имя",
      html: "<p>Два способа сказать «я — Дима»:</p>" +
        "<p>{{Jestem Dima.}} — «Я Дима» (универсально).<br>{{Mam na imię Dima.}} — «Меня зовут Дима» (дословно «имею на имя»).</p>" +
        "<p>Спросить имя:</p>" +
        "<p>Неформально (на «ты»): {{Jak masz na imię?}}<br>" +
        "Формально (мужчину): {{Jak się pan nazywa?}}<br>" +
        "Формально (женщину): {{Jak się pani nazywa?}}</p>" +
        "<p>Ответ на знакомство: {{Miło mi}} — «приятно познакомиться». Тебе ответят {{Mnie też}} — «мне тоже».</p>" },

    { t: "ex", title: "Главное отличие от русского: нет «вы»",
      html: "<p>В польском вежливое обращение — это <b>pan (к мужчине) / pani (к женщине) + глагол в 3-м лице</b>. Дословно «Говорит ли пан по-английски?» = наше «Вы говорите по-английски?»:</p>" +
        "<p>{{Czy pan mówi po angielsku?}} — к мужчине<br>{{Czy pani mówi po angielsku?}} — к женщине</p>" +
        "<p>Обратиться на wy (вы) к одному человеку — ошибка, звучит странно.</p>" +
        "<table><tr><th>Формально</th><th>Неформально</th></tr>" +
        "<tr><td>{{Dzień dobry}}</td><td>{{Cześć}}</td></tr>" +
        "<tr><td>{{Do widzenia}}</td><td>{{Na razie}} / {{Pa}}</td></tr>" +
        "<tr><td>{{Jak się pani ma?}}</td><td>{{Jak się masz?}}</td></tr>" +
        "<tr><td>{{Dziękuję}}</td><td>{{Dzięki}}</td></tr></table>" +
        "<p>Правило улицы: продавцы, соседи старше, urząd — всегда pan/pani. «Ты» — только если предложили сами.</p>" },

    { t: "mcq", q: "Как вежливо спросить женщину, как её зовут?",
      opts: ["Jak masz na imię?", "Jak się pani nazywa?", "Jak się pan nazywa?"], a: 1,
      why: "pani — к женщине, глагол в 3-м лице. Jak masz na imię — это на «ты»." },

    { t: "mcq", q: "«Вы говорите по-русски?» — мужчине:",
      opts: ["Czy pan mówi po rosyjsku?", "Czy mówisz po rosyjsku?", "Czy wy mówicie po rosyjsku?"], a: 0,
      why: "Вежливо = pan + 3-е лицо: Czy pan mówi…? Вариант на -sz — это «ты», wy к одному человеку не говорят." },

    { t: "mcq", q: "Прощаешься с приятелем-соседом. Что скажешь?",
      opts: ["Do widzenia!", "Na razie!", "Dobranoc pani!"], a: 1,
      why: "Na razie — неформальное «пока». Do widzenia — формально." },

    { t: "type", q: "Переведи: «Меня зовут Дима.»",
      a: ["Mam na imię Dima", "Mam na imie Dima"], hint: "дословно: «имею на имя»" },

    { t: "type", q: "Переведи: «Приятно познакомиться» (короткая форма)",
      a: "Miło mi", hint: "два слова" },

    { t: "dict", pl: "Jak się pani nazywa?", ru: "Как вас зовут? (к женщине)" },
    { t: "dict", pl: "Miło mi pana poznać.", ru: "Приятно с вами познакомиться (к мужчине)." },

    { t: "speak", pl: "Dzień dobry! Jestem Dima.", ru: "Здравствуйте! Я Дима." },
    { t: "speak", pl: "Jak się pan nazywa?", ru: "Как вас зовут? (к мужчине)" },
    { t: "speak", pl: "Miło mi!", ru: "Приятно познакомиться!" }
  ],
  srs: [
    ["Jak się pan nazywa?", "как вас зовут? (к мужчине)"],
    ["Jak się pani nazywa?", "как вас зовут? (к женщине)"],
    ["Czy pan mówi po angielsku?", "вы говорите по-английски? (м)"],
    ["Mnie też", "мне тоже"],
    ["Na razie", "пока (неформально)"]
  ]
},

/* ================= УРОК 3 ================= */
{
  id: "w1l3", week: 1, day: "Пт", mins: 19,
  title: "Быть: jestem, jesteś, jest + рассказ о себе",
  goal: "Спрягать być и выдать монолог о себе на 5 фраз",
  steps: [
    { t: "ex", title: "Главный глагол: być (быть)",
      html: "<table><tr><th>Кто</th><th>Форма</th><th>Пример</th></tr>" +
        "<tr><td>ja (я)</td><td><b>jestem</b></td><td>{{Jestem z Rosji.}}</td></tr>" +
        "<tr><td>ty (ты)</td><td><b>jesteś</b></td><td>{{Skąd jesteś?}}</td></tr>" +
        "<tr><td>on / ona / pan / pani</td><td><b>jest</b></td><td>{{To jest kawa.}}</td></tr>" +
        "<tr><td>my (мы)</td><td><b>jesteśmy</b></td><td>{{Jesteśmy z Rosji.}}</td></tr>" +
        "<tr><td>oni (они)</td><td><b>są</b></td><td>{{Oni są tutaj.}}</td></tr></table>" +
        "<p><b>Ключевое отличие от русского: связку нельзя опускать.</b> По-русски «я из России» — без глагола. По-польски обязательно: <b>Jestem</b> z Rosji.</p>" +
        "<p>Зато местоимение можно (и обычно нужно) опускать: не «Ja jestem», а просто {{Jestem}} — форма глагола уже говорит, кто.</p>" },

    { t: "ex", title: "Рассказ о себе: 5 опорных фраз",
      html: "<p>{{Skąd jesteś?}} — откуда ты? → {{Jestem z Rosji.}}<br>" +
        "{{Gdzie mieszkasz?}} — где живёшь? → {{Mieszkam w Warszawie.}}<br>" +
        "{{Kim jesteś?}} — кто ты (по профессии)? → {{Jestem menedżerem.}}</p>" +
        "<p>⚠️ «Я менеджер» = Jestem menedżer<b>em</b>, «я студент» = Jestem student<b>em</b>. Это творительный падеж — пока запоминаем как чанк, правило разберём на неделе 5.</p>" +
        "<p>Ещё два кирпича монолога:<br>{{Mówię po rosyjsku i po angielsku.}} — говорю по-русски и по-английски.<br>{{Uczę się polskiego.}} — учу польский.</p>" },

    { t: "mcq", q: "On ___ z Polski.",
      opts: ["jestem", "jest", "jesteś"], a: 1,
      why: "on/ona/pan/pani → jest." },

    { t: "mcq", q: "Как правильно сказать «я студент»?",
      opts: ["Ja student", "Jestem student", "Jestem studentem"], a: 2,
      why: "Связка обязательна + творительный падеж: Jestem studentem. «Ja student» — калька с русского, так нельзя." },

    { t: "type", q: "Вставь форму być: «My ___ z Rosji.»",
      a: "jesteśmy", hint: "мы …" },

    { t: "type", q: "Переведи: «Я живу в Варшаве.»",
      a: "Mieszkam w Warszawie", hint: "глагол mieszkać, местоимение не нужно" },

    { t: "type", q: "Переведи: «Откуда ты?»",
      a: ["Skąd jesteś?", "Skad jestes"], hint: "2 слова, начинается на S" },

    { t: "dict", pl: "Jestem z Rosji.", ru: "Я из России." },
    { t: "dict", pl: "Uczę się polskiego.", ru: "Я учу польский." },

    { t: "ex", title: "Финал: твой монолог",
      html: "<p>Собери всё в одно. Прочитай про себя, потом произнесёшь вслух по частям:</p>" +
        "<p style='font-size:17px;line-height:1.7'><b>{{Cześć, jestem Dima.}}<br>{{Jestem z Rosji.}}<br>{{Mieszkam w Warszawie.}}<br>{{Mówię po rosyjsku i po angielsku.}}<br>{{Uczę się polskiego.}}</b></p>" +
        "<p>Это твоя визитка на польском. Дальше — произнеси её вслух, по кускам.</p>" },

    { t: "speak", pl: "Cześć, jestem Dima. Jestem z Rosji.", ru: "Привет, я Дима. Я из России." },
    { t: "speak", pl: "Mieszkam w Warszawie.", ru: "Я живу в Варшаве." },
    { t: "speak", pl: "Mówię po rosyjsku i po angielsku. Uczę się polskiego.", ru: "Говорю по-русски и по-английски. Учу польский." }
  ],
  srs: [
    ["Skąd jesteś?", "откуда ты?"],
    ["Kim jesteś?", "кто ты (по профессии)?"],
    ["Jestem menedżerem", "я менеджер (⚠ -em!)"],
    ["Mówię po rosyjsku i po angielsku", "говорю по-русски и по-английски"],
    ["Uczę się polskiego", "я учу польский"]
  ]
},

/* ======================= НЕДЕЛЯ 2 ======================= */

/* ================= УРОК w2l1 ================= */
{
  id: "w2l1", week: 2, day: "Пн", mins: 18,
  title: "Обычные глаголы: спряжение -m / -sz",
  goal: "Спрягать глаголы на -ać и рассказывать, где живёшь и что делаешь",
  steps: [
    { t: "ex", title: "Один шаблон — куча глаголов",
      html: "<p>Большинство базовых глаголов на <b>-ać</b> спрягаются одинаково. Выучи один шаблон — заговоришь десятком глаголов.</p>" +
        "<table><tr><th>Кто</th><th>Окончание</th><th>mieszkać (жить)</th></tr>" +
        "<tr><td>ja (я)</td><td><b>-m</b></td><td>{{mieszkam}}</td></tr>" +
        "<tr><td>ty (ты)</td><td><b>-sz</b></td><td>{{mieszkasz}}</td></tr>" +
        "<tr><td>on / ona / pan / pani</td><td><b>-Ø</b></td><td>{{mieszka}}</td></tr>" +
        "<tr><td>my (мы)</td><td><b>-my</b></td><td>{{mieszkamy}}</td></tr>" +
        "<tr><td>oni (они)</td><td><b>-ją</b></td><td>{{mieszkają}}</td></tr></table>" +
        "<p>Так же: {{znać}} (знать) → znam, znasz; {{czytać}} (читать) → czytam; {{pytać}} (спрашивать) → pytam; {{czekać}} (ждать) → czekam.</p>" +
        "<p>И самый нужный — {{mieć}} (иметь): {{mam}}, {{masz}}, {{ma}}, {{mamy}}, {{mają}}. «У меня есть» = <b>mam</b>, а не «u mnie jest».</p>" },

    { t: "ex", title: "Где живёшь, где работаешь",
      html: "<p>Как в уроке про być — местоимение обычно опускаем, окончание уже говорит, кто.</p>" +
        "<p>{{Gdzie mieszkasz?}} — где живёшь? → {{Mieszkam w Warszawie.}}<br>" +
        "{{Gdzie pracujesz?}} — где работаешь? → {{Pracuję w biurze.}}</p>" +
        "<p>⚠️ {{pracować}} (работать) чуть другого типа: pracuj<b>ę</b>, pracuj<b>esz</b>. Пока запомни как есть — этот тип (-ę/-esz) подробно на неделе 4.</p>" +
        "<p>Предлог <b>w</b> = «в»: mieszkam <b>w</b> Warszawie, <b>w</b> Krakowie, <b>w</b> centrum.</p>" },

    { t: "mcq", q: "Ty ___ w Polsce. (mieszkać)",
      opts: ["mieszkam", "mieszkasz", "mieszka"], a: 1,
      why: "ty → окончание -sz: mieszkasz." },

    { t: "mcq", q: "«У меня есть время» — как правильно?",
      opts: ["U mnie jest czas", "Mam czas", "Jestem czas"], a: 1,
      why: "«Иметь» = mieć. У меня есть = Mam. Калька «u mnie jest» — ошибка." },

    { t: "mcq", q: "My ___ po polsku. (czytać)",
      opts: ["czytają", "czytamy", "czytasz"], a: 1,
      why: "my → -my: czytamy." },

    { t: "cloze", text: "___ w Warszawie.", answer: "Mieszkam", ru: "Я живу в Варшаве.",
      opts: ["Mieszkam", "Mieszkasz", "Mieszka", "Mieszkają"],
      why: "ja → -m: Mieszkam." },

    { t: "type", q: "Вставь форму: «Ona ___ dwa koty.» (mieć)",
      a: "ma", hint: "on/ona → без окончания" },

    { t: "build", ru: "Где ты живёшь?", pl: "Gdzie mieszkasz", distractors: ["mieszkam", "jestem"] },

    { t: "type", q: "Переведи: «Я знаю.»",
      a: ["Wiem", "Znam"], hint: "если о факте — wiem; если знаком с кем/чем — znam" },

    { t: "dict", pl: "Gdzie mieszkasz?", ru: "Где ты живёшь?" },
    { t: "dict", pl: "Mam czas.", ru: "У меня есть время." },

    { t: "speak", pl: "Mieszkam w Warszawie.", ru: "Я живу в Варшаве." },
    { t: "speak", pl: "Gdzie pracujesz?", ru: "Где ты работаешь?" }
  ],
  srs: [
    ["Gdzie mieszkasz?", "где ты живёшь?"],
    ["Mieszkam w Warszawie", "я живу в Варшаве"],
    ["Gdzie pracujesz?", "где ты работаешь?"],
    ["Mam czas", "у меня есть время"],
    ["Czekam na ciebie", "я жду тебя"]
  ]
},

/* ================= УРОК w2l2 ================= */
{
  id: "w2l2", week: 2, day: "Ср", mins: 18,
  title: "Числа 11–100 и цены",
  goal: "Понять цену на слух и заплатить нужную сумму",
  steps: [
    { t: "ex", title: "11–20: держится на -naście",
      html: "<p>«-надцать» по-польски — <b>-naście</b>:</p>" +
        "<p>11 {{jedenaście}}, 12 {{dwanaście}}, 13 {{trzynaście}}, 14 {{czternaście}}, 15 {{piętnaście}}, 16 {{szesnaście}}, 17 {{siedemnaście}}, 18 {{osiemnaście}}, 19 {{dziewiętnaście}}.</p>" +
        "<p>Слышишь на конце <b>[-нашче]</b> — это число от 11 до 19.</p>" },

    { t: "ex", title: "Десятки и сотня",
      html: "<p>20 {{dwadzieścia}}, 30 {{trzydzieści}}, 40 {{czterdzieści}}, 50 {{pięćdziesiąt}}, 60 {{sześćdziesiąt}}, 70 {{siedemdziesiąt}}, 80 {{osiemdziesiąt}}, 90 {{dziewięćdziesiąt}}, 100 {{sto}}.</p>" +
        "<p>Составные — как в русском: 21 = {{dwadzieścia jeden}}, 35 = {{trzydzieści pięć}}, 48 = {{czterdzieści osiem}}.</p>" +
        "<p>Деньги: {{złoty}} меняет форму по числу — 1 złoty, 2–4 {{złote}}, 5+ {{złotych}}. «20 злотых» = {{dwadzieścia złotych}}.</p>" },

    { t: "mcq", q: "Что означает «piętnaście»?",
      opts: ["50", "15", "5"], a: 1,
      why: "piętnaście = 15 (окончание -naście = «-надцать»). 50 = pięćdziesiąt." },

    { t: "mcq", q: "Продавец говорит «czterdzieści złotych». Сколько платить?",
      opts: ["14 злотых", "40 злотых", "4 злотых"], a: 1,
      why: "czterdzieści = 40. Не путай с czternaście (14)." },

    { t: "mcq", q: "«Сколько это стоит?» по-польски:",
      opts: ["Ile to kosztuje?", "Gdzie to jest?", "Co to jest?"], a: 0,
      why: "Ile to kosztuje? — сколько это стоит. Ile = сколько." },

    { t: "match", pairs: [["dwanaście", "12"], ["dwadzieścia", "20"], ["pięćdziesiąt", "50"], ["sto", "100"], ["siedemnaście", "17"]] },

    { t: "type", q: "Напиши цифрами, сколько это: «trzydzieści pięć»",
      a: ["35"], hint: "trzydzieści + pięć" },

    { t: "cloze", text: "Ile to ___?", answer: "kosztuje", ru: "Сколько это стоит?",
      opts: ["kosztuje", "jest", "mam", "płacę"],
      why: "kosztować — стоить: Ile to kosztuje?" },

    { t: "dict", pl: "Ile to kosztuje?", ru: "Сколько это стоит?" },
    { t: "dict", pl: "Dwadzieścia złotych.", ru: "Двадцать злотых." },

    { t: "speak", pl: "Ile to kosztuje?", ru: "Сколько это стоит?" },
    { t: "speak", pl: "Płacę kartą, dziękuję.", ru: "Плачу картой, спасибо." }
  ],
  srs: [
    ["Ile to kosztuje?", "сколько это стоит?"],
    ["dwadzieścia złotych", "двадцать злотых"],
    ["Płacę kartą", "плачу картой"],
    ["Płacę gotówką", "плачу наличными"],
    ["Czy można kartą?", "можно картой?"]
  ]
},

/* ================= УРОК w2l3 ================= */
{
  id: "w2l3", week: 2, day: "Пт", mins: 17,
  title: "В кафе: заказ и оплата",
  goal: "Сделать заказ в кафе и заплатить, ничего не перепутав",
  steps: [
    { t: "ex", title: "Волшебное слово Poproszę",
      html: "<p>Заказ почти всегда начинается с {{Poproszę}} — «мне, пожалуйста…». После него называешь, что хочешь:</p>" +
        "<p>{{Poproszę kawę.}} — кофе, пожалуйста.<br>{{Poproszę herbatę i wodę.}} — чай и воду, пожалуйста.<br>{{Dla mnie sok, poproszę.}} — мне сок, пожалуйста.</p>" +
        "<p>⚠️ Заметь: kawa → kaw<b>ę</b>, herbata → herbat<b>ę</b>. Это винительный падеж — на неделе 3 разберём, пока запоминай как чанк: <b>после poproszę женские слова на -a меняют -a на -ę</b>.</p>" },

    { t: "ex", title: "Диалог у стойки",
      html: "<p>Типичные реплики бариста и твои ответы:</p>" +
        "<p>— {{Słucham?}} / {{Co podać?}} — Что желаете?<br>— {{Poproszę kawę.}}<br>— {{Coś jeszcze?}} — Что-нибудь ещё?<br>— {{Nie, dziękuję.}} / {{To wszystko.}}<br>— {{Na miejscu czy na wynos?}} — Здесь или с собой?<br>— {{Na wynos.}} — С собой.</p>" +
        "<p>В конце: {{Ile płacę?}} — сколько с меня? И {{Płacę kartą.}}</p>" },

    { t: "mcq", q: "Хочешь кофе с собой. Что скажешь?",
      opts: ["Poproszę kawę na miejscu.", "Poproszę kawę na wynos.", "Gdzie jest kawa?"], a: 1,
      why: "na wynos = с собой; na miejscu = здесь." },

    { t: "mcq", q: "«Coś jeszcze?» — что у тебя спросили?",
      opts: ["Как дела?", "Что-нибудь ещё?", "Где ты?"], a: 1,
      why: "Coś jeszcze? — что-нибудь ещё?" },

    { t: "build", ru: "Чай, пожалуйста.", pl: "Poproszę herbatę", distractors: ["kawę", "wodę"] },

    { t: "cloze", text: "Poproszę ___.", answer: "kawę", ru: "Кофе, пожалуйста.",
      opts: ["kawę", "kawa", "kawą", "kawie"],
      why: "После poproszę: kawa → kawę (винительный)." },

    { t: "type", q: "Переведи: «Сколько с меня?»",
      a: ["Ile płacę?", "Ile place"], hint: "дословно: «сколько плачу?»" },

    { t: "dict", pl: "Poproszę kawę i wodę.", ru: "Кофе и воду, пожалуйста." },
    { t: "dict", pl: "Na miejscu czy na wynos?", ru: "Здесь или с собой?" },

    { t: "speak", pl: "Dzień dobry, poproszę kawę.", ru: "Здравствуйте, кофе, пожалуйста." },
    { t: "speak", pl: "To wszystko, dziękuję.", ru: "Это всё, спасибо." }
  ],
  srs: [
    ["Poproszę kawę", "кофе, пожалуйста"],
    ["Coś jeszcze?", "что-нибудь ещё?"],
    ["Na wynos", "с собой"],
    ["To wszystko", "это всё"],
    ["Ile płacę?", "сколько с меня?"]
  ]
},

/* ======================= НЕДЕЛЯ 3 ======================= */

/* ================= УРОК w3l1 ================= */
{
  id: "w3l1", week: 3, day: "Пн", mins: 18,
  title: "Кто это? Что это? Род и ten / ta / to",
  goal: "Определять род слова и правильно указывать: этот / эта / это",
  steps: [
    { t: "ex", title: "Род виден по окончанию",
      html: "<p>У польских существительных три рода, и обычно род видно по последней букве:</p>" +
        "<table><tr><th>Окончание</th><th>Род</th><th>«этот»</th><th>Пример</th></tr>" +
        "<tr><td>согласный</td><td>мужской</td><td><b>ten</b></td><td>{{ten sklep}}, {{ten chleb}}</td></tr>" +
        "<tr><td>-a</td><td>женский</td><td><b>ta</b></td><td>{{ta kawa}}, {{ta kobieta}}</td></tr>" +
        "<tr><td>-o, -e</td><td>средний</td><td><b>to</b></td><td>{{to mleko}}, {{to jest okno}}</td></tr></table>" +
        "<p>Исключения есть (например, {{mężczyzna}} — мужчина — на -a, но мужского рода), но правило «по окончанию» работает в 90% случаев.</p>" },

    { t: "ex", title: "Kto to jest? / Co to jest?",
      html: "<p>Два вопроса-ключа:</p>" +
        "<p>{{Kto to jest?}} — Кто это? (о людях) → {{To jest pan Adam.}}<br>" +
        "{{Co to jest?}} — Что это? (о вещах) → {{To jest chleb.}}</p>" +
        "<p>⚠️ Здесь <b>to jest</b> — универсальное «это (есть)», род слова после него не меняет само «to»: {{To jest kawa}}, {{To jest sklep}}, {{To jest mleko}} — всегда «to jest».</p>" +
        "<p>Не путай: <b>to</b> в «to jest» = «это»; а <b>to</b> как «этот» — только для среднего рода (to mleko).</p>" },

    { t: "mcq", q: "Какое слово подставить: «___ kawa jest dobra»?",
      opts: ["ten", "ta", "to"], a: 1,
      why: "kawa на -a → женский род → ta kawa." },

    { t: "mcq", q: "«___ sklep jest zamknięty» (магазин закрыт):",
      opts: ["ten", "ta", "to"], a: 0,
      why: "sklep оканчивается на согласный → мужской род → ten sklep." },

    { t: "mcq", q: "Спрашиваешь про человека: «Кто это?»",
      opts: ["Co to jest?", "Kto to jest?", "Gdzie to jest?"], a: 1,
      why: "Kto — кто (о людях); Co — что (о вещах)." },

    { t: "match", pairs: [["ten chleb", "этот хлеб"], ["ta woda", "эта вода"], ["to mleko", "это молоко"], ["ten pan", "этот господин"]] },

    { t: "cloze", text: "___ to jest? To jest chleb.", answer: "Co", ru: "Что это? Это хлеб.",
      opts: ["Co", "Kto", "Gdzie", "Jak"],
      why: "О вещи спрашиваем Co to jest?" },

    { t: "type", q: "Переведи: «Это молоко.»",
      a: ["To jest mleko", "To mleko"], hint: "универсальное «to jest»" },

    { t: "build", ru: "Кто это?", pl: "Kto to jest", distractors: ["co", "gdzie"] },

    { t: "dict", pl: "Co to jest?", ru: "Что это?" },
    { t: "dict", pl: "To jest kawa.", ru: "Это кофе." },

    { t: "speak", pl: "Kto to jest?", ru: "Кто это?" },
    { t: "speak", pl: "To jest mój dom.", ru: "Это мой дом." }
  ],
  srs: [
    ["Kto to jest?", "кто это?"],
    ["Co to jest?", "что это?"],
    ["To jest…", "это (есть)…"],
    ["ten / ta / to", "этот / эта / это (м/ж/ср)"],
    ["To jest bardzo dobre", "это очень хорошо"]
  ]
},

/* ================= УРОК w3l2 ================= */
{
  id: "w3l2", week: 3, day: "Ср", mins: 18,
  title: "«Poproszę kawę»: винительный как чанк",
  goal: "Правильно называть, ЧТО просишь и покупаешь",
  steps: [
    { t: "ex", title: "Что меняется, когда просишь",
      html: "<p>«Хочу/прошу что-то» → это винительный падеж (biernik). Хорошая новость: для еды правило простое.</p>" +
        "<table><tr><th>Род</th><th>Как меняется</th><th>Пример</th></tr>" +
        "<tr><td>женский -a</td><td>-a → <b>-ę</b></td><td>kawa → {{Poproszę kawę}}</td></tr>" +
        "<tr><td>мужской (неживой)</td><td>без изменений</td><td>chleb → {{Poproszę chleb}}</td></tr>" +
        "<tr><td>средний -o/-e</td><td>без изменений</td><td>mleko → {{Poproszę mleko}}</td></tr></table>" +
        "<p>То есть меняются только женские слова на -a: {{herbatę}}, {{zupę}}, {{wodę}}, {{sałatkę}}. Остальное берёшь как в словаре.</p>" },

    { t: "ex", title: "Количества на рынке",
      html: "<p>Часто просишь не «что», а «сколько чего» — тогда после количества идёт другая форма (родительный), но это тоже устойчивые чанки:</p>" +
        "<p>{{kilogram jabłek}} — килограмм яблок<br>{{pół kilo sera}} — полкило сыра<br>{{dziesięć deka szynki}} — 100 г ветчины<br>{{bochenek chleba}} — буханка хлеба</p>" +
        "<p>Заказ целиком: {{Poproszę kilogram jabłek i bochenek chleba.}}</p>" },

    { t: "mcq", q: "Как правильно попросить суп?",
      opts: ["Poproszę zupa.", "Poproszę zupę.", "Poproszę zupą."], a: 1,
      why: "zupa (жен. -a) → в винительном zupę: Poproszę zupę." },

    { t: "mcq", q: "А хлеб (chleb)?",
      opts: ["Poproszę chleba.", "Poproszę chlebę.", "Poproszę chleb."], a: 2,
      why: "chleb — мужской неживой, в винительном не меняется: Poproszę chleb." },

    { t: "cloze", text: "Poproszę ___ z cytryną.", answer: "herbatę", ru: "Чай с лимоном, пожалуйста.",
      opts: ["herbatę", "herbata", "herbatą"],
      why: "herbata → herbatę (винительный женского рода)." },

    { t: "build", ru: "Воду, пожалуйста.", pl: "Poproszę wodę", distractors: ["woda", "kawę"] },

    { t: "type", q: "Переведи: «Кофе, пожалуйста.» (не забудь окончание)",
      a: ["Poproszę kawę", "Poprosze kawe"], hint: "kawa → kaw…" },

    { t: "match", pairs: [["Poproszę kawę", "кофе, пожалуйста"], ["Poproszę chleb", "хлеб, пожалуйста"], ["Poproszę wodę", "воду, пожалуйста"], ["kilogram jabłek", "килограмм яблок"]] },

    { t: "dict", pl: "Poproszę herbatę.", ru: "Чай, пожалуйста." },
    { t: "dict", pl: "Kilogram jabłek, proszę.", ru: "Килограмм яблок, пожалуйста." },

    { t: "speak", pl: "Poproszę zupę i wodę.", ru: "Суп и воду, пожалуйста." },
    { t: "speak", pl: "Poproszę kilogram jabłek.", ru: "Килограмм яблок, пожалуйста." }
  ],
  srs: [
    ["Poproszę kawę", "кофе, пожалуйста"],
    ["Poproszę chleb", "хлеб, пожалуйста"],
    ["Poproszę wodę", "воду, пожалуйста"],
    ["kilogram jabłek", "килограмм яблок"],
    ["pół kilo sera", "полкило сыра"]
  ]
},

/* ================= УРОК w3l3 ================= */
{
  id: "w3l3", week: 3, day: "Пт", mins: 17,
  title: "Магазин и рынок: закрыть покупку",
  goal: "Купить нужное, спросить цену и завершить покупку",
  steps: [
    { t: "ex", title: "Сценарий покупки",
      html: "<p>Стандартный поход в sklep или на рынок:</p>" +
        "<p>— {{Słucham?}} — Слушаю вас?<br>— {{Poproszę kilogram pomidorów.}}<br>— {{Coś jeszcze?}}<br>— {{Tak, chleb i mleko.}}<br>— {{To wszystko?}}<br>— {{Tak, to wszystko. Ile płacę?}}<br>— {{Dwadzieścia złotych.}}</p>" +
        "<p>Полезное: {{Czy jest…?}} — «Есть ли…?»: {{Czy jest świeży chleb?}} — есть свежий хлеб?</p>" },

    { t: "ex", title: "Мелочи, которые выручают",
      html: "<p>{{Tylko tyle.}} — только это (и всё).<br>{{Czy mogę zapłacić kartą?}} — можно картой?<br>{{Poproszę paragon.}} — чек, пожалуйста.<br>{{Reszta dla pana / pani.}} — сдачу оставьте себе.</p>" +
        "<p>Если не понял цену: {{Proszę powtórzyć.}} — повторите, пожалуйста. {{Proszę wolniej.}} — медленнее.</p>" },

    { t: "mcq", q: "Продавец спросил «To wszystko?». Ты закончил. Ответ:",
      opts: ["Tak, to wszystko.", "Coś jeszcze.", "Nie rozumiem."], a: 0,
      why: "To wszystko? = это всё? → Tak, to wszystko." },

    { t: "mcq", q: "Как спросить, есть ли в продаже молоко?",
      opts: ["Gdzie jest mleko?", "Czy jest mleko?", "Ile to mleko?"], a: 1,
      why: "Czy jest…? — есть ли…?: Czy jest mleko?" },

    { t: "build", ru: "Это всё, сколько с меня?", pl: "To wszystko ile płacę", distractors: ["jest", "kosztuje"] },

    { t: "cloze", text: "Czy mogę zapłacić ___?", answer: "kartą", ru: "Можно заплатить картой?",
      opts: ["kartą", "karta", "kartę"],
      why: "«Чем платить» — творительный: kartą, gotówką." },

    { t: "type", q: "Переведи: «Чек, пожалуйста.»",
      a: ["Poproszę paragon", "Poprosze paragon"], hint: "чек = paragon" },

    { t: "dict", pl: "Czy jest świeży chleb?", ru: "Есть свежий хлеб?" },
    { t: "dict", pl: "To wszystko, dziękuję.", ru: "Это всё, спасибо." },

    { t: "speak", pl: "Poproszę kilogram pomidorów.", ru: "Килограмм помидоров, пожалуйста." },
    { t: "speak", pl: "Czy mogę zapłacić kartą?", ru: "Можно заплатить картой?" }
  ],
  srs: [
    ["Czy jest…?", "есть ли…?"],
    ["To wszystko", "это всё"],
    ["Ile płacę?", "сколько с меня?"],
    ["Poproszę paragon", "чек, пожалуйста"],
    ["Czy mogę zapłacić kartą?", "можно заплатить картой?"]
  ]
},

/* ======================= НЕДЕЛЯ 4 ======================= */

/* ================= УРОК w4l1 ================= */
{
  id: "w4l1", week: 4, day: "Пн", mins: 18,
  title: "Могу, хочу, должен: mogę / chcę / muszę",
  goal: "Формулировать просьбу и намерение через модальный глагол + инфинитив",
  steps: [
    { t: "ex", title: "Три глагола-ключа + инфинитив",
      html: "<p>Эти три глагола открывают почти любую просьбу. После них — глагол в начальной форме (инфинитив):</p>" +
        "<table><tr><th>ja</th><th>ty</th><th>значение</th></tr>" +
        "<tr><td><b>{{mogę}}</b></td><td>{{możesz}}</td><td>могу / можешь</td></tr>" +
        "<tr><td><b>{{chcę}}</b></td><td>{{chcesz}}</td><td>хочу / хочешь</td></tr>" +
        "<tr><td><b>{{muszę}}</b></td><td>{{musisz}}</td><td>должен / должна</td></tr></table>" +
        "<p>{{Chcę kupić bilet.}} — хочу купить билет.<br>{{Muszę iść.}} — мне надо идти.<br>{{Mogę zapłacić kartą?}} — могу заплатить картой?</p>" +
        "<p>Это тип спряжения на <b>-ę / -esz</b> (не -m/-sz). Заметь мягкое [щ]/[ш] в chcę [хцэ], muszę [мушэ].</p>" },

    { t: "ex", title: "Вежливое Czy mogę…?",
      html: "<p>Самая полезная конструкция для выживания — вопрос-просьба {{Czy mogę…?}} («Можно ли мне…?»):</p>" +
        "<p>{{Czy mogę zapłacić kartą?}} — можно картой?<br>{{Czy mogę o coś zapytać?}} — можно спросить?<br>{{Czy mogę tu usiąść?}} — можно здесь сесть?</p>" +
        "<p>Слово {{czy}} в начале превращает фразу в вопрос (как английское «do»). Его часто опускают, но с ним звучит вежливее.</p>" },

    { t: "mcq", q: "«Мне надо идти» — это:",
      opts: ["Chcę iść.", "Muszę iść.", "Mogę iść."], a: 1,
      why: "muszę = должен/надо. chcę = хочу, mogę = могу." },

    { t: "mcq", q: "После mogę/chcę/muszę глагол стоит в форме:",
      opts: ["как «ja» (mieszkam)", "в инфинитиве (iść, kupić)", "как «ty» (mieszkasz)"], a: 1,
      why: "Модальный + инфинитив: chcę kupić, muszę iść, mogę zapłacić." },

    { t: "mcq", q: "Вежливо спросить «можно заплатить картой?»",
      opts: ["Czy mogę zapłacić kartą?", "Muszę zapłacić kartą.", "Chcesz kartą?"], a: 0,
      why: "Czy mogę + инфинитив zapłacić." },

    { t: "cloze", text: "___ iść do domu.", answer: "Muszę", ru: "Мне надо идти домой.",
      opts: ["Muszę", "Mogę", "Chcę", "Mam"],
      why: "«Надо/должен» = muszę." },

    { t: "build", ru: "Я хочу купить билет.", pl: "Chcę kupić bilet", distractors: ["muszę", "kawę"] },

    { t: "type", q: "Переведи: «Можно спросить?»",
      a: ["Czy mogę zapytać?", "Czy moge zapytac", "Mogę zapytać?"], hint: "Czy mogę + zapytać" },

    { t: "match", pairs: [["mogę", "могу"], ["chcę", "хочу"], ["muszę", "должен"], ["możesz", "можешь"]] },

    { t: "dict", pl: "Muszę iść.", ru: "Мне надо идти." },
    { t: "dict", pl: "Czy mogę zapłacić kartą?", ru: "Можно заплатить картой?" },

    { t: "speak", pl: "Chcę kupić bilet.", ru: "Я хочу купить билет." },
    { t: "speak", pl: "Czy mogę tu usiąść?", ru: "Можно здесь сесть?" }
  ],
  srs: [
    ["Czy mogę…?", "можно…? / могу ли я…?"],
    ["Chcę kupić…", "хочу купить…"],
    ["Muszę iść", "мне надо идти"],
    ["Czy mogę zapłacić kartą?", "можно заплатить картой?"],
    ["Możesz mi pomóc?", "можешь мне помочь?"]
  ]
},

/* ================= УРОК w4l2 ================= */
{
  id: "w4l2", week: 4, day: "Ср", mins: 18,
  title: "Город и направления",
  goal: "Спросить дорогу и понять ответ «прямо, потом направо»",
  steps: [
    { t: "ex", title: "Спросить, где что-то",
      html: "<p>Универсальный вопрос: {{Gdzie jest…?}} — Где находится…?</p>" +
        "<p>{{Przepraszam, gdzie jest apteka?}} — извините, где аптека?<br>{{Gdzie jest przystanek?}} — где остановка?<br>{{Gdzie jest toaleta?}} — где туалет?</p>" +
        "<p>Начинай с {{Przepraszam}} — «извините», это вежливый способ обратиться к незнакомому.</p>" },

    { t: "ex", title: "Слова-направления в ответе",
      html: "<p>{{prosto}} — прямо<br>{{w prawo}} — направо<br>{{w lewo}} — налево<br>{{obok}} — рядом<br>{{na rogu}} — на углу<br>{{niedaleko}} — недалеко</p>" +
        "<p>Типичный ответ: {{Prosto, potem w prawo.}} — прямо, потом направо. {{To niedaleko, pięć minut.}} — это недалеко, пять минут.</p>" +
        "<p>Куда идёшь — чанк с {{do}}: {{Idę do sklepu.}} — иду в магазин. {{Idę do apteki.}} — иду в аптеку.</p>" },

    { t: "mcq", q: "Тебе ответили «w prawo». Куда идти?",
      opts: ["прямо", "направо", "налево"], a: 1,
      why: "w prawo = направо; w lewo = налево; prosto = прямо." },

    { t: "mcq", q: "Как вежливо начать вопрос к прохожему?",
      opts: ["Cześć!", "Przepraszam,…", "Dobranoc,…"], a: 1,
      why: "Przepraszam — «извините», нейтрально-вежливо к незнакомому." },

    { t: "cloze", text: "Gdzie ___ apteka?", answer: "jest", ru: "Где аптека?",
      opts: ["jest", "są", "ma", "to"],
      why: "Gdzie jest…? — где находится (ед. число, jest)." },

    { t: "build", ru: "Извините, где остановка?", pl: "Przepraszam gdzie jest przystanek", distractors: ["apteka"] },

    { t: "match", pairs: [["prosto", "прямо"], ["w prawo", "направо"], ["w lewo", "налево"], ["obok", "рядом"], ["na rogu", "на углу"]] },

    { t: "type", q: "Переведи: «Где аптека?»",
      a: ["Gdzie jest apteka?", "Gdzie jest apteka"], hint: "Gdzie jest…?" },

    { t: "dict", pl: "Gdzie jest przystanek?", ru: "Где остановка?" },
    { t: "dict", pl: "Prosto, potem w prawo.", ru: "Прямо, потом направо." },

    { t: "speak", pl: "Przepraszam, gdzie jest apteka?", ru: "Извините, где аптека?" },
    { t: "speak", pl: "Czy to daleko?", ru: "Это далеко?" }
  ],
  srs: [
    ["Gdzie jest…?", "где находится…?"],
    ["Przepraszam, gdzie jest apteka?", "извините, где аптека?"],
    ["prosto, potem w prawo", "прямо, потом направо"],
    ["To niedaleko", "это недалеко"],
    ["Idę do sklepu", "иду в магазин"]
  ]
},

/* ================= УРОК w4l3 ================= */
{
  id: "w4l3", week: 4, day: "Пт", mins: 18,
  title: "Который час и договориться о встрече",
  goal: "Спросить время, понять ответ и назначить встречу — закрыть месяц",
  steps: [
    { t: "ex", title: "Который час?",
      html: "<p>{{Która godzina?}} — Который час? Ответ — «jest» + порядковое число (женский род, потому что godzina):</p>" +
        "<p>{{Jest pierwsza.}} — час (1:00).<br>{{Jest druga.}} — два.<br>{{Jest trzecia.}} — три.<br>… {{czwarta, piąta, szósta, siódma, ósma, dziewiąta, dziesiąta}} — 4–10.</p>" +
        "<p>«Полдесятого» и минуты на старте не учим — достаточно узнавать целый час на слух.</p>" },

    { t: "ex", title: "Во сколько? Договориться",
      html: "<p>{{O której?}} — Во сколько? Ответ с {{o}} + форма на -ej: {{o ósmej}} — в восемь, {{o dziesiątej}} — в десять.</p>" +
        "<p>{{Spotkajmy się o piątej.}} — Давай встретимся в пять.<br>{{Masz czas jutro?}} — Есть время завтра?<br>{{O której się spotkamy?}} — Во сколько встретимся?</p>" +
        "<p>Время суток-чанки: {{rano}} — утром, {{po południu}} — после обеда, {{wieczorem}} — вечером.</p>" },

    { t: "mcq", q: "«Która godzina?» — о чём спрашивают?",
      opts: ["Какой день?", "Который час?", "Сколько стоит?"], a: 1,
      why: "Która godzina? — который час?" },

    { t: "mcq", q: "«В восемь» — как сказать?",
      opts: ["o ósmej", "ósma", "osiem"], a: 0,
      why: "«Во сколько» → o + форма на -ej: o ósmej. Osiem — это просто «восемь»." },

    { t: "mcq", q: "Как предложить встретиться в пять?",
      opts: ["Spotkajmy się o piątej.", "Która godzina?", "Mam czas."], a: 0,
      why: "Spotkajmy się o piątej — давай встретимся в пять." },

    { t: "cloze", text: "___ godzina?", answer: "Która", ru: "Который час?",
      opts: ["Która", "Który", "Ile", "Gdzie"],
      why: "godzina — женский род → Która godzina?" },

    { t: "build", ru: "Есть время завтра?", pl: "Masz czas jutro", distractors: ["mam", "dzisiaj"] },

    { t: "match", pairs: [["rano", "утром"], ["po południu", "после обеда"], ["wieczorem", "вечером"], ["jutro", "завтра"]] },

    { t: "type", q: "Переведи: «Который час?»",
      a: ["Która godzina?", "Ktora godzina"], hint: "Która + godzina" },

    { t: "dict", pl: "O której się spotkamy?", ru: "Во сколько встретимся?" },
    { t: "dict", pl: "Mam czas wieczorem.", ru: "У меня есть время вечером." },

    { t: "speak", pl: "Która godzina?", ru: "Который час?" },
    { t: "speak", pl: "Spotkajmy się o piątej.", ru: "Давай встретимся в пять." }
  ],
  srs: [
    ["Która godzina?", "который час?"],
    ["O której?", "во сколько?"],
    ["Spotkajmy się o piątej", "давай встретимся в пять"],
    ["Masz czas jutro?", "есть время завтра?"],
    ["wieczorem", "вечером"]
  ]
}
];
