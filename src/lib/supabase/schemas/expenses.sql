create type expenses_category as enum (
  'Jedzenie',
  'Mieszkanie',
  'Transport',
  'Subskrypcje',
  'Opłaty',
  'Gry',
  'Elektronika',
  'Higiena',
  'Randeczki',
  'Inne'
);

create table
  expenses (
    id uuid primary key default gen_random_uuid (),
    profile_id uuid not null references profiles (id) on delete cascade,
    amount numeric not null,
    category expenses_category not null,
    date timestamp not null,
    note text,
    created_at timestamptz not null default now ()
  );

create index idx_expenses_profile_id on expenses (profile_id);

alter table expenses enable row level security;

create policy "own expenses" on expenses for all to authenticated
using (
  exists (
    select 1 from profiles p
    where p.id = expenses.profile_id
      and p.user_id = (select auth.uid ())
  )
)
with check (
  exists (
    select 1 from profiles p
    where p.id = expenses.profile_id
      and p.user_id = (select auth.uid ())
  )
);