/* eslint-disable no-console *//* eslint-disable no-undef */
/* eslint-disable eqeqeq */

// GET PHOTOGRAPHER ID FROM URL QUERY STRING TO BUILD PAGE
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');

// DYNAMICALLY ADD THE PHOTOGRAPHER'S PROFILE TO THEIR PAGE

const CreatePhotograperPageProfile = (individual) => {
  document.querySelector('.header__logo').focus();
  /* declare a place to put the photographer profile & photo in the DOM */
  const photographerProfile = document.querySelector('.person-profile__details');
  const photographerPhoto = document.querySelector('.person-profile__portraitPlaceholder');
  const contactName = document.querySelector('.modal__photographerName');
  const pricePerDay = document.getElementById('pricePerDay');
  document.title = `${individual[0].name}`;
  /* Using DESTRUCTERING get the photographer's tag array data */
  const { tags } = individual[0];

  photographerProfile.innerHTML = `
      <h1 class="person-profile__name">${individual[0].name}</h1>
      <h2 class="person-profile__address">${individual[0].city}, ${individual[0].country}</h2>
      <h3 class="person-profile__tagline">${individual[0].tagline}</h3>
      <ul class="person-profile__tags" >${tags.map((tag) => `<li tabindex="0" class="tags" arial-label="${tag}">#${tag}</li>`).join('')}</ul>`;

  photographerPhoto.innerHTML = `<img class="person-profile__portrait" src="/public/images/photography/Photographers_id_photos/${individual[0].portrait}"alt="${individual[0].name}">`;
  /* add price per day to bottom right of page */
  pricePerDay.innerHTML = `${individual[0].price}€ / jour`;
  /* put photographer name in the modal */
  contactName.textContent = individual[0].name;

  // EVENT LISTENERS ON TAGS FOR FILTERING
  const tagList = document.querySelectorAll('.tags');
  tagList.forEach((item) => {
    item.addEventListener('click', (event) => {
      const tagSelected = event.target.textContent.toLowerCase().slice(1);
      DisplayPhotographerByTagSelected(tagSelected, photographers);
    });
    /* Event Listener (for keyboard) for the like feature */
    item.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const tagSelected = event.target.textContent.toLowerCase().slice(1);
        DisplayPhotographerByTagSelected(tagSelected, photographers);
      }
    });
  });
};

// FETCH THE PHOTGRAPHER DATA FROM THE JSON FILE

fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    /* Using DESTRUCTERING get the photographers data array data */
    const { photographers } = data;
    /* filter array by photographer ID to get the required person */
    const individual = photographers.filter((person) => person.id == photographerId);
    /* create photographers profile on page */
    CreatePhotograperPageProfile(individual);
    /* Using DESTRUCTERING get  the MEDIA data array  data */
    const { media } = data;
    /* filter array by photographerID to get the individual photographer's photo collection */
    const photographersMedia = media.filter((person) => person.photographerId == photographerId);
    // CREATE PHOTOGRAPHER'S PHOTOS & VIDEOS ON PAGE
    MediaFactory('gallery', photographersMedia);
    // ADD FILTERS TO ORDER THE PHOTOS (BY TAG, DATE, LIKES ETC....)
    SetFilters(photographersMedia);
    // ADD LIKE ADJUSTMENT FEATURE
    Likes(photographersMedia);
    // ADD LIGHTBOX FEATURE
    lightboxActivation(photographersMedia);
  })
  .catch((error) => console.error(error));
