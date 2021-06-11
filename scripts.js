/* eslint-disable no-console */

/* Fetch the photographer data from the Json file */
fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    /* console.log(data); */
    /* Using DESTRUCTERING get just the photographers data array (not the MEDIA data) */
    const { photographers } = data;
    // eslint-disable-next-line no-use-before-define
    CreatePage(photographers);
  })
  .catch((error) => console.error(error));

/* Dynamically add all the photographers to the main page */
const CreatePage = (photographers) => {
  /* declare a place to put the photographer in the dom */
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
        <ul class="profile__tags" >${tags.map((tag) => `<li class="tags">#${tag}</li>`).join('')}</ul> 
    </article>`;
    photographerElement.innerHTML = photographerhtml;
    /* .map & .join etc solution found on the internet https://www.javascripttutorial.net/es6/javascript-template-literals/ */
  });
};

/* TEST FUNCTIONS FOR TRYING TO ADD EVENT LISTENER FOR ATG FILTERING */

const TestFunction = (el) => {
  if (el.classList.contains('test')) {
    /* el.parentElement.parentElement.remove(); */
    console.log('Hello');
  }
};

document.querySelector('.header__nav').addEventListener('click', (el) => {
  TestFunction(el.target);
  console.log(el.target);
});

document.querySelector('.photographers-container ').addEventListener('click', (e) => {
  TestFunction(e.target);
  console.log(e.target);
});
