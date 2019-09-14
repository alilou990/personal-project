create table climate (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table trade (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table religion (
    id serial primary key,
    content text,
    world_id int references world(id).
    img text,
    title varchar(50)
)

create table magic (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table government (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table language (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table military (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table professions (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table myth (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table characters (
    id serial primary key,
    content text,
    world_id int references world(id),
    img text,
    title varchar(50)
)

create table img (
    id serial primary key,
    img text,
    content text,
    world_id int references world(id)
)