create table
  shifts (
    id uuid primary key default gen_random_uuid (),
    profile_id uuid not null references profiles (id) on delete cascade,
    clock_in timestamp not null,
    clock_out timestamp,
    rate numeric not null
  );

create index idx_shifts_profile_id on shifts (profile_id);

alter table shifts enable row level security;

create policy "own shifts" on shifts for all to authenticated
using (
  exists (
    select 1 from profiles p
    where p.id = shifts.profile_id
      and p.user_id = (select auth.uid ())
  )
)
with check (
  exists (
    select 1 from profiles p
    where p.id = shifts.profile_id
      and p.user_id = (select auth.uid ())
  )
);