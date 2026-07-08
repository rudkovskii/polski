# Синхронизация — уже почти включена

Приложение переиспользует **твой существующий проект Supabase** (тот же, что у «Карты поляка»).
Ключи уже вставлены в `config.js`, вход по **email + паролю** (тот же аккаунт, что там).

Осталось **одно действие** — создать отдельную таблицу под прогресс тренажёра,
чтобы он не смешивался с данными «Карты поляка». 10 секунд, без терминала.

## Единственный шаг: создать таблицу

1. Открой **supabase.com** → твой проект → в левом меню **SQL Editor** → **New query**.
2. Вставь это целиком и нажми **Run**:

```sql
create table if not exists public.trainer_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
alter table public.trainer_progress enable row level security;

drop policy if exists "own trainer select" on public.trainer_progress;
drop policy if exists "own trainer insert" on public.trainer_progress;
drop policy if exists "own trainer update" on public.trainer_progress;

create policy "own trainer select" on public.trainer_progress
  for select using (auth.uid() = user_id);
create policy "own trainer insert" on public.trainer_progress
  for insert with check (auth.uid() = user_id);
create policy "own trainer update" on public.trainer_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

Должно написать **Success**. Всё — таблица создана, защита включена (каждый видит только свои данные).

## Проверка

1. Открой приложение: https://rudkovskiid-blip.github.io/polski/
2. На главной в карточке «☁️ Синхронизация» введи **email и пароль** (тот же аккаунт, что в «Карте поляка») → **Войти**.
3. Позанимайся на компьютере; открой на iPad, войди тем же аккаунтом — прогресс подтянется.
   Статус («синхронизировано ЧЧ:ММ») виден в той же карточке.

## Если забыл пароль от того аккаунта

Supabase → твой проект → **Authentication** → **Users** → найди свой email → «…» → Reset password
(или Send magic link). Регистрация в приложении закрыта специально — аккаунт один.
