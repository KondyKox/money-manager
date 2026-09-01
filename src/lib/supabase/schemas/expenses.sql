create type expenses_category as enum (
    'Jedzenie',
    'Mieszkanie',
    'Transport',
    'Subskrypcje',
    'Opłaty',
    'Higiena',
    'Randeczki',
    'Inne'
);

create table
    expenses (
        id uuid primary key default gen_random_uuid (),
        profile_id uuid not null references profiles (id),
        amount numeric not null,
        category expenses_category not null,
        date timestamp not null,
        note text
    );