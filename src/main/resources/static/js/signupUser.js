$(document).ready(function() {
    // on ready
});


async function signUp() {
    let data = {};
    data.name = document.getElementById('txtName').value;
    data.lastName = document.getElementById('txtLastName').value;
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtPassword').value;

    let repeatPassword = document.getElementById('txtRepeatPassword').value;

    if (repeatPassword !== data.password) {
        alert('La contraseña que escribiste es diferente.');
        return;
    }

    const request = await fetch('api/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    alert("La cuenta fue creada con exito!");
    window.location.href = 'login.html'

}