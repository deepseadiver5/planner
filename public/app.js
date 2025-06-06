const tasks = document.querySelectorAll('.task');
const taskHolders = document.querySelectorAll('.taskHolder');

let draggedTask = null;

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

taskHolders.forEach(taskHolder => {
    taskHolder.addEventListener('dragover', e => {
        taskHolder.classList.add("active");
        e.preventDefault(); // necessary to allow drop
    });
    taskHolder.addEventListener('drop', e => {
        if(draggedTask) {
            updateTaskStatus(draggedTask.dataset.id, taskHolder.dataset.status);
            taskHolder.classList.remove("active");
            const addNewTask = taskHolder.querySelector('.add-new-task')
            taskHolder.insertBefore(draggedTask, addNewTask)
        }
    });
    taskHolder.addEventListener('dragleave', e => {
        if(draggedTask) {
            
            taskHolder.classList.remove("active");
        }
    });
});

async function updateTaskStatus(id, updatedStatus) {
    updatedStatusClean = updatedStatus.trim();    
    const response = await axios.patch(`/tasks/${id}/edit`, {
            id,
            updatedStatusClean
        });
}