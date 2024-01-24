var controller = require('./../controllers/api')
const { body, validationResult } = require("express-validator");

module.exports = function(router) {
    router.post('/user/create', controller.userValidate, async (req, res) => { controller.userCreate(req, res) })
}