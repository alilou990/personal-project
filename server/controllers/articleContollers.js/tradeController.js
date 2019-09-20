const getTrade = async (req, res) => {
    const worldid = req.params.worldid
    const worldTrade = await req.app.get('db').articles.trade.get_trade([worldid])
    return res.status(200).send(worldTrade)
}

const getOneTrade = async (req, res) => {
    const {worldid} = req.params
    const {tradeid} = req.query
    const db = req.app.get('db')
    const foundTrade = await db.articles.trade.get_one_trade([tradeid, worldid])
    res.status(200).send(foundTrade)
}

const addTrade = async (req, res) => {
    const worldid = req.params.worldid
    const {content, img, title} = req.body
    const db = req.app.get('db')
    await db.articles.trade.add_trade([content, worldid, img, title])
        res.status(200).send('Post has been created!')

}

const deleteTrade = async (req, res) => {
    const {id} = req.params
    const db = req.app.get('db')
    await db.articles.trade.delete_trade([id])
        res.status(200).send('Article was deleted!')
}

const updateTrade = async (req, res) => {
    const {id} = req.params
    const {editContent, editImg, editTitle} = req.body
    const db = req.app.get('db')
    const updatedArticle = await db.articles.trade.update_trade([editContent, editImg, editTitle, id])
        res.status(200).send(updatedArticle)
}

module.exports = {
    getTrade,
    getOneTrade,
    addTrade,
    deleteTrade,
    updateTrade
}