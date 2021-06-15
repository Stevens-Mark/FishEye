/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
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

/* Dynamically add  the photographer to page */
const CreatePhotograperPage = (individual) => {
/* declare a place to put the photographer profile in the dom */
  const photographerProfile = document.querySelector('#main');
  /* Using DESTRUCTERING get the photographer's tag array data */
  const { tags } = individual[0];
  let photographerhtml = '';

  photographerhtml += `
  <article class="person-profile">
   <div class="person-profile__container">
      <h2 class="person-profile__name">${individual[0].name}</h2>
      <h3 class="person-profile__address">${individual[0].city}, ${individual[0].country}</h3>
      <h4 class="person-profile__tagline">${individual[0].tagline}</h4>
      <ul class="person-profile__tags" >${tags.map((tag) => `<li tabindex="0" class="tags" arial-label="${tag}">#${tag}</li>`).join('')}</ul>
   </div>
   <input type="button" value="Contactez-moi" class="person-profile__contactBtn">
    <img class="person-profile__portrait" src="/public/images/photography/Photographers_id_photos/${individual[0].portrait}"alt="${individual[0].name}">
</article>`;
  photographerProfile.innerHTML = photographerhtml;
};
