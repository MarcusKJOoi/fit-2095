const mongoose = require('mongoose');

let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    developerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    dueDate: {
        type: Date,
        default: new Date(Date.now() + 1000 * 60 * 60) // 1 hr in the future
    },
    status: {
        type: String,
        validator: { // Might not need this
            validate: function (status) {
                return status === 'In Progress' || status === 'Complete'
            },
            message: 'Invalid status given!'
        }
    },
    description: String,
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Task', taskSchema);