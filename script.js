//Object to store submitted data



const cardholder = document.getElementById('cardholder');
const cardNumber = document.getElementById('cardNumber');
const expiryMonth = document.getElementById('expiryMonth');
const expiryYear = document.getElementById('expiryYear');
const cvc = document.getElementById('cvc');
const paymentAmount = document.getElementById('paymentAmount');
const payNowButton = document.getElementById('pay-now-button')

// Shows typed characters on the credit card

const paymentDetails = {
    cardHolder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    paymentAmount: ""
}

function setValue(key, value, targetElement){
    paymentDetails[key] = value;
    document.getElementById(targetElement).innerHTML = paymentDetails[key]
}

payNowButton.addEventListener('click', function(){
    const date = new Date();
    const month = date.getMonth();
    if(paymentDetails.expiryMonth < month + 1){console.log('in the past')}
    if(paymentDetails.cardNumber.length > 16) {console.log('you messed up buddy')}
})

cardholder.onkeyup = function(event){
    setValue('cardHolder', event.target.value, 'printedName')
}

cardNumber.onkeyup = function(event){
    setValue('cardNumber', event.target.value, 'printedNumber')
}

expiryMonth.onkeyup = function(event){
    setValue('expiryMonth', event.target.value, 'printedMonth')
}

expiryYear.onkeyup = function(){
    document.getElementById('printedYear').innerHTML = "/" + expiryYear.value;
}

cvc.onkeyup = function(){
    document.getElementById('printedCvc').innerHTML = cvc.value;
}

// card holder name should only have letters not numbers
// you should capitalize the first letter in first name and last name
// card number should be maximum 16 digits
// card number should contain a space every 4 numbers
// we don't a date that is in the past!!!
// expiry month should be up between 01 -12
// year should current or in the future
// cvc should be 3 characters/numbers
// when you focus the cvc input, I want you to rotate the card and show the cvc there ;)
// if someone inputs 2020 in the form, I want you to show on the card just the last two numbers
// if any of the inputs it's empty disable the submit button
// if any input has an error disable the input number
// don't use a number type input, use text

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date