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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required: true
    },
    labels: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Label"
    }]
});

module.exports = {
    Todo
};