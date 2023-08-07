// Call the dataTables jQuery plugin

$(document).ready(function () {
    loadCars();
    $('#parking').DataTable();
});

function openModal(car) {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
    document.getElementById('txtLicensePlate').value = car.licensePlate;
    document.getElementById('txtModel').value = car.model;
    document.getElementById('txtBrand').value = car.brand;
    document.getElementById('txtProperty').value = car.property;
    document.getElementById('txtOrigin').value = car.origin;
    document.getElementById('txtDate').value = car.dateTime;
    document.getElementById('txtRoom').value = car.room;
    document.getElementById('txtCredit').value = car.credit;
    document.getElementById('txtPay').value = car.pay;
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';


}

async function loadCars() {
    const id = localStorage.getItem('id');
    const request = await fetch('/api/cars/' + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    document.getElementById('username').innerText = localStorage.getItem('name') + ' ' + localStorage.getItem('lastName');

    const carList = await request.json();
    let option = {useGrouping: true};

    let carsData = '';
    for (let car of carList) {
        if (car.room == null) {
            car.room = '-';
        }
        car.pay = (car.pay == null) ? 0 : car.pay;
        car.credit = (car.credit == null) ? 0 : car.credit;
        let retireButton = '<a href="#" onClick="retireCar({\'licensePlate\': \'' + car.licensePlate + '\', \'model\': \'' + car.model + '\', \'brand\': \'' + car.brand + '\', \'property\': \'' + car.property + '\', \'origin\': \'' + car.origin + '\', \'dateTime\': \'' + car.dateTime + '\', \'room\': \'' + car.room + '\', \'credit\': \'' + car.credit + '\', \'pay\': \'' + car.pay + '\'})" class="btn btn-danger btclassNameNamecle btn-sm"><i class="fas fa-trash" alt="Retirar Carro"></i> </a>';
        let updateButton = '<a href="#" onclick="openModal({\'licensePlate\': \'' + car.licensePlate + '\', \'model\': \'' + car.model + '\', \'brand\': \'' + car.brand + '\', \'property\': \'' + car.property + '\', \'origin\': \'' + car.origin + '\', \'dateTime\': \'' + car.dateTime + '\', \'room\': \'' + car.room + '\', \'credit\': \'' + car.credit + '\', \'pay\': \'' + car.pay + '\'})" class="btn btn-info btn-sm"><i class="fas fa-info" alt="Actualizar carro"></i></a>';
        let buttonsContainer = '<div class="buttons-container">' + retireButton + updateButton + '</div>';
        let carInformation = '<tr><td>' + car.model + '</td><td>' + car.brand + '</td><td>' + car.licensePlate + '</td><td>' + car.property + '</td><td>' + car.origin + '</td><td>' + car.dateTime + '</td><td>' + car.pay.toLocaleString('es-ES', option) + '</td><td>' + car.credit.toLocaleString('es-ES', option) + '</td><td>' + car.room + '</td><td>' + buttonsContainer + '</td></tr>'
        carsData += carInformation;

    }
    document.querySelector('#parking tbody').outerHTML = carsData;
}

async function retireCar(carInfo) {
    //const carInfo = await getCar(licensePlate);
    if (navigator.onLine) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '¿Estás seguro que quieres retirar el carro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Si, retirar',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                carInfo.pay = (carInfo.pay == null) ? 0 : carInfo.pay;
                carInfo.credit = (carInfo.credit == null) ? 0 : carInfo.credit;
                carInfo.active = false;

                const message = await carRetireData(carInfo)
                /*
                carInfo.pay = (carInfo.pay == null) ? 0 : carInfo.pay;
                carInfo.credit = (carInfo.credit == null) ? 0 : carInfo.credit;

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

                carInfo.active = false;

                 */

                await swalWithBootstrapButtons.fire({
                        icon: 'success',
                        title: 'Retirado',
                        text: message
                    }
                )

                await updateCar(carInfo);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                        icon: 'error',
                        title: 'Cancelado'
                    }
                )
            }
        })
    } else {
        confirmWithdrawCar(carInfo)
    }
}


async function getCar(licensePlate) {
    const id = localStorage.getItem('id');
    try {
        const response = await fetch('/api/car/' + id + '/' + encodeURIComponent(licensePlate), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await response.json();
    } catch (e) {
        return null;
    }
}

async function updateCar(carInfo) {
    if (navigator.onLine) {
        try {
            await fetch('/api/car/' + carInfo.licensePlate, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carInfo)
            });
            location.reload();
        } catch (e) {
            return null;
        }
    } else {
        const deleteCars = JSON.parse(localStorage.getItem('deleteCars')) || [];
        deleteCars.push(carInfo);
        localStorage.setItem('deleteCars', JSON.stringify(deleteCars));
        alert('El carro ha sido retirado localmente. Se enviará los datos cuando haya conexión a internet');
    }
}

async function confirmWithdrawCar(carInfo) {
    const result = confirm("¿Seguro que quieres retirar el carro?");
    if (result === true) {
        const message = await carRetireData(carInfo);
        await updateCar(carInfo);
        alert(message)
    }
}

async function carRetireData(carInfo) {
    carInfo.pay = (carInfo.pay == null) ? 0 : carInfo.pay;
    carInfo.credit = (carInfo.credit == null) ? 0 : carInfo.credit;

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

    carInfo.active = false;
    return 'El carro ' + carInfo.brand + ' ' + carInfo.model + ' estuvo  ' + days + stringDay + credit + '  y debe ' + price + '$';
}

function checkOnlineStatus() {
    if (navigator.onLine) {
        const deleteCars = JSON.parse(localStorage.getItem('deleteCars'));
        if (deleteCars && deleteCars.length > 0) {
            deleteCars.forEach(async (carInfo) => {
                await updateCar(carInfo);
            });
            localStorage.removeItem('deleteCars');
            alert('Los carros retirados localmente han sido enviados al servidor.');
        }
    }
}

window.addEventListener('online', checkOnlineStatus);
