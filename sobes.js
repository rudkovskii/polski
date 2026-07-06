/* ============================================================
   СОБЕС — банк вопросов к собеседованию на ПМЖ (уровень Карты поляка)
   + движок: чеклист «в тетрадке», SRS-повторения, мини-экзамен.
   Поля карточки: id, c (категория), qr/qp (вопрос RU/PL),
   ap/ar (эталонный ответ PL/RU), n (заметка, опц.), p (личный блок).
   ============================================================ */

const SOBES_CATS = [
  { id:"og", t:"Общие и символы",      tp:"Pytania ogólne" },
  { id:"hi", t:"История",              tp:"Historia" },
  { id:"ge", t:"География",            tp:"Geografia" },
  { id:"tr", t:"Традиции и кухня",     tp:"Tradycje i kuchnia" },
  { id:"lu", t:"Знаменитые поляки",    tp:"Znani Polacy" },
  { id:"ws", t:"Современная Польша",   tp:"Polska współczesna" },
  { id:"os", t:"Личный блок",          tp:"Blok osobisty" }
];

const SOBES_BANK = [

/* ---------- ОБЩИЕ И СИМВОЛЫ ---------- */
{ id:"og1", c:"og",
  qr:"Как выглядит флаг Польши?",
  qp:"Jak wygląda polska flaga?",
  ap:"Flaga Polski jest biało-czerwona: na górze biały pas, na dole czerwony.",
  ar:"Флаг Польши бело-красный: сверху белая полоса, снизу красная." },
{ id:"og2", c:"og",
  qr:"Как выглядит герб Польши?",
  qp:"Jak wygląda godło Polski?",
  ap:"Godłem Polski jest biały orzeł w złotej koronie na czerwonym tle.",
  ar:"Герб Польши — белый орёл в золотой короне на красном фоне.",
  n:"Связан с легендой о Лехе (og10)." },
{ id:"og3", c:"og",
  qr:"Как называется гимн Польши и кто его написал?",
  qp:"Jak nazywa się hymn Polski i kto go napisał?",
  ap:"Hymn Polski to „Mazurek Dąbrowskiego”. Słowa napisał Józef Wybicki w 1797 roku we Włoszech.",
  ar:"Гимн Польши — «Мазурка Домбровского». Слова написал Юзеф Выбицкий в 1797 году в Италии." },
{ id:"og4", c:"og",
  qr:"Какая столица Польши?",
  qp:"Jakie miasto jest stolicą Polski?",
  ap:"Stolicą Polski jest Warszawa. To także największe miasto w Polsce.",
  ar:"Столица Польши — Варшава. Это также самый большой город страны." },
{ id:"og5", c:"og",
  qr:"Какие города раньше были столицами Польши?",
  qp:"Jakie miasta były wcześniej stolicami Polski?",
  ap:"Najpierw Gniezno, potem Kraków. Od 1596 roku stolicą jest Warszawa — przeniósł ją król Zygmunt III Waza.",
  ar:"Сначала Гнезно, потом Краков. С 1596 года столица — Варшава, её перенёс король Сигизмунд III Ваза." },
{ id:"og6", c:"og",
  qr:"Сколько людей живёт в Польше?",
  qp:"Ile ludzi mieszka w Polsce?",
  ap:"W Polsce mieszka około trzydziestu ośmiu milionów ludzi.",
  ar:"В Польше живёт около 38 миллионов человек." },
{ id:"og7", c:"og",
  qr:"Какая валюта в Польше?",
  qp:"Jaka jest waluta w Polsce?",
  ap:"Walutą Polski jest złoty. Jeden złoty to sto groszy.",
  ar:"Валюта Польши — злотый. Один злотый — это сто грошей." },
{ id:"og8", c:"og",
  qr:"Когда Польша отмечает День независимости?",
  qp:"Kiedy Polska obchodzi Święto Niepodległości?",
  ap:"Jedenastego listopada — w tym dniu w 1918 roku Polska odzyskała niepodległość po 123 latach zaborów.",
  ar:"11 ноября — в этот день в 1918 году Польша вернула независимость после 123 лет разделов." },
{ id:"og9", c:"og",
  qr:"Что поляки празднуют 3 мая?",
  qp:"Co Polacy świętują trzeciego maja?",
  ap:"Święto Konstytucji 3 Maja. Konstytucja z 1791 roku była pierwszą w Europie i drugą na świecie.",
  ar:"Праздник Конституции 3 мая. Конституция 1791 года была первой в Европе и второй в мире." },
{ id:"og10", c:"og",
  qr:"О чём легенда о Лехе, Чехе и Русе?",
  qp:"O czym jest legenda o Lechu, Czechu i Rusie?",
  ap:"Trzej bracia szukali miejsca do życia. Lech zobaczył białego orła na tle czerwonego nieba i założył tam Gniezno. Stąd pochodzi godło Polski.",
  ar:"Три брата искали место для жизни. Лех увидел белого орла на фоне красного неба и основал там Гнезно. Отсюда герб Польши." },
{ id:"og11", c:"og",
  qr:"О чём легенда о вавельском драконе?",
  qp:"O czym jest legenda o smoku wawelskim?",
  ap:"Pod zamkiem na Wawelu w Krakowie mieszkał smok. Sprytny szewc Skuba podrzucił mu barana z siarką — smok wypił wodę z Wisły i pękł.",
  ar:"Под замком Вавель в Кракове жил дракон. Хитрый сапожник Скуба подбросил ему барана с серой — дракон выпил воду из Вислы и лопнул." },
{ id:"og12", c:"og",
  qr:"Откуда происходит название «Варшава»?",
  qp:"Skąd pochodzi nazwa „Warszawa”?",
  ap:"Z legendy o rybaku Warsie i syrenie Sawie. Symbolem Warszawy jest Syrenka z mieczem i tarczą.",
  ar:"Из легенды о рыбаке Варсе и русалке Саве. Символ Варшавы — Сиренка (русалка) с мечом и щитом." },
{ id:"og13", c:"og",
  qr:"О чём легенда о Попеле?",
  qp:"O czym jest legenda o Popielu?",
  ap:"Zły książę Popiel został zjedzony przez myszy w wieży w Kruszwicy. Po nim władzę objął Piast — od niego pochodzi dynastia Piastów.",
  ar:"Злого князя Попеля съели мыши в башне в Крушвице. После него власть получил Пяст — от него пошла династия Пястов." },
{ id:"og14", c:"og",
  qr:"Как называется польский парламент?",
  qp:"Jak nazywa się polski parlament?",
  ap:"Parlament składa się z dwóch izb: Sejmu (460 posłów) i Senatu (100 senatorów).",
  ar:"Парламент состоит из двух палат: Сейма (460 депутатов) и Сената (100 сенаторов)." },
{ id:"og15", c:"og",
  qr:"Какие национальные символы Польши?",
  qp:"Jakie są symbole narodowe Polski?",
  ap:"Biało-czerwona flaga, godło z białym orłem i hymn „Mazurek Dąbrowskiego”.",
  ar:"Бело-красный флаг, герб с белым орлом и гимн «Мазурка Домбровского»." },
{ id:"og16", c:"og",
  qr:"Какие главные государственные праздники в Польше?",
  qp:"Jakie są najważniejsze święta państwowe w Polsce?",
  ap:"Trzeciego maja — Święto Konstytucji, jedenastego listopada — Święto Niepodległości, pierwszego maja — Święto Pracy.",
  ar:"3 мая — Праздник Конституции, 11 ноября — День независимости, 1 мая — Праздник труда." },
{ id:"og17", c:"og",
  qr:"Что означают цвета польского флага?",
  qp:"Co oznaczają kolory polskiej flagi?",
  ap:"Biel to orzeł, a czerwień to tło godła. Biel oznacza czystość, a czerwień — odwagę i krew przelaną za ojczyznę.",
  ar:"Белый — орёл, красный — фон герба. Белый означает чистоту, красный — отвагу и кровь, пролитую за родину." },
{ id:"og18", c:"og",
  qr:"Кто покровители Польши?",
  qp:"Kto jest patronem Polski?",
  ap:"Święty Wojciech i święty Stanisław. Matka Boska jest czczona jako Królowa Polski.",
  ar:"Святой Войцех и святой Станислав. Богоматерь почитается как Королева Польши." },

/* ---------- ИСТОРИЯ ---------- */
{ id:"hi1", c:"hi",
  qr:"Когда возникло польское государство?",
  qp:"Kiedy powstało państwo polskie?",
  ap:"Za początek państwa uważa się chrzest Polski w 966 roku, kiedy książę Mieszko I przyjął chrześcijaństwo.",
  ar:"Началом государства считается крещение Польши в 966 году, когда князь Мешко I принял христианство." },
{ id:"hi2", c:"hi",
  qr:"Кем был Мешко I?",
  qp:"Kim był Mieszko I?",
  ap:"Pierwszym historycznym władcą Polski z dynastii Piastów. W 966 roku przyjął chrzest.",
  ar:"Первым историческим правителем Польши из династии Пястов. В 966 году принял крещение." },
{ id:"hi3", c:"hi",
  qr:"Кто был первым королём Польши?",
  qp:"Kto był pierwszym królem Polski?",
  ap:"Bolesław Chrobry, syn Mieszka I. Został koronowany w 1025 roku.",
  ar:"Болеслав Храбрый, сын Мешко I. Коронован в 1025 году." },
{ id:"hi4", c:"hi",
  qr:"Какие династии правили Польшей?",
  qp:"Jakie dynastie panowały w Polsce?",
  ap:"Najpierw Piastowie, potem Jagiellonowie. Od 1573 roku królów wybierała szlachta — to była wolna elekcja.",
  ar:"Сначала Пясты, потом Ягеллоны. С 1573 года королей выбирала шляхта — это называлось свободной элекцией." },
{ id:"hi5", c:"hi",
  qr:"Кем был Казимир Великий?",
  qp:"Kim był Kazimierz Wielki?",
  ap:"Ostatnim królem z dynastii Piastów. Mówi się, że „zastał Polskę drewnianą, a zostawił murowaną”. W 1364 roku założył Akademię Krakowską — pierwszy polski uniwersytet.",
  ar:"Последним королём из династии Пястов. Говорят, что он «принял Польшу деревянной, а оставил каменной». В 1364 году основал Краковскую академию — первый польский университет." },
{ id:"hi6", c:"hi",
  qr:"Как возник союз Польши и Литвы?",
  qp:"Jak doszło do unii Polski z Litwą?",
  ap:"W 1385 roku zawarto unię w Krewie: królowa Jadwiga wyszła za księcia litewskiego Władysława Jagiełłę. Tak powstała dynastia Jagiellonów.",
  ar:"В 1385 году заключена Кревская уния: королева Ядвига вышла замуж за литовского князя Владислава Ягайло. Так возникла династия Ягеллонов." },
{ id:"hi7", c:"hi",
  qr:"Что произошло под Грюнвальдом?",
  qp:"Co się stało pod Grunwaldem?",
  ap:"W 1410 roku wojska polsko-litewskie pod wodzą Władysława Jagiełły pokonały Zakon Krzyżacki. To jedna z największych bitew średniowiecznej Europy.",
  ar:"В 1410 году польско-литовские войска под командованием Владислава Ягайло разбили Тевтонский орден. Одна из крупнейших битв средневековой Европы." },
{ id:"hi8", c:"hi",
  qr:"Чем была Люблинская уния?",
  qp:"Czym była unia lubelska?",
  ap:"W 1569 roku Polska i Litwa utworzyły jedno państwo — Rzeczpospolitą Obojga Narodów.",
  ar:"В 1569 году Польша и Литва создали одно государство — Речь Посполитую Обоих Народов." },
{ id:"hi9", c:"hi",
  qr:"Что такое свободная элекция?",
  qp:"Czym była wolna elekcja?",
  ap:"Od 1573 roku szlachta wybierała króla na specjalnym zjeździe. Pierwszym królem elekcyjnym był Henryk Walezy.",
  ar:"С 1573 года шляхта выбирала короля на специальном съезде. Первым выборным королём был Генрих Валуа." },
{ id:"hi10", c:"hi",
  qr:"Что такое «шведский потоп»?",
  qp:"Czym był potop szwedzki?",
  ap:"Najazd Szwecji na Polskę w latach 1655–1660. Symbolem oporu stała się obrona klasztoru na Jasnej Górze.",
  ar:"Нашествие Швеции на Польшу в 1655–1660 годах. Символом сопротивления стала оборона монастыря на Ясной Гуре." },
{ id:"hi11", c:"hi",
  qr:"Чем прославился Ян III Собеский?",
  qp:"Z czego zasłynął Jan III Sobieski?",
  ap:"W 1683 roku pokonał Turków pod Wiedniem — to była odsiecz wiedeńska. Uratował Europę przed najazdem osmańskim.",
  ar:"В 1683 году разбил турок под Веной — Венская битва. Спас Европу от османского нашествия." },
{ id:"hi12", c:"hi",
  qr:"Чем были разделы Польши?",
  qp:"Czym były rozbiory Polski?",
  ap:"Rosja, Prusy i Austria trzy razy podzieliły Polskę między siebie: w 1772, 1793 i 1795 roku. Polska zniknęła z mapy Europy na 123 lata.",
  ar:"Россия, Пруссия и Австрия трижды разделили Польшу между собой: в 1772, 1793 и 1795 годах. Польша исчезла с карты Европы на 123 года." },
{ id:"hi13", c:"hi",
  qr:"Кем был Тадеуш Костюшко?",
  qp:"Kim był Tadeusz Kościuszko?",
  ap:"Dowódcą powstania przeciwko Rosji w 1794 roku. Wcześniej walczył też o niepodległość Stanów Zjednoczonych.",
  ar:"Руководителем восстания против России в 1794 году. Ранее также сражался за независимость США." },
{ id:"hi14", c:"hi",
  qr:"Когда было Ноябрьское восстание?",
  qp:"Kiedy wybuchło powstanie listopadowe?",
  ap:"W 1830 roku, przeciwko Rosji. Powstanie zostało stłumione.",
  ar:"В 1830 году, против России. Восстание было подавлено." },
{ id:"hi15", c:"hi",
  qr:"Когда было Январское восстание?",
  qp:"Kiedy wybuchło powstanie styczniowe?",
  ap:"W 1863 roku, też przeciwko Rosji. Również zakończyło się klęską.",
  ar:"В 1863 году, тоже против России. Также закончилось поражением." },
{ id:"hi16", c:"hi",
  qr:"Когда и как Польша вернула независимость?",
  qp:"Kiedy i jak Polska odzyskała niepodległość?",
  ap:"Jedenastego listopada 1918 roku, po I wojnie światowej i po 123 latach zaborów. Władzę objął Józef Piłsudski.",
  ar:"11 ноября 1918 года, после Первой мировой войны и 123 лет разделов. Власть принял Юзеф Пилсудский." },
{ id:"hi17", c:"hi",
  qr:"Кем был Юзеф Пилсудский?",
  qp:"Kim był Józef Piłsudski?",
  ap:"Marszałkiem Polski i twórcą niepodległego państwa. Po 1918 roku był naczelnikiem państwa.",
  ar:"Маршалом Польши и создателем независимого государства. После 1918 года был начальником государства." },
{ id:"hi18", c:"hi",
  qr:"Что такое «чудо на Висле»?",
  qp:"Czym był „cud nad Wisłą”?",
  ap:"W 1920 roku wojsko polskie zatrzymało Armię Czerwoną pod Warszawą. To decydująca bitwa wojny polsko-bolszewickiej.",
  ar:"В 1920 году польская армия остановила Красную армию под Варшавой. Решающая битва польско-большевистской войны." },
{ id:"hi19", c:"hi",
  qr:"Когда началась Вторая мировая война?",
  qp:"Kiedy wybuchła II wojna światowa?",
  ap:"Pierwszego września 1939 roku Niemcy zaatakowały Polskę — pierwsze strzały padły na Westerplatte. Siedemnastego września ze wschodu zaatakował Związek Radziecki.",
  ar:"1 сентября 1939 года Германия напала на Польшу — первые выстрелы на Вестерплатте. 17 сентября с востока напал СССР." },
{ id:"hi20", c:"hi",
  qr:"Что такое Катынское преступление?",
  qp:"Czym była zbrodnia katyńska?",
  ap:"W 1940 roku NKWD zamordowało w Katyniu tysiące polskich oficerów.",
  ar:"В 1940 году НКВД расстрелял в Катыни тысячи польских офицеров." },
{ id:"hi21", c:"hi",
  qr:"Когда было восстание в варшавском гетто?",
  qp:"Kiedy wybuchło powstanie w getcie warszawskim?",
  ap:"W kwietniu 1943 roku — powstanie Żydów przeciwko Niemcom.",
  ar:"В апреле 1943 года — восстание евреев против немцев.",
  n:"Не путать с Варшавским восстанием 1944 года." },
{ id:"hi22", c:"hi",
  qr:"Чем было Варшавское восстание?",
  qp:"Czym było powstanie warszawskie?",
  ap:"Pierwszego sierpnia 1944 roku Warszawa powstała przeciwko Niemcom. Walki trwały 63 dni, miasto zostało prawie całkowicie zniszczone.",
  ar:"1 августа 1944 года Варшава восстала против немцев. Бои шли 63 дня, город был почти полностью разрушен.",
  n:"Не путать с восстанием в гетто (1943)." },
{ id:"hi23", c:"hi",
  qr:"Что было в Польше после Второй мировой войны?",
  qp:"Co było w Polsce po II wojnie światowej?",
  ap:"Polska znalazła się pod wpływem ZSRR. Powstała Polska Rzeczpospolita Ludowa (PRL), rządzona przez komunistów.",
  ar:"Польша оказалась под влиянием СССР. Возникла Польская Народная Республика (ПНР) под властью коммунистов." },
{ id:"hi24", c:"hi",
  qr:"Чем была «Солидарность»?",
  qp:"Czym była „Solidarność”?",
  ap:"Niezależnym związkiem zawodowym, założonym w 1980 roku po strajkach w Stoczni Gdańskiej. Przywódcą był Lech Wałęsa.",
  ar:"Независимым профсоюзом, основанным в 1980 году после забастовок на Гданьской верфи. Лидером был Лех Валенса." },
{ id:"hi25", c:"hi",
  qr:"Когда было введено военное положение?",
  qp:"Kiedy wprowadzono stan wojenny?",
  ap:"Trzynastego grudnia 1981 roku. Wprowadził go generał Wojciech Jaruzelski, żeby zniszczyć „Solidarność”.",
  ar:"13 декабря 1981 года. Его ввёл генерал Войцех Ярузельский, чтобы уничтожить «Солидарность»." },
{ id:"hi26", c:"hi",
  qr:"Чем был Круглый стол?",
  qp:"Czym był Okrągły Stół?",
  ap:"W 1989 roku władze komunistyczne i opozycja porozumiały się przy Okrągłym Stole. Czwartego czerwca 1989 roku odbyły się pierwsze częściowo wolne wybory — to koniec komunizmu w Polsce.",
  ar:"В 1989 году коммунистические власти и оппозиция договорились за Круглым столом. 4 июня 1989 прошли первые частично свободные выборы — конец коммунизма в Польше." },
{ id:"hi27", c:"hi",
  qr:"Кто такой Лех Валенса?",
  qp:"Kim jest Lech Wałęsa?",
  ap:"Przywódca „Solidarności”, laureat Pokojowej Nagrody Nobla (1983) i pierwszy prezydent wybrany w wolnych wyborach (1990–1995).",
  ar:"Лидер «Солидарности», лауреат Нобелевской премии мира (1983) и первый президент, избранный на свободных выборах (1990–1995)." },
{ id:"hi28", c:"hi",
  qr:"Кем был Иоанн Павел II?",
  qp:"Kim był Jan Paweł II?",
  ap:"Karol Wojtyła z Wadowic — pierwszy papież Polak, papież w latach 1978–2005. Wspierał „Solidarność”. Jest świętym Kościoła katolickiego.",
  ar:"Кароль Войтыла из Вадовиц — первый папа-поляк, понтифик в 1978–2005 годах. Поддерживал «Солидарность». Святой католической церкви." },
{ id:"hi29", c:"hi",
  qr:"Когда Польша вступила в НАТО?",
  qp:"Kiedy Polska wstąpiła do NATO?",
  ap:"W 1999 roku.",
  ar:"В 1999 году." },
{ id:"hi30", c:"hi",
  qr:"Когда Польша вступила в Евросоюз?",
  qp:"Kiedy Polska weszła do Unii Europejskiej?",
  ap:"Pierwszego maja 2004 roku.",
  ar:"1 мая 2004 года." },
{ id:"hi31", c:"hi",
  qr:"Кем был Николай Коперник?",
  qp:"Kim był Mikołaj Kopernik?",
  ap:"Wielkim astronomem z Torunia. Udowodnił, że Ziemia krąży wokół Słońca. Mówi się, że „wstrzymał Słońce, ruszył Ziemię”.",
  ar:"Великим астрономом из Торуни. Доказал, что Земля вращается вокруг Солнца. Говорят, он «остановил Солнце, сдвинул Землю»." },
{ id:"hi32", c:"hi",
  qr:"Какой период называют «золотым веком» Польши?",
  qp:"Jaki okres nazywa się „złotym wiekiem” Polski?",
  ap:"XVI wiek, czasy ostatnich Jagiellonów — rozkwit kultury, nauki i gospodarki.",
  ar:"XVI век, времена последних Ягеллонов — расцвет культуры, науки и экономики." },
{ id:"hi33", c:"hi",
  qr:"Сколько лет Польши не было на карте Европы?",
  qp:"Ile lat Polski nie było na mapie Europy?",
  ap:"123 lata — od trzeciego rozbioru w 1795 roku do odzyskania niepodległości w 1918 roku.",
  ar:"123 года — от третьего раздела в 1795 году до возвращения независимости в 1918 году." },
/* ---------- ГЕОГРАФИЯ ---------- */
{ id:"ge1", c:"ge",
  qr:"Какая самая длинная река в Польше?",
  qp:"Jaka jest najdłuższa rzeka w Polsce?",
  ap:"Wisła — ma około 1047 kilometrów. Przepływa przez Kraków i Warszawę i wpada do Bałtyku. Druga co do wielkości jest Odra.",
  ar:"Висла — около 1047 км. Протекает через Краков и Варшаву, впадает в Балтику. Вторая по величине — Одра." },
{ id:"ge2", c:"ge",
  qr:"Какие горы есть в Польше и какая самая высокая вершина?",
  qp:"Jakie góry są w Polsce i jaki jest najwyższy szczyt?",
  ap:"Na południu są Karpaty (z Tatrami) i Sudety. Najwyższy szczyt Polski to Rysy w Tatrach — 2499 metrów.",
  ar:"На юге — Карпаты (с Татрами) и Судеты. Самая высокая вершина Польши — Рысы в Татрах, 2499 м." },
{ id:"ge3", c:"ge",
  qr:"Какое море на севере Польши?",
  qp:"Jakie morze jest na północy Polski?",
  ap:"Morze Bałtyckie. Główne porty to Gdańsk, Gdynia i Szczecin.",
  ar:"Балтийское море. Главные порты — Гданьск, Гдыня и Щецин." },
{ id:"ge4", c:"ge",
  qr:"С какими странами граничит Польша?",
  qp:"Z jakimi państwami graniczy Polska?",
  ap:"Z siedmioma: z Niemcami, Czechami, Słowacją, Ukrainą, Białorusią, Litwą i Rosją (obwód kaliningradzki).",
  ar:"С семью: Германия, Чехия, Словакия, Украина, Беларусь, Литва и Россия (Калининградская область)." },
{ id:"ge5", c:"ge",
  qr:"Где в Польше больше всего озёр?",
  qp:"Gdzie w Polsce jest najwięcej jezior?",
  ap:"Na Mazurach — to „kraina tysiąca jezior”. Największe jezioro to Śniardwy, a najgłębsze — Hańcza.",
  ar:"На Мазурах — «краю тысячи озёр». Самое большое озеро — Снярдвы, самое глубокое — Ханьча." },
{ id:"ge6", c:"ge",
  qr:"Какие национальные парки есть в Польше?",
  qp:"Jakie parki narodowe są w Polsce?",
  ap:"W Polsce są 23 parki narodowe, na przykład Białowieski, Tatrzański, Biebrzański, Słowiński i Karkonoski.",
  ar:"В Польше 23 национальных парка, например Беловежский, Татранский, Бебжанский, Словинский и Карконошский." },
{ id:"ge7", c:"ge",
  qr:"Чем славится Беловежская пуща?",
  qp:"Z czego słynie Puszcza Białowieska?",
  ap:"To ostatni pierwotny las nizinny w Europie. Żyją tam żubry. Puszcza jest wpisana na listę UNESCO.",
  ar:"Это последний первобытный равнинный лес Европы. Там живут зубры. Пуща включена в список ЮНЕСКО." },
{ id:"ge8", c:"ge",
  qr:"Какие самые большие города Польши?",
  qp:"Jakie są największe miasta Polski?",
  ap:"Warszawa, Kraków, Łódź, Wrocław, Poznań i Gdańsk.",
  ar:"Варшава, Краков, Лодзь, Вроцлав, Познань и Гданьск." },
{ id:"ge9", c:"ge",
  qr:"Сколько воеводств в Польше?",
  qp:"Ile województw ma Polska?",
  ap:"Polska ma szesnaście województw.",
  ar:"В Польше 16 воеводств." },
{ id:"ge10", c:"ge",
  qr:"Где находится Польша?",
  qp:"Gdzie leży Polska?",
  ap:"W Europie Środkowej, nad Morzem Bałtyckim.",
  ar:"В Центральной Европе, у Балтийского моря." },
{ id:"ge11", c:"ge",
  qr:"Чем славится Краков?",
  qp:"Z czego słynie Kraków?",
  ap:"To dawna stolica Polski. Słynie z Wawelu, Rynku Głównego z Sukiennicami i kościoła Mariackiego. Stare Miasto jest na liście UNESCO.",
  ar:"Бывшая столица Польши. Славится Вавелем, Главным рынком с Сукенницами и Мариацким костёлом. Старый город — в списке ЮНЕСКО." },
{ id:"ge12", c:"ge",
  qr:"Чем славится Гданьск?",
  qp:"Z czego słynie Gdańsk?",
  ap:"To port nad Bałtykiem. Tam zaczęła się II wojna światowa (Westerplatte) i tam powstała „Solidarność”.",
  ar:"Порт на Балтике. Там началась Вторая мировая война (Вестерплатте) и там родилась «Солидарность»." },

/* ---------- ТРАДИЦИИ И КУХНЯ ---------- */
{ id:"tr1", c:"tr",
  qr:"Как поляки отмечают Сочельник (Вигилию)?",
  qp:"Jak Polacy obchodzą Wigilię?",
  ap:"Dwudziestego czwartego grudnia. Kolacja zaczyna się od pierwszej gwiazdki. Wszyscy dzielą się opłatkiem, na stole jest dwanaście potraw i wolne miejsce dla niespodziewanego gościa.",
  ar:"24 декабря. Ужин начинается с первой звезды. Все делятся облаткой, на столе 12 блюд и свободное место для нежданного гостя." },
{ id:"tr2", c:"tr",
  qr:"Что такое облатка?",
  qp:"Czym jest opłatek?",
  ap:"To cienki biały chlebek. Przed kolacją wigilijną Polacy dzielą się nim i składają sobie życzenia.",
  ar:"Тонкий белый хлебец. Перед рождественским ужином поляки делятся им и желают друг другу добра." },
{ id:"tr3", c:"tr",
  qr:"Какие блюда бывают на рождественском столе?",
  qp:"Jakie potrawy są na stole wigilijnym?",
  ap:"Tradycyjnie dwanaście potraw bez mięsa: barszcz z uszkami, karp, pierogi z kapustą i grzybami, kutia i kompot z suszu.",
  ar:"Традиционно 12 постных блюд: борщ с ушками, карп, вареники с капустой и грибами, кутья и компот из сухофруктов." },
{ id:"tr4", c:"tr",
  qr:"Что такое колядки?",
  qp:"Czym są kolędy?",
  ap:"To tradycyjne pieśni bożonarodzeniowe, śpiewane w domach i w kościołach.",
  ar:"Традиционные рождественские песни, их поют дома и в костёлах." },
{ id:"tr5", c:"tr",
  qr:"Как поляки отмечают Пасху?",
  qp:"Jak Polacy obchodzą Wielkanoc?",
  ap:"W Wielką Sobotę święcą pokarmy w koszyczku — to święconka. W niedzielę jedzą uroczyste śniadanie wielkanocne. Maluje się też pisanki.",
  ar:"В Великую субботу освящают еду в корзинке — «свенцонка». В воскресенье — праздничный пасхальный завтрак. Также красят писанки (яйца)." },
{ id:"tr6", c:"tr",
  qr:"Что такое смигус-дынгус?",
  qp:"Czym jest śmigus-dyngus?",
  ap:"To „lany poniedziałek” — drugi dzień Wielkanocy, kiedy ludzie polewają się wodą.",
  ar:"«Мокрый понедельник» — второй день Пасхи, когда люди обливают друг друга водой." },
{ id:"tr7", c:"tr",
  qr:"Что такое «жирный четверг»?",
  qp:"Czym jest tłusty czwartek?",
  ap:"To ostatni czwartek karnawału. W tym dniu wszyscy jedzą pączki i faworki.",
  ar:"Последний четверг карнавала. В этот день все едят пончики и хворост (фаворки)." },
{ id:"tr8", c:"tr",
  qr:"Что поляки делают 1 ноября?",
  qp:"Co Polacy robią pierwszego listopada?",
  ap:"To Wszystkich Świętych. Polacy odwiedzają groby bliskich i zapalają znicze.",
  ar:"Это День Всех Святых. Поляки посещают могилы близких и зажигают лампадки (зничи)." },
{ id:"tr9", c:"tr",
  qr:"Что такое анджейки?",
  qp:"Czym są andrzejki?",
  ap:"To wieczór wróżb w nocy z 29 na 30 listopada. Najbardziej znana wróżba to lanie wosku przez dziurkę od klucza.",
  ar:"Вечер гаданий в ночь с 29 на 30 ноября. Самое известное гадание — литьё воска через замочную скважину." },
{ id:"tr10", c:"tr",
  qr:"Что такое утопление Мажанны?",
  qp:"Czym jest topienie Marzanny?",
  ap:"Na początku wiosny, dwudziestego pierwszego marca, topi się słomianą kukłę — symbol zimy.",
  ar:"В начале весны, 21 марта, топят соломенную куклу — символ зимы." },
{ id:"tr11", c:"tr",
  qr:"Что такое миколайки?",
  qp:"Czym są mikołajki?",
  ap:"Szóstego grudnia, w dzień świętego Mikołaja, dzieci dostają drobne prezenty.",
  ar:"6 декабря, в день святого Николая, дети получают небольшие подарки." },
{ id:"tr12", c:"tr",
  qr:"Что такое именины?",
  qp:"Czym są imieniny?",
  ap:"To dzień patrona imienia. W Polsce imieniny są często ważniejsze niż urodziny, szczególnie dla starszych osób.",
  ar:"День святого покровителя имени. В Польше именины часто важнее дня рождения, особенно для старшего поколения." },
{ id:"tr13", c:"tr",
  qr:"Какие традиционные польские блюда вы знаете?",
  qp:"Jakie są tradycyjne polskie dania?",
  ap:"Pierogi, bigos, żurek, rosół, kotlet schabowy, gołąbki i oscypek.",
  ar:"Пироги (вареники), бигос, журек, росул (бульон), котлет схабовы, голубцы и осцыпек (копчёный сыр)." },
{ id:"tr14", c:"tr",
  qr:"Что такое дожинки?",
  qp:"Czym są dożynki?",
  ap:"To święto plonów pod koniec lata — podziękowanie za zbiory.",
  ar:"Праздник урожая в конце лета — благодарность за собранный урожай." },
{ id:"tr15", c:"tr",
  qr:"Что такое Барбурка?",
  qp:"Czym jest Barbórka?",
  ap:"Czwartego grudnia górnicy obchodzą święto swojej patronki, świętej Barbary. Szczególnie ważne na Śląsku.",
  ar:"4 декабря шахтёры отмечают праздник своей покровительницы, святой Барбары. Особенно важен в Силезии." },
{ id:"tr16", c:"tr",
  qr:"Что такое ночь святого Яна (Купала)?",
  qp:"Czym jest noc świętojańska?",
  ap:"To najkrótsza noc w roku, z 23 na 24 czerwca. Pali się ogniska i puszcza wianki na wodę.",
  ar:"Самая короткая ночь в году, с 23 на 24 июня. Жгут костры и пускают венки по воде." },

/* ---------- ЗНАМЕНИТЫЕ ПОЛЯКИ ---------- */
{ id:"lu1", c:"lu",
  qr:"Кем был Фридерик Шопен?",
  qp:"Kim był Fryderyk Chopin?",
  ap:"Najsłynniejszym polskim kompozytorem i pianistą (1810–1849). Urodził się w Żelazowej Woli. Komponował mazurki i polonezy. Jego serce znajduje się w kościele Świętego Krzyża w Warszawie.",
  ar:"Самый известный польский композитор и пианист (1810–1849). Родился в Желязовой Воле. Сочинял мазурки и полонезы. Его сердце — в костёле Святого Креста в Варшаве." },
{ id:"lu2", c:"lu",
  qr:"Каких польских композиторов вы знаете?",
  qp:"Jakich polskich kompozytorów Pan zna?",
  ap:"Fryderyka Chopina, Stanisława Moniuszkę, Karola Szymanowskiego, Witolda Lutosławskiego i Krzysztofa Pendereckiego.",
  ar:"Фридерик Шопен, Станислав Монюшко, Кароль Шимановский, Витольд Лютославский и Кшиштоф Пендерецкий." },
{ id:"lu3", c:"lu",
  qr:"Кем была Мария Склодовская-Кюри?",
  qp:"Kim była Maria Skłodowska-Curie?",
  ap:"Wielką polską uczoną, dwukrotną laureatką Nagrody Nobla — z fizyki (1903) i z chemii (1911). Odkryła polon i rad. Urodziła się w Warszawie.",
  ar:"Великий польский учёный, дважды лауреат Нобелевской премии — по физике (1903) и химии (1911). Открыла полоний и радий. Родилась в Варшаве." },
{ id:"lu4", c:"lu",
  qr:"Кем был Адам Мицкевич?",
  qp:"Kim był Adam Mickiewicz?",
  ap:"Największym polskim poetą, wieszczem narodowym. Napisał „Pana Tadeusza” i „Dziady”.",
  ar:"Величайший польский поэт, национальный пророк («вещч»). Написал «Пана Тадеуша» и «Дзяды»." },
{ id:"lu5", c:"lu",
  qr:"Кем был Генрик Сенкевич?",
  qp:"Kim był Henryk Sienkiewicz?",
  ap:"Pisarzem, laureatem Nagrody Nobla (1905). Napisał „Quo vadis” oraz Trylogię: „Ogniem i mieczem”, „Potop” i „Pana Wołodyjowskiego”.",
  ar:"Писатель, лауреат Нобелевской премии (1905). Автор «Камо грядеши» и Трилогии: «Огнём и мечом», «Потоп», «Пан Володыёвский»." },
{ id:"lu6", c:"lu",
  qr:"Какие поляки получали Нобелевскую премию?",
  qp:"Którzy Polacy dostali Nagrodę Nobla?",
  ap:"Między innymi Maria Skłodowska-Curie, Henryk Sienkiewicz, Władysław Reymont, Czesław Miłosz, Wisława Szymborska, Olga Tokarczuk i Lech Wałęsa.",
  ar:"В том числе Мария Склодовская-Кюри, Генрик Сенкевич, Владислав Реймонт, Чеслав Милош, Вислава Шимборская, Ольга Токарчук и Лех Валенса." },
{ id:"lu7", c:"lu",
  qr:"Кем был Ян Матейко?",
  qp:"Kim był Jan Matejko?",
  ap:"Najsłynniejszym polskim malarzem historycznym. Namalował między innymi „Bitwę pod Grunwaldem”.",
  ar:"Самый известный польский исторический живописец. Написал в том числе «Грюнвальдскую битву»." },
{ id:"lu8", c:"lu",
  qr:"Кем был Анджей Вайда?",
  qp:"Kim był Andrzej Wajda?",
  ap:"Wybitnym reżyserem filmowym, laureatem Oscara za całokształt twórczości.",
  ar:"Выдающийся кинорежиссёр, лауреат «Оскара» за вклад в кинематограф." },
{ id:"lu9", c:"lu",
  qr:"Кем был Игнаций Ян Падеревский?",
  qp:"Kim był Ignacy Jan Paderewski?",
  ap:"Światowej sławy pianistą i politykiem — premierem odrodzonej Polski w 1919 roku.",
  ar:"Всемирно известный пианист и политик — премьер-министр возрождённой Польши в 1919 году." },
{ id:"lu10", c:"lu",
  qr:"Кем был Станислав Лем?",
  qp:"Kim był Stanisław Lem?",
  ap:"Światowej sławy pisarzem science fiction z Krakowa, autorem „Solaris”.",
  ar:"Всемирно известный писатель-фантаст из Кракова, автор «Соляриса»." },
{ id:"lu11", c:"lu",
  qr:"Кто такой Роберт Левандовский?",
  qp:"Kim jest Robert Lewandowski?",
  ap:"Najsłynniejszym polskim piłkarzem, wieloletnim kapitanem reprezentacji Polski.",
  ar:"Самый известный польский футболист, многолетний капитан сборной Польши." },
{ id:"lu12", c:"lu",
  qr:"Кем была Вислава Шимборская?",
  qp:"Kim była Wisława Szymborska?",
  ap:"Poetką, laureatką Nagrody Nobla w dziedzinie literatury w 1996 roku.",
  ar:"Поэтесса, лауреат Нобелевской премии по литературе 1996 года." },
{ id:"lu13", c:"lu",
  qr:"Кем был Станислав Монюшко?",
  qp:"Kim był Stanisław Moniuszko?",
  ap:"Twórcą polskiej opery narodowej, autorem „Halki” i „Strasznego dworu”.",
  ar:"Создатель польской национальной оперы, автор «Гальки» и «Страшного двора»." },

/* ---------- СОВРЕМЕННАЯ ПОЛЬША ---------- */
{ id:"ws1", c:"ws",
  qr:"Какой государственный строй в Польше?",
  qp:"Jaki ustrój ma Polska?",
  ap:"Polska jest republiką parlamentarną. Głową państwa jest prezydent, a rządem kieruje premier.",
  ar:"Польша — парламентская республика. Глава государства — президент, правительством руководит премьер." },
{ id:"ws2", c:"ws",
  qr:"Кто сейчас президент Польши?",
  qp:"Kto jest prezydentem Polski?",
  ap:"Obecnie prezydentem Polski jest Karol Nawrocki (od 2025 roku).",
  ar:"Сейчас президент Польши — Кароль Навроцкий (с 2025 года).",
  n:"⚠️ Проверь актуальность перед собесом." },
{ id:"ws3", c:"ws",
  qr:"Кто сейчас премьер-министр Польши?",
  qp:"Kto jest premierem Polski?",
  ap:"Obecnie premierem jest Donald Tusk.",
  ar:"Сейчас премьер-министр — Дональд Туск.",
  n:"⚠️ Проверь актуальность перед собесом." },
{ id:"ws4", c:"ws",
  qr:"В каких международных организациях состоит Польша?",
  qp:"Do jakich organizacji należy Polska?",
  ap:"Do Unii Europejskiej (od 2004 roku), NATO (od 1999 roku), strefy Schengen (od 2007 roku) i ONZ.",
  ar:"В Евросоюзе (с 2004), НАТО (с 1999), Шенгенской зоне (с 2007) и ООН." },
{ id:"ws5", c:"ws",
  qr:"В Польше платят евро?",
  qp:"Czy w Polsce płaci się euro?",
  ap:"Nie, walutą Polski jest złoty. Polska jest w Unii Europejskiej, ale nie w strefie euro.",
  ar:"Нет, валюта Польши — злотый. Польша в ЕС, но не в зоне евро." },
{ id:"ws6", c:"ws",
  qr:"Как Польша делится административно?",
  qp:"Jak dzieli się Polska administracyjnie?",
  ap:"Na szesnaście województw, które dzielą się na powiaty i gminy.",
  ar:"На 16 воеводств, которые делятся на повяты и гмины." },
{ id:"ws7", c:"ws",
  qr:"Как часто в Польше выбирают президента и парламент?",
  qp:"Jak często wybiera się prezydenta i parlament?",
  ap:"Prezydenta co pięć lat (maksymalnie dwie kadencje), a parlament co cztery lata.",
  ar:"Президента — раз в 5 лет (максимум два срока), парламент — раз в 4 года." },

/* ---------- ЛИЧНЫЙ БЛОК (шаблоны — адаптируй под себя) ---------- */
{ id:"os1", c:"os", p:true,
  qr:"Почему вы хотите жить в Польше?",
  qp:"Dlaczego chce Pan mieszkać w Polsce?",
  ap:"Mam polskie korzenie — mój dziadek był Polakiem. Czuję związek z polską kulturą i historią. Mieszkam w Warszawie, uczę się języka i chcę tu budować swoje życie.",
  ar:"У меня польские корни — мой дед был поляком. Я чувствую связь с польской культурой и историей. Живу в Варшаве, учу язык и хочу строить здесь свою жизнь." },
{ id:"os2", c:"os", p:true,
  qr:"Расскажите о своих польских корнях.",
  qp:"Proszę opowiedzieć o swoich polskich korzeniach.",
  ap:"Mój dziadek był Polakiem. [Imię, skąd pochodził, historia rodziny — uzupełnij swoimi faktami.] Dlatego czuję się związany z Polską.",
  ar:"Мой дед был поляком. [Имя, откуда родом, история семьи — заполни своими фактами.] Поэтому я чувствую связь с Польшей." },
{ id:"os3", c:"os", p:true,
  qr:"Откуда вы родом и где сейчас живёте?",
  qp:"Skąd Pan pochodzi i gdzie Pan teraz mieszka?",
  ap:"Pochodzę z Rosji, z [miasto]. Teraz mieszkam w Warszawie.",
  ar:"Я родом из России, из [город]. Сейчас живу в Варшаве." },
{ id:"os4", c:"os", p:true,
  qr:"Чем вы занимаетесь?",
  qp:"Czym się Pan zajmuje?",
  ap:"Pracuję jako menedżer w branży IT. Mam ponad dwanaście lat doświadczenia.",
  ar:"Работаю менеджером в IT. У меня больше 12 лет опыта." },
{ id:"os5", c:"os", p:true,
  qr:"Вы учите польский язык? Как?",
  qp:"Czy uczy się Pan języka polskiego?",
  ap:"Tak, uczę się codziennie: chodzę na kurs, używam aplikacji i staram się rozmawiać po polsku.",
  ar:"Да, учу каждый день: хожу на курс, использую приложения и стараюсь говорить по-польски." },
{ id:"os6", c:"os", p:true,
  qr:"Какие польские традиции вы знаете и соблюдаете?",
  qp:"Jakie polskie tradycje Pan zna i obchodzi?",
  ap:"Znam Wigilię z dwunastoma potrawami i dzieleniem się opłatkiem, Wielkanoc ze święconką, andrzejki i tłusty czwartek. [Dodaj, co obchodzisz w domu.]",
  ar:"Знаю Вигилию с 12 блюдами и облаткой, Пасху со свенцонкой, анджейки и жирный четверг. [Добавь, что отмечаешь дома.]" },
{ id:"os7", c:"os", p:true,
  qr:"Что вам нравится в Польше?",
  qp:"Co się Panu podoba w Polsce?",
  ap:"Podoba mi się Warszawa, ludzie i kultura. [Uzupełnij konkretami: miejsca, kuchnia, atmosfera.]",
  ar:"Мне нравится Варшава, люди и культура. [Дополни конкретикой: места, кухня, атмосфера.]" },
{ id:"os8", c:"os", p:true,
  qr:"Расскажите о своей семье.",
  qp:"Proszę opowiedzieć o swojej rodzinie.",
  ap:"[Szablon: kim są rodzice, rodzeństwo, kto ma polskie korzenie — przygotuj krótką wersję po polsku.]",
  ar:"[Шаблон: родители, братья/сёстры, у кого польские корни — подготовь короткую версию по-польски.]" }
];

