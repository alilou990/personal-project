const getWorlds = async (req, res) => {
    const id = req.session.userid.id
    const userWorlds = await req.app.get('db').world.get_worlds([id])
    return res.status(200).send(userWorlds)
}

const getName = async (req, res) => {
    const {id} = req.params
    const worldName = await req.app.get('db').world.get_world_name([id])
        res.status(200).send(worldName)
}

const addWorld = async (req, res) => {
    const id = req.session.userid.id
    const {name} = req.body
    const db = req.app.get('db')
    await db.world.create_world([name, id])
        res.status(200).send('Post has been created!')
}

// const deleteWorld = async (req, res) => {
//     const id = req.session.userid.id
//     const db = req.app.get('db')
//     await db.world.delete_world([id])
//         res.status(200).send('World was deleted!')
// }

const updateWorld = async (req, res) => {
    const {id} = req.params
    const {name} = req.body
    const db = req.app.get('db')
    const updatedWorld = await db.world.update_world([name, id])
    
        res.status(200).send(updatedWorld)
}

module.exports = {
    getWorlds,
    getName,
    addWorld,
    // deleteWorld
    updateWorld
}