const createComment = require('./create');
const deleteComment = require('./destroy');
const listComments = require('./list')
const updateComment = require('./update')

module.exports = {
    createComment,
    deleteComment,
    listComments,
    updateComment
}