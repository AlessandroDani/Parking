// Call the dataTables jQuery plugin
$(document).ready(function () {
    loadCars();
    $('#parking').DataTable();
});

async function loadCars() {
    const request = await fetch('/api/cars', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const carList = await request.json();


    listadoHTML = '';
    for (let car of carList) {
        let botonEliminar = '<a href="#" onClick ="deleteCar('+car.id+')" class="btn btn-danger btclassNameNamecle btn-sm"><i class="fas fa-trash"></i> </a>';
        let usuario = '<tr><td>'+car.model+'</td><td>'+car.brand+'</td><td>'+car.licensePlate+'</td><td>'+car.property+'</td><td>' +car.origin + '</td><td>' +car.dateTime + '</td><td>' +car.pay + '</td><td>' +botonEliminar + '</td></tr>'
        listadoHTML += usuario;
    }

    document.querySelector('#parking tbody').outerHTML  = listadoHTML ;
}

async function deleteCar(id){
    alert(id);
    if(!confirm("¿Estas seguro que quieres eliminar este carro?")){
        return;
    }
    const request = await fetch('/api/car/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    location.reload();
}
