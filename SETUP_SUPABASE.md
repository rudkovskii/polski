# Настройка синхронизации (Supabase) — по шагам, без терминала

Займёт ~10 минут. Всё делается кликами в браузере. После этого прогресс будет
привязан к твоему Google-аккаунту и синхронизироваться между iPad и компьютером.

## Шаг 1. Создать проект

1. Зайди на **supabase.com** → Sign in (можно через GitHub или Google).
2. **New project**: имя `polski`, регион **EU (Central)** — ближе к Варшаве,
   пароль базы — любой (сохрани в заметки, он больше не понадобится).
3. Подожди 1–2 минуты, пока проект создаётся.

## Шаг 2. Создать таблицу прогресса

1. В левом меню открой **SQL Editor** → **New query**.
2. Вставь целиком блок ниже и нажми **Run**:

```sql
create table public.progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;

create policy "own row select" on public.progress
  for select using (auth.uid() = user_id);
create policy "own row upsert" on public.progress
  for insert with check (auth.uid() = user_id);
create policy "own row update" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

Должно написать «Success». Это создало хранилище (одна строка на пользователя)
и включило защиту: каждый видит только свои данные.

## Шаг 3. Включить вход через Google

1. Левое меню → **Authentication** → **Sign In / Providers** → **Google** → Enable.
2. Supabase попросит Client ID и Client Secret из Google Cloud. Прямо на этой
   странице есть ссылка на официальный гайд — по нему:
   - console.cloud.google.com → создать проект → OAuth consent screen (External) →
     Credentials → Create OAuth client ID (Web application);
   - в **Authorized redirect URIs** вставить URL, который показывает Supabase на
     странице настройки Google-провайдера (вида `https://<проект>.supabase.co/auth/v1/callback`);
   - скопировать Client ID и Client Secret обратно в Supabase → Save.

## Шаг 4. Указать адрес приложения

1. **Authentication** → **URL Configuration**.
2. **Site URL** = адрес приложения на GitHub Pages, например
   `https://твой-логин.github.io/polski/`.
3. В **Additional Redirect URLs** добавь тот же адрес.

## Шаг 5. Вставить ключи в приложение

1. **Settings** (шестерёнка) → **API**.
2. Скопируй **Project URL** и ключ **anon public**.
3. Открой файл `config.js` в этой папке и вставь оба значения между кавычек.
4. Открой `sw.js` и подними версию кэша на 1 (например `polski-v6` → `polski-v7`).
5. Загрузи оба файла на GitHub (commit + push, как обычно).

## Готово — проверка

1. Открой приложение по ссылке GitHub Pages.
2. На главной в карточке «☁️ Синхронизация» появится кнопка **«Войти через Google»**.
3. Войди на компьютере, позанимайся; открой на iPad, войди тем же Google —
   прогресс подтянется. Статус синхронизации виден в той же карточке.

## На заметку

- Бесплатный тариф: 500 MB базы, 50 000 пользователей в месяц — запас гигантский.
- Проект на бесплатном тарифе засыпает после ~7 дней без обращений; при ежедневных
  занятиях это не грозит. Если уснул — кнопка Restore в дашборде.
- Автобэкапов на free нет → кнопка «⬇ экспорт» в приложении остаётся твоим парашютом,
  сохраняй файл раз в неделю.
