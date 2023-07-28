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

    let carsData = '';
    for (let car of carList) {
        let retireButton = '<a href="#" onClick="retireCar(\'' + car.licensePlate + '\')" class="btn btn-danger btclassNameNamecle btn-sm"><i class="fas fa-trash"></i> </a>';
        //let updateButton = '<a href="#" onclick="updateCar('+car.id+')" class="btn btn-info btn-circle"><i class="fas fa-info-circle"></i></a>';
        let carInformation = '<tr><td>'+car.model+'</td><td>'+car.brand+'</td><td>'+car.licensePlate+'</td><td>'+car.property+'</td><td>' +car.origin + '</td><td>' +car.dateTime + '</td><td>' +car.pay.toLocaleString('es-ES', option) + '</td><td>' +car.credit.toLocaleString('es-ES', option) + '</td><td>' + retireButton + /*updateButton + */'</td></tr>'
        carsData += carInformation;
    }

    document.querySelector('#parking tbody').outerHTML  = carsData ;
}

async function retireCar(licensePlate) {
    const carInfo = await getCar(licensePlate);

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
            let option = {useGrouping: true};

            let dateCar = new Date(carInfo.dateTime)
            dateCar.setHours(24)
            let actualDate = new Date()

            const difference = actualDate - dateCar;

            let days = Math.floor(difference / (1000 * 60 * 60 * 24));
            days = (days === 0) ? 1 : days;

            const price = ((carInfo.pay * days) - carInfo.credit).toLocaleString('es-ES', option);
            const stringDay = (days === 1) ? ' dia' : ' dias';

            const credit = (carInfo.credit === 0) ? '' : ' abonó ' + carInfo.credit.toLocaleString('es-ES', option);


            await swalWithBootstrapButtons.fire(
                'Retirado',
                'El carro ' + carInfo.brand + ' ' + carInfo.model + ' estuvo  ' + days + stringDay + credit + '  y debe ' + price + '$'
            )
            carInfo.active = false;
            await fetch('/api/car/' + licensePlate, {
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

    async function getCar(licensePlate){
        const response = await fetch('/api/car/' + licensePlate, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
}