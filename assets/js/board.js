let tasks = [
    {
        'id': 0,
        'title': 'Task0',
        'category': 'Marketing',
        'status': 'toDo',
        'assignedTo': 'Max',
        'dueDate': '2022-03-25'
    },
    {
        'id': 1,
        'title': 'Task1',
        'category': 'Sales',
        'status': 'inProgress',
        'assignedTo': 'Nina',
        'dueDate': '2022-03-25'
    },
    {
        'id': 2,
        'title': 'Taks2',
        'category': 'Product',
        'status': 'testing',
        'assignedTo': 'Anna',
        'dueDate': '2022-03-25'
    },
    {
        'id': 3,
        'title': 'Taks3',
        'category': 'Marketing',
        'status': 'done',
        'assignedTo': 'Max',
        'dueDate': '2022-03-25'
    }];

let currentDraggedElement;

function updateBoard() {
    let toDo = tasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDo').innerHTML = ``;
    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('toDo').innerHTML += generateTaskHTML(element);
    }

    let inProgress = tasks.filter(t => t['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = ``;
    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTaskHTML(element);
    }

    let testing = tasks.filter(t => t['status'] == 'testing');
    document.getElementById('testing').innerHTML = ``;
    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTaskHTML(element);
    }

    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = ``;
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
              <div class="task-items">  
                    <div><b>${element['title']}</b></div>
                    <div>${element['category']}</div>
                    <div>${element['assignedTo']}</div>
                    <div>${element['dueDate']}</div>
              </div>      
              <div class= "flex align-items-center space-between">
                <img id="delete-icon" onclick="deleteTask(${element['id']})" src="../assets/img/delete.jpg" class="delete-icon">
                <img id="openTask" onclick="editTask(${element['id']})" src="../assets/img/edit.jpg" class="edit-icon">
              </div>
            </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasks[currentDraggedElement]['status'] = status;
    updateBoard();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function deleteTask(id) {
    let index = tasks.findIndex(t => t.id == id);
    tasks.splice(index, 1);
    updateBoard();
}

function editTask(id) {
    let index = tasks.findIndex(t => t.id == id);
    document.getElementById('board-container').innerHTML += `
                        <div id="changeText" class="changeText">
                         
                                <div class="close-button" onclick="closeOpenTask()">x</div> 
                         
                            <div class="inputfields">
                                <input minlength="2" maxlength="25" id="Title_${tasks[index]['title']}" type="text" placeholder="Title">
                                <select id="category_${tasks[index]['category']}">
                                    <option>Marketing</option>
                                    <option>Product</option>
                                    <option>Sales</option>
                                </select>
                                <input minlength="2" maxlength="25" id="AssignedTo_${tasks[index]['assignedTo']}" type="text" placeholder="Assigned To">
                                <input type="date" name="" id="DueDate_${tasks[index]['dueDate']}">
                            </div>
                        
                                <div class="change-button" onclick="changeInput('${id}','${index}','Title_${tasks[index]['title']}','category_${tasks[index]['category']}','${tasks[index]['status']}','AssignedTo_${tasks[index]['assignedTo']}', 'DueDate_${tasks[index]['dueDate']}')">Change</div>
                     
                        </div>
                    `;
    document.getElementById(`Title_${tasks[index]['title']}`).value = tasks[index]['title'];
    document.getElementById(`category_${tasks[index]['category']}`).value = tasks[index]['category'];
    document.getElementById(`AssignedTo_${tasks[index]['assignedTo']}`).value = tasks[index]['assignedTo'];
    document.getElementById(`DueDate_${tasks[index]['dueDate']}`).value = tasks[index]['dueDate'];
}

function changeInput(i, index, indexOfTitle, indexOfCategory, status, indexOfAssignedTo, indexOfDueDate) {

    let id = parseInt(i);
    let title = document.getElementById(indexOfTitle).value;
    let category = document.getElementById(indexOfCategory).value;
    let assignedTo = document.getElementById(indexOfAssignedTo).value;
    let dueDate = document.getElementById(indexOfDueDate).value;

    let task = {
        'id': id,
        'title': title,
        'category': category,
        'status': status,
        'assignedTo': assignedTo,
        'dueDate': dueDate
    }
    tasks.splice(index, 1, task);
    updateBoard();
    document.getElementById('changeText').remove();
}

function closeOpenTask() {
    document.getElementById('changeText').remove();
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}