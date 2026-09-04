create table savings (
    id uuid primary key default gen_random_uuid(),
    profile_id uuid references profiles(id) not null,
    amount numeric not null,
    date timestamp not null
);