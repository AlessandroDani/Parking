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


    let listadoHTML = '';
    for (let car of carList) {
        let botonEliminar = '<a href="#" onClick ="deleteCar('+car.id+')" class="btn btn-danger btclassNameNamecle btn-sm"><i class="fas fa-trash"></i> </a>';
        let usuario = '<tr><td>'+car.model+'</td><td>'+car.brand+'</td><td>'+car.licensePlate+'</td><td>'+car.property+'</td><td>' +car.origin + '</td><td>' +car.dateTime + '</td><td>' +car.pay + '</td><td>' +botonEliminar + '</td></tr>'
        listadoHTML += usuario;
    }

    document.querySelector('#parking tbody').outerHTML  = listadoHTML ;
}

async function deleteCar(id){
    const response = await fetch('/api/car/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const carInfo = await response.json();


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro que quieres retirar el carro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, retirar',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then(async (result) => {
        if (result.isConfirmed) {
            let fechaIngresoCarro = new Date(carInfo.dateTime)
            fechaIngresoCarro.setHours(24)
            let fechaActual = new Date()

            const diferenciaEnMilisegundos = fechaActual - fechaIngresoCarro;
            const dias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

            const precio = (carInfo.pay*dias).toLocaleString('es-ES');

            await swalWithBootstrapButtons.fire(
                'Retirado',
                'El carro ' + carInfo.brand + ' ' + carInfo.model +' estuvo  ' + dias +' dias y debe ' + precio + '$'
            )
            const request = fetch('/api/car/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            location.reload();
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
            )
        }

    })
}