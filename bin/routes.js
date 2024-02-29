require('express-router-group')

const authController = require('./../src/controllers/authController')
const homeController = require("../src/controllers/homeController");
const articleController = require("../src/controllers/articleController");
const uploadController = require("../src/controllers/uploadController");
const userController = require("../src/controllers/admin/userController");


module.exports = function(router) {
    router.group('/api', router => {
        router.group('/user', router => {
            router.post('/create', (req, res) => authController.init(req, res).userCreate())
            router.post('/login', (req, res) => authController.init(req, res).userLogin())
            router.post('/checkLogin', (req, res) => authController.init(req, res).checkLogin())
            router.post('/logout', (req, res) => authController.init(req, res).logout())
        })
        router.group('/article', router => {
            router.get('/list/:nb?', (req, res) => articleController.init(req, res).getArticles())
        })
        router.post('/upload', (req, res) => uploadController.init(req, res).uploadFile())



        router.group('/admin', router => {
            router.group('/user', router => {
                router.get('/list', (req, res) => userController.init(req, res).getUsers())
                router.get('/ranks', (req, res) => userController.init(req, res).getRanks())
                router.post('/add', (req, res) => userController.init(req, res).addUser())
                router.get('/get/:id', (req, res) => userController.init(req, res).getUser())
            })
        })

    })
    router.get('/', homeController.index)
}