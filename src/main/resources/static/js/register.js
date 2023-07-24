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

    //When saved dateTime in modal, its one day after, for that, the code set 24 hours
    dates.dateTime = new Date(document.getElementById('txtDate').value).setHours(24);

    dates.pay = document.getElementById('txtPay').value;
    dates.credit = document.getElementById('txtCredit').value;

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