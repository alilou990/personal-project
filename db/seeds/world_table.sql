create table world (
  id serial primary key,
  name text,
  user_id int references users(id)
)