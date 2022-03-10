let tasks = [
    {
        'id': 0,
        'title': 'Task0',
        'category': 'toDo',
        'assignedTo': 'Max',
        'dueDate': 'date'
    },
    {
        'id': 1,
        'title': 'Task1',
        'category': 'inProgress',
        'assignedTo': 'Nina',
        'dueDate': 'date'
    },
    {
        'id': 2,
        'title': 'Taks2',
        'category': 'testing',
        'assignedTo': 'Anna',
        'dueDate': 'date'
    },
    {
        'id': 3,
        'title': 'Taks3',
        'category': 'done',
        'assignedTo': 'Max',
        'dueDate': 'date'
    }];

let currentDraggedElement;

function updateBoard() {
    let toDo = tasks.filter(t => t['category'] == 'toDo'); /* TODO Neher an zeile 36 */

    document.getElementById('toDo').innerHTML = ``; /* TODO Neher an zeile 38 */

    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('toDo').innerHTML += generateTaskHTML(element);
    }

    let inProgress = tasks.filter(t => t['category'] == 'inProgress'); /* TODO Neher an zeile 45 */

    document.getElementById('inProgress').innerHTML = ``; /* TODO Neher an zeile 47 */

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTaskHTML(element);
    }

    let testing = tasks.filter(t => t['category'] == 'testing');/* TODO Neher an zeile 54 */

    document.getElementById('testing').innerHTML = ``;/* TODO Neher an zeile 56 */

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTaskHTML(element);
    }

    let done = tasks.filter(t => t['category'] == 'done');/* TODO Neher an zeile 62*/

    document.getElementById('done').innerHTML = ``;/* TODO Neher an zeile 65 */

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTaskHTML(element);
    }
}

function startDragging(id) {
    tasks.forEach(task => {
        if (task['id'] == id) {
            currentDraggedElement = tasks.indexOf(task)
        }
    });
}

function generateTaskHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="tasks">
              ${element['title']}<br>
              ${element['assignedTo']}<br>
              ${element['dueDate']}
            </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    tasks[currentDraggedElement]['category'] = category;
    updateBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}