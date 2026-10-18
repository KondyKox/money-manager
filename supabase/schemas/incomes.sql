create type income_category as enum ('Praca', 'Prezenty', 'Hazard', 'Inne');

create table
  incomes (
    id uuid primary key default gen_random_uuid (),
    profile_id uuid not null references profiles (id) on delete cascade,
    amount numeric not null,
    category income_category not null,
    date timestamp not null,
    note text,
    created_at timestamptz not null default now ()
  );

create index idx_incomes_profile_id on incomes (profile_id);

alter table incomes enable row level security;

create policy "own incomes" on incomes for all to authenticated
using (
  exists (
    select 1 from profiles p
    where p.id = incomes.profile_id
      and p.user_id = (select auth.uid ())
  )
)
with check (
  exists (
    select 1 from profiles p
    where p.id = incomes.profile_id
      and p.user_id = (select auth.uid ())
  )
);