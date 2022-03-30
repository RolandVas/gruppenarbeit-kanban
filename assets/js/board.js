let toDo = [];
let inProgress = [];
let testing = [];
let done = [];


let currentDraggedElement;


async function initBoard() {
    await loadTasks();
    filterTasks();
}

function filterTasks() {
    toDo = allTasks.filter(t => t['status'] == 'toDo');
    inProgress = allTasks.filter(t => t['status'] == 'inProgress');
    testing = allTasks.filter(t => t['status'] == 'testing');
    done = allTasks.filter(t => t['status'] == 'done');
    updateBoard();
}

function updateBoard() {
    document.getElementById('toDo').innerHTML = ``;
    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        element['id'] = allTasks.indexOf(element);
        document.getElementById('toDo').innerHTML += generateTaskHTML(element);
    }

    document.getElementById('inProgress').innerHTML = ``;
    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        element['id'] = allTasks.indexOf(element);
        document.getElementById('inProgress').innerHTML += generateTaskHTML(element);
    }

    document.getElementById('testing').innerHTML = ``;
    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        element['id'] = allTasks.indexOf(element);
        document.getElementById('testing').innerHTML += generateTaskHTML(element);
    }

    document.getElementById('done').innerHTML = ``;
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        element['id'] = allTasks.indexOf(element);
        document.getElementById('done').innerHTML += generateTaskHTML(element);
    }
}

function generateTaskHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="tasks">
              <div class="task-items">  
                    <div><b>${element['title']}</b></div>
                    <div>${element['category']}</div>
                    <div>${element['assigned']}</div>
                    <div>${element['due-date']}</div>
              </div>      
              <div class= "flex align-items-center space-between">
                <img id="delete-icon" onclick="deleteTask(${element['id']})" src="../assets/img/delete.jpg" class="delete-icon">
                <img id="openTask" onclick="editTask(${element['id']})" src="../assets/img/edit.jpg" class="edit-icon">
              </div>
            </div>`;
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    save();
    filterTasks();
}

function deleteTask(id) {
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['id'] == id) {
            allTasks.splice(i, 1);
        }
    }
 
    save();
    loadTasks();
    filterTasks();
}

function editTask(id) {
    let index = allTasks.findIndex(t => t.id == id);
    document.getElementById('board-container').innerHTML += `
                        <div id="changeText" class="changeText">
                         
                                <div class="close-button" onclick="closeOpenTask()">x</div> 
                         
                            <div class="inputfields">
                                <input minlength="2" maxlength="25" id="Title_${allTasks[index]['title']}" type="text" placeholder="Title">
                                <select id="category_${allTasks[index]['category']}">
                                    <option>Marketing</option>
                                    <option>Product</option>
                                    <option>Sales</option>
                                </select>
                                <select id="AssignedTo_${allTasks[index]['assigned']}">
                                    <option>Andrea Böhme</option>
                                    <option>Sebastian Schwill</option>
                                    <option>Roland Vas</option>
                                </select>
                                <input type="date" name="" id="DueDate_${allTasks[index]['due-date']}">
                            </div>
                        
                                <div class="change-button" onclick="changeInput('${id}','${index}','${allTasks[index]['status']}','Title_${allTasks[index]['title']}','category_${allTasks[index]['category']}','${allTasks[index]['time']}','${allTasks[index]['date']}','${allTasks[index]['description']}', 'DueDate_${allTasks[index]['due-date']}','${allTasks[index]['ungency']}','AssignedTo_${allTasks[index]['assigned']}')">Change</div>
                     
                        </div>
                    `;
    document.getElementById(`Title_${allTasks[index]['title']}`).value = allTasks[index]['title'];
    document.getElementById(`category_${allTasks[index]['category']}`).value = allTasks[index]['category'];
    document.getElementById(`AssignedTo_${allTasks[index]['assigned']}`).value = allTasks[index]['assigned'];
    document.getElementById(`DueDate_${allTasks[index]['due-date']}`).value = allTasks[index]['due-date'];
}

function changeInput(i, index, status, indexOfTitle, indexOfCategory, time, date, description, indexOfDueDate, ungency, indexOfAssigned) {

    let id = parseInt(i);
    let title = document.getElementById(indexOfTitle).value;
    let category = document.getElementById(indexOfCategory).value;
    let assigned = document.getElementById(indexOfAssigned).value;
    let due_date = document.getElementById(indexOfDueDate).value;

    let task = {
        'id': id,
        'status': status,
        'title': title,
        'category': category,
        'createdTime': time,
        'createdDate': date,
        'description': description,
        'due-date': due_date,
        'ungency': ungency,
        'assigned': assigned
    }
    allTasks.splice(index, 1, task);
    save();
    loadTasks();
    filterTasks();
    document.getElementById('changeText').remove();
}

function closeOpenTask() {
    document.getElementById('changeText').remove();
}
