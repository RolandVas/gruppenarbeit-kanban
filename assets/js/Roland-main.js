
let today = new Date();
let time = ('0' + today.getHours()).slice(-2) + ':' + ('0' + today.getMinutes()).slice(-2);
let date = today.getFullYear() + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + ('0' + today.getDate()).slice(-2);


let allTasks = [];



function addTask() {
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    let task = {
        'description': description,
        'category': category,
        'createdTime': time,
        'createdDate': date,
    }
    allTasks.push(task)

    console.log('Task:', allTasks);


    save();
    loadTasks();

}



function save() {
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString)
}


function loadTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);

    document.getElementById('showTasks').innerHTML ='';
    for (let i = 0; i < allTasks.length; i++) {
        const element = allTasks[i];
        document.getElementById('showTasks').innerHTML += `
    <div class="task">
        <div>${element['description']}</div>
        <div>${element['category']}</div>
        <div>${element['createdTime']}</div>
        <div>${element['createdDate']}</div>
        <div class="deletetask" onclick=deleteTask(${i})>Delete</div>
    </div>
    `;
    }
    

}

function deleteTask(i) {
    allTasks.splice(i, 1);
    // localStorage.removeItem([i]);

    
    save();
    loadTasks();
}

