const express = require('express');
const router = express.Router();

const List = require('../model/list');
const User = require('../model/user');
const Task = require('../model/task');

// { mergeParams: true } - use this to pass through id from router

router.get('/', async (req, res) => {
    // const lists = await List.find({});
    const currentUser = await User.findById(req.session.userId).populate('lists')
    const lists = currentUser.lists;
    res.render('./lists/show', { lists: lists })
})

// add create new list route - needs to be associatd with the user account - push to array

router.get('/new', async (req, res) => {
    // create a new list
    // store a ref to the list in the current user
    const newList = await List.insertOne({ name: 'new list' });
    const currentUser = await User.findById(req.session.userId);
    console.log(currentUser)
    currentUser.lists.push(newList);
    await currentUser.save()
    res.json({ redirectTo: `/lists` });
})

// add delete list - delete from mongo and the associated user Lists array

router.delete('/', async (req, res) => {
    const { id } = req.body;
    const list = await List.findById(id);
    await Task.deleteMany({ _id: { $in: list.tasks } });
    const response = await List.findByIdAndDelete(id);
    // also delete the id from the currentUser
    await User.findByIdAndUpdate(req.session.userId, {
        $pull: { lists: id }
    });
    console.log(response);
    // res.json({ redirectTo: `/lists` });
    res.status(200).json({ success: true, deleteList: response });
})

// edit list - edit the name of the list only

router.patch('/', async (req, res) => {
    const { data } = req.body;
    const inputValue = data.inputValue;
    const id = data.id;
    const response = await List.findByIdAndUpdate(id, { name: inputValue }, { returnDocument: 'after' });
    res.json({ redirectTo: `/lists` });
})

module.exports = router;