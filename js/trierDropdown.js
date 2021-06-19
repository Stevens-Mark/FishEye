/* eslint-disable no-console *//* eslint-disable max-len *//* eslint-disable linebreak-style */

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
/* Click Event Listener when on dropdown menu */
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
/* click & key event listeners for outside of the dropdown menu: therefore close dropdown */
window.addEventListener('click', (event) => {
  CloseDropDown(event);
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 13) {
    CloseDropDown(event);
  }
});

/* when user "keyboard" selects an option in dropdown menu change title text */
const sortBy = document.querySelector('.dropdown__orderlist');
sortBy.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 13) {
    event.preventDefault();
    document.querySelector('.choice').textContent = event.target.textContent;
    OpenCloseDropDown();
    document.querySelector('#dropdownBtn').focus();
  }
});

// DROPDOWN MENU
const listbox = document.querySelector('[role="listbox"]');
const allOptionChoices = [...listbox.children]; /* sets array of all <li> elements */

listbox.addEventListener('click', (event) => {
/* when user "click" selects an option in dropdown menu change title text */
  document.querySelector('.choice').textContent = event.target.textContent;

  /* Set attributes for assistive technology for dropdown menu (mouse users */
  const optionChosen = event.target.closest('li');
  console.log(optionChosen);
  /*  if (!optionChosen) return; */

  /* Sets aria-activedescendant value to option chosen by user */
  listbox.setAttribute('aria-activedescendant', optionChosen.id);

  /* For ALL the option choices: remove aria-selected & selected class that
  changes the visual appearance */
  allOptionChoices.forEach((element) => element.classList.remove('dropdown__orderlist__option--Selected'));
  allOptionChoices.forEach((element) => element.setAttribute('aria-selected', false));
  /* Now for the chosen option: set aria selected & selected class to highlight chosen choice */
  optionChosen.classList.add('dropdown__orderlist__option--Selected');
  optionChosen.setAttribute('aria-selected', true);
});

/*
listbox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 13) {
    event.preventDefault();
    document.querySelector('.choice').textContent = event.target.textContent;
    OpenCloseDropDown();
    document.querySelector('#dropdownBtn').focus();
  }
}); */

// SET ATTRIBUTES FOR ASSISTIVE TECHNOLOGY FOR DROPDOWN MENU (KEYBOARD USERS)

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
