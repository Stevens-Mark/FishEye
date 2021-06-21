/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
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
    /* filter array by photographer ID to get the required person */
    const individual = photographers.filter((person) => person.id == photographerId);
    /* create photographers profile on page */
    CreatePhotograperPageProfile(individual);
    /* Using DESTRUCTERING get  the MEDIA data array  data */
    const { media } = data;
    /* filter array by photographerID to get the individual photographer's photo collection */
    const photographersMedia = media.filter((person) => person.photographerId == photographerId);
    console.log(photographersMedia);
    /* create photographers photos & video on page */
    CreatePhotograperPageMediaCard(photographersMedia);
  })
  .catch((error) => console.error(error));

/* Dynamically add the photographer to page */
const CreatePhotograperPageProfile = (individual) => {
/* declare a place to put the photographer profile & photo in the dom */
  const photographerProfile = document.querySelector('.person-profile__details');
  const photographerPhoto = document.querySelector('.person-profile__portraitPlaceholder');
  const contactName = document.querySelector('.modal__photographerName');
  document.title = `${individual[0].name}`;
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

const CreatePhotograperPageMediaCard = (photographersMedia) => {
  const photoartworkElement = document.querySelector('#photographer-media');
  let photographshtml = '';
  console.log(photographersMedia);
  photographersMedia.forEach((media) => {
    if (media.video) {
      photographshtml
      += `<article class="artwork__card">
      <video controls width="250" class="artwork__image"><source src="/public/images/photography/${media.photographerId}/${media.video}">Sorry, your browser doesn't support embedded videos.
      </video>
            <div class="artwork__details d-flex" >
            <h2 class="artwork__title">${media.title}</h2>
            <span class="artwork__likes">${media.likes}<i class="artwork__likes fas fa-heart"></i></span>
          </div>
        </article>`;
    } else {
      photographshtml
      += `<article class="artwork__card">
          <img class="artwork__image" src="/public/images/photography/${media.photographerId}/${media.image}" alt="${media.title}">
          <div class="artwork__details d-flex" >
            <h2 class="artwork__title">${media.title}</h2>
            <span class="artwork__likes">${media.likes}<i class="artwork__likes fas fa-heart"></i></span>
          </div>
        </article>`;
    }
    photoartworkElement.innerHTML = photographshtml;
  });
  // EVENT LISTENER ON FULL PAGE FOR TAG FILTER CHOICE (ON CLICK)
  document.addEventListener('click', (event) => {
    /* check if function should be invoked: was the selected element (clicked on)
      the one we care about? */
    if (!event.target.matches('.tags')) {
      console.log('fail');
      console.log(event.target);
      return;
    }
    // Make sure tag name is lowercase & remove the "#" ready for search*/
    const tagSelected = event.target.textContent.toLowerCase().slice(1);
    console.log(tagSelected);
  });
};
