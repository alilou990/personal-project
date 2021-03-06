const getMyth = async (req, res) => {
    const worldid = req.params.worldid
    const worldMyth = await req.app.get('db').articles.myth.get_myth([worldid])
    return res.status(200).send(worldMyth)
}

const getOneMyth = async (req, res) => {
    const {worldid} = req.params
    const {mythid} = req.query
    const db = req.app.get('db')
    const foundMyth = await db.articles.myth.get_one_myth([mythid, worldid])
    res.status(200).send(foundMyth)
}

const addMyth = async (req, res) => {
    const worldid = req.params.worldid
    const {content, img, title} = req.body
    const db = req.app.get('db')
    await db.articles.myth.add_myth([content, worldid, img, title])
        res.status(200).send('Post has been created!')

}

const deleteMyth = async (req, res) => {
    const {id} = req.params
    const db = req.app.get('db')
    await db.articles.myth.delete_myth([id])
        res.status(200).send('Article was deleted!')
}

const updateMyth = async (req, res) => {
    const {id} = req.params
    const {editContent, editImg, editTitle} = req.body
    const db = req.app.get('db')
    const updatedArticle = await db.articles.myth.update_myth([editContent, editImg, editTitle, id])
        res.status(200).send(updatedArticle)
}



module.exports = {
    getMyth,
    getOneMyth,
    addMyth,
    deleteMyth,
    updateMyth
}