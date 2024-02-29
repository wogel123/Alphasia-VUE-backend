var express = require('express');
var cookieParser = require('cookie-parser')

module.exports = function () {
    var app = express();

    app.use(cookieParser())

    app.use(express.json())

    app.use('/uploads', express.static('./uploads'));

    return app;
}