// Call the dataTables jQuery plugin
$(document).ready(function () {
});

async function registerCar() {
    let dates = {};
    dates.model = document.getElementById('txtModel').value;
    dates.brand = document.getElementById('txtBrand').value;
    dates.licensePlate = document.getElementById('txtLicensePlate').value;
    dates.property = document.getElementById('txtProperty').value;
    dates.origin = document.getElementById('txtOrigin').value;

    //When dateTime is saved in modal, its one day after, for that, the code set 24 hours
    dates.dateTime = new Date(document.getElementById('txtDate').value).setHours(24);
    dates.pay = cleanData('txtPay');
    dates.credit = cleanData('txtCredit');
    dates.active = true;
    dates.room = document.getElementById('txtRoom').value;

    const request = await fetch('/api/car', {
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
}

function cleanData(data) {
    if(data === null){
        return 0;
    }
    let clean = document.getElementById(data).value;
    return parseFloat(clean.replace(/[,.]/g, ''))
}