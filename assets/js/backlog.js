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

/* Teilt den Task farben zu */
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
