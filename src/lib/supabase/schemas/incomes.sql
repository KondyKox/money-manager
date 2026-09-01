create type income_category as enum ('Praca', 'Prezenty', 'Oszczędności', 'Inne');

create table
    incomes (
        id uuid primary key default gen_random_uuid (),
        profile_id uuid not null references profiles (id),
        amount numeric not null,
        category income_category not null,
        date timestamp not null,
        note text
    );