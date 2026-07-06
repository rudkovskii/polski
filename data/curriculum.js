/* КАРТА КУРСА (CURRICULUM) — Outcomes и Skills
   Вынесено из index.html (Фаза 0). Правь контент здесь — приложение подхватит.
   Это глобальные данные, доступные всем модулям приложения. */

const CURRICULUM = {
  outcomes:[
    {id:"O1", name:"Вежливый контакт и знакомство",
     desc:"Поздороваться, представиться, поддержать короткий small talk (Pan/Pani).",
     bloom:"Understand→Apply", base:"Normative", validation:"Andragogy ✅", days:[1,4,7]},
    {id:"O2", name:"Покупки, деньги и еда",
     desc:"Купить, спросить цену, заплатить, заказать в кафе и ресторане.",
     bloom:"Apply", base:"Pragmatic", validation:"Task-based ✅", days:[2,3,11]},
    {id:"O3", name:"Просьбы и базовые действия",
     desc:"Формулировать просьбу и намерение (mogę / poproszę / chcę).",
     bloom:"Apply", base:"Procedural", validation:"Andragogy ✅", days:[5]},
    {id:"O4", name:"Город и транспорт",
     desc:"Спросить дорогу, доехать, купить билет, понять маршрут.",
     bloom:"Apply", base:"Instrumental", validation:"Survival ✅", days:[6,8]},
    {id:"O5", name:"Жизненные вопросы: здоровье, документы, дом",
     desc:"Решать ситуации в аптеке, urząd и быту, описать проблему.",
     bloom:"Apply→Analyze", base:"Critical", validation:"Survival ✅", days:[9,10,12]},
    {id:"O6", name:"Время, планы и привычка",
     desc:"Время и дни, договориться о встрече, фразы-связки, держать стрик.",
     bloom:"Understand→Apply", base:"Reflective", validation:"Habit ✅", days:[7,13,14]}
  ],
  skills:[
    {code:"S1.1", day:1,  name:"Powitania i grzeczność",  ru:"Приветствия и вежливость",  outcome:"O1", bloom:"Understand", base:"Normative"},
    {code:"S2.1", day:2,  name:"Liczby i kawiarnia",      ru:"Числа, деньги, кафе",       outcome:"O2", bloom:"Apply",      base:"Procedural"},
    {code:"S2.2", day:3,  name:"Zakupy i jedzenie",        ru:"Магазин и еда",             outcome:"O2", bloom:"Apply",      base:"Pragmatic"},
    {code:"S1.2", day:4,  name:"Ja i ty",                  ru:"Я и ты: о себе",            outcome:"O1", bloom:"Apply",      base:"Reflective"},
    {code:"S3.1", day:5,  name:"Czasowniki i prośby",      ru:"Глаголы и просьбы",         outcome:"O3", bloom:"Apply",      base:"Procedural"},
    {code:"S4.1", day:6,  name:"Miasto i kierunki",        ru:"Город и направления",       outcome:"O4", bloom:"Apply",      base:"Instrumental"},
    {code:"S6.1", day:7,  name:"Czas i przegląd",          ru:"Время, дни, повтор",        outcome:"O6", bloom:"Understand", base:"Reflective"},
    {code:"S4.2", day:8,  name:"Komunikacja miejska",      ru:"Транспорт и проезд",        outcome:"O4", bloom:"Apply",      base:"Instrumental"},
    {code:"S5.1", day:9,  name:"Zdrowie i apteka",         ru:"Здоровье и аптека",         outcome:"O5", bloom:"Apply",      base:"Pragmatic"},
    {code:"S5.2", day:10, name:"Praca i urząd",            ru:"Работа и документы",        outcome:"O5", bloom:"Apply",      base:"Procedural"},
    {code:"S2.3", day:11, name:"Restauracja",              ru:"Ресторан и заказ",          outcome:"O2", bloom:"Apply",      base:"Pragmatic"},
    {code:"S5.3", day:12, name:"Dom i usługi",             ru:"Дом и сервисы",             outcome:"O5", bloom:"Analyze",    base:"Critical"},
    {code:"S6.2", day:13, name:"Czas wolny i pogoda",      ru:"Досуг и погода",            outcome:"O6", bloom:"Apply",      base:"Pragmatic"},
    {code:"S6.3", day:14, name:"Przegląd i sytuacje",      ru:"Повтор и фразы-связки",     outcome:"O6", bloom:"Analyze",    base:"Critical"}
  ]
};
