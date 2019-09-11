create table climate (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table trade (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table religion (
    id serial primary key,
    content text,
    world_id int references world(id).
    img text
)

create table magic (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table government (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table language (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table military (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table professions (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table myth (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table characters (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text
)

create table img (
    id serial primary key,
    img text,
    content text,
    world_id int references world(id)
)