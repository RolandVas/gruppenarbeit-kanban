let statusBacklog = 'backlog';
let backlog = [];

async function initBacklog() {
    await loadTasks();
    checkStatus();
}

function checkStatus() {
    if (allTasks.length != 0) {
        backlog = allTasks.filter((task) => task.status == statusBacklog);
    }
    updateBacklog(backlog);
};

function updateBacklog(backlog) {
    let backlogTasks = document.getElementById('backlogTasks');
    backlogTasks.innerHTML = ``;
    for (i = 0; i < backlog.length; i++) {
        backlogTasks.innerHTML += 
                            `<div id="task${i}" class="backlog-task-container">
                                <div>${backlog[i]['title']}</div>
                                <div>${backlog[i]['category']}</div>
                                <div> 
                                    <button onclick="addTaskToTodo(${backlog[i]['id']})">In Board (TO DO)</button> 
                                    <button onclick="deleteTaskFromJson(${backlog[i]['id']})">Löschen</button> 
                                </div>
                             </div> 
                            `;
    }
};

 function addTaskToTodo(id) {
    document.getElementById('backlogTasks').innerHTML = ``;
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['id'] == id) {
            allTasks[i]['status'] = 'toDo';
        }
    }

    save();
    checkStatus();
};

function deleteTaskFromJson(id) {
    document.getElementById('backlogTasks').innerHTML = ``;
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['id'] == id) {
            allTasks.splice(i, 1);
        }
    }
    save();
    checkStatus();
};