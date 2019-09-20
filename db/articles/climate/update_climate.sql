update climate
set content = $1, img = $2, title = $3
where id = $4
returning *