let express = require('express');
let router = require('./router.js');

let app = express();
app.use('/', router);
app.listen(8080);