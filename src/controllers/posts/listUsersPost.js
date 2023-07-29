const Posts = require('../../db/models/posts');

const listUsersPost = async (req,res) => {
    try {
        const {id} = req.params;
        const posts = await Posts.listUsersPost(id);
        res.send(posts);
    }
    catch (error) {
        res.status(404).send({message: error})
    }
}
module.exports = listUsersPost