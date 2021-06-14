/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

/* Fetch the photographer data from the Json file */
fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    /* Using DESTRUCTERING get just the photographers data array (not the MEDIA data) */
    const { photographers } = data;
    CreatePage(photographers);
  })
  .catch((error) => console.error(error));

/* Dynamically add all the photographers to the main page */
const CreatePage = (photographers) => {
  /* declare a place to put the photographers in the dom */
  const photographerElement = document.querySelector('#main');
  let photographerhtml = '';

  photographers.forEach((person) => {
    /* Using DESTRUCTERING get just the tag array from photographers array */
    const { tags } = person;
    photographerhtml += `
    <article class="profile">
      <a href="#"><img class="profile__portrait" src="/public/images/photography/Photographers_id_photos/${person.portrait}"
      alt="${person.name}">
      <h2 class="profile__name">${person.name}</h2></a>
        <h3 class="profile__address">${person.city}, ${person.country}</h3>
        <h4 class="profile__tagline">${person.tagline}</h4>
        <h5 class="profile__price">${person.price}€/jour</h5>
        <ul class="profile__tags" >${tags.map((tag) => `<li tabindex="0" class="tags" arial-label="${tag}">#${tag}</li>`).join('')}</ul> 
    </article>`;
    photographerElement.innerHTML = photographerhtml;
    /* .map & .join etc solution found on the internet https://www.javascripttutorial.net/es6/javascript-template-literals/ */
  });
  // EVENT LISTENER ON FULL PAGE FOR TAG FILTER CHOICE (ON CLICK)
  document.addEventListener('click', (event) => {
    /* check if function should be invoked: was the selected element (clicked on)
    the one we care about? */
    if (!event.target.matches('.tags')) {
      console.log('fail');
      return;
    }
    // Make sure tag name is lowercase & remove the "#" ready for search*/
    const tagSelected = event.target.textContent.toLowerCase().slice(1);
    DisplayByTagSelected(tagSelected, photographers);
  });
  // EVENT LISTENER FOR TAG FILTER CHOICE (ON KEYUP FOR KEYBOARD USERS)
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      if (!event.targe.matches('.tags')) {
        return;
      }
      const tagSelected = event.target.textContent.toLowerCase().slice(1);
      DisplayByTagSelected(tagSelected, photographers);
    }
  });
};
