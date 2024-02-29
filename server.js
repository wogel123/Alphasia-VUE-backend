const Auth = require("./src/Auth/Auth");
var app = require('./bin/express')();
var router = require('./bin/express-router')();

require('./bin/routes')(router);

process.env.TZ = 'Europe/Paris';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/', router)

app.listen(process.env.PORT)
console.log('Server launched at http://localhost:3000')