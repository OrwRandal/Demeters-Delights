const Posts = require('../../db/models/posts');

const removeSave = async (req, res) => {
    const {id} = req.params
    try {
        await Posts.removeSave(id);
        res.sendStatus(200)
    }
    catch (error) {
        res.status(404).send({message: error})
    }
}
module.exports = removeSave