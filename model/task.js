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

// tasks - each task is related to a specific to do list - each list has an owner/user
// need another LIST schema - array of tasks, user, name, description
// create USER schema = id, password, username, emailaddress - do you also have a list field???
// add filters to the task schema - mask of five and make them customisable = array with max length of five
// then need a filter schema = array of names - or array of filters - push new filter category to the array
// filter could just be a colour - one of five categories - can belong to multiple categories