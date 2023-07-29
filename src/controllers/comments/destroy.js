const Comments = require('../../db/models/comments');

const deleteComment = async (req, res) => {
    const {id} = req.params;
    try {
        await Comments.deleteComment(id)
        res.sendStatus(204)
    }
    catch (error) {
        res.status(404).send({message:error})
    }
}

module.exports = deleteComment