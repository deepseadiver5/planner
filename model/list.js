const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
    // add target time
    // add filter - category
    // add note
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;