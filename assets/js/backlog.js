// let statusBacklog = 'backlog';
let backlog = [];

async function initBacklog() {
    await loadTasks();
    checkStatus();
}

function checkStatus() {
    if (allTasks.length != 0) {
        backlog = allTasks.filter((task) => task.status == "backlog");
    }
    updateBacklog(backlog);
};

function updateBacklog(backlog) {
    let backlogTasks = document.getElementById('backlogTasks');
    backlogTasks.innerHTML = ``;
    for (i = 0; i < backlog.length; i++) {
        backlogTasks.innerHTML += 
                            `
                            <tr id="task${i}" class="table-content">
                                <th>${backlog[i]['title']}</th>
                                <th>${backlog[i]['category']}</th>
                                <th>${backlog[i]['ungency']}</th>
                                <th>
                                    <button onclick="addTaskToTodo(${backlog[i]['id']})">In Board (TO DO)</button> 
                                    <button onclick="deleteTaskFromJson(${backlog[i]['id']})">Löschen</button> 
                                </th>
                            </tr>
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








{/* <div id="task${i}">
<div class="backlog-task-container">
    <div>${backlog[i]['title']}</div>
    <div>${backlog[i]['category']}</div>
    <div>${backlog[i]['ungency']}</div>
</div>
<div> 
    <button onclick="addTaskToTodo(${backlog[i]['id']})">In Board (TO DO)</button> 
    <button onclick="deleteTaskFromJson(${backlog[i]['id']})">Löschen</button> 
</div>
</div>  */}