//Object to store submitted data

const paymentDetails = {
    cardholder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    paymentAmount: ""
}

const cardholder = document.getElementById('cardholder');
const cardNumber = document.getElementById('cardNumber');
const expiryMonth = document.getElementById('expiryMonth');
const expiryYear = document.getElementById('expiryYear');
const cvc = document.getElementById('cvc');
const paymentAmount = document.getElementById('paymentAmount');

// Shows typed characters on the credit card

form.addEventListener('submit', store(event)) {

}

cardholder.onkeyup = function(){
    document.getElementById('printedName').innerHTML = cardholder.value;
}

cardNumber.onkeyup = function(){
    document.getElementById('printedNumber').innerHTML = newNumber;
}

expiryMonth.onkeyup = function(){
    document.getElementById('printedMonth').innerHTML = expiryMonth.value;
}

expiryYear.onkeyup = function(){
    document.getElementById('printedYear').innerHTML = "/" + expiryYear.value;
}

cvc.onkeyup = function(){
    document.getElementById('printedCvc').innerHTML = cvc.value;
}