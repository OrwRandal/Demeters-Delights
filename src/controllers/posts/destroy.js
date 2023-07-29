const Posts = require('../../db/models/posts');

const destroyPost = async (req,res) => {
    const {id} = req.params;
    try{
        await Posts.deletePost(id);
        res.sendStatus(204);
    }
    catch(error){
        res.status(404).send({message: error.message})
    }
}

module.exports = destroyPost