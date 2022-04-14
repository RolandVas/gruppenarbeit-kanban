
/* Aktueller Zeit und Datum */
let today = new Date();
let time = ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2);
let date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


let allTasks = [];


/* Wenn man auf dem Button Hinzufügen drückt werden alle eingegebene Werte ausgelesen und im Array allTasks gespeichert */
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
        'createdTime': time,
        'createdDate': date,
        'description': description,
        'due-date': due_date,
        'ungency': ungency,
        'assigned': assigned
    }

    allTasks.push(task)

    save();
    clearInput();
    document.getElementById('Save').innerHTML = `
    <div class="task">
    Die Aufgabe wurde erfolgreich gespeichert!
    </div>`
}

/* Leert alle Eingabefeldern */
function clearInput() {
    title.value = '';
    category.value = '';
    description.value = '';
    document.getElementById('due-date').value = '';
    ungency.value = '';
    assigned.value = '';
}


