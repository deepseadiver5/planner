const express = require('express');
const mongoose = require('mongoose');
const AppError = require('./apperror');
const path = require('path');
const seedDatabase = require(path.join(__dirname, 'seed'));
const session = require('express-session');
// create a session

const engine = require('ejs-mate');

console.log(path.join(__dirname, 'seed'));

const Task = require('./model/task');
const List = require('./model/list');
const User = require('./model/user')

const app = express();
//add server

app.engine('ejs', engine);

mongoose.connect('mongodb://127.0.0.1:27017/plannerApp')
    .then((() => console.log('Mongo Connected!')))
    .catch((e) => {
        console.log('Mongo Connection Error!')
        console.log(e)
    });

const taskRoutes = require('./routes/tasks')
const listRoutes = require('./routes/lists')
const userRoutes = require('./routes/users')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

sessionConfig = {
    secret: 'thisisnotagoodsecret',
    resave: false,
    saveUninitialized: true
}

app.use(session(sessionConfig));

app.use(async(req, res, next) => {
    if(req.session.userId){
        req.user = await User.findById(req.session.userId);
        res.locals.currentUser = req.user;
    }
    else{
        res.locals.currentUser = null;
    }
    next();
})

app.use('/tasks', taskRoutes);
app.use('/lists', listRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})