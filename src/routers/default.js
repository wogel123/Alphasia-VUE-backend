var controller = require('./../controllers/default')

module.exports = function(router) {
    router.get('/', controller.index)
}