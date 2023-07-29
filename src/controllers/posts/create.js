const Posts = require('../../db/models/posts');

const newPost = async (req, res) => {
    const {user_id, ingredients, instructions, youtube, image, category} = req.body;
    try{
        await Posts.createPost(user_id, ingredients, instructions, youtube, image, category);
        res.sendStatus(201);
    }
    catch(error){
        res.status(404).send({message: error.message})
    }
}
module.exports = newPost;