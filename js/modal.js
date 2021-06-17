/* eslint-disable no-lonely-if */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */

// DOM Elements
const modalbg = document.querySelector('.modal');
const modalBtn = document.querySelectorAll('.contactBtn');
const closeModalBtn = document.querySelectorAll('.modal__close');

// DOM Elements for form
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");

// DOM Elements for error messages
const firstNameError = document.getElementById("fnameError");
const lastNameError = document.getElementById("lastnameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Patterns for name & email validation checks
const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z'-]+)*\s?$/; /* /^[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ](?:[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ]|['| |-](?=[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ]))*$/; */
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
  document.querySelector("a").focus();
  /* return to phtographer header link when modalclosed with "ESC" key */
}

// reset error messages & launch modal form
function launchModal() {
  firstNameError.textContent = '';
  lastNameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  modalbg.style.display = 'block';
  firstName.focus();
  document.getElementById('form').style.display = 'block';
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

//  close modal event
closeModalBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// close modal on pressing the escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// CHECK FIRST & LAST NAMES ARE VALID FUNCTION
function checkString(string, value) {
  const name = value;
  if (!nameRegex.test(string.trim()) || string.trim().length < 2) {
    name.textContent = 'Veuillez entrer un minimum de 2 caractères (pas de caractères spéciaux).'; /* Veuillez entrer 2 caractères ou plus pour ce champ. */
  } else {
    name.textContent = '';
  }
}

// FIRSTNAME & LASTNAME EVENT LISTENERS
firstName.addEventListener('blur', ($event) => {
  checkString($event.target.value, firstNameError);
});

lastName.addEventListener('blur', ($event) => {
  checkString($event.target.value, lastNameError);
});

// CHECK EMAIL IS VALID
email.addEventListener('blur', ($event) => {
  if (!emailRegex.test($event.target.value.trim())) {
    emailError.textContent = 'Veuillez entrer une adresse e-mail valide.';
  } else {
    emailError.textContent = '';
  }
});

// CHECK MESSAGE IS VALID
message.addEventListener('blur', ($event) => {
  if (!message.value || message.value.trim().length < 2 || message.value.trim().length > 400) {
    messageError.textContent = "Veuillez entrer votre message (400 caractères maximum).";
  } else {
    emailError.textContent = '';
  }
});

// FORM VALIDATION FUNCTION
function Validate(event) {
  event.preventDefault();
  if (!firstName.value || !nameRegex.test(firstName.value.trim()) || firstName.value.trim().length < 2) {
    firstNameError.textContent = "Veuillez entrer votre prénom (pas de caractères spéciaux)";
    firstName.focus();
    return false;
  }
  if (!lastName.value || !nameRegex.test(lastName.value.trim()) || lastName.value.trim().length < 2) {
    lastNameError.textContent = "Veuillez entrer votre nom (pas de caractères spéciaux)";
    lastName.focus();
    return false;
  }
  if (!email.value || !emailRegex.test(email.value.trim())) {
    emailError.textContent = "Veuillez entrer votre adresse e-mail";
    email.focus();
    return false;
  }
  if (!message.value || message.value.trim().length < 2 || message.value.trim().length > 400) {
    messageError.textContent = "Veuillez entrer votre message.";
    message.focus();
    return false;
  }
  document.getElementById('form').style.display = "none";
  modalbg.style.display = 'none';
  /* message.style.display = "flex"; */
  document.getElementById('form').reset();
}

// FIX FOCUS IN MODAL FOR KEYBOARD USERS
// add all the elements inside modal which we want to make focusable
const focusableElements = 'button, input, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('.modal'); // select the modal by it's class id

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

document.addEventListener('keydown', (e) => {
  const isTabPressed = e.key === 'Tab' || e.key === 9; /* tab code */

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else { // if tab key is pressed
    if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});
