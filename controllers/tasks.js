const Task = require('../model/task');
const List = require('../model/list');
const seedDatabase = require('../seed');
const AppError = require('../apperror');

module.exports.editTaskStatus = async (req, res) => {
    const { id, updatedStatusClean } = req.body;
    const response = await Task.findByIdAndUpdate(id, { status: updatedStatusClean }, { returnDocument: 'after' });
    res.status(200).json({ success: true });
}

module.exports.editTaskName = async (req, res) => {
    const { id, name } = req.body;
    const response = await Task.findByIdAndUpdate(id, { name: name }, { returnDocument: 'after' });
    res.status(200).json({ success: true });
}

module.exports.deleteTask = async (req, res) => {
    const { id } = req.body;
    const response = await Task.findByIdAndDelete(id);
    await List.findByIdAndUpdate(req.session.list._id, {
        $pull: { tasks: id }
    });
    console.log(response);
    res.status(200).json({ success: true, deletedTask: response });
}

module.exports.seedTasks = async (req, res) => {
    const response = await seedDatabase(req.session.list._id);
    res.status(200).json({ success: true });
}

module.exports.deleteAllTasks = async (req, res) => {
    try {
        // need to go through each task in the list - findbyid and delete the task then clear the array

        // const response = await Task.deleteMany();

        const list = await List.findById(req.session.list._id);
        await Task.deleteMany({ _id: { $in: list.tasks } });
        list.tasks = [];
        await list.save();
        res.redirect(`/tasks/${req.session.list._id}`);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ success: false, error: 'An error occurred while deleting tasks' });
    }
}

module.exports.createTask = async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(req.session.list._id);
    const newTask = await Task.insertOne({ name: 'new task', status: 'todo' });
    list.tasks.push(newTask);
    await list.save();
    res.status(200).json({ success: true });
}

module.exports.showTasks = async (req, res) => {
    const { id } = req.params;
    const list = await List.findById(id).populate('tasks');
    req.session.list = list;
    const tasks = list.tasks;
    res.render('index', { tasks: tasks, list: list });
}