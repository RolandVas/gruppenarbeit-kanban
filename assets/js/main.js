/**
 * This function is to include the navigation bar in all sheets of the Kanban
 * 
 */
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

/**
 * smallestBackendEver
 * This function is used to add a simple backend for the tasks
 */
setURL('http://gruppe-186.developerakademie.net/smallest_backend_ever');

/* allTasks wird im localStorage gespeichert bwz. aktualisiert */
async function save() {
    let allTasksAsString = JSON.stringify(allTasks);
    await backend.setItem('allTasks', allTasksAsString)
    console.log('saved to backend');
}

async function loadTasks() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    backlog = JSON.parse(backend.getItem('backlog')) || [];
};