const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
    },
    userName: {
        type: String,
        required: true,
        minlength: 5,
    },
    booklist: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'book'}],
        default: [],
    }
});

module.exports = mongoose.model('user', userSchema);