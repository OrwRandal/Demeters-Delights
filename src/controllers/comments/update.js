const Comments = require('../../db/models/comments');

const updateComment = async (req, res) => {
    const {id} = req.params;
    const {comment} = req.body;
    try {
        await Comments.updateComment(comment, id)
        res.sendStatus(200);
    }
    catch (error) {
        res.status(404).send({message: error})
    }
}

module.exports = updateComment