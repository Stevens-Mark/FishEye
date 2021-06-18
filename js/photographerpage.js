/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');
/* Fetch the photographer data from the JSON file */
fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    /* Using DESTRUCTERING get the photographers data array data */
    const { photographers } = data;
    /* Using DESTRUCTERING get  the MEDIA data array  data */
    // const { media } = data;
    /* filter array by photographer ID to get the required person */
    const individual = photographers.filter((person) => person.id == photographerId);
    CreatePhotograperPage(individual);
  })
  .catch((error) => console.error(error));

/* Dynamically add the photographer to page */
const CreatePhotograperPage = (individual) => {
/* declare a place to put the photographer profile & photo in the dom */
  const photographerProfile = document.querySelector('.person-profile__details');
  const photographerPhoto = document.querySelector('.person-profile__portraitPlaceholder');
  const contactName = document.querySelector('.modal__photographerName');
  /* Using DESTRUCTERING get the photographer's tag array data */
  const { tags } = individual[0];

  const photographerhtml = `
      <h2 class="person-profile__name">${individual[0].name}</h2>
      <h3 class="person-profile__address">${individual[0].city}, ${individual[0].country}</h3>
      <h4 class="person-profile__tagline">${individual[0].tagline}</h4>
      <ul class="person-profile__tags" >${tags.map((tag) => `<li tabindex="0" class="tags" arial-label="${tag}">#${tag}</li>`).join('')}</ul>`;
  photographerProfile.innerHTML = photographerhtml;

  const photographerPhotohtml = `<img class="person-profile__portrait" src="/public/images/photography/Photographers_id_photos/${individual[0].portrait}"alt="${individual[0].name}">`;
  photographerPhoto.innerHTML = photographerPhotohtml;
  /* put photographer name in the modal */
  contactName.textContent = individual[0].name;
};

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

/* when user "click" selects an option in dropdown menu change title text */
document.querySelector('.dropdown__orderlist').addEventListener('click', (event) => {
  document.querySelector('.choice').textContent = event.target.textContent;
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

/*
for (const option of document.querySelectorAll('.dropdown__orderlist__option')) {
  option.addEventListener('click', function SetSelectedOption() {
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.dropdown__orderlist__option.selected').classList.remove('selected');
      this.classList.add('selected');
      this.closest('.dropdown__selection').querySelector('.dropdown__button span').textContent = this.textContent;
    }
  });
} */

const listbox = document.querySelector('[role="listbox"]');
const characters = [...listbox.children];

listbox.addEventListener('click', (event) => {
  const option = event.target.closest('li');
  if (!option) return;

  /* Sets aria-activedescendant value */
  listbox.setAttribute('aria-activedescendant', option.id);

  /* Set aria-selected value & Change visual appearances */
  characters.forEach((element) => element.classList.remove('is-selected'));
  characters.forEach((element) => element.setAttribute('aria-selected', false));
  option.classList.add('is-selected');
  option.setAttribute('aria-selected', true);
});
