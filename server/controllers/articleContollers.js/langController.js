const getLang = async (req, res) => {
    const worldid = req.params.worldid
    const worldLang = await req.app.get('db').articles.language.get_lang([worldid])
    return res.status(200).send(worldLang)
}

const getOneLang = async (req, res) => {
    const {worldid} = req.params
    const {langid} = req.query
    const db = req.app.get('db')
    const foundLang = await db.articles.language.get_one_lang([langid, worldid])
    res.status(200).send(foundLang)
}

const addLang = async (req, res) => {
    const worldid = req.params.worldid
    const {content, img, title} = req.body
    const db = req.app.get('db')
    await db.articles.language.add_lang([content, worldid, img, title])
        res.status(200).send('Post has been created!')

}

const deleteLang = async (req, res) => {
    const {worldid} = req.params
    const {langid} = req.query
    const db = req.app.get('db')
    await db.articles.language.delete_lang([langid, worldid])
        res.status(200).send('Article was deleted!')
}



module.exports = {
    getLang,
    getOneLang,
    addLang,
    deleteLang
}