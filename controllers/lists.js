const List = require('../model/list')
const User = require('../model/user')
const Task = require('../model/task')

module.exports.renderLists = async (req, res) => {
    const currentUser = await User.findById(req.session.userId).populate('lists')
    const lists = currentUser.lists;
    res.render('./lists/show', { lists: lists })
}

module.exports.editList = async (req, res) => {
    const { id, name } = req.body;
    const response = await List.findByIdAndUpdate(id, { name: name }, { returnDocument: 'after' });
    res.json({ redirectTo: `/lists` });
}

module.exports.deleteList = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) throw new AppError('Missing list ID in request', 400);

        const list = await List.findById(id);
        if (!list) throw new AppError('List not found', 404)

        await Task.deleteMany({ _id: { $in: list.tasks } });

        const deletedList = await List.findByIdAndDelete(id);
        if (!deletedList) throw new AppError('Failed to delete list', 500)

        // also delete the id from the currentUser
        const userUpdate = await User.findByIdAndUpdate(req.session.userId, {
            $pull: { lists: id }
        });

        if (!userUpdate) throw new AppError('Failed to update user and remove lists', 500)

        // res.json({ redirectTo: `/lists` });
        res.status(200).json({ success: true, deleteList: deletedList });
    }
    catch (err) {
        next(err)
    }
}

module.exports.createList = async (req, res) => {
    const newList = await List.insertOne({ name: 'new list' });
    const currentUser = await User.findById(req.session.userId);
    console.log(currentUser)
    currentUser.lists.push(newList);
    await currentUser.save()
    res.json({ redirectTo: `/lists` });
}