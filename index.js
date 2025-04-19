const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const seedDatabase = require(path.join(__dirname, 'seed'));
console.log(path.join(__dirname, 'seed'));

const Task = require('./model/task');

const app = express();
//add server

mongoose.connect('mongodb://127.0.0.1:27017/plannerApp')
    .then((() => console.log('Mongo Connected!')))
    .catch((e) => {
        console.log('Mongo Connection Error!')
        console.log(e)
    });


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.render('index', {tasks: tasks});
})

// app.patch takes route from the app.js axios request which sends the task id and new status for the db to be updated with
app.patch('/tasks/:id/edit', async (req, res) => {
    const {id, updatedStatus} = req.body;
    console.log(req.body);
    const response = await Task.findByIdAndUpdate(id, {status: updatedStatus},{returnDocument: 'after'});
    console.log(response);
    res.status(200).json({ success: true});
})

app.delete('/tasks/delete', async (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    const response = await Task.findByIdAndDelete(id);
    console.log(response);
    res.status(200).json({ success: true, deletedTask: response });
})

app.get('/tasks/seed', async (req, res) => {
    const response = await seedDatabase();
    console.log(response);
    res.status(200).json({ success: true});
})

app.get('/tasks/deleteall', async (req, res) => {
    try
    {
        const response = await Task.deleteMany();
        console.log(response);
        res.redirect('/tasks');
    }
    catch(e){
        console.error(e);
        res.status(500).json({success: false, error: 'An error occurred while deleting tasks'});
    }
    
})

app.get('/tasks/new', async (req, res) => {
    const response = await Task.insertOne({name: 'new task', status: 'todo'});
    console.log(response);
    res.status(200).json({ success: true});
})



// set json
// set middleware to read form data
// use for static css and jss

// create route for the homepage

// create route for creating a new task
// sends json back to the client side to create a new div

// create route for editing a task name / other attribs
// updates database with form data
// sends back new object to be stored in front-end

// create route for updating status of task

// create route for deleting task

// create route for viewing a task in more detail

// the navbar would be front-end - anchor tags fine - take you to pages

// to do lists would be requests that return ejs pages that include all the different tasks stored in the database as divs - this data also needs to be passed to the front-end...or does it - maybe only for adding tasks and data...or I think the front end can do this...might be better to render on back-end initially then serve to avoid delays/flicker

// side-bar - used to store different sets of lists - to filter lists
// maybe the same database but different tags - e.g personal, work, home improvement etc...cam also view all - ask ChatGPT best approach. 

app.listen(3000, () => {
    console.log('Listening on port 3000');
})