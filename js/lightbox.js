/* eslint-disable no-console */
/* eslint-disable no-lonely-if */
/* eslint-disable max-len *//* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// DOM Elements
const lightboxModalbg = document.querySelector('.lightbox-modal');
const closeLightboxModalBtn = document.querySelectorAll('#close');

// FIX FOCUS IN LIGHTBOX MODAL FOR KEYBOARD USERS
const LightBoxModalTrap = () => {
  /* add all the elements inside modal which we want to make focusable */
  const lightboxFocusableElements = 'button, [href], [tabindex]:not([tabindex="-1"])';
  /* select the modal by it's class id */
  const lightboxModal = document.querySelector('.lightbox-modal');
  /* get first element to be focused inside modal */
  const firstLightboxFocusableElement = lightboxModal.querySelectorAll(lightboxFocusableElements)[0];
  const lightboxFocusableContent = lightboxModal.querySelectorAll(lightboxFocusableElements);
  /* get last element to be focused inside modal */
  const lastLightboxFocusableElement = lightboxFocusableContent[lightboxFocusableContent.length - 1];

  document.addEventListener('keydown', (event) => {
    const { key } = event;
    if (key !== 'Tab' || key === 9) {
      return;
    }
    if (event.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstLightboxFocusableElement) {
        lastLightboxFocusableElement.focus(); // add focus for the last focusable element
        event.preventDefault();
      }
    } else { // if tab key is pressed
      /* if focused has reached to last focusable element then focus first focusable element
    after pressing tab */
      if (document.activeElement === lastLightboxFocusableElement) {
        /* add focus for the first focusable element */
        firstLightboxFocusableElement.focus();
        event.preventDefault();
      }
    }
  });
};

// close modal Lightbox modal
const closeLightboxModal = () => {
  mainWrapper.setAttribute('aria-hidden', 'false');
  lightboxModalbg.setAttribute('aria-hidden', 'true');
  lightboxModalbg.style.display = 'none';
  document.querySelector('#dropdownBtn').focus();
};
//  close Lightbox modal event listener
closeLightboxModalBtn.forEach((btn) => btn.addEventListener('click', closeLightboxModal));

// close Lightbox modal on pressing the escape key event listener
lightboxModalbg.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLightboxModal();
  }
});

// LAUNCH LIGHTBOX MODAL & LOADS RELEVANT MEDIA TYPE (FACTORY FUNCTION)
const launchLightboxModal = (photographersMedia, i) => {
  mainWrapper.setAttribute('aria-hidden', 'true');
  lightboxModalbg.setAttribute('aria-hidden', 'false');
  lightboxModalbg.style.display = 'flex';
  document.getElementById('close').focus();
  LightBoxModalTrap();

  const lightboxElement = document.querySelector('#placeHolder');
  let lightboxhtml = '';
  if (photographersMedia[i].video) { /* if a video object return a video template */
    lightboxhtml = `<video width="100%" controls class="lightbox-modal__media"  tabindex="0" aria-label="${photographersMedia[i].alt}"><source type="video/mp4" src="/public/images/photography/${photographersMedia[i].photographerId}/${photographersMedia[i].video}">Sorry, your browser doesn't support embedded videos.</video>
    <h1 class="lightbox-modal__title">${photographersMedia[i].title}</h1>`;
  } else if (photographersMedia[i].image) { /* if an image object return an image template */
    lightboxhtml = `<img class="lightbox-modal__media" tabindex="0" src="/public/images/photography/${photographersMedia[i].photographerId}/${photographersMedia[i].image}" alt="${photographersMedia[i].alt}">
    <h1 class="lightbox-modal__title">${photographersMedia[i].title}</h1>`;
  }
  lightboxElement.innerHTML = lightboxhtml;
};

// LISTEN FOR WHEN USER CHOSES A PHOTO TO ENLARGE & LAUNCH THE LIGHTBOX
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
