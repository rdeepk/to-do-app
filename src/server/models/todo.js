const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        required: true
    },
    project: {
        type: Number,
        required: true
    },
    labels: {
        type: Array,
        required: true
    }
});

module.exports = {
    Todo
};