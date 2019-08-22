let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
let urlencodedParser = bodyParser.urlencoded({ extended: false});
let jsonParser = bodyParser.json();

app.use(express.static('css'));
app.use(express.static('views'));

app.get('/', urlencodedParser, (_, res) => {
    res.render('index.html');
});

app.get('/newTask', urlencodedParser, (_, res) => {
    res.render('newTask.html');
});

app.get('/listTasks', urlencodedParser, (_, res) => {
    res.render('listTasks.html');
});

app.listen(8080);