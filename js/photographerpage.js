/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
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
/* If clicked outside of the dropdown then close dropdown */
const CloseDropDown = (event) => {
  const select = document.querySelector('.dropdown__selection');
  if (!select.contains(event.target)) {
    select.classList.remove('open');
    document.getElementById('dropdownBtn').setAttribute('aria-expanded', false);
  }
};
/* when user selects an option in dropdown menu change title text */
for (const option of document.querySelectorAll('.dropdown__orderlist__option')) {
  option.addEventListener('click', function SetSelectedOption() {
    if (!this.classList.contains('selected')) {
      this.parentNode.querySelector('.dropdown__orderlist__option.selected').classList.remove('selected');
      this.classList.add('selected');
      this.closest('.dropdown__selection').querySelector('.dropdown__button span').textContent = this.textContent;
    }
  });
}

/* If clicks or presses enter outside of the dropdown menu then close dropdown */
window.addEventListener('click', (event) => {
  CloseDropDown(event);
});

window.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    CloseDropDown(event);
  }
});

/* Event Listeners when on dropdown menu */
document.querySelector('.dropdown').addEventListener('click', () => {
  OpenCloseDropDown();
});

/*
document.querySelectorAll('.dropdown__orderlist__option')
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("dropdownBtn").click();
    }
});

/* If clicked outside of the dropdown then close dropdown
window.addEventListener('click', (e) => {
  const select = document.querySelector('.dropdown__selection');
  if (!select.contains(e.target)) {
    select.classList.remove('open');
    document.getElementById('dropdownBtn').setAttribute('aria-expanded', false);
  }
}); */
