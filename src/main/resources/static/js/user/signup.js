/**
 * Register new users
 * After register, the user is sending to login page
 */
async function signUp() {
    let user = {};
    user.name = document.getElementById('txtName').value;
    user.lastName = document.getElementById('txtLastName').value;
    user.email = document.getElementById('txtEmail').value;
    user.password = document.getElementById('txtPassword').value;

    let repeatPassword = document.getElementById('txtRepeatPassword').value;

    if (repeatPassword !== user.password) {
        alert('La contraseña que escribiste es diferente.');
        return;
    }
    /**
     * POST request, with all the user information
     */
    await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    alert("La cuenta fue creada con exito!");
    window.location.href = 'login.html'
}