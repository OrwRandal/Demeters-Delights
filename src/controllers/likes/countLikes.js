const Likes = require('../../db/models/likes')

const countLikes = async (req, res) => {
    const {id} = req.params
    try {
        const amount = await Likes.countLikes(id)
        res.send(amount.length? amount: {post_id: id, count: 0})
    }
    catch (error) {
        res.status(404).send({message:error})
    }
}

module.exports = countLikes