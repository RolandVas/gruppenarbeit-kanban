let backlog = [];

/**
 * This function is to load the Array "allTasks" that contains all tasks added in add-task sheet
 * 
 */
async function initBacklog() {
    await loadTasks();
    checkStatus();
}

/**
 * This function is to filter the tasks in Array "allTasks" and address them the status "backlog"
 * 
 */
function checkStatus() {
    if (allTasks.length != 0) {
        backlog = allTasks.filter((task) => task.status == "backlog");
    }
    updateBacklog(backlog);
};

/**
 * This function is to generate the tasks in Array "allTasks" and show them in backlog sheet
 * 
 */
function updateBacklog(backlog) {
    let backlogTasks = document.getElementById('backlogTasks');
    backlogTasks.innerHTML = ``;
    for (i = 0; i < backlog.length; i++) {
        let color = colors(backlog);
        backlogTasks.innerHTML +=

            `<tr id="task${i}" class="table-content">
                <td class='${color}'>${backlog[i]['title']}</th>
                <td>${backlog[i]['description']}</th>
                <td>${backlog[i]['category']}</th>
                <td>${backlog[i]['ungency']}</th>
                <td>${backlog[i]['createdDate']} ${backlog[i]['createdTime']}</th>
                <td>${backlog[i]['due-date']}</th>
                <td>
                    <button onclick="addTaskToTodo(${backlog[i]['id']})">In Board (TO DO)</button>
                    <button onclick="deleteTaskFromJson(${backlog[i]['id']})">Löschen</button>
                </td>
            </tr>
        `;

                

    }
};

/**
 * This function is to address colors to the tasks according to their urgency
 * 
 */
function colors(backlog) {
    if (backlog[i]['ungency'] == 'Normal') {
        color = 'green';
    } else if (backlog[i]['ungency'] == 'Hoch') {
        color = 'yellow';
    } else if (backlog[i]['ungency'] == 'Sehr hoch') {
        color = 'red';
    } else {
        color = 'green';
    };
    return color;
}

/**
 * This function is to move from "backlog" sheet to "board" sheet
 * 
 */
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

/**
 * This function is to delete the task definitively from "backlog" and consequently from Array "allTasks"
 * 
 */
function deleteTaskFromJson(id) {
    document.getElementById('backlogTasks').innerHTML = ``;
    for (i = 0; i < allTasks.length; i++) {
        if (allTasks[i]['id'] == id) {
            allTasks.splice(i, 1);
        }
    }
    save();
    checkStatus()
} 
