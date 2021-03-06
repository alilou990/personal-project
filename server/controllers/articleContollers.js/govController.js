const getGov = async (req, res) => {
    const worldid = req.params.worldid
    const worldGov = await req.app.get('db').articles.government.get_gov([worldid])
    return res.status(200).send(worldGov)
}

const getOneGov = async (req, res) => {
    const {worldid} = req.params
    const {govid} = req.query
    const db = req.app.get('db')
    const foundGov = await db.articles.government.get_one_gov([govid, worldid])
    res.status(200).send(foundGov)
}

const addGov = async (req, res) => {
    const worldid = req.params.worldid
    const {content, img, title} = req.body
    const db = req.app.get('db')
    await db.articles.government.add_gov([content, worldid, img, title])
        res.status(200).send('Post has been created!')

}

const deleteGov = async (req, res) => {
    const {id} = req.params
    const db = req.app.get('db')
    await db.articles.government.delete_gov([id])
        res.status(200).send('Article was deleted!')
}

const updateGov = async (req, res) => {
    const {id} = req.params
    const {editContent, editImg, editTitle} = req.body
    const db = req.app.get('db')
    const updatedArticle = await db.articles.government.update_gov([editContent, editImg, editTitle, id])
        res.status(200).send(updatedArticle)
}



module.exports = {
    getGov,
    getOneGov,
    addGov,
    deleteGov,
    updateGov
}