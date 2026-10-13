create table
  profiles (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null default auth.uid () references auth.users (id) on delete cascade,
    name text not null,
    hourly_rate numeric not null
  );

create index idx_profiles_user_id on profiles (user_id);

alter table profiles enable row level security;

create policy "own profiles" on profiles for all to authenticated
using (user_id = (select auth.uid ()))
with check (user_id = (select auth.uid ()));