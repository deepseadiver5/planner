//// loop through all delete buttons class

// add edit function - could create a form and then monitor it for ipnut so that th div in the column is updated in real time...with the form hidden so it just looks like you're editing the task

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
    // instead of this, you could manually delete all the taks if the response comes back
    window.location.href = '/tasks';
})

deleteAll.addEventListener('click', async function(){
    const response = await axios.get('/tasks/deleteall');
    console.log(response);
        // instead of this, you could manually delete all the taks if the response comes back
    window.location.href = '/tasks';
})

createNewTask.addEventListener('click', async function(){
    const response = await axios.get('/tasks/new');
    console.log(response);
    // use the response object to create a new div without having to refresh the page
})


// need to delete the div as well or redirect - redirect not deal as don't want to refresh the page