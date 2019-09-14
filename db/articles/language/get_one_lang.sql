select l.id, l.world_id, l.content, l.img, l.title
from language l
join world w on l.world_id = w.id
where l.id = $1 and w.id = $2