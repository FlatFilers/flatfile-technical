CREATE TABLE sections (
    id serial PRIMARY KEY,
    title text NOT NULL
);

CREATE TABLE cards (
    id serial PRIMARY KEY,
    title text NOT NULL,
    section_id serial,
    order_index INTEGER
);