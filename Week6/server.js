let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const MongoClient = require('mongodb').MongoClient;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
let urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('css'));
app.use(express.static('images'));

const url = 'mongodb://localhost:27017';
const dbName = 'week6';
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (_, client) => {
    console.log('Connected to MongoDB server.');
    const db = client.db(dbName);

    client.close();
});
// List of tasks created so far
let tasks = [];

app.get('/', urlencodedParser, (_, res) => {
    res.render('index.html');
});

app.get('/newTask', (_, res) => {
    res.render('newTask.html');
});

app.post('/newTask', urlencodedParser, (req, res) => {
    let { taskname, taskdue, taskdesc } = req.body;
    tasks.push({
        taskname,
        taskdue,
        taskdesc
    });
    res.redirect('/listTasks');
});

app.get('/listTasks', urlencodedParser, (_, res) => {
    res.render('listTasks.html', { tasks });
});

app.listen(8080);