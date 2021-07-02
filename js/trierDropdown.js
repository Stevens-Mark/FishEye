/* eslint-disable no-unused-vars */

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
document.querySelector('.dropdown').addEventListener('click', (event) => {
  console.log(event);
  OpenCloseDropDown();
});

/* Click Event Listener when ON dropdown menu to toggle open/close */
document.querySelector('#dropdownBtn').addEventListener('keyup', (event) => {
  if (event.key === 'Enter' || event.key === 13) {
    event.preventDefault();
    OpenCloseDropDown();
  }
});

/* If clicked outside of the dropdown then close dropdown */
const CloseDropDown = (event) => {
  console.log(event);
  const select = document.querySelector('.dropdown__selection');
  if (!select.contains(event.target)) {
    select.classList.remove('open');
    document.getElementById('dropdownBtn').setAttribute('aria-expanded', false);
  }
};
/* for keyboard users: the function closes dropdown after user has made a choice -
see SetFilters function */
const CloseDropDownKeyboard = () => {
  const select = document.querySelector('.dropdown__selection');
  select.classList.remove('open');
  document.getElementById('dropdownBtn').setAttribute('aria-expanded', false);
  document.querySelector('#dropdownBtn').focus();
};

/* click & keyboard event listeners for outside of the dropdown menu: therefore close dropdown
window.addEventListener('click', (event) => {
  CloseDropDown(event);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === 13) {
    CloseDropDown(event);
  }
}); */
