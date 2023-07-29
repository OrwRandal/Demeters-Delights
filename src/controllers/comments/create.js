const Comments = require('../../db/models/comments');

const createComment = async (req,res) => {
    const {user_id, comment} = req.body;
    const {id} = req.params
    try {
        await Comments.createComment(user_id, id, comment)
        res.sendStatus(201)
    }
    catch (error) {
        res.status(404).send({message: error});
    }
}

module.exports = createComment