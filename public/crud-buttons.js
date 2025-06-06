//// loop through all delete buttons class

// add edit function - could create a form and then monitor it for ipnut so that th div in the column is updated in real time...with the form hidden so it just looks like you're editing the task

const seed = document.querySelector('#seed');
const deleteAll = document.querySelector('#deleteall');
// const createNewTask = document.querySelector('#createNewTask');
const createNewTaskBtn = document.querySelector('#createNewTask')

const delBtns = document.querySelectorAll('button.delete-btn');

for (let btn of delBtns) {
    // addEventListener to each button
    const taskElement = btn.closest('.task');
    const taskId = taskElement.dataset.id;
    btn.addEventListener('click', () => deleteTask(taskId, taskElement));
};

const editBtns = document.querySelectorAll('.edit-btn');

const editForms = document.querySelectorAll('.editForm')

for (let btn of editBtns) {
    // addEventListener to each button
    const taskElement = btn.closest('.task');
    const taskId = taskElement.dataset.id;
    btn.addEventListener('click', () => displayEditTask(taskId, taskElement));
};

// document.getElementById('editForm').addEventListener('submit', function(e) {
//   e.preventDefault(); // Prevent form submission
//   editTask(e, taskId, btnParent); // Call your function
// });

for (let editForm of editForms) {
    // addEventListener to each form to prevent default behaviour and 
    editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const taskElement = editForm.closest('.task');
        const taskId = taskElement.dataset.id;
        const inputValue = editForm.elements['task-input'].value;
        console.log(inputValue)
        editTask(taskId, taskElement, inputValue)
    })
}




// axios method

const deleteTask = async function (taskId, btnParent) {
    const response = await axios.delete('/tasks/delete', { data: { id: taskId } });
    // console.log(response);
    console.log(btnParent);
    btnParent.remove();
    console.log(response);
}

const displayEditTask = function (taskId, btnParent) {
    // all this does is show the input and hide the task name - need separate function when the submit button is pressed
    const input = btnParent.querySelector('.task-input')
    input.classList.add('inputActive');
    const taskText = btnParent.querySelector('.task-text')
    taskText.classList.add('inputActive');
}

const editTask = async function (taskId, btnParent, inputValue) {
    // prevent default behaviour of the form
    // send an ajax request to an editName route
    // include task id and new name
    // update the task card name - or just refresh the page initially
    // call function that hides the edit panel and displays the name

    const response = await axios.patch(`tasks/${taskId}/editName`,  { data: { id: taskId, inputValue: inputValue } })
    console.log(response);
    console.log('edit task function called')
    window.location.href = '/tasks';

}

seed.addEventListener('click', async function () {
    const response = await axios.get('/tasks/seed');
    console.log(response);
    // instead of this, you could manually delete all the taks if the response comes back
    window.location.href = '/tasks';
})

deleteAll.addEventListener('click', async function () {
    const response = await axios.get('/tasks/deleteall');
    console.log(response);
    // instead of this, you could manually delete all the taks if the response comes back
    window.location.href = '/tasks';
})

createNewTaskBtn.addEventListener('click', async function () {
    const response = await axios.get('/tasks/new');
    console.log(response);
    // use the response object to create a new div without having to refresh the page
    window.location.href = '/tasks';
})


// need to delete the div as well or redirect - redirect not deal as don't want to refresh the page