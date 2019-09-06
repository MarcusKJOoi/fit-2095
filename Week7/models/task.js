const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    developerId: Number,
    dueDate: {
        type: Date,
        default: new Date(Date.now() + 1000 * 60 * 60) // 1 hr in the future
    },
    complete: {
        type: Boolean,
        required: true
    }, // 'In Progress' -> complete is false, 'Complete' -> complete is true
    description: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.Model('Task', taskSchema);