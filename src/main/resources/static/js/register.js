// Call the dataTables jQuery plugin
$(document).ready(function () {
});

async function registerCar() {
    let dates = {};
    dates.licensePlate = document.getElementById('txtLicensePlate').value;
    dates.model = formatFirstLetterToUpperCase(document.getElementById('txtModel').value);
    dates.brand = formatFirstLetterToUpperCase(document.getElementById('txtBrand').value);
    dates.property = formatFirstLetterToUpperCase(document.getElementById('txtProperty').value);
    dates.origin = formatFirstLetterToUpperCase(document.getElementById('txtOrigin').value);

    //When dateTime is saved in modal, its one day after, for that, the code set 24 hours
    dates.dateTime = new Date(document.getElementById('txtDate').value).setHours(24);

    dates.pay = cleanData('txtPay');
    dates.credit = cleanData('txtCredit');
    dates.active = true;
    dates.room = document.getElementById('txtRoom').value;

    await saveCar(dates);
}
async function saveCar(dates){
    const id = localStorage.getItem('id');
    if (navigator.onLine) {
        const request = await fetch('/api/car/' + id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dates)
        })

        await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'El carro se ha registrado correctamente',
            timer: 1500,
            showConfirmButton: false,
            closeOnClickOutside: false
        })
        location.reload()
    }else{
        const savedCars = JSON.parse(localStorage.getItem('savedCars')) || [];
        savedCars.push(dates);
        localStorage.setItem('savedCars', JSON.stringify(savedCars));
        alert('El carro ha sido guardado localmente. Se enviará los datos cuando haya conexión a internet');
        let option = {useGrouping: true};
        let retireButton = '<a href="#" onClick="retireCar({\'licensePlate\': \'' + dates.licensePlate + '\', \'model\': \'' + dates.model + '\', \'brand\': \'' + dates.brand + '\', \'property\': \'' + dates.property + '\', \'origin\': \'' + dates.origin + '\', \'dateTime\': \'' + dates.dateTime + '\', \'room\': \'' + dates.room + '\', \'credit\': \'' + dates.credit + '\', \'pay\': \'' + dates.pay + '\'})" class="btn btn-danger btclassNameNamecle btn-sm"><i class="fas fa-trash" alt="Retirar Carro"></i> </a>';
        let updateButton = '<a href="#" onclick="openModal({\'licensePlate\': \'' + dates.licensePlate + '\', \'model\': \'' + dates.model + '\', \'brand\': \'' + dates.brand + '\', \'property\': \'' + dates.property + '\', \'origin\': \'' + dates.origin + '\', \'dateTime\': \'' + dates.dateTime + '\', \'room\': \'' + dates.room + '\', \'credit\': \'' + dates.credit + '\', \'pay\': \'' + dates.pay + '\'})" class="btn btn-info btn-sm"><i class="fas fa-info" alt="Actualizar carro"></i></a>';
        let buttonsContainer = '<div class="buttons-container">' + retireButton + updateButton + '</div>';
        const carInformation = `<tr><td>${dates.model}</td><td>${dates.brand}</td><td>${dates.licensePlate}</td><td>${dates.property}</td><td>${dates.origin}</td><td>${dates.dateTime}</td><td>${dates.pay.toLocaleString('es-ES', option)}</td><td>${dates.credit.toLocaleString('es-ES', option)}</td><td>${dates.room}</td><td>${buttonsContainer}</td></tr>`;
        const tableBody = document.querySelector('#parking tbody');
        tableBody.insertAdjacentHTML('beforeend', carInformation);
    }
}

function cleanData(data) {
    if(data === null){
        return 0;
    }
    let clean = document.getElementById(data).value;
    return parseFloat(clean.replace(/[,.]/g, ''))
}

function formatFirstLetterToUpperCase(value) {
    if (value) {
        const formattedValue = value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
        return formattedValue;
    }
}

function checkOnlineStatus() {
    if (navigator.onLine) {
        const savedCars = JSON.parse(localStorage.getItem('savedCars'));
        if (savedCars && savedCars.length > 0) {
            savedCars.forEach(async (dates) => {
                await saveCar(dates);
            });
            localStorage.removeItem('savedCars');
            alert('Los carros guardados localmente han sido enviados al servidor.');
        }
    }
}

// Escuchar el evento online/offline para verificar cuando se restablece la conexión
window.addEventListener('online', checkOnlineStatus);
