let today = new Date();
let time = ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2);
let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);

let allTasks = [];

/**
 * This function is to add new tasks to Kanban. Press the button and the task with the inserted data will be saved in the Array "allTasks"
 * 
 */
function addTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let due_date = document.getElementById('due-date').value;
    let ungency = document.getElementById('ungency').value;
    let assigned = document.getElementById('assigned').value;
    let status = 'backlog';

    let task = {
        'id': new Date().getTime(),
        'status': status,
        'title': title,
        'category': category,
        'description': description,
        'createdTime': time,
        'createdDate': date,
        'due-date': due_date,
        'ungency': ungency,
        'assigned': assigned
    }

    allTasks.push(task)

    save();
    clearInput();
    document.getElementById('Save').innerHTML = `
    <div class="task">
    The task was saved successfully!
    </div>`
    setTimeout
    setTimeout(() => {document.getElementById('Save').innerHTML = `
    <div class="hide-task"></div>`}, 3000);
}

/**
 * This function is to clear inputfields so new task can be added"
 * 
 */
function clearInput() {
    title.value = '';
    category.value = '';
    description.value = '';
    document.getElementById('due-date').value = '';
    ungency.value = '';
    assigned.value = '';
}


