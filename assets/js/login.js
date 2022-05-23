

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username == 'User' & password == '1234') {
        window.location = 'https://www.google.de';
    } else {
        alert("login failed")
    }

}