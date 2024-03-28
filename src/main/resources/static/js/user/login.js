/**
 * login the users
 */
async function loginUser() {
    let user = {};
    user.email = document.getElementById('txtEmail').value;
    user.password = document.getElementById('txtPassword').value;

    try{
        const request = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        /**
         * localStorage is used for put name and lastName in profile section
         * also token and id is saved for future request.
         */
        const answer = await request.json();
            localStorage.token = answer.tokenJwt;
            localStorage.id = answer.userId;
            localStorage.name = answer.name;
            localStorage.lastName = answer.lastName;
            window.location.href = "homepage.html";
    }catch (e) {
        alert("Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
}