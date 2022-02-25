const Router = require('express').Router();
const {register,authenticate} = require('../controllers/userController')
const {auth} = require('../auth')
const {follow} = require('../controllers/followController')

Router.post('/users',register);
Router.post('/authenticate',authenticate)
Router.post('/follow/:id',auth,follow)

module.exports = Router;