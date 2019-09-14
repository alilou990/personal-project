const getClimate = async (req, res) => {
    const id = req.params.id
    const worldClimate = await req.app.get('db').articles.climate.get_climate([id])
    return res.status(200).send(worldClimate)
}

const getOneClimate = async (req, res) => {
    const {worldid} = req.params
    const {climateid} = req.query
    const db = req.app.get('db')
    const foundClimate = await db.articles.climate.get_one_climate([climateid, worldid])
    res.status(200).send(foundClimate)
}

const addClimate = async (req, res) => {
    const id = req.params.id
    const {content, img, title} = req.body
    const db = req.app.get('db')
    await db.articles.climate.add_climate([content, id, img, title])
        res.status(200).send('Post has been created!')

}

const deleteClimate = async (req, res) => {
    const {worldid} = req.params
    const {climateid} = req.query
    const db = req.app.get('db')
    await db.articles.climate.delete_climate([climateid, worldid])
        res.status(200).send('Article was deleted!')
}



module.exports = {
    getClimate,
    getOneClimate,
    addClimate,
    deleteClimate
}