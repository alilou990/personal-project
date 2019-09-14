const getMag = async (req, res) => {
    const worldid = req.params.worldid
    const worldMag = await req.app.get('db').articles.magic.get_magic([worldid])
    return res.status(200).send(worldMag)
}

const getOneMag = async (req, res) => {
    const {worldid} = req.params
    const {magid} = req.query
    const db = req.app.get('db')
    const foundMag = await db.articles.magic.get_one_mag([magid, worldid])
    res.status(200).send(foundMag)
}

const addMag = async (req, res) => {
    const worldid = req.params.worldid
    const {content, img, title} = req.body
    const db = req.app.get('db')
    await db.articles.magic.add_magic([content, worldid, img, title])
        res.status(200).send('Post has been created!')

}

const deleteMag = async (req, res) => {
    const {worldid} = req.params
    const {magid} = req.query
    const db = req.app.get('db')
    await db.articles.magic.delete_magic([magid, worldid])
        res.status(200).send('Article was deleted!')
}



module.exports = {
    getMag,
    getOneMag,
    addMag,
    deleteMag
}