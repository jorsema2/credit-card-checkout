// Disable pay button for now:

document.getElementById("pay-now-button").disabled = true;

// Assingments and object to store submitted data:

const cardholder = document.getElementById('cardholder');
const cardNumber = document.getElementById('card-number');
const expiryMonth = document.getElementById('expiry-month');
const expiryYear = document.getElementById('expiry-year');
const cvc = document.getElementById('cvc');
const paymentAmount = document.getElementById('payment-amount');

const paymentDetails = {
    cardholder: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    paymentAmount: ""
}

// Assingments necessary for validation:

const form = document.getElementById('form');
const date = new Date();

// Object that to store validation results for each field:
const isDataValid = {
    isCardholder: "",
    isCardNumber: "",
    isExpiryMonth: "",
    isExpiryYear: "",
    isCvc: "",
    isPaymentAmount: ""
}

// Functions that store data inputted by the user:

function setValue(key, value, targetElement){
    paymentDetails[key] = value;
    capitalize(paymentDetails.cardholder);
    document.getElementById(targetElement).innerHTML = paymentDetails[key];
}

cardholder.onkeyup = function(event){
    setValue('cardholder', event.target.value, 'printed-name');
    validateName();
}

cardNumber.onkeyup = function(){
    setValue('cardNumber', event.target.value, 'printed-number');
    validateCardNum();
    splitNum(document.getElementById('printed-number').innerHTML);
}

expiryMonth.onkeyup = function(){
    setValue('expiryMonth', event.target.value, 'printed-month');
    addSlashToDate();
}

expiryYear.onkeyup = function(){
    setValue('expiryYear', event.target.value, 'printed-year');
    addSlashToDate();
    deleteFirstTwo();
}

cvc.onkeyup = function(){
    setValue('cvc', event.target.value, 'printed-cvc');
}

// Capitalize first letter of each name:

