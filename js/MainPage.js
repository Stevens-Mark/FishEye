/* eslint-disable no-console *//* eslint-disable no-undef */
/* eslint-disable max-len */

// DYNAMICALLY ADD ALL THE PHOTOGRAPHERS TO THE MAIN PAGE

const CreatePage = (photographers) => {
  document.querySelector('.pass-to-maincontent').focus();
  /* declare a place to put the photographers in the dom */
  const photographerElement = document.querySelector('#main');
  let photographerhtml = '';

  photographers.forEach((person) => {
    /* Using DESTRUCTERING get just the tag array from photographers array */
    const { tags } = person;
    photographerhtml += `
    <article class="profile">
      <a href="photographer-page.html?id=${person.id}"><img class="profile__portrait" src="/public/images/photography/Photographers_id_photos/${person.portrait}"
      alt="link to photographers page ${person.name}">
      <h2 class="profile__name">${person.name}</h2></a>
        <h3 class="profiles__address">${person.city}, ${person.country}</h3>
        <h4 class="profile__tagline">${person.tagline}</h4>
        <h5 class="profile__price">${person.price}€/jour</h5>
        <ul class="profile__tags" >${tags.map((tag) => `<li tabindex="0" class="tags" arial-label="${tag}">#${tag}</li>`).join('')}</ul> 
    </article>`;
    photographerElement.innerHTML = photographerhtml;
    /* map & join etc solution found in sources folder */
  });

  // EVENT LISTENER ON FULL MAIN PAGE TO DISPLAY THE PHOTOGRAPHERS BASED ON TAG FILTER CHOICE (ON CLICK)
  document.addEventListener('click', (event) => {
    /* check if function should be invoked: was the selected element (clicked on)
    the one we care about? */
    if (!event.target.matches('.tags')) {
      return;
    }
    // Make sure tag name is lowercase & remove the "#" ready for search*/
    const tagSelected = event.target.textContent.toLowerCase().slice(1);
    DisplayPhotographerByTagSelected(tagSelected, photographers);
  });

  // EVENT LISTENER TO DISPLAY THE PHOTOGRAPHERS BASED ON TAG FILTER CHOICE (ON KEYUP FOR KEYBOARD USERS)
  document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      if (!event.target.matches('.tags')) {
        return;
      }
      const tagSelected = event.target.textContent.toLowerCase().slice(1);
      DisplayPhotographerByTagSelected(tagSelected, photographers);
    }
  });
};

// FETCH THE PHOTGRAPHER DATA FROM THE JSON FILE

fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    /* Using DESTRUCTERING get just the photographers data array (not the MEDIA data) */
    const { photographers } = data;
    CreatePage(photographers);
  })
  .catch((error) => console.error(error));
