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
    console.log(person);
    const tagArray = person.tags;
    console.log(tagArray);
    photographerhtml += `
    <article class="profile">
      <a href="#"><img class="profile__portrait" src="/public/images/photography/Photographers_id_photos/${person.portrait}"
      alt="${person.name}">
      <h2 class="profile__name">${person.name}</h2></a>
        <p class="profile__address">${person.city}, ${person.country}</p>
        <p class="profile__tagline">${person.tagline}</p>
        <p class="profile__price">$ ${person.price} /jour</p>
        <p class="profile__price">${person.tags[0]} ${person.tags[1]} ${person.tags[2]} ${person.tags[3]}</p>
        <ul class="profile__tags"></ul>
    </article>`;
  });
  photographerElement.innerHTML = photographerhtml;
};

/*
 const tagElements = document.querySelector('.profile__tags');
  const tagsArray = person.tags;
  tagsArray.forEach((tag)=>{
    let tagList = '';
    taglist +=`<li>${tag}</li>`;
  }); */
