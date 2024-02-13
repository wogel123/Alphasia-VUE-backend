require('express-router-group')

const authController = require('./../src/controllers/authController')
const controller = require("../src/controllers/default");


module.exports = function(router) {
    router.group('/api', router => {
        router.post('/user/create', (req, res) => authController.init(req, res).userCreate())
        router.post('/user/login', (req, res) => authController.init(req, res).userLogin())
        router.post('/user/checkLogin', (req, res) => authController.init(req, res).checkLogin())
    })
    router.get('/', controller.index)
}