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
}

// Assingments necessary for validation:

const form = document.getElementById('form');
const date = new Date();

// Object that to store validation results for each field:
const isDataValid = {
    cardholder: null,
    cardNumber: null,
    cardNumberLength: null,
    expiryMonth: null,
    expiryYear: null,
    cvc: null,
    expirationDate: null
}

// Functions that store data inputted by the user:

function setValue(key, value, targetElement){
    paymentDetails[key] = value;
    capitalize(paymentDetails.cardholder);
    document.getElementById(targetElement).innerHTML = paymentDetails[key];
}

cardholder.onkeyup = function(event){
    setValue('cardholder', event.target.value, 'printed-name');
    validateField({
        htmlElement: event.target, 
        regex: /^[-a-zA-z\s]+$/, 
        key: 'cardholder'
    });
}

cardNumber.onkeyup = function(event){
    console.log(event.target.value.length === 16)
    if(event.target.value.length > 16) return;
    cardNumber.value = cardNumber.value.trim();
    setValue('cardNumber', event.target.value, 'printed-number');
    validateField({
        htmlElement: event.target, 
        regex: /^[0-9]+$/, 
        key: 'cardNumber'
    });
    splitNum(document.getElementById('printed-number').innerHTML);
    console.log(paymentDetails.cardNumber);
}

expiryMonth.onkeyup = function(event){
    setValue('expiryMonth', event.target.value, 'printed-month');
    validateField({
        htmlElement: event.target, 
        regex: /^([1-9]|0[1-9]|1[012])$/, 
        key: 'expiryMonth'
    });
    addSlashToDate();
}

expiryYear.onkeyup = function(event){
    setValue('expiryYear', event.target.value, 'printed-year');
    validateField({
        htmlElement: event.target, 
        regex: /^([0-9][0-9]|20[0-9][0-9])$/, 
        key: 'expiryYear'
    });
    addSlashToDate();
    deleteFirstTwo();
}

cvc.onkeyup = function(event){
    setValue('cvc', event.target.value, 'printed-cvc');
    validateField({
        htmlElement: event.target, 
        regex: /^([0-9]{3})$/, 
        key: 'cvc'
    });
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
        cardNumber.classList.add('error');
        isDataValid.cardNumberLength = false;
    } else {
        cardNumber.classList.remove('error');
        isDataValid.cardNumberLength = true;
    }
});

expiryMonth.addEventListener('blur', function(event) {
    isCardExpired();
}, true);

expiryYear.addEventListener('blur', function(event) {
    isCardExpired();
}, true);

// All form validator functions:

function validateField(config){

    const validationResult = config.regex.test(paymentDetails[config.key]);
    if (paymentDetails[config.key] == '') {
        config.htmlElement.classList.remove('error');
        return true;
    } else if(validationResult === false) {
        config.htmlElement.classList.add('error')
        isDataValid[config.key] = false;
        return false;
    } else {
        config.htmlElement.classList.remove('error');
        isDataValid[config.key] = true;
    }
}

function isCardExpired() {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    if (paymentDetails.expiryMonth !== '' && paymentDetails.expiryYear !== '') {

        if (paymentDetails.expiryYear.length == 2) {
            paymentDetails.expiryYear = '20' + paymentDetails.expiryYear;
        }

        if (paymentDetails.expiryYear < year) {
            expiryMonth.classList.add('error');
            expiryYear.classList.add('error');
            isDataValid.expirationDate = false;
        } else if (paymentDetails.expiryMonth < month && paymentDetails.expiryYear <= year) {
            expiryMonth.classList.add('error');
            expiryYear.classList.add('error');
            isDataValid.expirationDate = false;
        } else {
            expiryMonth.classList.remove('error');
            expiryYear.classList.remove('error');
            isDataValid.expirationDate = true;
        }
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

form.addEventListener('focusout', function() {
    if (isDataValid.cardholder && isDataValid.cardNumber && isDataValid.cardNumberLength && isDataValid.expiryMonth  && isDataValid.expiryYear && isDataValid.cvc && isDataValid.expirationDate) {
        document.getElementById("pay-now-button").style.backgroundColor = 'green';
        document.getElementById("pay-now-button").style.border = 'green';
        document.getElementById("pay-now-button").disabled = false;
    } else {
        document.getElementById("pay-now-button").style.backgroundColor = '';
        document.getElementById("pay-now-button").style.border = '';
        document.getElementById("pay-now-button").disabled = true;
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