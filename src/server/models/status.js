const mongoose = require('mongoose');

var Status = mongoose.model('Status', {
    title: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = {
    Status
};