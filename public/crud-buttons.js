// loop through all delete buttons class
const seed = document.querySelector('#seed');
const deleteAll = document.querySelector('#deleteall');
const createNewTask = document.querySelector('#createNewTask');

const delBtns = document.querySelectorAll('button.delete-btn');

for(let btn of delBtns){
    // addEventListener to each button
    const btnParent = btn.parentElement;
    const taskId = btn.parentElement.dataset.id;
    btn.addEventListener('click', () => deleteTask(taskId, btnParent));
};

// axios method

const deleteTask = async function(taskId, btnParent) {

    
    const response = await axios.delete('/tasks/delete', {data: {id: taskId}});
    // console.log(response);
    console.log(btnParent);
    btnParent.remove();
    console.log(response);
}

seed.addEventListener('click', async function(){
    const response = await axios.get('/tasks/seed');
    console.log(response);
})

deleteAll.addEventListener('click', async function(){
    const response = await axios.get('/tasks/deleteall');
    console.log(response);
})

createNewTask.addEventListener('click', async function(){
    const response = await axios.get('/tasks/new');
    console.log(response);
    // use the response object to create a new div without having to refresh the page
})


// need to delete the div as well or redirect - redirect not deal as don't want to refresh the page