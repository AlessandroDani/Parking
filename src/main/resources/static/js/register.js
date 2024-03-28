/**
 * Contains all the information about car
 */
let car = {};

/**
 * Add car information into object 'car'
 */
async function registerCar() {
    car.licensePlate = document.getElementById('txtLicensePlate').value.toUpperCase();
    car.model = uppperCase('txtModel');
    car.brand = uppperCase('txtBrand');
    car.property = uppperCase('txtProperty');
    car.origin = uppperCase('txtOrigin');

    /**
     * /When dateTime is saved in modal, it's one day before, for that reason 'setDate + 1 day'
     */
    car.dateTime = new Date(document.getElementById('txtDate').value);
    car.dateTime.setDate(car.dateTime.getDate()+1);

    car.pay = cleanData('txtPay');
    car.credit = cleanData('txtCredit');
    car.active = true;
    car.room = document.getElementById('txtRoom').value;
    await saveCar();
}

/**
 * Save car in DataBase
 * If there's not internet, we saved the car in localStorage
 * 
 */
async function saveCar() {
    const id = localStorage.getItem('id');

    await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El carro se ha registrado correctamente',
        timer: 1500,
        showConfirmButton: false,
        closeOnClickOutside: false
    })

    if (navigator.onLine) {
        await fetch('/api/car/' + id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        location.reload();
    } else {
        /**
         * Check if there are cars in LocalStorage
         * Push the new car
         */
        const savedCars = JSON.parse(localStorage.getItem('savedCars')) || [];
        savedCars.push(car);
        localStorage.setItem('savedCars', JSON.stringify(savedCars));

        alert('El carro ha sido guardado localmente. Se enviará los datos cuando haya conexión a internet');
        closeModal();

        let option = {useGrouping: true};
        let buttonsContainer = createButtons();

        /**
         * Add new table into homepage
         */
        const tableBody = document.querySelector('#parking tbody');
        tableBody.insertAdjacentHTML('beforeend', `<tr>
            <td>${car.model}</td>
            <td>${car.brand}</td>
            <td>${car.licensePlate}</td>
            <td>${car.property}</td>
            <td>${car.origin}</td>
            <td>${await actualDate(car.dateTime)}</td>
            <td>${car.pay.toLocaleString('es-ES', option)}</td>
            <td>${car.credit.toLocaleString('es-ES', option)}</td>
            <td>${car.room}</td>
            <td>${buttonsContainer}</td>
        </tr>`);
    }
}


/**
 * Create table with car information
 * @returns HTML table
 */
/*
async function table(){
    let option = {useGrouping: true};
     let buttonsContainer = createButtons();
    return `<tr>
        <td>${car.model}</td>
        <td>${car.brand}</td>
        <td>${car.licensePlate}</td>
        <td>${car.property}</td>
        <td>${car.origin}</td>
        <td>${await actualDate(car.dateTime)}</td>
        <td>${car.pay.toLocaleString('es-ES', option)}</td>
        <td>${car.credit.toLocaleString('es-ES', option)}</td>
        <td>${car.room}</td>
        <td>${buttonsContainer}</td>
    </tr>`
}
*/

/**
 * Format the value pay and credit
 * From 100000 to 10.000
 * @param {Object} data 
 * @returns string with value formatted
 */
function cleanData(data) {
    return (document.getElementById(data).value)? parseFloat(document.getElementById(data).value.replace(/[,.]/g, '')): 0;
}

/**
 * Format the car information changing the first letter in upperCase
 * The rest of the word in loweCase
 * @param {Object} carInformation 
 * @returns string word formatted
 */
function uppperCase (carInformation) {
    let value = document.getElementById(carInformation).value;
    try {
        return value.charAt(0).toUpperCase() + value.substring(1).toLowerCase();
    }catch(e){
        alert('Error al cargar la información del carro, verifica que están bien escrita la información');
    }
}

/**
 * Check if there is internet for update the DataBase
 */
function checkOnlineStatus() {
    if (navigator.onLine) {
        const savedCars = JSON.parse(localStorage.getItem('savedCars'));
        if (savedCars && savedCars.length > 0) {
            savedCars.forEach(async (carInfo) => {
                await saveCar(carInfo);
            });
            localStorage.removeItem('savedCars');
            alert('Los carros guardados localmente han sido enviados al servidor.');
        }
    }
}

/**
 * Create buttons when there is no internet
 * @returns HTML with buttons into container
 */
function createButtons(){
    const retireButton = `
    |   '<a id='localButton' onClick='retireCar(car)' href="#" class="btn btn-danger btclassNameNamecle btn-sm">
            <i class="fas fa-trash" alt="Retirar Carro"></i>
        </a>';
    `;
    const updateButton = `
    |   '<a id='localButton' onClick='openModal(car)' href="#" class="btn btn-info btn-sm">
            <i class="fas fa-info" alt="Actualizar carro">
        </a>';
    `;

    return '<div class="buttons-container">' + retireButton + updateButton + '</div>';
}

/**
 * Listen to the online/offline event to verify when the connection reconnects.
 */
window.addEventListener('online', checkOnlineStatus);
