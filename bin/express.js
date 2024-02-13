var express = require('express');
var cookieParser = require('cookie-parser')

var Twig = require('twig')

module.exports = function () {
    var app = express();

    app.use(cookieParser())

    app.set('view engine', 'twig');
    app.set('views', './public/views');
    app.set('twig options', {
        allowAsync: true
    })


    app.use(express.json())

    app.use('/img', express.static('./public/img'));
    app.use('/js', express.static('./public/js'));
    app.use('/css', express.static('./public/css'));

    app.use('/bower', express.static('./bower_components'));

    return app;
}