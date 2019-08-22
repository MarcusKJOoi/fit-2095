let express = require('express');

let app = express();
app.use(express.static('css'));
app.use(express.static('views'));
app.listen(8080);