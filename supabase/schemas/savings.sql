create table
  savings (
    id uuid primary key default gen_random_uuid (),
    profile_id uuid not null references profiles (id) on delete cascade,
    amount numeric not null,
    date timestamp not null,
    created_at timestamptz not null default now ()
  );

create index idx_savings_profile_id on savings (profile_id);

alter table savings enable row level security;

create policy "own savings" on savings for all to authenticated
using (
  exists (
    select 1 from profiles p
    where p.id = savings.profile_id
      and p.user_id = (select auth.uid ())
  )
)
with check (
  exists (
    select 1 from profiles p
    where p.id = savings.profile_id
      and p.user_id = (select auth.uid ())
  )
);