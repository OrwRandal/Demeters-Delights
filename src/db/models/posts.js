const knex = require("../knex");

class Posts {
    static async listAllPosts() {
        try {
            const query = 'SELECT * FROM posts';
            const { rows } = await knex.raw(query);
            return rows;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to get all posts');
        }
    }
    static async listSavedPosts(user_id) {
        try {
            const query = 'SELECT posts.post_id, posts.user_id, posts.ingredients, posts.instructions, posts.youtube, posts.image, posts.category FROM posts JOIN saved ON posts.post_id = saved.post_id WHERE saved.user_id = ?'
            const { rows } = await knex.raw(query, [user_id]);
            return rows;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to get saved posts');
        }
    }
    static async savePost(user_id, post_id) {
        try {
            const query = 'INSERT INTO saved(user_id, post_id) VALUES(?,?)';
            await knex.raw(query, [user_id, post_id]);
            return true;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to save posts');
        }
    }
    static async checkSave(user_id, post_id){
        try {
            const query = 'SELECT * FROM saved WHERE user_id = ? AND post_id = ?';
            const {rows} = await knex.raw(query, [user_id, post_id])
            return rows;
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to check like');
        }
    }
    static async removeSave(saved_id){
        try {
            const query = 'DELETE FROM saved WHERE saved_id = ?';
            await knex.raw(query, [saved_id]);
            return true;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to remove saved posts');
        }
    }
    static async listUsersPost(user_id) {
        try {
            const query = 'SELECT * FROM posts WHERE user_id = ?';
            const { rows } = await knex.raw(query, [user_id]);
            return rows;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to get your posts');
        }
    }
    static async createPost(user_id, ingredients, instructions, youtube, image, category) {
        try {
            const query = 'INSERT INTO posts(user_id, ingredients, instructions, youtube, image, category) VALUES(?,?,?,?,?,?)';
            await knex.raw(query, [user_id, ingredients, instructions, youtube, image, category]);
            return true
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to create post');
        }
    }
    static async deletePost(post_id) {
        try {
            const postQuery = 'DELETE FROM posts WHERE post_id = ?';
            const likeQuery = 'DELETE FROM likes WHERE post_id = ?';
            const commentQuery = 'DELETE FROM comments WHERE post_id = ?';
            await knex.raw(postQuery, [post_id]);
            await knex.raw(likeQuery, [post_id]);
            await knex.raw(commentQuery, [post_id]);
            return true;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to delete post');
        }
    }
}

module.exports = Posts