// Call the dataTables jQuery plugin
$(document).ready(function () {
});

async function login() {
    let data = {};
    data.email = document.getElementById('txtEmail').value;
    data.password = document.getElementById('txtPassword').value;

    console.log(data.email)
    console.log(data.password)

    const request = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const answer = await request.text();
    console.log(answer)

    if(answer != null){
        localStorage.token = answer;
        //window.location.href = "index.html";
    }else{
        alert("Las credenciales son incorrectas");
    }

}