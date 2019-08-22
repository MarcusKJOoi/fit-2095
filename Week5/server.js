let express = require('express');
let bodyParser = require('body-parser');
let app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
let urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('css'));
app.use(express.static('images'));
app.use(express.static('views'));

app.get('/', urlencodedParser, (_, res) => {
    res.render('index.html');
});

app.get('/newTask', (_, res) => {
    res.render('newTask.html');
});

app.post('/newTask', urlencodedParser, (req, res) => {
    let { taskname, taskdue, taskdesc } = req.body;
    console.log("req", req.body);
    console.log('name', taskname);
    console.log('due', taskdue);
    console.log('desc', taskdesc);
});

app.get('/listTasks', urlencodedParser, (_, res) => {
    res.render('listTasks.html');
});

app.listen(8080);