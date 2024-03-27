async function loginUser() {
    let data = {};
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtPassword').value;

    try{
        const request = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
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