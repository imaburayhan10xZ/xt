-- Run this once in Supabase SQL Editor.
create table if not exists public.clients (
    id text primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    data jsonb not null default '{}'::jsonb,
    is_trashed boolean not null default false,
    deleted_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists clients_user_id_idx on public.clients(user_id);
create index if not exists clients_user_trash_idx on public.clients(user_id, is_trashed);

alter table public.clients enable row level security;

drop policy if exists "Users can read their clients" on public.clients;
create policy "Users can read their clients" on public.clients
    for select using (auth.uid() = user_id);

drop policy if exists "Users can insert their clients" on public.clients;
create policy "Users can insert their clients" on public.clients
    for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update their clients" on public.clients;
create policy "Users can update their clients" on public.clients
    for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Users can delete their clients" on public.clients;
create policy "Users can delete their clients" on public.clients
    for delete using (auth.uid() = user_id);

create or replace function public.touch_clients_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists clients_updated_at on public.clients;
create trigger clients_updated_at
before update on public.clients
for each row execute function public.touch_clients_updated_at();
