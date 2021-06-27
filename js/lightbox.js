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
function launchLightboxModal() {
  mainWrapper.setAttribute('aria-hidden', 'true');
  lightboxModalbg.setAttribute('aria-hidden', 'false');
  lightboxModalbg.style.display = 'flex';
}

// close modal Lightbox modal
function closeLightboxModal() {
  mainWrapper.setAttribute('aria-hidden', 'false');
  lightboxModalbg.setAttribute('aria-hidden', 'true');
  lightboxModalbg.style.display = 'none';
}
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
    console.log(findmapindexOf(parseInt(event.target.id, 10)));
    launchLightboxModal();
  });

  photoartworkElement.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      if (!event.target.matches('.artwork__image')) {
        return;
      }
      console.log(findmapindexOf(parseInt(event.target.id, 10)));
      launchLightboxModal();
    }
  });
};
