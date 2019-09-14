select r.id, r.world_id, r.content, r.img, r.title
from religion
join world w on r.world_id = w.id
where r.id = $1 and w.id = $2