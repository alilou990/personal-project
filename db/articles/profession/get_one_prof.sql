select p.id, p.world_id, p.content, p.img, p.title
from professions
join world w on p.world_id = w.id
where p.id = $1 and w.id = $2