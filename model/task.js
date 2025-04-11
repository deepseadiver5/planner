const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'doing', 'done']
    }
    // add target time
    // add filter - category
    // add note
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

// relational database - would need to make Task a document??? and store in relation to different users