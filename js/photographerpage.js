/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */

// GET PHOTOGRAPHER ID FROM URL QUERY STRING TO BUILD PAGE
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = urlParams.get('id');

// DYNAMICALLY ADD THE PHOTOGRAPHER'S PROFILE TO THEIR PAGE

const CreatePhotograperPageProfile = (individual) => {
  document.querySelector('.header__logo').focus();
  const photographerProfile = document.querySelector('.person-profile__details');
  const photographerPhoto = document.querySelector('.person-profile__portraitPlaceholder');
  const contactName = document.querySelector('.modal__photographerName');
  const pricePerDay = document.getElementById('pricePerDay');
  const contactTitle = document.getElementById('modal__title');
  document.title = `${individual[0].name}`;
  /* Using DESTRUCTERING get the photographer's tag array data */
  const { tags } = individual[0];

  photographerProfile.innerHTML = `
      <h1 class="person-profile__name">${individual[0].name}</h1>
      <h2 class="person-profile__address">${individual[0].city}, ${individual[0].country}</h2>
      <h3 class="person-profile__tagline">${individual[0].tagline}</h3>
      <ul class="person-profile__tags" aria-label="categories">${tags.map((tag) => `<li tabindex="0" class="tags" arial-label="${tag}">#${tag}</li> `).join('')}</ul>`;

  photographerPhoto.innerHTML = `<img class="person-profile__portrait" src="/public/images/photography/Photographers_id_photos/${individual[0].portrait}"alt="${individual[0].name}">`;
  pricePerDay.innerHTML = `${individual[0].price}€ / jour`;
  contactTitle.setAttribute('aria-label', `Contact Me ${individual[0].name}`);
  contactName.textContent = individual[0].name;
};

// FETCH THE PHOTOGRAPHER DATA FROM THE JSON FILE

fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    const { photographers } = data;
    const individual = photographers.filter((person) => person.id == photographerId);
    /* create photographers profile on page */
    CreatePhotograperPageProfile(individual);
    const { media } = data;
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
