const getWorlds = async (req, res) => {
    const {id} = req.session.userid
    const userWorlds = await req.app.get('db').world.get_worlds([id])
    return res.status(200).send(userWorlds)
}

module.exports = {
    getWorlds
}