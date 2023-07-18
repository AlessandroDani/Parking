// Call the dataTables jQuery plugin
$(document).ready(function () {
});

async function registrar() {
    let datos = {};
    datos.nombre = document.getElementById('txtNombre').value;
    datos.apellido = document.getElementById('txtApellido').value;
    datos.edad = document.getElementById('txtEdad').value;
    datos.cedula = document.getElementById('txtCedula').value;
    datos.habitacion = document.getElementById('txtHabitacion').value;
    datos.contraseña = document.getElementById('txtContraseña').value;

    let contraseñaRepetida = document.getElementById('txtRepetirContraseña').value;

    if(contraseñaRepetida != datos.contraseña){
        alert('Tiene dos contraseñas distintas');
        return;
    }

    const request = await fetch('/api/huesped', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

}