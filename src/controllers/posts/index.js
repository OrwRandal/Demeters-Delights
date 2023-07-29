const newPost = require('./create');
const destroyPost = require('./destroy')
const listAllPosts = require("./listAll");
const listSavedPosts = require("./listSaved")
const savePost = require("./savePost")
const removeSave = require("./removeSave")
const listUsersPost = require("./listUsersPost")
const checkSave = require('./checkSave')

module.exports = {
    newPost,
    destroyPost,
    listAllPosts,
    listSavedPosts,
    savePost,
    removeSave,
    listUsersPost,
    checkSave
}