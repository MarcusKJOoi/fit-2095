let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const MongoClient = require('mongodb').MongoClient;
const Tasks = require('./models/tasks');
const Developers = require('./models/developers');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
let urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('css'));
app.use(express.static('images'));

let db;
const url = 'mongodb://localhost:27017';
const dbName = 'FIT2095';
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (_, client) => {
    db = client.db(dbName);
});

app.get('/', urlencodedParser, (_, res) => {
    res.render('index.html');
});

app.get('/newTask', (_, res) => {
    res.render('newTask.html');
});

app.post('/newTask', urlencodedParser, (req, res) => {
    db.collection('todo').find().sort({ $natural: -1 }).limit(1).toArray((_, result) => {
        let taskid;
        if(result.length === 0) {
            taskid = 0;
        } else {
            taskid = result[0].taskid + 1;
        };
        let { taskname, taskassignedto, taskdue, taskcomplete, taskdesc } = req.body;
	taskdue = Date(taskdue);
        db.collection('todo').insertOne({ 
            taskid, 
            taskname, 
            taskassignedto, 
            taskdue, 
            taskcomplete: taskcomplete === 'true',
            taskdesc 
        }, (err, _) => {
            if(err) {
                res.send('Error when inserting new task!');
            } else {
                res.redirect('/listTasks');
            }
        });
    });
});

app.get('/listTasks', urlencodedParser, (_, res) => {
    db.collection('todo').find().toArray((_, data) => {
        res.render('listTasks.html', { tasks: data });
    })
});

app.get('/deleteTasks', urlencodedParser, (_, res) => {
    res.render('deleteTasks.html');
});

app.post('/deleteTasks', urlencodedParser, (req, res) => {
    let { deletetype } = req.body;
    switch(deletetype) {
        case 'byid':
            let { taskid: deletedTaskID } = req.body;
            // delete a certain taskid
            db.collection('todo').deleteOne({ taskid: { $eq: parseInt(deletedTaskID) }}, (err, _) => {
                if(err) {
                    res.send("Error when deleting task!");
                } else {
                    res.redirect('/listTasks');
                }
            });
            break;
            case 'completed':
                // delete all complete tasks
                db.collection('todo').deleteMany({ taskcomplete: { $eq: true }}, (err, _) => {
                    if(err) {
                        res.send("Error when deleting task!");
                    } else {
                        res.redirect('/listTasks');
                    }
                });
            break;
        default:
            res.send('Invalid deletion criteria!');
            break;
    };
});

app.get('/updateTask', urlencodedParser, (_, res) =>{
    res.render('updateTask.html');
});

app.post('/updateTask', urlencodedParser, (req, res) => {
    let { taskid: updatedTaskID, taskcomplete: updatedTaskStatus } = req.body;
    db.collection('todo').updateOne({ taskid: parseInt(updatedTaskID) }, 
    { $set: { taskcomplete: updatedTaskStatus === 'true'}}, (err, _) => {
        if(err) {
            res.send("Error when updating task!");
        } else {
            res.redirect('/listTasks');
        }
    });
});

app.get('/findtasks/:no1/:no2', urlencodedParser, (req, res) => {
    let { no1, no2 } = req.params; 
    let query = { taskid: { $gte: parseInt(no1), $lte: parseInt(no2) }};
    db.collection('todo').find(query).toArray((_, data) => {
        res.render('listTasks.html', { tasks: data });
    });
});

app.listen(8080);
