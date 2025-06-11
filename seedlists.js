const mongoose = require('mongoose');
const List = require('./model/list');

mongoose.connect('mongodb://127.0.0.1:27017/plannerApp')
    .then((() => console.log('Mongo Connected!')))
    .catch((e) => {
        console.log('Mongo Connection Error!')
        console.log(e)
    });

const seedDatabase = async function(){
    await List.insertMany([
        { name: 'List 1'},
        { name: 'List 2'},
        { name: 'List 3'},
        { name: 'List 4'},
        { name: 'List 5'},
    ])
        .then((res) => {
            console.log('data seeded successfully');
        })
        .catch((e) => {
            console.log(e);
        });
}


// module.exports = seedDatabase;

seedDatabase();
