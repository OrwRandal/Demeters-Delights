const knex = require('../knex');

class Likes {
    static async countLikes(post_id) {
        try {
            const query = 'SELECT post_id, COUNT(*) FROM likes WHERE post_id = ? GROUP BY post_id';
            const { rows } = await knex.raw(query, [post_id]);
            return rows;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to get post likes');
        }
    }
    static async createLike(user_id, post_id){
        try{
            const query = 'INSERT INTO likes(user_id, post_id) VALUES(?,?)';
            await knex.raw(query, [user_id, post_id]);
            return true;
        }
        catch(error){
            console.log(error);
            throw new Error('Failed to create like');
        }
    }
    static async deleteLike(like_id){
        try{
            const query = 'DELETE FROM likes WHERE like_id = ?';
            await knex.raw(query, [like_id]);
            return true;
        }
        catch(error){
            console.log(error);
            throw new Error('Failed to delete like');
        }
    }
    static async checkLike(user_id, post_id){
        try {
            const query = 'SELECT * FROM likes WHERE user_id = ? AND post_id = ?';
            const {rows} = await knex.raw(query, [user_id, post_id])
            return rows;
        }
        catch (error) {
            console.log(error);
            throw new Error('Failed to check like');
        }
    }
}

module.exports = Likes