const Posts = require('../../db/models/posts');

const listAllPosts = async (req,res) => {
    try {
        const posts = await Posts.listAllPosts();
        res.send(posts);
    }
    catch (error) {
        res.status(404).send({message: error})
    }
}

module.exports = listAllPosts