select c.id, c.world_id, c.content, c.img, c.title
from climate c
join world w on c.world_id = w.id
where c.id = $1 and w.id = $2
