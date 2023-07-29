const Posts = require('../../db/models/posts');

const savePost = async (req, res) => {
    const {user_id, post_id} = req.body
    try {
        const posts = await Posts.savePost(user_id, post_id);
        res.send(posts)
    }
    catch (error) {
        res.status(404).send({message: error})
    }
}
module.exports = savePost