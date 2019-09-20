const getReligion = async (req, res) => {
    const worldid = req.params.worldid
    const worldReligion = await req.app.get('db').articles.religion.get_religion([worldid])
    return res.status(200).send(worldReligion)
}

const getOneReligion = async (req, res) => {
    const {worldid} = req.params
    const {religionid} = req.query
    const db = req.app.get('db')
    const foundReligion = await db.articles.religion.get_one_religion([religionid, worldid])
    res.status(200).send(foundReligion)
}

const addReligion = async (req, res) => {
    const worldid = req.params.worldid
    const {content, img, title} = req.body
    const db = req.app.get('db')
    await db.articles.religion.add_religion([content, worldid, img, title])
        res.status(200).send('Post has been created!')

}

const deleteReligion = async (req, res) => {
    const {id} = req.params
    const db = req.app.get('db')
    await db.articles.religion.delete_religion([id])
        res.status(200).send('Article was deleted!')
}

const updateReligion = async (req, res) => {
    const {id} = req.params
    const {editContent, editImg, editTitle} = req.body
    const db = req.app.get('db')
    const updatedArticle = await db.articles.religion.update_religion([editContent, editImg, editTitle, id])
        res.status(200).send(updatedArticle)
}

module.exports = {
    getReligion,
    getOneReligion,
    addReligion,
    deleteReligion,
    updateReligion
}