/* ============================ ИГРОВЫЕ ДАННЫЕ ============================ */
/* Путь по Польше: города открываются по числу освоенных вопросов (interval>=7) */
const SOBES_CITIES = [
  { need:1,   name:"Gniezno",   icon:"🏰", fact:"Первая столица Польши. Здесь Лех увидел белого орла." },
  { need:5,   name:"Kraków",    icon:"🐉", fact:"Древняя столица: Вавель, дракон и Ягеллонский университет." },
  { need:12,  name:"Toruń",     icon:"🌌", fact:"Город Коперника и пряников (pierniki)." },
  { need:20,  name:"Wrocław",   icon:"🧙", fact:"Город ста мостов и гномов (krasnale)." },
  { need:30,  name:"Poznań",    icon:"🐐", fact:"Козлики на ратуше; колыбель польского государства." },
  { need:42,  name:"Łódź",      icon:"🎬", fact:"Город кино и текстильных фабрик." },
  { need:55,  name:"Gdańsk",    icon:"⚓", fact:"Вестерплатте и родина «Солидарности»." },
  { need:70,  name:"Zakopane",  icon:"🏔", fact:"Зимняя столица Польши, Татры." },
  { need:85,  name:"Lublin",    icon:"🤝", fact:"Здесь в 1569 подписали Люблинскую унию." },
  { need:100, name:"Warszawa",  icon:"🏛", fact:"Столица. Финал пути — твой собес. Powodzenia!" }
];
/* Звания по XP */
const SOBES_RANKS = [
  { xp:0,    t:"Turysta",      icon:"🧳" },
  { xp:150,  t:"Student",      icon:"📚" },
  { xp:400,  t:"Warszawiak",   icon:"🚋" },
  { xp:800,  t:"Szlachcic",    icon:"🎩" },
  { xp:1400, t:"Husarz",       icon:"🛡" },
  { xp:2200, t:"Prawie Polak", icon:"🦅" },
  { xp:3200, t:"Pan Polak",    icon:"👑" }
];
/* Ачивки */
const SOBES_ACH = [
  { id:"first",   icon:"📓", t:"Первая запись",     d:"Отметить первый вопрос" },
  { id:"ten",     icon:"✍️", t:"Разогнался",        d:"10 вопросов в тетрадке" },
  { id:"fifty",   icon:"📚", t:"Полбанка",          d:"50 вопросов в тетрадке" },
  { id:"allmk",   icon:"🗂", t:"Весь банк",         d:"Все вопросы в тетрадке" },
  { id:"custom",  icon:"🛠", t:"Свой вопрос",       d:"Добавить свой вопрос" },
  { id:"exam10",  icon:"🎯", t:"Снайпер",           d:"Экзамен без ошибок" },
  { id:"boss",    icon:"⚔️", t:"Победа над Консулом", d:"Выиграть босс-экзамен" },
  { id:"boss5",   icon:"🏆", t:"Гроза урядов",      d:"5 побед над Консулом" },
  { id:"streak7", icon:"🔥", t:"Неделя подряд",     d:"7 дней собеса подряд" },
  { id:"hist",    icon:"🏺", t:"Историк",           d:"Вся история освоена" },
  { id:"geo",     icon:"🗺", t:"Географ",           d:"Вся география освоена" },
  { id:"trad",    icon:"🥟", t:"Свой человек",      d:"Все традиции освоены" }
];

