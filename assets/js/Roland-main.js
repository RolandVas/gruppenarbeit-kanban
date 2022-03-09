/* Aktueller Zeit und Datum */
let today = new Date();
let time = ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2);
let date = today.getFullYear() + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + ('0' + today.getDate()).slice(-2);


let allTasks = [];


/* Wenn man auf dem Button Hinzufügen drückt werden alle eingegebene Werte ausgelesen und im Array allTasks gespeichert */
function addTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let due_date = document.getElementById('due-date').value;
    let ungency = document.getElementById('ungency').value;
    let assigned = document.getElementById('assigned').value;

    let task = {
        'title': title,
        'category': category,
        'createdTime': time,
        'createdDate': date,
        'description': description,
        'due-date': due_date,
        'ungency': ungency,
        'assigned': assigned

    }
    allTasks.push(task)

    console.log('Task:', allTasks);


    save();
    loadTasks();

}


/* allTasks wird im localStorage gespeichert bwz. aktualisiert */
function save() {
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString)
}


/* alle gespeicherte Werte aus dem localStorage werden abgerufen und ald Ticket dargestellt */
function loadTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);

    document.getElementById('showTasks').innerHTML ='';
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        document.getElementById('showTasks').innerHTML += `
    <div class="task">
        <div><b>Titel:</b> ${element['title']}</div>
        <div><b>Kategorie:</b> ${element['category']}</div>
        <div><b>Erstellt am:</b> ${element['createdTime']} ${element['createdDate']}</div>
        <div><b>Beschreibung:</b> ${element['description']}</div>
        <div><b>Bis zu</b> ${element['due-date']} <b>erledigen</b></div>
        <div><b>Dringlichkeit:</b> ${element['ungency']}</div>
        <div><b>Zugeteilt für:</b> ${element['assigned']}</div>
        <div class="deletetask" onclick=deleteTask(${i})>Delete</div>
    </div>
    `;
    }
    
}


/* Ticket löschen und aktualisieren */
function deleteTask(i) {
    allTasks.splice(i, 1);

    save();
    loadTasks();
}

