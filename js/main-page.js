/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

/* Fetch the photographer data from the Json file */
fetch('./public/data.json')
  .then((response) => response.json())
  .then((data) => {
    /* console.log(data); */
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
    DisplayByTagSelected(tagSelected, photographers);
  });
};

const DisplayByTagSelected = (selectedTag, photographers) => {
  const allPhotographers = document.getElementsByTagName('article');
  /* check/loop through each photographer in array JSON */
  for (let i = 0; i < photographers.length; i++) {
    let showPhotographer = false;
    /* check/loop through each tag in array of tags for each photographer */
    for (let j = 0; j < photographers[i].tags.length; j++) {
      /* if selected tag is present set to show photographer otherwise do nothing
      (ie, don't set back to false) */
      if (photographers[i].tags[j] === selectedTag) {
        showPhotographer = true;
      }
      /* Either show or "remove" corresponding photographer "article" in DOM */
      /* position [i] in the JSON is the same as position [i] of the article in the DOM */
      if (showPhotographer) {
        allPhotographers[i].style.display = 'flex';
      } else {
        allPhotographers[i].style.display = 'none';
      }
    }
  }
};
