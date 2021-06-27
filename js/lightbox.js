/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars *//* eslint-disable linebreak-style */

// DOM Elements
const lightboxModalbg = document.querySelector('.lightbox-modal');
const closeLightboxModalBtn = document.querySelectorAll('.lightbox-modal__controls--close');

// launch modal
const launchLightboxModal = (photographersMedia, i) => {
  mainWrapper.setAttribute('aria-hidden', 'true');
  lightboxModalbg.setAttribute('aria-hidden', 'false');
  lightboxModalbg.style.display = 'flex';

  const lightboxElement = document.querySelector('#placeHolder');
  let lightboxhtml = '';
  if (photographersMedia[i].video) { /* if a video object return a video template */
    lightboxhtml = `<video width="100%" controls class="lightbox-modal__media"><source type="video/mp4" src="/public/images/photography/${photographersMedia[i].photographerId}/${photographersMedia[i].video}">Sorry, your browser doesn't support embedded videos.</video>
            <h2 class="lightbox-modal__title">${photographersMedia[i].title}</h2>`;
  } else if (photographersMedia[i].image) { /* if an image object return an image template */
    lightboxhtml = `<img class="lightbox-modal__media" src="/public/images/photography/${photographersMedia[i].photographerId}/${photographersMedia[i].image}" alt="${photographersMedia[i].title}">
      <h2 class="lightbox-modal__title">${photographersMedia[i].title}</h2>`;
  }
  lightboxElement.innerHTML = lightboxhtml;
};

// close modal Lightbox modal
const closeLightboxModal = () => {
  mainWrapper.setAttribute('aria-hidden', 'false');
  lightboxModalbg.setAttribute('aria-hidden', 'true');
  lightboxModalbg.style.display = 'none';
};
//  close Lightbox modal event listener
closeLightboxModalBtn.forEach((btn) => btn.addEventListener('click', closeLightboxModal));

// close Lightbox modal on pressing the escape key event listener
lightboxModalbg.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightboxModal();
  }
});

const lightbox = (photographersMedia) => {
  const photoartworkElement = document.querySelector('#photographer-media');
  const findmapindexOf = (chosenPhoto) => photographersMedia.map((event) => event.id).indexOf(chosenPhoto);

  photoartworkElement.addEventListener('click', (event) => {
    if (!event.target.matches('.artwork__image')) {
      return;
    }
    const chosenMedia = findmapindexOf(parseInt(event.target.id, 10));
    launchLightboxModal(photographersMedia, chosenMedia);
  });

  photoartworkElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      if (!event.target.matches('.artwork__image')) {
        return;
      }
      const chosenMedia = findmapindexOf(parseInt(event.target.id, 10));
      launchLightboxModal(photographersMedia, chosenMedia);
    }
  });
};
