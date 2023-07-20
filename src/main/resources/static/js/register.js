// Call the dataTables jQuery plugin
$(document).ready(function () {
});

async function registerCar() {
    let datos = {};
    datos.model = document.getElementById('txtModel').value;
    datos.brand = document.getElementById('txtBrand').value;
    datos.licensePlate = document.getElementById('txtLicensePlate').value;
    datos.property = document.getElementById('txtProperty').value;
    datos.origin = document.getElementById('txtOrigin').value;
    datos.dateTime = document.getElementById('txtDate').value;
    datos.pay = document.getElementById('txtPay').value;

    const request = await fetch('/api/car', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

}