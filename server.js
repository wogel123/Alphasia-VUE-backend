var app = require('./bin/express')();
var router = require('./bin/express-router')();

require('./src/routers/default')(router);
require('./src/routers/api')(router);

app.use('/', router)
app.use('/api', router)

app.listen(process.env.PORT)
console.log('Server launched at http://localhost:3000')