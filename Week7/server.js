let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const mongoose = require('mongoose');
const Task = require('./models/task');
const Developer = require('./models/developer');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
let urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('css'));
app.use(express.static('images'));

const url = 'mongodb://localhost:27017/FIT2095';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });

app.get('/', (_, res) => {
    res.render('index.html');
});

app.get('/newDev', urlencodedParser, (_, res) => {
    res.render('newDev.html');
});

app.post('/newDev', urlencodedParser, (req, res) => {
    let { firstName, lastName, level, state, suburb, street, unit } = req.body;
    let newDev = Developer({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName,
            lastName
        },
        level: level,
        address: {
            state,
            suburb,
            street,
            unit
        }
    });
    newDev.save((err) => {
        if(err) {
            console.log({err});
            res.send('Failed to save new developer information!');
        } else {
            res.redirect('/listDevs');
        }
    });
});

app.get('/listDevs', (_, res) => {
    Developer.find({}, (err, docs) => {
        if(err) {
            console.log({err});
        } else {
            res.render('listDevs.html', { devs: docs });
        }
    });
});

app.get('/newTask', (_, res) => {
    Developer.find({}, (err, docs) => {
        if(err) {
            console.log({err});
        } else {
            res.render('newTask.html', { devs: docs });
        }
    });
});

app.post('/newTask', urlencodedParser, (req, res) => {
    let { name, developerId, dueDate, status, description } = req.body;
    let newTask = new Task({
        _id: new mongoose.Types.ObjectId(),
        name,
        developerId,
        dueDate,
        status,
        description  
    });
    newTask.save((err) => {
        if(err) {
            console.log({err});
        } else {
            res.redirect('/listTasks');
        }
    })
});

app.get('/listTasks', urlencodedParser, (_, res) => {
    Task.find().populate('developerId').exec((err, docs) => {
        if(err) {
            console.log({err});
        } else {
            res.render('listTasks.html', { tasks: docs });
        }
    });
});

app.get('/deleteTasks', urlencodedParser, (_, res) => {
    res.render('deleteTasks.html');
});

app.post('/deleteTasks', urlencodedParser, (req, res) => {
    let { deletetype } = req.body;
    switch(deletetype) {
        case 'byid':
            let { _id: deletedTaskID } = req.body;
            if (deletedTaskID.trim() === "") {
                res.redirect('/listTasks');
                return;
            } 
            // delete a certain taskid
            Task.deleteOne({ '_id': deletedTaskID }, (err) => {
                if(err) {
                    console.log({err});
                } else {
                    res.redirect('/listTasks');
                }
            });
            break;
            case 'completed':
                // delete all complete tasks
                Task.deleteMany({ 'status': 'Complete' }, (err) => {
                    if(err) {
                        console.log({err});
                    } else {
                        res.redirect('/listTasks');
                    }
                });
            break;
        default:
            res.send('Invalid deletion criteria!'); // Should never happen
            break;
    };
});

app.get('/updateTask', urlencodedParser, (_, res) =>{
    res.render('updateTask.html');
});

app.post('/updateTask', urlencodedParser, (req, res) => {
    let { _id: updatedTaskID, status } = req.body;
    if (updatedTaskID.trim() === "") {
        res.redirect('/listTasks');
        return;
    }    
    Task.updateOne({ '_id': updatedTaskID.trim() }, { $set: { 'status': status } }, { upsert: true }, (err) => {
        if(err) {
            console.log({err});
        } else {
            res.redirect('/listTasks');
        }
    });
});

app.get('/nonSamLee', (_, res) => {
    // 5d76eac2c7ba4d291c6368a6 - Anna's developer ID
    Developer.find({ $or: [ { 'name.firstName': 'Sam' } , { 'name.firstName': 'Lee' } ]}, (err, docs) => {
        if(err) {
            console.log({err});
        } else {
            let developerIds = docs.map(x => x._id);
            Task.updateMany({ 'developerId': { $in: developerIds } }, { $set: { 'developerId': '5d76eaa4c7ba4d291c6368a5', 'status': 'In Progress' }}, (err) => {
                if (err) {
                    console.log({err});
                } else {
                    res.redirect('/listTasks');
                }
            });
        }
    });
});

app.listen(8080);
