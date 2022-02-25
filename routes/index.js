const Router = require('express').Router();
const {register,authenticate,getUser} = require('../controllers/userController')
const {auth} = require('../auth')
const {follow,unfollow} = require('../controllers/followController')
const {createPost,likePost,unlikePost,deletePost} = require('../controllers/postController')

Router.post('/users',register);
Router.get('/user',auth,getUser)

Router.post('/authenticate',authenticate)

Router.post('/follow/:id',auth,follow)
Router.post('/unfollow/:id',auth,unfollow)

Router.post('/posts',auth,createPost)
Router.delete('/posts/:id',auth,deletePost)

Router.post('/like/:id',auth,likePost)
Router.post('/unlike/:id',auth,unlikePost)

module.exports = Router;