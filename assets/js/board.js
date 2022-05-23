let toDo = [];
let inProgress = [];
let testing = [];
let done = [];

let currentDraggedElement;

/**
 * This function is to load the Array "allTasks" that contains all tasks added in add-task sheet
 * 
 */
async function initBoard() {
    await loadTasks();
    filterTasks();
}

/**
 * This function is to filter tasks by status to be placed in the according board column
 * 
 */
function filterTasks() {
    toDo = allTasks.filter(t => t['status'] == 'toDo');
    inProgress = allTasks.filter(t => t['status'] == 'inProgress');
    testing = allTasks.filter(t => t['status'] == 'testing');
    done = allTasks.filter(t => t['status'] == 'done');
    updateBoard();
}

/**
 * This function is to render the tasks in according to the status and update the board sheet
 * 
 */
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

/**
 * This function is to generate each task in the board sheet as HTML
 * 
 */
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

/**
 * This function is to identify the task to be dragged with an "id"
 * 
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * This function is to allow the task to be an draggable item
 * 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function is to move the dragged task and change its status according to the column it is dragged to
 * 
 */
function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    save();
    filterTasks();
}

/**
 * This function is to delete the task definitively from Array "allTasks" and save changes
 * 
 */
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

/**
 * This function is to edit the data from the selected task
 * 
 */
function editTask(id) {
    let index = allTasks.findIndex(t => t.id == id);
    document.getElementById('change-task').innerHTML += `
                        <div id="changeText" class="changeText">
                         
                                <div class="close-button" onclick="closeOpenTask()">x</div> 
                         
                            <div class="inputfields">
                                <div class="white-text">Titel: 
                                    <input minlength="2" maxlength="25" id="Title_${allTasks[index]['title']}" type="text">
                                </div>
                                <div class="white-text">Kategorie:
                                    <select class="input" id="Category_${allTasks[index]['category']}">
                                        <option hidden></option>
                                        <option>Marketing</option>
                                        <option>Development</option>
                                        <option>Design</option>
                                    </select>
                                </div>
                                <div class="white-text">Beschreibung:
                                    <textarea style="width: 250px; resize: none;" cols="28" rows="8" id="Description_${allTasks[index]['description']}" type="text">
                                    </textarea>
                                </div>
                                <div class="white-text">Bis zum:
                                    <input type="date" name="Date" id="DueDate_${allTasks[index]['due-date']}">
                                </div>
                                <div class="white-text">Dringlichkeit:
                                    <select class="input" id="Ungency_${allTasks[index]['ungency']}">
                                        <option hidden></option>
                                        <option>Normal</option>
                                        <option>Hoch</option>
                                        <option>Sehr hoch</option>
                                    </select>
                                </div>
                                <div class="white-text">Zuteilen an:
                                    <select id="AssignedTo_${allTasks[index]['assigned']}">
                                        <option>Andrea Böhme</option>
                                        <option>Sebastian Schwill</option>
                                        <option>Roland Vas</option>
                                    </select>
                                </div>
                            </div>
                        
                                <div class="change-button" onclick="changeInput('${id}','${index}','${allTasks[index]['status']}','Title_${allTasks[index]['title']}','Category_${allTasks[index]['category']}','Description_${allTasks[index]['description']}','${allTasks[index]['time']}','${allTasks[index]['date']}', 'DueDate_${allTasks[index]['due-date']}','Ungency_${allTasks[index]['ungency']}','AssignedTo_${allTasks[index]['assigned']}')">Change</div>
                     
                        </div>
                    `;
    document.getElementById(`Title_${allTasks[index]['title']}`).value = allTasks[index]['title'];
    document.getElementById(`Category_${allTasks[index]['category']}`).value = allTasks[index]['category'];
    document.getElementById(`Description_${allTasks[index]['description']}`).value = allTasks[index]['description'];
    document.getElementById(`DueDate_${allTasks[index]['due-date']}`).value = allTasks[index]['due-date'];
    document.getElementById(`Ungency_${allTasks[index]['ungency']}`).value = allTasks[index]['ungency'];
    document.getElementById(`AssignedTo_${allTasks[index]['assigned']}`).value = allTasks[index]['assigned'];
    document.getElementById('change-task').classList.remove('d-none');
}

/**
 * This function is to change the data in the Array "allTasks" according to the changes made in editTask function
 * 
 */
function changeInput(i, index, status, indexOfTitle, indexOfCategory, indexOfDescription, time, date, indexOfDueDate, indexOfUngency, indexOfAssigned) {
    let id = parseInt(i);
    let title = document.getElementById(indexOfTitle).value;
    let category = document.getElementById(indexOfCategory).value;
    let description = document.getElementById(indexOfDescription).value;
    let due_date = document.getElementById(indexOfDueDate).value;
    let ungency = document.getElementById(indexOfUngency).value;
    let assigned = document.getElementById(indexOfAssigned).value;

    let task = {
        'id': id,
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
    allTasks.splice(index, 1, task);
    save();
    loadTasks();
    filterTasks();
    document.getElementById('changeText').remove();
    document.getElementById('change-task').classList.add('d-none');
}

/**
 * This function is to open the window where the selected task can be changed
 * 
 */
function closeOpenTask() {
    document.getElementById('changeText').remove();
    document.getElementById('change-task').classList.add('d-none');
}
