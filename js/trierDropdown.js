/* eslint-disable no-console */
/* eslint-disable max-len *//* eslint-disable linebreak-style */

// DROPDOWN MENU
/* Toggle Dropdown menu open or closed (within dropdown menu) */
const OpenCloseDropDown = () => {
  document.querySelector('.dropdown__selection').classList.toggle('open');
  if (document.querySelector('.dropdown__selection').classList.contains('open')) {
    document.getElementById('dropdownBtn').setAttribute('aria-expanded', true);
  } else {
    document.getElementById('dropdownBtn').setAttribute('aria-expanded', false);
  }
};
/* Click Event Listener when ON dropdown menu to toggle open/close */
document.querySelector('.dropdown').addEventListener('click', () => {
  OpenCloseDropDown();
});

/* If clicked outside of the dropdown then close dropdown */
const CloseDropDown = (event) => {
  const select = document.querySelector('.dropdown__selection');
  if (!select.contains(event.target)) {
    select.classList.remove('open');
    document.getElementById('dropdownBtn').setAttribute('aria-expanded', false);
  }
};
/* for keyboard users: the function closes dropdown after user has made a choice */
const CloseDropDownKeyboard = () => {
  const select = document.querySelector('.dropdown__selection');
  select.classList.remove('open');
  document.getElementById('dropdownBtn').setAttribute('aria-expanded', false);
  document.querySelector('#dropdownBtn').focus();
};

/* click & keyboard event listeners for outside of the dropdown menu: therefore close dropdown */
window.addEventListener('click', (event) => {
  CloseDropDown(event);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 13) {
    CloseDropDown(event);
  }
});

// WHEN USER MAKES A CHOICE IN DROPDOWN MENU
const listbox = document.querySelector('[role="listbox"]');
const allOptionChoices = [...listbox.children]; /* sets array of all <li> elements */

const OptionSelected = (event) => {
/* when user selects an option in dropdown menu change title text */
  document.querySelector('.choice').textContent = event.target.textContent;

  /* Set attributes for assistive technology for dropdown menu */
  const optionChosen = event.target.closest('li');
  console.log(optionChosen.textContent);

  if (!optionChosen) return;

  /* Sets aria-activedescendant value to option chosen by user */
  listbox.setAttribute('aria-activedescendant', optionChosen.id);

  /* For ALL the option choices: remove aria-selected & selected class that
  changes the visual appearance */
  allOptionChoices.forEach((element) => element.classList.remove('dropdown__orderlist__option--Selected'));
  allOptionChoices.forEach((element) => element.setAttribute('aria-selected', false));
  /* Now for the chosen option: set aria selected & selected class to highlight chosen choice */
  optionChosen.classList.add('dropdown__orderlist__option--Selected');
  optionChosen.setAttribute('aria-selected', true);
};

/* Event listener on dropdown menu for mouse users */
listbox.addEventListener('click', (event) => {
  OptionSelected(event);
});
/* Event listener on dropdown menu for keyboard users */
listbox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 13) {
    event.preventDefault();
    OptionSelected(event);
    CloseDropDownKeyboard();
  }
});

/* SET ATTRIBUTES FOR ASSISTIVE TECHNOLOGY FOR DROPDOWN MENU (KEYBOARD USERS) */
listbox.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key !== 'ArrowDown' && key !== 'ArrowUp') return;
  const activeElementID = listbox.getAttribute('aria-activedescendant');
  const activeElement = listbox.querySelector(`#${activeElementID}`);

  let selectedOption;
  if (key === 'ArrowDown') { selectedOption = activeElement.nextElementSibling; }
  console.log(`the selected option on arrowdown is ${selectedOption}`);
  if (key === 'ArrowUp') { selectedOption = activeElement.previousElementSibling; }
  console.log(`the selected option on arrowUp is ${selectedOption}`);
  if (selectedOption) {
    // Sets aria-activedescendant value
    listbox.setAttribute('aria-activedescendant', selectedOption.id);

    // Change visual appearance
    allOptionChoices.forEach((element) => element.classList.remove('dropdown__orderlist__option--Selected'));
    allOptionChoices.forEach((element) => element.setAttribute('aria-selected', false));
    selectedOption.classList.add('dropdown__orderlist__option--Selected');
    selectedOption.setAttribute('aria-selected', true);
  }
});
