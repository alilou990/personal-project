const getProf = async (req, res) => {
    const worldid = req.params.worldid
    const worldProf = await req.app.get('db').articles.profession.get_prof([worldid])
    return res.status(200).send(worldProf)
}

const getOneProf = async (req, res) => {
    const {worldid} = req.params
    const {profid} = req.query
    const db = req.app.get('db')
    const foundProf = await db.articles.profession.get_one_prof([profid, worldid])
    res.status(200).send(foundProf)
}

const addProf = async (req, res) => {
    const worldid = req.params.worldid
    const {content, img, title} = req.body
    const db = req.app.get('db')
    await db.articles.profession.add_prof([content, worldid, img, title])
        res.status(200).send('Post has been created!')

}

const deleteProf = async (req, res) => {
    const {id} = req.params
    const db = req.app.get('db')
    await db.articles.profession.delete_prof([id])
        res.status(200).send('Article was deleted!')
}

const updateProf = async (req, res) => {
    const {id} = req.params
    const {editContent, editImg, editTitle} = req.body
    const db = req.app.get('db')
    const updatedArticle = await db.articles.profession.update_prof([editContent, editImg, editTitle, id])
        res.status(200).send(updatedArticle)
}



module.exports = {
    getProf,
    getOneProf,
    addProf,
    deleteProf,
    updateProf
}