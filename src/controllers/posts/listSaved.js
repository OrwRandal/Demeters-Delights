const Posts = require('../../db/models/posts');

const listSaved = async (req,res) => {
    try {
        const {id} = req.params;
        const posts = await Posts.listSavedPosts(id);
        res.send(posts)
    }
    catch (error) {
        res.status(404).send({message: error})
    }
}
module.exports = listSaved