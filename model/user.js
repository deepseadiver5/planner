const mongoose = require('mongoose');
const {Schema} = mongoose;

// add a field to store the ids of lists associated with the user

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }]
    // add target time
    // add filter - category
    // add note
})

const User = mongoose.model('User', userSchema);

module.exports = User;