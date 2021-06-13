/* eslint-disable no-console */

/* Fetch the photographer data from the Json file */
fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    /* console.log(data); */
    /* Using DESTRUCTERING get just the photographers data array (not the MEDIA data) */
    const { photographers } = data;
    console.log(photographers);
    // eslint-disable-next-line no-use-before-define
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
        <ul class="profile__tags" >${tags.map((tag) => `<li tabindex="0" class="tags">#${tag}</li>`).join('')}</ul> 
    </article>`;
    photographerElement.innerHTML = photographerhtml;
    /* .map & .join etc solution found on the internet https://www.javascripttutorial.net/es6/javascript-template-literals/ */
  });
};

// EVENTLISTENER ON PAGE FOR TAG FILTER CHOICE
document.addEventListener('click', (event) => {
  /* check if function should be invoked: was the selected element (clicked on)
    the one we care about? The element that was clicked on is made available at "event.target" */
  const selector = '.tags';
  const el = event.target;
  if (!el.matches(selector)) {
    console.log('fail');
    return;
  }
  // Make sure tag name is lowercase & remove the "#"*/
  const tagSelected = event.target.textContent.toLowerCase().slice(1);
  // eslint-disable-next-line no-use-before-define
  DisplayByTagSelected(tagSelected);
});

const DisplayByTagSelected = (tagValue) => {
  console.log(`User selected ${tagValue}`);
  /* const allPhotographers = document.getElementsByTagName('article');
  allPhotographers[1].style.display = 'none'; */
};