function capitalize(str) {
    const splitStr = str.toString().toLowerCase().split(' ')
    for (i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    paymentDetails.cardholder = splitStr.join(' ');
}

// Show card number with a space every 4 digits:

function splitNum(str) {
    const splitNum = str.match(/.{1,4}/g);
    document.getElementById('printed-number').innerHTML = splitNum.join(' ');
}

// If month and year have been inputted, add a slash among them:

function addSlashToDate() {
    if (paymentDetails.expiryMonth !== '' && paymentDetails.expiryYear !== '') {
        document.getElementById('printed-month').innerHTML = paymentDetails.expiryMonth + "/";
    }
}

// If the user inputs four digits, delete the first two digits:

function deleteFirstTwo() {
    if (paymentDetails.expiryYear.length == 4) {
        document.getElementById('printed-year').innerHTML = paymentDetails.expiryYear.substring(2);
    }
}

cardNumber.addEventListener('blur', function(event) {
    if (cardNumber.value.length !== 16 && cardNumber.value !== '') {
        alert('Card number must have 16 numbers');
    }
});

expiryMonth.addEventListener('blur', function(event) {
    validateMonth();
    isCardExpired();
}, true);

expiryYear.addEventListener('blur', function(event) {
    validateYear();
    isCardExpired();
}, true);

// All form validator functions:

function validateName() {
    const nameRegExp = /^[-a-zA-z\s]+$/;
    const nameResult = nameRegExp.test(paymentDetails.cardholder);
    // The if statement prevents the alert to appear when the user deletes what he wrote in cardholder name input:
    if (paymentDetails.cardholder == '') {
        return true;
    } else if(nameResult == false) {
        alert('Please enter only letters for cardholder');
        return false;
    } else {
        isDataValid.isCardholder = true;
    }
}

function validateCardNum() {
    const numRegExp = /^[0-9\s]+$/;
    const numResult = numRegExp.test(paymentDetails.cardNumber);
    // The if statement prevents the alert to appear when the user deletes what he wrote in cardholder name input:
    if (paymentDetails.cardNumber == '') {
        return true;
    } else if(numResult == false) {
        alert('Please enter only numbers for card number');
        return false;
    } else {
        isDataValid.isCardNumber = true;
    }
}

function validateMonth() {
    const monthRegExp = /^([1-9]|0[1-9]|1[012])$/;
    const monthResult = monthRegExp.test(paymentDetails.expiryMonth);
    // The if statement prevents the alert to appear when the user deletes what he wrote in cardholder name input:
    if (paymentDetails.expiryMonth == '') {
        return true;
    } else if (monthResult == false) {
        alert('Please enter only numbers between 1 and 12');
        return false;
    } else {
        isDataValid.isExpiryMonth = true;
    }
}

function validateYear() {
    const yearRegExp = /^([0-9][0-9]|20[0-9][0-9])$/;
    const yearResult = yearRegExp.test(paymentDetails.expiryYear);
    // The if statement prevents the alert to appear when the user deletes what he wrote in cardholder name input:
    if(paymentDetails.expiryYear == '') {
        return true;
    } else if (yearResult == false) {
        alert('Please enter only years from 2020');
        return false;
    } else {
        isDataValid.isExpiryYear = true;
    }
}

/*
Weird bug here:
- Bug loop appears when isCardExpired is false and user moves from month input box to year input box or viceversa directly.

Example to provoke this bug:

1) Write 02 in month
2) Write 19 or 2019 in year
3) Get an error ('Your credit card has expired)
4) Next thing you do after accepting error message is to click in month input box and then clink in year input box. Viceversa also works (first click in year input, then click in month input)
5) Error message loop starts

To escape the loop, refresh page and then accept the error message
*/
function isCardExpired() {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    if (paymentDetails.expiryMonth !== '' && paymentDetails.expiryYear !== '') {

        if (paymentDetails.expiryYear.length == 2) {
            paymentDetails.expiryYear = '20' + paymentDetails.expiryYear;
        }

        if (paymentDetails.expiryMonth < month && paymentDetails.expiryYear <= year || paymentDetails.expiryYear < year) {
            alert('Your credit card has expired');
        } 
    }
}

function validateCvc() {
    const cvcRegExp = /^([0-9]{3})$/;
    const cvcResult = cvcRegExp.test(paymentDetails.cvc);
    // The if statement prevents the alert to appear when the user deletes what he wrote in cardholder name input:
    if (paymentDetails.cvc == '') {
        return true;
    } else if (cvcResult == false) {
        alert('Please enter only numbers between "000" and "999"');
        return false;
    } else {
        isDataValid.isCvc = true;
    }
}

// Flip card and validate CVC:

cvc.addEventListener('focus', function(){
    document.getElementById('flip-card').classList.toggle("flip");
})

cvc.addEventListener('blur', function(){
    document.getElementById('flip-card').classList.toggle("flip");
    validateCvc();
})

// If all data is valid, enable pay-now-button:

form.addEventListener('focusout', function(){
    if (isDataValid.isCardholder == true && isDataValid.isCardNumber == true && isDataValid.isExpiryMonth == true && isDataValid.isExpiryYear == true && isDataValid.isCvc == true) {
        document.getElementById("pay-now-button").style.backgroundColor = 'green';
        document.getElementById("pay-now-button").style.border = 'green';
        document.getElementById("pay-now-button").disabled = false;
    }
})

// card holder name should only have letters not numbers DONE
// you should capitalize the first letter in first name and last name DONE
// card number should be maximum 16 digits DONE
// card number should contain a space every 4 numbers DONE
// we don't a date that is in the past!!! DONE
// expiry month should be up between 01 -12 DONE
// year should current or in the future DONE
// cvc should be 3 characters/numbers DONE
// when you focus the cvc input, I want you to rotate the card and show the cvc there ;) DONE
// if someone inputs 2020 in the form, I want you to show on the card just the last two numbers DONE
// if any of the inputs it's empty disable the submit button DONE
// if any input has an error disable the input number DONE
// don't use a number type input, use text DONE

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date