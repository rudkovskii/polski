/* ДАННЫЕ ДНЕЙ — диалоги и «миссии дня» (DAYS)
   Вынесено из index.html (Фаза 0). Правь контент здесь — приложение подхватит.
   Это глобальные данные, доступные всем модулям приложения. */

const DAYS = [
  { d:1, theme:"Powitania i grzeczność", ru:"Приветствия и вежливость",
    mission:"Поздоровайся по-польски с продавцом или соседом: «Dzień dobry!»",
    dialog:[
      ["A","Dzień dobry pani!","Здравствуйте! (к женщине)"],
      ["B","Dzień dobry! Jak się pani ma?","Здравствуйте! Как вы?"],
      ["A","Dobrze, dziękuję. A pani?","Хорошо, спасибо. А вы?"],
      ["B","Też dobrze. Miłego dnia!","Тоже хорошо. Хорошего дня!"],
      ["A","Dziękuję, nawzajem!","Спасибо, взаимно!"]
    ]},
  { d:2, theme:"Liczby i kawiarnia", ru:"Числа, деньги и кафе",
    mission:"Закажи кофе: «Poproszę kawę. Płacę kartą.»",
    dialog:[
      ["A","Dzień dobry! Słucham?","Здравствуйте! Что желаете?"],
      ["B","Dzień dobry. Poproszę kawę.","Здравствуйте. Кофе, пожалуйста."],
      ["A","Coś jeszcze?","Что-нибудь ещё?"],
      ["B","Nie, dziękuję. Ile to kosztuje?","Нет, спасибо. Сколько это стоит?"],
      ["A","Dwanaście złotych.","Двенадцать злотых."],
      ["B","Płacę kartą.","Плачу картой."]
    ]},
  { d:3, theme:"Zakupy i jedzenie", ru:"Магазин и еда",
    mission:"Купи хлеб и яблоки, спроси: «Ile to kosztuje?»",
    dialog:[
      ["A","Dzień dobry. Poproszę kilogram jabłek.","Здравствуйте. Килограмм яблок, пожалуйста."],
      ["B","Coś jeszcze?","Что-нибудь ещё?"],
      ["A","Tak, chleb i mleko.","Да, хлеб и молоко."],
      ["B","To wszystko?","Это всё?"],
      ["A","Tak. Ile płacę?","Да. Сколько с меня?"],
      ["B","Dwadzieścia złotych.","Двадцать злотых."]
    ]},
  { d:4, theme:"Ja i ty", ru:"Я и ты: о себе",
    mission:"Расскажи о себе: «Jestem z Rosji. Mieszkam w Warszawie.»",
    dialog:[
      ["A","Jak masz na imię?","Как тебя зовут?"],
      ["B","Mam na imię Dima. Jestem z Rosji.","Меня зовут Дима. Я из России."],
      ["A","Gdzie mieszkasz?","Где ты живёшь?"],
      ["B","Mieszkam w Warszawie.","Я живу в Варшаве."],
      ["A","Miło mi!","Приятно познакомиться!"],
      ["B","Mnie też.","Мне тоже."]
    ]},
  { d:5, theme:"Czasowniki i prośby", ru:"Глаголы и просьбы",
    mission:"Попроси что-нибудь: «Czy mogę…? / Poproszę…»",
    dialog:[
      ["A","Przepraszam, czy mogę zapłacić kartą?","Извините, можно картой?"],
      ["B","Tak, oczywiście.","Да, конечно."],
      ["A","Poproszę paragon.","Чек, пожалуйста."],
      ["B","Proszę bardzo.","Пожалуйста."],
      ["A","Dziękuję!","Спасибо!"]
    ]},
  { d:6, theme:"Miasto i kierunki", ru:"Город и направления",
    mission:"Спроси дорогу: «Przepraszam, gdzie jest…?»",
    dialog:[
      ["A","Przepraszam, gdzie jest apteka?","Извините, где аптека?"],
      ["B","Prosto, potem w prawo.","Прямо, потом направо."],
      ["A","Czy to daleko?","Это далеко?"],
      ["B","Nie, blisko. Pięć minut.","Нет, близко. Пять минут."],
      ["A","Dziękuję bardzo!","Большое спасибо!"]
    ]},
  { d:7, theme:"Czas i przegląd", ru:"Время, дни и повтор",
    mission:"Small talk с соседом + закрепи всю неделю.",
    dialog:[
      ["A","Cześć! Która godzina?","Привет! Который час?"],
      ["B","Jest dziesiąta.","Десять часов."],
      ["A","Co robisz dzisiaj?","Что делаешь сегодня?"],
      ["B","Idę do pracy. A ty?","Иду на работу. А ты?"],
      ["A","Ja też. Miłego dnia!","Я тоже. Хорошего дня!"]
    ]},
  { d:8, theme:"Komunikacja miejska", ru:"Транспорт и проезд",
    mission:"Спроси про остановку и купи билет: «Gdzie jest przystanek?»",
    dialog:[
      ["A","Przepraszam, gdzie jest przystanek?","Извините, где остановка?"],
      ["B","Tam, po prawej stronie.","Там, справа."],
      ["A","Który autobus jedzie do centrum?","Какой автобус идёт в центр?"],
      ["B","Numer pięć.","Номер пять."],
      ["A","Gdzie kupię bilet?","Где купить билет?"],
      ["B","W automacie albo u kierowcy.","В автомате или у водителя."]
    ]},
  { d:9, theme:"Zdrowie i apteka", ru:"Здоровье и аптека",
    mission:"В аптеке скажи, что болит: «Boli mnie głowa.»",
    dialog:[
      ["A","Dzień dobry, w czym mogę pomóc?","Здравствуйте, чем могу помочь?"],
      ["B","Boli mnie głowa i gardło.","У меня болит голова и горло."],
      ["A","Ma pan gorączkę?","У вас есть температура?"],
      ["B","Tak, trochę. Co pani poleca?","Да, немного. Что посоветуете?"],
      ["A","Te tabletki, bez recepty.","Эти таблетки, без рецепта."],
      ["B","Dziękuję bardzo.","Большое спасибо."]
    ]},
  { d:10, theme:"Praca i urząd", ru:"Работа и документы",
    mission:"В urząd возьми талончик и спроси: «Gdzie wypełnić formularz?»",
    dialog:[
      ["A","Dzień dobry. Chcę złożyć wniosek.","Здравствуйте. Хочу подать заявление."],
      ["B","Proszę wziąć numerek i czekać.","Возьмите талончик и подождите."],
      ["A","Gdzie wypełnić formularz?","Где заполнить бланк?"],
      ["B","Tam jest stolik. Proszę o paszport.","Там есть столик. Дайте паспорт."],
      ["A","Proszę bardzo.","Пожалуйста."],
      ["B","Dziękuję. Proszę podpisać tutaj.","Спасибо. Подпишите здесь."]
    ]},
  { d:11, theme:"Restauracja", ru:"Ресторан и заказ",
    mission:"Забронируй столик и сделай заказ: «Poproszę zupę i sok.»",
    dialog:[
      ["A","Dzień dobry. Czy jest wolny stolik?","Здравствуйте. Есть свободный столик?"],
      ["B","Tak, dla ilu osób?","Да, на сколько человек?"],
      ["A","Dla dwóch. Poproszę menu.","На двоих. Меню, пожалуйста."],
      ["B","Co podać?","Что вам подать?"],
      ["A","Poproszę zupę i sok.","Суп и сок, пожалуйста."],
      ["B","Smacznego!","Приятного аппетита!"]
    ]},
  { d:12, theme:"Dom i usługi", ru:"Дом и сервисы",
    mission:"Сообщи, что что-то не работает: «Internet nie działa.»",
    dialog:[
      ["A","Dzień dobry, internet nie działa.","Здравствуйте, интернет не работает."],
      ["B","Od kiedy?","С какого времени?"],
      ["A","Od wczoraj. Co robić?","Со вчера. Что делать?"],
      ["B","Wyślę kuriera jutro.","Пришлю курьера завтра."],
      ["A","O której godzinie?","В котором часу?"],
      ["B","Rano, koło dziesiątej.","Утром, около десяти."]
    ]},
  { d:13, theme:"Czas wolny i pogoda", ru:"Досуг и погода",
    mission:"Договорись о встрече: «Spotkajmy się w weekend.»",
    dialog:[
      ["A","Co robisz w weekend?","Что делаешь на выходных?"],
      ["B","Nie mam planów. A ty?","Нет планов. А ты?"],
      ["A","Idę do kina. Idziesz ze mną?","Иду в кино. Пойдёшь со мной?"],
      ["B","Jaka będzie pogoda?","Какая будет погода?"],
      ["A","Ma być ładnie i ciepło.","Обещают хорошо и тепло."],
      ["B","Super, spotkajmy się!","Супер, давай встретимся!"]
    ]},
  { d:14, theme:"Przegląd i sytuacje", ru:"Повтор и фразы-связки",
    mission:"Используй за день 3 связки: «Nie ma problemu», «Zgadza się», «Powodzenia!»",
    dialog:[
      ["A","Przepraszam, jak to powiedzieć po polsku?","Извините, как это сказать по-польски?"],
      ["B","Proszę powtórzyć wolniej.","Повторите медленнее, пожалуйста."],
      ["A","Czy może pani pomóc?","Вы можете помочь?"],
      ["B","Oczywiście, nie ma problemu.","Конечно, нет проблем."],
      ["A","Dziękuję za pomoc!","Спасибо за помощь!"],
      ["B","Nie ma za co. Powodzenia!","Не за что. Удачи!"]
    ]}
];
