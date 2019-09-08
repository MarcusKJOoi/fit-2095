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
        uppercase: true
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