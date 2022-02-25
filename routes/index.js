const Router = require('express').Router();
const {register,authenticate} = require('../controllers/userController')

Router.post('/users',register);
Router.post('/authenticate',authenticate)

module.exports = Router;