const Comments = require('../../db/models/comments');

const listComments = async (req, res) => {
    const {id} = req.params;
    try {
        const comments = await Comments.listComments(id);
        res.send(comments)
    }
    catch (error) {
        res.status(404).send({message: error})
    }
}

module.exports = listComments