const Posts = require('../../db/models/posts');

const checkSave = async (req,res) => {
    const {user_id, post_id} = req.params;
    try {
        const result = await Posts.checkSave(user_id, post_id)
        res.send(result.length > 0)
    }
    catch (error) {
        res.status(404).send({message:error});
    }
}

module.exports = checkSave