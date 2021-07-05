/* eslint-disable no-console */
/* eslint-disable max-len *//* eslint-disable no-unused-vars */
/* eslint-disable no-lonely-if *//* eslint-disable no-useless-escape */

// DOM Elements
const mainWrapper = document.getElementById('main');
const modalbg = document.querySelector('.modal');
const modalBtn = document.querySelectorAll('.contactBtn');
const closeModalBtn = document.querySelectorAll('.modal__close');

// DOM Elements for form
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const message = document.getElementById('message');

// DOM Elements for error messages
const firstNameError = document.getElementById('fnameError');
const lastNameError = document.getElementById('lastnameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Patterns for name & email validation checks
const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z'-]+)*\s?$/; /* /^[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ](?:[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ]|['| |-](?=[A-zàâäèéêëîïôöœùûüÿğçÀÂÄÈÉÊËÎÏÔÖŒÙÛÜŸÇĞ]))*$/; */
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// FIX FOCUS IN MODAL FOR KEYBOARD USERS
const ModalTrap = () => {
  /* add all the elements inside modal which we want to make focusable */
  const focusableElements = 'button, input, [href], textarea, [tabindex]:not([tabindex="-1"])';
  /* select the modal by it's class id */
  const modal = document.querySelector('.modal');
  /* get first element to be focused inside modal */
  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
  const focusableContent = modal.querySelectorAll(focusableElements);
  /* get last element to be focused inside modal */
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (key !== 'Tab' || key === 9) {
      return;
    }
    if (event.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        event.preventDefault();
      }
    } else { // if tab key is pressed
      /* if focused has reached to last focusable element then focus first focusable element
    after pressing tab */
      if (document.activeElement === lastFocusableElement) {
        /* add focus for the first focusable element */
        firstFocusableElement.focus();
        event.preventDefault();
      }
    }
  });
};

// reset error messages & launch modal form
const launchModal = () => {
  mainWrapper.setAttribute('aria-hidden', 'true');
  modalbg.setAttribute('aria-hidden', 'false');
  firstNameError.textContent = '';
  lastNameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  modalbg.style.display = 'block';
  firstName.focus();
  document.getElementById('form').style.display = 'block';
  ModalTrap();
};

// launch modal event listener
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// close modal form
const closeModal = () => {
  mainWrapper.setAttribute('aria-hidden', 'false');
  modalbg.setAttribute('aria-hidden', 'true');
  modalbg.style.display = 'none';
  document.querySelector('.contactBtn').focus();
  /* return to contactez-moi button when modal closed */
};

//  close modal event listener
closeModalBtn.forEach((btn) => btn.addEventListener('click', closeModal));

// close modal on pressing the escape key event listener
modalbg.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// CHECK FIRST & LAST NAMES ARE VALID FUNCTION
const checkString = (string, value) => {
  const name = value;
  if (!nameRegex.test(string.trim()) || string.trim().length < 2) {
    name.textContent = 'Veuillez entrer un minimum de 2 caractères (pas de caractères spéciaux).'; /* Veuillez entrer 2 caractères ou plus pour ce champ. */
    /* name.setAttribute('aria-invalid', 'true'); */
  } else {
    name.textContent = '';
    /* name.setAttribute('aria-invalid', 'false'); */
  }
};

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
    /* emailError.setAttribute('aria-invalid', 'true'); */
  } else {
    emailError.textContent = '';
    /* emailError.setAttribute('aria-invalid', 'false'); */
  }
});

// CHECK MESSAGE IS VALID
message.addEventListener('blur', ($event) => {
  if (!$event.value || $event.value.trim().length < 2 || $event.value.trim().length > 400) {
    messageError.textContent = 'Veuillez entrer votre message (400 caractères maximum).';
    /* messageError.setAttribute('aria-invalid', 'true'); */
  } else {
    messageError.textContent = '';
    /* messageError.setAttribute('aria-invalid', 'false'); */
  }
});

// FORM VALIDATION FUNCTION
function Validate(event) {
  event.preventDefault();
  if (!firstName.value || !nameRegex.test(firstName.value.trim()) || firstName.value.trim().length < 2) {
    firstNameError.textContent = 'Veuillez entrer votre prénom (pas de caractères spéciaux)';
    /* firstNameError.setAttribute('aria-invalid', 'true'); */
    firstName.focus();
    return false;
  }
  if (!lastName.value || !nameRegex.test(lastName.value.trim()) || lastName.value.trim().length < 2) {
    lastNameError.textContent = 'Veuillez entrer votre nom (pas de caractères spéciaux)';
    /* lastNameError.setAttribute('aria-invalid', 'true'); */
    lastName.focus();
    return false;
  }
  if (!email.value || !emailRegex.test(email.value.trim())) {
    emailError.textContent = 'Veuillez entrer votre adresse e-mail';
    /* emailError.setAttribute('aria-invalid', 'true'); */
    email.focus();
    return false;
  }
  if (!message.value || message.value.trim().length < 2 || message.value.trim().length > 400) {
    messageError.textContent = 'Veuillez entrer votre message (entre 2 et 400 caractères).';
    /* messageError.setAttribute('aria-invalid', 'true'); */
    message.focus();
    return false;
  }
  console.log(firstName.value, lastName.value);
  console.log(email.value);
  console.log(message.value);

  document.getElementById('form').style.display = 'none';
  modalbg.style.display = 'none';
  /* message.style.display = "flex"; */
  document.getElementById('form').reset();
  document.querySelector('.contactBtn').focus();
}
