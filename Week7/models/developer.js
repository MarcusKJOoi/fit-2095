const mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        required: true,
        uppercase: true,
        validator: {
            validate: function (level) {
                return level.toUpperCase() === 'BEGINNER' || level.toUpperCase() === 'EXPERT'
            },
            message: 'Invalid level provided! Check schema for reference'
        }
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Developer', developerSchema);