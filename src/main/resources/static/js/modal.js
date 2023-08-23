
function openModal(car = null) {
    const myModal = document.getElementById('myModal');
    myModal.style.display = 'block';

    if(car){
        document.getElementById('txtLicensePlate').value = car.licensePlate;
        document.getElementById('txtModel').value = car.model;
        document.getElementById('txtBrand').value = car.brand;
        document.getElementById('txtProperty').value = car.property;
        document.getElementById('txtOrigin').value = car.origin;
        document.getElementById('txtDate').value = car.dateTime;
        document.getElementById('txtRoom').value = car.room;
        document.getElementById('txtCredit').value = car.credit;
        document.getElementById('txtPay').value = car.pay;
    }else {
        document.getElementById('txtLicensePlate').value = "";
        document.getElementById('txtModel').value = "";
        document.getElementById('txtBrand').value = "";
        document.getElementById('txtProperty').value = "";
        document.getElementById('txtOrigin').value = "";
        document.getElementById('txtDate').value = actualDate();
        document.getElementById('txtRoom').value = "";
        document.getElementById('txtCredit').value = "";
        document.getElementById('txtPay').value = "";
    }
}
function closeModal() {
    const myModal = document.getElementById('myModal');
    myModal.style.display = 'none';
}

async function checkDisable() {
    let roomAvailable = document.getElementById('txtRoom').value;
    if (roomAvailable.trim().length > 2) {
        document.getElementById('txtPay').disabled = true;
        document.getElementById('txtCredit').disabled = true;
    } else {
        document.getElementById('txtPay').disabled = false;
        document.getElementById('txtCredit').disabled = false;
    }
}

async function actualDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
