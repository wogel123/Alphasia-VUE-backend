var express = require('express');

module.exports = function () {
    var app = express();

    app.set('view engine', 'twig');
    app.set('views', './public/views');

    app.use(express.json())

    app.use('/img', express.static('./public/img'));
    app.use('/js', express.static('./public/js'));
    app.use('/css', express.static('./public/css'));

    app.use('/bower', express.static('./bower_components'));

    return app;
}