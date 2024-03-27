/**
 * Array that contains all the id from the modal
 */
//const form = ['txtLicensePlate', 'txtBrand', 'txtModel', 'txtProperty', 'txtOrigin', 'txtDate', 'txtRoom', 'txtCredit', 'txtPay'];

/**
 * Open modal and check if there's a car for update modal information
 * @param {Object} car 
 */
async function openModal(car = null) {
    const myModal = document.getElementById('myModal');
    myModal.style.display = 'block';
    (car)? updateModal(car):cleanModal();
}

/**
 * Close modal
 */
function closeModal() {
    const myModal = document.getElementById('myModal');
    myModal.style.display = 'none';
}

/**
 * Check if the field 'room' has been filled out.
 * If the field 'room' is filled. 'pay' and 'credit' field will be disabled.
 * because if the user has booked a room, don't pay parking.
 */
function checkDisable() {
    let check = (document.getElementById('txtRoom').value.trim().length > 0)? true: false;
    document.getElementById('txtPay').disabled = check;
    document.getElementById('txtCredit').disabled = check;
}

/**
 * Put in date field the actual date.
 * @param {Object} date 
 * @returns actual date
 */
async function actualDate(date = null) {
    let today = null;
    (date == null)?today = new Date(): today = date;

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Update modal information with car
 * @param {Object} car 
 */
async function updateModal(car){
    /**
     * Form is duplicated because when the variable is global, doesn't work.
     */
    const form = ['txtLicensePlate', 'txtBrand', 'txtModel', 'txtProperty', 'txtOrigin', 'txtDate', 'txtRoom', 'txtCredit', 'txtPay'];
    
    for(let i=0; i < 9; i++){
        if(car[i] !== null) {
            document.getElementById(form[i]).value = car[i];
        }
    }
}

/**
 * Clean modal information and add actual date
 */
async function cleanModal(){
    const form = ['txtLicensePlate', 'txtBrand', 'txtModel', 'txtProperty', 'txtOrigin', 'txtDate', 'txtRoom', 'txtCredit', 'txtPay'];
    for(let i=1; i < 9; i++){
        document.getElementById(form[i]).value = "";
    }
    document.getElementById('txtDate').value = await actualDate();
}
