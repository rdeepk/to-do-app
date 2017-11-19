const mongoose = require('mongoose');

var Label = mongoose.model('Label', {
    title: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = {
    Label
};