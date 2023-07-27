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
    let option = {useGrouping: true };

    let listadoHTML = '';
    for (let car of carList) {
        let deleteButton = '<a href="#" onClick ="deleteCar('+car.id+')" class="btn btn-danger btclassNameNamecle btn-sm"><i class="fas fa-trash"></i> </a>';
        //let updateButton = '<a href="#" onclick="updateCar('+car.id+')" class="btn btn-info btn-circle"><i class="fas fa-info-circle"></i></a>';
        let user = '<tr><td>'+car.model+'</td><td>'+car.brand+'</td><td>'+car.licensePlate+'</td><td>'+car.property+'</td><td>' +car.origin + '</td><td>' +car.dateTime + '</td><td>' +car.pay.toLocaleString('es-ES', option) + '</td><td>' +car.credit.toLocaleString('es-ES', option) + '</td><td>' + deleteButton + /*updateButton + */'</td></tr>'
        listadoHTML += user;
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
            let option = {useGrouping: true };

            let dateCar = new Date(carInfo.dateTime)
            dateCar.setHours(24)
            let actualDate = new Date()

            const difference = actualDate - dateCar;

            let days = Math.floor(difference / (1000 * 60 * 60 * 24));
            days = (days===0)?1: days;

            const price = ((carInfo.pay*days)-carInfo.credit).toLocaleString('es-ES', option);
            const stringDay = (days===1)? ' dia':' dias';

            const credit = (carInfo.credit === 0)? '': ' abonó ' + carInfo.credit.toLocaleString('es-ES', option);


            await swalWithBootstrapButtons.fire(
                'Retirado',
                'El carro ' + carInfo.brand + ' ' + carInfo.model +' estuvo  ' + days + stringDay + credit + '  y debe ' + price + '$'
            )
            carInfo.active = false;
            await fetch('/api/car/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carInfo)
            });
            location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
            )
        }

    })
}