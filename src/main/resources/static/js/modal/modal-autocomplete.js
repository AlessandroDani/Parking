const element = document.getElementById('txtLicensePlate');

element.addEventListener('blur', async () => {
    const licensePlate = encodeURIComponent(element.value);
    try {
        const carInfo = await getCar(licensePlate);
        let car = [licensePlate, carInfo.brand, carInfo.model, carInfo.property, carInfo.origin, null, null, null, null];
        await updateModal(car);
    } catch (e) {
        cleanModal();
    }
})