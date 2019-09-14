select t.id, t.world_id, t.content, t.img, t.title
from trade t
join world w on t.world_id = w.id
where t.id = $1 and w.id = $2