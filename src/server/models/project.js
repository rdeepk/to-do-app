const mongoose = require('mongoose');

var Project = mongoose.model('Project', {
    title: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = {
    Project
};