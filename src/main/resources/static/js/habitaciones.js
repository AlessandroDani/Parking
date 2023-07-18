// Call the dataTables jQuery plugin
$(document).ready(function () {
    cargarHuespedes();
    $('#huespedes').DataTable();
});

async function cargarHuespedes() {
    const request = await fetch('/api/huespedes', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const listaHuespedes = await request.json();
    //console.log(listaHuespedes);


    listadoHTML = '';
    for (let huesped of listaHuespedes) {
        let botonEliminar = '<a href="#" onClick ="eliminarHuesped('+huesped.id+')" class="btn btn-danger btclassNameNamecle btn-sm"><i class="fas fa-trash"></i> </a>';
        let usuario = '<tr><td>'+huesped.nombre+'</td><td>'+huesped.cedula+'</td><td>'+huesped.edad+'</td><td>'+huesped.habitacion+'</td><td>' +botonEliminar + '</td></tr>'
        listadoHTML += usuario;
    }

    document.querySelector('#huespedes tbody').outerHTML  = listadoHTML ;
}

async function eliminarHuesped(id){
    alert(id);
    if(!confirm("¿Estas seguro que quieres eliminar este huesped?")){
        return;
    }
    const request = await fetch('/api/huesped/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    location.reload();
}
