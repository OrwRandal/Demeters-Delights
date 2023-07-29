const Likes = require('../../db/models/likes')

const deleteLike = async (req, res) => {
    const {id} = req.params
    try {
        await Likes.deleteLike(id);
        res.sendStatus(204)
    }
    catch (error) {
        res.status(404).send({message:error})
    }
}

module.exports = deleteLike