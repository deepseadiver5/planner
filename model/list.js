const mongoose = require('mongoose');
const {Schema} = mongoose;

const listSchema = new Schema({
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

const List = mongoose.model('List', listSchema);

module.exports = List;