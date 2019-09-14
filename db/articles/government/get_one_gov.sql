select g.id, g.world_id, g.content, g.img, g.title
from government g
join world w on g.world_id = w.id
where g.id = $1 and w.id = $2