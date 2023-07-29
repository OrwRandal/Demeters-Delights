const express = require('express');
const userController = require('./controllers/user');
const postController = require('./controllers/posts');
const commentController = require('./controllers/comments')
const likeController = require('./controllers/likes')
const addModels = require('./middleware/add-models');
const checkAuthentication = require('./middleware/check-authentication');

const Router = express.Router();
Router.use(addModels);

Router.get('/users', userController.list);
Router.post('/users', userController.create);
Router.get('/users/:id', userController.show);
// We can use middleware slotted in between the route and the controller as well
Router.patch('/users/:id', checkAuthentication, userController.update);

Router.post('/login', userController.login);
Router.delete('/logout', userController.logout);
Router.get('/me', userController.showMe);

Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

// Posts routes
Router.get('/posts/', postController.listAllPosts);
Router.get('/posts/saved/:id', postController.listSavedPosts);
Router.get('/posts/user/:id', postController.listUsersPost);
Router.get('/posts/save/:user_id/:post_id', postController.checkSave);
Router.post('/posts/save/', postController.savePost);
Router.post('/posts', postController.newPost);
Router.delete('/posts/save/:id', postController.removeSave);
Router.delete('/posts/:id', postController.destroyPost);

// Comments routes
Router.get('/comment/:id', commentController.listComments)
Router.post('/comment/:id', commentController.createComment);
Router.delete('/comment/:id', commentController.deleteComment);
Router.patch('/comment/:id', commentController.updateComment);

// Likes routes
Router.get('/like/:user_id/:post_id', likeController.checkLike);
Router.get('/like/:id', likeController.countLikes)
Router.post('/like/:id', likeController.createLike);
Router.delete('/like/:id', likeController.deleteLike)

module.exports = Router;