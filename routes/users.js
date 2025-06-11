const express = require('express');
const router = express.Router();

const Task = require('../model/task');
const List = require('../model/list');
const User = require('../model/user');

router.get('/register', (req, res) => {
    res.render('user/register');
})

router.get('/login', (req, res) => {
    res.render('user/login');
})

// need to add the flash messages

// login validate

router.post('/login', async (req, res) => {
    const { user } = req.body;
    // search for username - needs to be unique
    const response = await User.findOne({ name: user.name }).populate('lists');
    if (response) {
        // check password correct
        if (user.password == response.password) {
            req.session.userId = response._id;
            req.user = response;
            res.redirect('/lists')
        }
        else res.send('password incorrect')
    }
    else {
        // need to remember not to confirm which one is incorrect - just say invalid details entered
        res.send('user not found')
    }
})

// add a route to log out of the current user - add code to hide the register and login links if user is logged in and vice versa

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send('there was an error');
        }
        res.redirect('/login');
    })
})

// route to create a new user

router.post('/register', async (req, res) => {
    const { user } = req.body;
    const newUser = await User.insertOne({ name: user.name, email: user.email, password: user.password })
    // need to validate the username - check it doesn't already exist
    // encrypt the password - don't store a password in a db eve

    // const newuser = User.insertOne({ name: user.user})
    // res.redirect('/lists');
    req.session.userId = newUser._id;
    req.user = newUser;
    res.redirect('/lists')
})

// route to delete a user account

// route to edit a user account

// add validation - security - store in session variable...have access req.session.user - refer to the campgrounds app

module.exports = router;