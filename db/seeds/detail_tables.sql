create table climate (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table trade (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table religion (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table magic (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table government (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table language (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table military (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table professions (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table myth (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table characters (
    id serial primary key,
    content text,
    world_id int references world(id)
)

create table img (
    id serial primary key,
    img text,
    content text,
    world_id int references world(id)
)