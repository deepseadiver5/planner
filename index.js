const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
//add server

app.use('view-engine', 'ejs');
app.use('views', path.join(__dirname, 'views'));

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