-- delete from climate
-- where id = $1

delete from climate c
join world w on c.world_id = w.id
where c.id = $1 and w.id = $2