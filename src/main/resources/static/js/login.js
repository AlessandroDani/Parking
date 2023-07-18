// Call the dataTables jQuery plugin
$(document).ready(function () {
});

async function iniciarSesion() {
    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.contraseña = document.getElementById('txtContraseña').value;


    const request = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    const respuesta = await request.text();

    if(respuesta != 'FAIL'){
        window.location.href = "index.html";
    }else{
        alert("Las credenciales son incorrectas");
    }

}