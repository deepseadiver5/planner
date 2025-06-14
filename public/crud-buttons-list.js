const createNewListBtn = document.querySelector('#createNewListBtn')

createNewListBtn.addEventListener('click', async function () {
    const response = await axios.get('/lists/new');
    window.location.href = response.data.redirectTo;
})

const deleteListBtns = document.querySelectorAll('button.deleteList-btn')

for (let btn of deleteListBtns) {
    const listElement = btn.closest('.list');
    const listId = listElement.dataset.id;
    btn.addEventListener('click', () => deleteList(listId, listElement));
}

const deleteList = async function (listId, listElement) {
    const response = await axios.delete('/lists', {
        data: {
            id: listId
        }
    });
    listElement.remove();
}

const editBtns = document.querySelectorAll('.edit-btn');

const editForms = document.querySelectorAll('.editForm')

for (let btn of editBtns) {
    // addEventListener to each button
    const listElement = btn.closest('.list');
    const listId = listElement.dataset.id;
    btn.addEventListener('click', () => displayListTask(listId, listElement));
};

const displayListTask = function (listId, listElement) {
    // all this does is show the input and hide the task name - need separate function when the submit button is pressed
    const input = listElement.querySelector('.list-input')
    input.classList.add('inputActive');
    const listText = listElement.querySelector('.list-text')
    listText.classList.add('inputActive');
}

for (let editForm of editForms) {
    // addEventListener to each form to prevent default behaviour and 
    editForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!editForm.checkValidity()) {
            editForm.classList.add('was-validated');
            return;
        }

        const listElement = editForm.closest('.list');
        const listId = listElement.dataset.id;
        const inputValue = editForm.elements['list-input'].value;
        editList(listId, listElement, inputValue)
    })
}

const editList = async function (listId, listElement, inputValue) {
    // prevent default behaviour of the form
    // send an ajax request to an editName route
    // include task id and new name
    // update the task card name - or just refresh the page initially
    // call function that hides the edit panel and displays the name


    const response = await axios.patch(`/lists`, {
        id: listId,
        name: inputValue
    } )

    window.location.href = response.data.redirectTo;

}
