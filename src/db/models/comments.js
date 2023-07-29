const knex = require('../knex');

class Comments {
    static async listComments(post_id) {
        try {
            const query = 'SELECT comment FROM comments WHERE post_id = ?'
            const { rows } = await knex.raw(query, [post_id]);
            return rows
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to get comments');
        }
    }
    static async createComment(user_id, post_id, comment) {
        try {
            const query = 'INSERT INTO comments (user_id, post_id, comment) VALUES (?,?,?)'
            await knex.raw(query, [user_id, post_id, comment])
            return true;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to post comment');
        }
    }
    static async deleteComment(comment_id) {
        try {
            const query = 'DELETE FROM comments WHERE comment_id = ?';
            await knex.raw(query, [comment_id])
            return true
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to delete comment')
        }
    }
    static async updateComment(comment, comment_id) {
        try {
            const query = 'UPDATE comments SET comment = ? WHERE comment_id = ?';
            await knex.raw(query, [comment, comment_id]);
            return true;
        }
        catch (error) {
            console.log(error)
            throw new Error('Failed to update comment')
        }
    }
}

module.exports = Comments