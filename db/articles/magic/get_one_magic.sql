select m.id, m.world_id, m.content, m.img, m.title
from magic m
join world w on m.world_id = w.id
where m.id = $1 and w.id = $2