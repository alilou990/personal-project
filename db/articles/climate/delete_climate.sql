delete from climate
where id = $1

-- delete from climate c
-- join world w on c.world_id = w.id
-- where w.id = $1 and c.id = $2