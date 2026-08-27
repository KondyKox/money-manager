create table
    shifts (
        id uuid primary key default gen_random_uuid (),
        profile_id uuid not null references profiles (id),
        clock_in timestamp not null,
        clock_out timestamp,
        rate numeric not null
    );