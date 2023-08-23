const element = document.getElementById('txtLicensePlate');
element.addEventListener('blur', async () => {
    const licensePlate = encodeURIComponent(element.value);
    try {
        const carInfo = await getCar(licensePlate);
        document.getElementById('txtModel').value = carInfo.model;
        document.getElementById('txtBrand').value = carInfo.brand;
        document.getElementById('txtProperty').value = carInfo.property;
        document.getElementById('txtOrigin').value = carInfo.origin;
    } catch (e) {
        document.getElementById('txtModel').value = '';
        document.getElementById('txtBrand').value = '';
        document.getElementById('txtProperty').value = '';
        document.getElementById('txtOrigin').value = '';
    }
})