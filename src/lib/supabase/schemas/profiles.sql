create table
  profiles (
    id uuid primary key default gen_random_uuid (),
    name text not null,
    hourly_rate numeric not null
  );