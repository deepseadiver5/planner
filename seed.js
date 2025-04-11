const mongoose = require('mongoose');
const Task = require('./model/task');

mongoose.connect('mongodb://127.0.0.1:27017/plannerApp')
    .then((() => console.log('Mongo Connected!')))
    .catch((e) => {
        console.log('Mongo Connection Error!')
        console.log(e)
    });

Task.insertMany([
    {name: 'buy new fridge', status: 'doing'},
    {name: 'put house on market', status: 'doing'},
    {name: 'buy highchairs', status: 'done'},
    {name: 'use massage voucher', status: 'done'},
    {name: 'book holiday with Baz and Nic', status: 'done'},
])
.then((res) => {
    console.log('data seeded successfully');
})
.catch((e) => {
    console.log(e);
});

// {name: 'wash car', status: 'todo'},
// {name: 'finish cleaning shed', status: 'todo'},
// {name: 'take out rubbish', status: 'todo'},
// {name: 'cancel audible', status: 'todo'},
// {name: 'feed Tess', status: 'todo'},