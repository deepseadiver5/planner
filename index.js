const tasks = document.querySelectorAll('.task');
const columns = document.querySelectorAll('.column');

let draggedTask = null;

// iterates over task items
// adds eventlisteners for dragstat and dragend
// simple change of style and assign task html element to variable

tasks.forEach(task => {
    task.addEventListener("dragstart", () => {
        draggedTask = task;
        task.style.opacity = '0.5';

    });
    task.addEventListener('dragend', () => {
    draggedTask = null;
    task.style.opacity = '1';
    })
});

// iterates through .columns
// adds eventlisteners for dragover, drop and dragleave
// adds class for transition

columns.forEach(column => {
    column.addEventListener('dragover', e => {
        column.classList.add("active");
        e.preventDefault(); // necessary to allow drop
    });
    column.addEventListener('drop', e => {
        if(draggedTask) {
            column.classList.remove("active");
            column.appendChild(draggedTask)
        }
    });
    column.addEventListener('dragleave', e => {
        if(draggedTask) {
            column.classList.remove("active");
        }
    });
});

// need a data structure to allow this to persist

// need a navbar for different todo lists

// add a button to each to do list - new item
// creates new item in the data base
// have different attributes in the list
// attribs - start/end - colour picker from 6-7
// checkboxes - filters???
// attach an image - person - attach files / note
// add a href web link
// user accont - log in and out
// different database for each user
// assign task to a person
// select different backgrounds - gradients / styles etc
// different views
// navbar

// left hand sidebar - My lists Personal Home Books
// filters for - today / next 7 days / all tasks
