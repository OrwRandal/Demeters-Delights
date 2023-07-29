const Likes = require('../../db/models/likes')

const createLike = async (req, res) => {
    const {id} = req.params;
    const {user_id} = req.body;
    try {
        await Likes.createLike(user_id, id)
        res.sendStatus(200)
    }
    catch (error) {
        res.status(404).send({message: error})
    }
}

module.exports = createLike