/* ============================ ДВИЖОК «СОБЕС» ============================ */
(function(){
  /* «Собес» хранится в едином хранилище (Store.progress.sobes), а не в отдельном ключе. */
  let SB=loadSB();
  Store.progress.sobes=SB;
  function loadSB(){
    let r=(window.Store && Store.progress.sobes) || null;
    if(!r || !r.marks) r={ marks:{}, srs:{}, custom:[], v:1 };
    /* игровые поля (миграция старых состояний) */
    if(typeof r.xp!=="number") r.xp=0;
    if(!r.ach) r.ach={};
    if(!r.boss) r.boss={wins:0,last:null};
    if(!r.days) r.days=[];
    return r;
  }
  function ssave(){ Store.save(); }

  /* ---- XP, звания, ачивки ---- */
  function addXP(n){ SB.xp=(SB.xp||0)+n; }
  function rankOf(xp){
    let cur=SOBES_RANKS[0], next=null;
    for(const rk of SOBES_RANKS){ if(xp>=rk.xp) cur=rk; else { next=rk; break; } }
    const base=cur.xp, top=next?next.xp:cur.xp;
    const pct=next?Math.round((xp-base)/(top-base)*100):100;
    return {cur:cur, next:next, pct:pct};
  }
  function toast(msg){
    let el=document.getElementById("sbToast");
    if(!el){
      el=document.createElement("div"); el.id="sbToast";
      el.style.cssText="position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:var(--panel);border:1px solid var(--line);color:var(--text);padding:12px 18px;border-radius:14px;font-size:14px;box-shadow:0 8px 30px rgba(0,0,0,.4);z-index:9998;max-width:86%;text-align:center";
      document.body.appendChild(el);
    }
    el.textContent=msg; el.style.display="block";
    clearTimeout(el._t); el._t=setTimeout(()=>{ el.style.display="none"; }, 2600);
  }
  function unlock(id){
    if(SB.ach[id]) return;
    SB.ach[id]=todayStr();
    const a=SOBES_ACH.find(x=>x.id===id);
    if(a) toast("🏅 Ачивка: "+a.icon+" "+a.t);
  }
  function catMastered(cat){
    const cards=SOBES_BANK.filter(c=>c.c===cat);
    return cards.length && cards.every(c=>SB.srs[c.id] && SB.srs[c.id].interval>=7);
  }
  function streakDays(){
    const set=new Set(SB.days||[]);
    let n=0; const d=new Date();
    for(;;){
      const key=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
      if(set.has(key)){ n++; d.setDate(d.getDate()-1); } else break;
    }
    return n;
  }
  function logDay(){
    SB.days=SB.days||[];
    const t=todayStr();
    if(!SB.days.includes(t)) SB.days.push(t);
    if(streakDays()>=7) unlock("streak7");
  }
  function checkAch(){
    const mk=Object.keys(SB.marks).filter(id=>cardById(id)).length;
    if(mk>=1) unlock("first");
    if(mk>=10) unlock("ten");
    if(mk>=50) unlock("fifty");
    if(mk>=allCards().length) unlock("allmk");
    if((SB.custom||[]).length) unlock("custom");
    if(SB.boss.wins>=1) unlock("boss");
    if(SB.boss.wins>=5) unlock("boss5");
    if(catMastered("hi")) unlock("hist");
    if(catMastered("ge")) unlock("geo");
    if(catMastered("tr")) unlock("trad");
  }

  /* доступ для экспорта/импорта из index.html */
  window.__sobesGet=function(){ return SB; };
  window.__sobesSet=function(x){ if(x && x.marks){ SB=x; Store.progress.sobes=SB; ssave(); refreshTab(); } };

  function allCards(){ return SOBES_BANK.concat(SB.custom||[]); }
  function cardById(id){ return allCards().find(c=>c.id===id); }
  function catOf(id){ return SOBES_CATS.find(x=>x.id===id); }

  function dueIds(){
    const now=Date.now();
    return Object.keys(SB.marks).filter(id=>{ const s=SB.srs[id]; return s && s.due<=now && cardById(id); });
  }
  function masteredN(){ return Object.keys(SB.srs).filter(id=>SB.marks[id] && SB.srs[id].interval>=7).length; }

  /* SM-2 — единый алгоритм из srs.js (раньше был скопирован сюда) */
  function sReview(s, grade){ return SRS.review(s, grade); }

  /* ---- вкладка «Собес» ---- */
  $("tabSobes").onclick=showSobes;

  function showSobes(){ renderSobes(); show("sobesHome"); }   // роутер прячет остальное и красит вкладку
  function refreshTab(){
    const n=dueIds().length;
    $("tabSobes").textContent="🎓 Собес"+(n?" ("+n+")":"");
  }

  /* ---- главная вкладки ---- */
  let fCat="all", fSt="all", expanded={};

  function renderSobes(){
    const total=allCards().length, marked=Object.keys(SB.marks).filter(id=>cardById(id)).length;
    $("sbMarked").textContent=marked+"/"+total;
    $("sbDue").textContent=dueIds().length;
    $("sbMast").textContent=masteredN();
    $("sbBar").style.width=(total?Math.round(marked/total*100):0)+"%";
    $("sbBarNote").textContent="Отмечай вопросы, которые уже переписал в тетрадку — они попадут в повторения.";
    const dn=dueIds().length;
    $("sbReviewBtn").textContent="Повторение"+(dn?" ("+dn+")":"");
    $("sbReviewBtn").disabled=!dn;
    $("sbExamBtn").disabled=!marked;
    /* XP и звание */
    const rk=rankOf(SB.xp||0);
    $("sbRank").innerHTML="<b>"+rk.cur.icon+" "+rk.cur.t+"</b> · "+(SB.xp||0)+" XP"+
      (rk.next?" <span class='muted'>· до звания «"+rk.next.t+"» ещё "+(rk.next.xp-(SB.xp||0))+"</span>":" <span class='muted'>· максимум!</span>")+
      (streakDays()>1?" <span class='muted'>· 🔥 "+streakDays()+" дн</span>":"");
    $("sbXpBar").style.width=rk.pct+"%";
    /* босс */
    const bossReady=marked>=5;
    const cd=bossCooldown();
    $("sbBossBtn").disabled=!bossReady || cd>0;
    $("sbBossBtn").textContent = cd>0 ? "⚔️ Консул повержен · вернётся через "+cd+" дн"
      : (bossReady ? "⚔️ Босс: Консул ("+SB.boss.wins+" 🏆)" : "⚔️ Босс: нужно 5+ в тетрадке");
    renderCities(); renderAch(); renderChips(); renderList(); refreshTab();
  }

  function bossCooldown(){
    if(!SB.boss.lastWin) return 0;
    const p=SB.boss.lastWin.split("-").map(Number);
    const diff=Math.floor((Date.now()-new Date(p[0],p[1]-1,p[2]).getTime())/86400000);
    return Math.max(0, 7-diff);
  }

  function renderCities(){
    const root=$("sbCities"); root.innerHTML="";
    const m=masteredN();
    let current=null;
    SOBES_CITIES.forEach(ct=>{
      const open=m>=ct.need;
      if(!open && !current) current=ct;
      const b=document.createElement("button");
      b.className="sbcity"+(open?" open":"")+(ct===current?" cur":"");
      b.innerHTML=(open?ct.icon:"🔒")+" "+ct.name+(ct===current?" <small>"+m+"/"+ct.need+"</small>":"");
      b.onclick=()=>toast(open ? ct.icon+" "+ct.name+": "+ct.fact
        : "🔒 "+ct.name+" откроется, когда освоишь "+ct.need+" вопросов (сейчас "+m+"). "+ct.fact);
      root.appendChild(b);
    });
    const done=SOBES_CITIES.filter(c=>m>=c.need).length;
    $("sbCitiesNote").textContent="Путь к собесу: "+done+"/"+SOBES_CITIES.length+" городов. Города открываются за освоенные вопросы (7+ дней в памяти).";
  }

  function renderAch(){
    const root=$("sbAch"); root.innerHTML="";
    SOBES_ACH.forEach(a=>{
      const got=!!SB.ach[a.id];
      const el=document.createElement("div");
      el.className="sbbadge"+(got?" got":"");
      el.innerHTML="<span class='bicon'>"+a.icon+"</span><span>"+a.t+"</span>";
      el.title=a.d+(got?" — получено "+SB.ach[a.id]:"");
      el.onclick=()=>toast((got?"🏅 ":"🔒 ")+a.t+": "+a.d);
      root.appendChild(el);
    });
  }

  function chipRow(root, items, cur, onpick){
    root.innerHTML="";
    items.forEach(it=>{
      const b=document.createElement("button");
      b.className="sbchip"+(it.id===cur?" on":"");
      b.textContent=it.t;
      b.onclick=()=>onpick(it.id);
      root.appendChild(b);
    });
  }
  function renderChips(){
    chipRow($("sbStChips"),
      [{id:"all",t:"Все"},{id:"un",t:"☐ Не в тетрадке"},{id:"mk",t:"📓 В тетрадке"}],
      fSt, id=>{ fSt=id; renderSobes(); });
    chipRow($("sbCatChips"),
      [{id:"all",t:"Все темы"}].concat(SOBES_CATS.map(c=>({id:c.id,t:c.t}))),
      fCat, id=>{ fCat=id; renderSobes(); });
  }

  function renderList(){
    const root=$("sbList"); root.innerHTML="";
    SOBES_CATS.forEach(cat=>{
      if(fCat!=="all" && fCat!==cat.id) return;
      let cards=allCards().filter(c=>c.c===cat.id);
      if(fSt==="un") cards=cards.filter(c=>!SB.marks[c.id]);
      if(fSt==="mk") cards=cards.filter(c=>SB.marks[c.id]);
      if(!cards.length) return;
      const all=allCards().filter(c=>c.c===cat.id);
      const mk=all.filter(c=>SB.marks[c.id]).length;
      const box=document.createElement("div"); box.className="card";
      box.innerHTML="<div class='sbcat'><span>"+cat.t+" · <span class='muted' style='font-weight:400'>"+cat.tp+"</span></span><span class='muted'>"+mk+"/"+all.length+"</span></div>";
      cards.forEach(c=>box.appendChild(rowEl(c)));
      root.appendChild(box);
    });
  }

  function rowEl(c){
    const marked=!!SB.marks[c.id];
    const row=document.createElement("div"); row.className="sbrow";
    const chk=document.createElement("button");
    chk.className="sbchk"+(marked?" on":"");
    chk.textContent=marked?"✅":"☐";
    chk.title=marked?"В тетрадке с "+SB.marks[c.id]:"Отметить: попал в тетрадку";
    chk.onclick=e=>{ e.stopPropagation(); toggleMark(c.id); };
    const txt=document.createElement("div"); txt.className="sbtxt";
    let html="<div class='sbqr'>"+c.qr+(c.p?" <span class='tag' style='margin:0'>шаблон</span>":"")+"</div>"+
             "<div class='sbqp'>"+c.qp+"</div>";
    if(marked) html+="<div class='sbdate'>📓 в тетрадке с "+SB.marks[c.id]+"</div>";
    if(expanded[c.id]){
      html+="<div class='sbans'><div class='apl'>"+c.ap+"</div>"+
            (c.ar?"<div class='aru'>"+c.ar+"</div>":"")+
            (c.n?"<div class='aru'>💡 "+c.n+"</div>":"")+
            "<button class='speak' style='margin-top:8px' data-say='1'>🔊 Ответ по-польски</button>"+
            (String(c.id).charAt(0)==="c"?"<button class='sbdel' data-del='1'>🗑 удалить вопрос</button>":"")+
            "</div>";
    }
    txt.innerHTML=html;
    txt.onclick=()=>{ expanded[c.id]=!expanded[c.id]; renderList(); };
    const say=txt.querySelector("[data-say]");
    if(say) say.onclick=e=>{ e.stopPropagation(); speak(c.ap); };
    const del=txt.querySelector("[data-del]");
    if(del) del.onclick=e=>{ e.stopPropagation(); delCustom(c.id); };
    row.appendChild(chk); row.appendChild(txt);
    return row;
  }

  function toggleMark(id){
    if(SB.marks[id]){
      const s=SB.srs[id];
      if(s && s.reps>0 && !confirm("Убрать вопрос из тетрадки? Прогресс повторений по нему сбросится.")) return;
      delete SB.marks[id]; delete SB.srs[id];
    } else {
      SB.marks[id]=todayStr();
      SB.srs[id]={ef:2.5, interval:0, reps:0, due:Date.now()};
      addXP(5); checkAch();
    }
    ssave(); renderSobes();
  }
  function delCustom(id){
    if(!confirm("Удалить этот вопрос насовсем?")) return;
    SB.custom=(SB.custom||[]).filter(c=>c.id!==id);
    delete SB.marks[id]; delete SB.srs[id]; delete expanded[id];
    ssave(); renderSobes();
  }

  /* ---- свой вопрос ---- */
  $("sbAddBtn").onclick=function(){
    const f=$("sbAddCard");
    f.classList.toggle("hidden");
    if(!f.classList.contains("hidden")){
      const sel=$("sbfCat"); sel.innerHTML="";
      SOBES_CATS.forEach(c=>{ const o=document.createElement("option"); o.value=c.id; o.textContent=c.t; sel.appendChild(o); });
      window.scrollTo(0, f.offsetTop-20);
    }
  };
  $("sbfCancel").onclick=function(){ $("sbAddCard").classList.add("hidden"); };
  $("sbfSave").onclick=function(){
    const qr=$("sbfQr").value.trim(), qp=$("sbfQp").value.trim(),
          ap=$("sbfAp").value.trim(), ar=$("sbfAr").value.trim();
    if(!qr || !qp || !ap){ alert("Заполни как минимум вопрос (RU и PL) и ответ по-польски."); return; }
    const id="c"+Date.now();
    SB.custom=SB.custom||[];
    SB.custom.push({id:id, c:$("sbfCat").value, qr:qr, qp:qp, ap:ap, ar:ar});
    SB.marks[id]=todayStr();
    SB.srs[id]={ef:2.5, interval:0, reps:0, due:Date.now()};
    addXP(5); checkAch();
    ["sbfQr","sbfQp","sbfAp","sbfAr"].forEach(x=>$(x).value="");
    $("sbAddCard").classList.add("hidden");
    ssave(); renderSobes();
  };

  /* ---- повторение / мини-экзамен ---- */
  let q=[], qi=0, exam=false, okN=0;
  $("sbReviewBtn").onclick=function(){ startDrill(false); };
  $("sbExamBtn").onclick=function(){ startDrill(true); };

  function startDrill(isExam){
    exam=isExam;
    let ids;
    if(isExam){ ids=Object.keys(SB.marks).filter(id=>cardById(id)); shuffle(ids); ids=ids.slice(0,10); }
    else { ids=dueIds(); shuffle(ids); }
    if(!ids.length){ alert(isExam?"Сначала отметь хотя бы один вопрос как «в тетрадке».":"На сегодня всё повторено — красавчик!"); return; }
    q=ids; qi=0; okN=0;
    show("sobesDrill");
    nextQ(); window.scrollTo(0,0);
  }
  function nextQ(){
    if(qi>=q.length) return finishDrill();
    $("sbDrillBar").style.width=Math.round(qi/q.length*100)+"%";
    const c=cardById(q[qi]);
    if(!c){ qi++; return nextQ(); }
    const cat=catOf(c.c);
    const box=$("sbDrillCard");
    box.innerHTML=
      "<div class='stephead'><span class='muted'>"+(exam?"🎲 Мини-экзамен":"Повторение")+" · "+(qi+1)+"/"+q.length+" · "+(cat?cat.t:"")+"</span>"+
      "<button class='exitbtn' id='sbExit'>✕ выйти</button></div>"+
      "<div class='prompt'>Ответь вслух по-польски</div>"+
      "<div class='term' style='font-size:24px'>"+c.qp+"</div>"+
      "<div class='hint'>"+c.qr+"</div>"+
      "<button class='speak' id='sbSpkQ'>🔊 Вопрос</button>"+
      "<div id='sbReveal'><button class='btn-primary' id='sbShow' style='margin-top:18px'>Показать ответ</button></div>";
    $("sbExit").onclick=function(){ if(confirm("Прервать сессию?")) showSobes(); };
    $("sbSpkQ").onclick=function(){ speak(c.qp); };
    speak(c.qp);
    $("sbShow").onclick=function(){
      $("sbReveal").innerHTML=
        "<div class='answer' style='font-size:19px'>"+c.ap+"</div>"+
        (c.ar?"<div class='ex'>"+c.ar+"</div>":"")+
        (c.n?"<div class='note'>💡 "+c.n+"</div>":"")+
        (c.p?"<div class='note'>Это шаблон личного блока — рассказывай свою версию.</div>":"")+
        "<button class='speak' id='sbSpkA'>🔊 Ответ</button>"+
        "<div class='grades'>"+
          "<button class='grade g-again'>Снова</button>"+
          "<button class='grade g-hard'>Трудно</button>"+
          "<button class='grade g-good'>Хорошо</button>"+
          "<button class='grade g-easy'>Легко</button></div>"+
        "<div class='note'>Сначала ответь вслух, потом оцени себя честно.</div>";
      $("sbSpkA").onclick=function(){ speak(c.ap); };
      speak(c.ap);
      document.querySelectorAll("#sbDrillCard .grade").forEach((b,i)=>{
        b.onclick=function(){
          if(!SB.srs[c.id]) SB.srs[c.id]={ef:2.5, interval:0, reps:0, due:Date.now()};
          sReview(SB.srs[c.id], i);
          addXP([1,5,10,10][i]); checkAch();
          if(i===0){ q.push(c.id); } else { okN++; }
          qi++; ssave(); nextQ();
        };
      });
    };
  }
  function finishDrill(){
    $("sbDrillBar").style.width="100%";
    logDay();
    if(exam && q.length>=10 && okN>=q.length) unlock("exam10");
    checkAch(); ssave();
    const dn=dueIds().length;
    $("sbDrillCard").innerHTML=
      "<div class='center'><div style='font-size:44px'>"+(exam?(okN>=8?"🏆":"💪"):"🎉")+"</div>"+
      "<div class='step-title' style='text-align:center'>"+(exam?"Мини-экзамен пройден":"Повторение готово")+"</div>"+
      "<div class='muted' style='text-align:center'>Вспомнил: <b>"+okN+"</b> из "+q.length+(dn?" · к повтору осталось: "+dn:"")+"</div></div>"+
      "<div class='toolbar'><button class='btn-primary' id='sbBackBtn'>К списку вопросов</button></div>";
    $("sbBackBtn").onclick=showSobes;
  }

  /* ---- босс-экзамен «Консул» ---- */
  let bq=[], bqi=0, bFails=0, bAllowed=0, bTimer=null, bLeft=0;
  const BOSS_SEC=20;
  $("sbBossBtn").onclick=startBoss;

  function stopTimer(){ if(bTimer){ clearInterval(bTimer); bTimer=null; } }

  function startBoss(){
    let ids=Object.keys(SB.marks).filter(id=>cardById(id));
    if(ids.length<5){ alert("Для босса нужно минимум 5 вопросов в тетрадке."); return; }
    shuffle(ids);
    bq=ids.slice(0,15); bqi=0; bFails=0;
    bAllowed=Math.max(1, Math.floor(bq.length/5)); /* ~20% ошибок допустимо */
    show("sobesDrill");
    bossQ(); window.scrollTo(0,0);
  }
  function bossHead(){
    const hpPct=Math.round((bq.length-bqi)/bq.length*100);
    return "<div class='stephead'><span class='muted'>⚔️ Консул · вопрос "+(bqi+1)+"/"+bq.length+" · ошибок "+bFails+"/"+bAllowed+"</span>"+
      "<button class='exitbtn' id='sbBossExit'>✕ сдаться</button></div>"+
      "<div class='bosshp'><i style='width:"+hpPct+"%'></i></div>";
  }
  function bossQ(){
    if(bFails>bAllowed) return bossEnd(false);
    if(bqi>=bq.length) return bossEnd(true);
    $("sbDrillBar").style.width=Math.round(bqi/bq.length*100)+"%";
    const c=cardById(bq[bqi]);
    if(!c){ bqi++; return bossQ(); }
    const box=$("sbDrillCard");
    box.innerHTML=bossHead()+
      "<div class='prompt'>Консул спрашивает — отвечай вслух</div>"+
      "<div class='term' style='font-size:24px'>"+c.qp+"</div>"+
      "<div class='hint'>"+c.qr+"</div>"+
      "<div class='bosstimer' id='sbTimer'>⏱ "+BOSS_SEC+"</div>"+
      "<div id='sbReveal'><button class='btn-primary' id='sbShow' style='margin-top:14px'>Показать ответ</button></div>";
    $("sbBossExit").onclick=function(){ stopTimer(); if(confirm("Сдаться Консулу?")) showSobes(); else bossQ(); };
    speak(c.qp);
    bLeft=BOSS_SEC;
    stopTimer();
    bTimer=setInterval(function(){
      bLeft--;
      const t=$("sbTimer");
      if(t){ t.textContent="⏱ "+bLeft; if(bLeft<=5) t.style.color="var(--accent2)"; }
      if(bLeft<=0){ stopTimer(); bossReveal(c, true); }
    },1000);
    $("sbShow").onclick=function(){ stopTimer(); bossReveal(c, false); };
  }
  function bossReveal(c, timeout){
    $("sbReveal").innerHTML=
      (timeout?"<div class='feedback bad'>⏱ Время вышло!</div>":"")+
      "<div class='answer' style='font-size:19px'>"+c.ap+"</div>"+
      (c.ar?"<div class='ex'>"+c.ar+"</div>":"")+
      "<div class='grades' style='grid-template-columns:1fr 1fr'>"+
        "<button class='grade g-good' id='sbKnew'"+(timeout?" disabled":"")+">Znałem ✓</button>"+
        "<button class='grade g-again' id='sbFail'>Nie znałem ✗</button></div>";
    const t=$("sbTimer"); if(t) t.style.display="none";
    speak(c.ap);
    function step(ok){
      if(!SB.srs[c.id]) SB.srs[c.id]={ef:2.5, interval:0, reps:0, due:Date.now()};
      sReview(SB.srs[c.id], ok?2:0);
      if(ok){ addXP(15); } else { bFails++; }
      bqi++; ssave(); bossQ();
    }
    if(!timeout) $("sbKnew").onclick=function(){ step(true); };
    $("sbFail").onclick=function(){ step(false); };
  }
  function bossEnd(win){
    stopTimer();
    $("sbDrillBar").style.width="100%";
    logDay();
    if(win){
      addXP(100);
      SB.boss.wins=(SB.boss.wins||0)+1;
      SB.boss.lastWin=todayStr();
    }
    checkAch(); ssave();
    const answered=bqi, good=answered-bFails;
    $("sbDrillCard").innerHTML=
      "<div class='center'><div style='font-size:50px'>"+(win?"🏆":"🪦")+"</div>"+
      "<div class='step-title' style='text-align:center'>"+(win?"Консул повержен!":"Консул победил… в этот раз")+"</div>"+
      "<div class='muted' style='text-align:center'>Верно: <b>"+good+"</b> · ошибок: "+bFails+
      (win?" · +100 XP · побед: "+SB.boss.wins:"")+"</div>"+
      (win?"":"<div class='note' style='text-align:center'>Прокачай слабые вопросы в повторении и возвращайся.</div>")+
      "</div>"+
      "<div class='toolbar'><button class='btn-primary' id='sbBackBtn'>"+(win?"Забрать трофей":"К списку вопросов")+"</button></div>";
    $("sbBackBtn").onclick=showSobes;
  }

  refreshTab();
})();
