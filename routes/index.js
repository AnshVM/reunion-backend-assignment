const Router = require('express').Router();
const {register,authenticate,getUser} = require('../controllers/userController')
const {auth} = require('../auth')
const {follow,unfollow} = require('../controllers/followController')
const {createPost,likePost} = require('../controllers/postController')

Router.post('/users',register);
Router.get('/user',auth,getUser)

Router.post('/authenticate',authenticate)

Router.post('/follow/:id',auth,follow)
Router.post('/unfollow/:id',auth,unfollow)

Router.post('/posts',auth,createPost)

Router.post('/like/:id',auth,likePost)

module.exports = Router;